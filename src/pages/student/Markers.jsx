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

function Markers() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const user = getUserFromSessionStorage();
    const user_id = user.user.id;

    const [markers, setMarkers] = useState([]);
    const [currentTime, setCurrentTime] = useState(0);
    const [newNote, setNewNote] = useState('');

    const handleNoteSubmit = async () => {
        console.log(currentTime);
        console.log(newNote);
        try {
            // Send the new note to the server
            const response = await fetch(baseUrl + 'api/save_marker', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    timestamp: currentTime,
                    note: newNote,
                    user_id: user_id
                }),
            });

            if (response.ok) {
                // Update the markers state with the new note
                setMarkers(prevMarkers => [...prevMarkers, { time: currentTime, note: newNote }]);
                // Clear the input field
                setNewNote('');
            } else {
                console.error('Failed to save note');
            }
        } catch (error) {
            console.error('Error saving note', error);
        }
    };

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
                            <div className="row">
                                <div className="col-xl-8 col-xxl-9 col-lg-8">
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

                                <div className="col-xl-4 col-xxl-3 col-lg-4 pe-0 ps-0">
                                    <div className="card w-100 d-block chat-body p-0 border-0 shadow-xss rounded-3 mb-3 position-relative">
                                        <Tabs
                                            defaultActiveKey="notes"
                                            id="uncontrolled-tab-example"

                                            className="mb-3 list-inline-center d-block text-center border-0"
                                        >
                                            <Tab eventKey="course" title="Subject" className="list-inline-item ">

                                            </Tab>
                                            <Tab eventKey="chat" title="CHAT" className="list-inline-item " >

                                            </Tab>
                                            <Tab eventKey="notes" title="NOTES" className="list-inline-item">
                                                <div className="messages-content chat-wrapper scroll-bar p-3"
                                                    style={{ height: 400 }}
                                                >
                                                    {markers.map((marker, index) => (
                                                        <div className="message-item outgoing-message" key={index}>
                                                            <div className="message-user m-0">
                                                                <div id="timeWrap" className="time p-0">{marker.time}</div>
                                                            </div>
                                                            <div className="message-wrap" data-time={marker.time}>{marker.note}</div>
                                                        </div>
                                                    ))}

                                                </div>
                                                <div className="chat-form position-absolute bottom-0 w-100 left-0 bg-white z-index-1 p-3 shadow-xs theme-dark-bg ">
                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            placeholder="Start typing.."
                                                            value={newNote}
                                                            onChange={(e) => setNewNote(e.target.value)}
                                                        />
                                                    </div>
                                                    <button className="bg-current" onClick={handleNoteSubmit}>
                                                        <i className="ti-arrow-right text-white"></i>
                                                    </button>
                                                </div>
                                            </Tab>


                                        </Tabs>


                                    </div>
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

export default Markers
