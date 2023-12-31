import React, { useState, useEffect, useRef } from 'react';
import AppFooter from '../../components/includes/AppFooter';
import AppHeader from '../../components/includes/AppHeader';
import StudentSidebar from '../../components/includes/StudentSidebar';


import "../../css/custom.css"

import { Tabs, Tab, Accordion } from 'react-bootstrap';
import { getUserFromLocalStorage } from '../util/SessionStorage';



import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import VideoPlayer from "./subject-stream-components/VideoPlayer.jsx";

import { Link, useParams } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from "../../lib/AuthContext.js"
function MarkerSingle() {

    const baseUrl = process.env.REACT_APP_BASE_URL;
    const  user = useContext(AuthContext).user;
   

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

    if (!user) {
        // Handle the case when there is no user. You might want to redirect
        // to a login page or return null or some placeholder content.
        console.log("No user found. User might be logged out.");
        return <div>User is not logged in</div>;
      }
    
        const user_id = user.user.id;
    return (
        <>
       
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
                        <StudentSidebar />
                    </div>
             
        </>
    )
}

export default MarkerSingle
