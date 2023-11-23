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

function VideoWithWaterMark() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const user = getUserFromSessionStorage();
    const user_id = user.user.id;
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
                                    <i className="watermark" >{"userId"+user_id}</i>
                                    <img className="watermark_image"
                                        src="https://jonnasuresh.files.wordpress.com/2013/03/vtu-logo.png"
                                        alt="" style={{opacity:50, width:50}} />
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

export default VideoWithWaterMark
