import React, { useState, useEffect, useRef } from 'react';
import AppFooter from '../../components/includes/AppFooter';
import Navheader from '../../components/Navheader';
import AppHeader from '../../components/includes/AppHeader';
import StudentSidebar from '../../components/includes/StudentSidebar';


import "../../css/custom.css"

import { Tabs, Tab, Accordion } from 'react-bootstrap';
import { useContext } from 'react';
import { AuthContext } from "../../lib/AuthContext.js"



import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import VideoPlayer from './VideoPlayer';
import { Link, useParams } from 'react-router-dom';

function VideoWithWaterMark() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const  user = useContext(AuthContext).user;
    if (!user) {
        // Handle the case when there is no user. You might want to redirect
        // to a login page or return null or some placeholder content.
        console.log("No user found. User might be logged out.");
        return <div>User is not logged in</div>;
      }
    const user_id = user.user.id;
    return (
        <>
         <div className="main-wrapper">
                <Navheader />

                <div className="main-content menu-active">
                    <AppHeader />

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
                                    <i className="watermark" >{"userId"+user_id}</i>
                                    <img className="watermark_image"
                                        src="https://jonnasuresh.files.wordpress.com/2013/03/vtu-logo.png"
                                        alt="" style={{opacity:50, width:50}} />
                                </div>

                             


                            </div>
                        </div>
                        <StudentSidebar />
                    </div>
                </div>

                <AppFooter />
            </div>
        </>
    )
}

export default VideoWithWaterMark
