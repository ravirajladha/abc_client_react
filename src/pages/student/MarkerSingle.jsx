import React, { useState, useEffect, useRef } from 'react';
import Appfooter from '../../components/Appfooter';
import Navheader from '../../components/Navheader';
import Appheader from '../../components/Appheader';
import Profile from '../../components/Profile';
import Myclass from '../../components/Myclass';
import Subscribe from '../../components/Subscribe';
import "../../css/custom.css"

import { Tabs, Tab, Accordion } from 'react-bootstrap';
import { getUserFromSessionStorage } from '../util/SessionStorage';



import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import VideoPlayer from './VideoPlayer';
import { Link, useParams } from 'react-router-dom';


function MarkerSingle() {

    const baseUrl = process.env.REACT_APP_BASE_URL;
    const user = getUserFromSessionStorage();
    const user_id = user.user.id;

    const [markers, setMarkers] = useState([]);
    const [currentTime, setCurrentTime] = useState(0);
    
    useEffect(() => {
        // Load videojs player and set markers
        const video = videojs("myPlayerID");

        // Fetch markers data
        fetchMarkersData().then(data => {
            setMarkers(data);
            // Set markers on the progress bar
            setMarkersOnProgressBar(video, data);
        });

        // Add event listener for loadedmetadata
        video.on("loadedmetadata", () => {
            // Additional setup if needed
            setMarkersOnProgressBar(video, markers);

        });
        // Add event listener for timeupdate
        video.on("timeupdate", () => {
            setCurrentTime(video.currentTime());
        });
        // Cleanup function
        return () => {
            // Cleanup logic, if any
        };
    }, []);

    const fetchMarkersData = async () => {
        // Fetch markers data from API or another source
        try {
            const response = await fetch(baseUrl + "api/get_markers");
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching markers data', error);
            return [];
        }
    };


    const setMarkersOnProgressBar = (video, markersData) => {
        const total = video.duration();
        const progressControl = video.controlBar.progressControl.children_[0].el_;

        markersData.forEach((marker) => {
            const left = (marker.time / total) * 100 + '%';
            const time = marker.time;

            const markerElement = document.createElement('div');
            markerElement.className = 'vjs-marker';
            markerElement.style = `left:${left}`;
            markerElement.setAttribute('data-time', time);
            markerElement.innerHTML = `<span>${marker.note}</span>`;

            markerElement.addEventListener('click', () => {
                video.currentTime(time);
            });

            progressControl.appendChild(markerElement);
        });
    };

    return (
        <>
         <div className="main-wrapper">
                <Navheader />

                <div className="main-content menu-active">
                    <Appheader />

                    <div className="middle-sidebar-bottom theme-dark-bg">
                        <div className="middle-sidebar-left">
                            <div className="row d-flex justify-content-center">
                                <div className="col-xl-12 col-xxl-9 col-lg-8">
                                    <video
                                        id="myPlayerID"
                                        className="video-js vjs-big-play-centered"
                                        controls
                                        preload="auto"
                                        width="900"
                                        height="490"
                                        data-setup="{}"
                                    // onTimeUpdate={handleVideoTimeUpdate}
                                    >
                                        {/* Video sources go here */}
                                        <source src="https://abc.kods.app/uploads/SHGV1684912023.mp4" type="video/mp4" />
                                    </video>
                                </div>

                             


                            </div>
                        </div>
                        <div className="middle-sidebar-right scroll-bar">
                            <div className="middle-sidebar-right-content">
                                <Profile />
                                <Myclass />
                                <Subscribe />
                            </div>
                        </div>
                    </div>
                </div>

                <Appfooter />
            </div>
        </>
    )
}

export default MarkerSingle
