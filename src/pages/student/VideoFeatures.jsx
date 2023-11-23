import React, { useState, useEffect, useRef } from 'react';
import Appfooter from '../../components/Appfooter';
import Navheader from '../../components/Navheader';
import Appheader from '../../components/Appheader';
import Profile from '../../components/Profile';
import Myclass from '../../components/Myclass';
import Subscribe from '../../components/Subscribe';

import { Tabs, Tab, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function VideoFeatures() {
    return (
        <>
            <div className="main-wrapper">

                <div className="main-content menu-active">
                    <Appheader />

                    <div className="middle-sidebar-bottom theme-dark-bg">
                        <div className="middle-sidebar-left">
                    <div class="middle-wrap">

                            <div className="row">
                            <div class="col-lg-12">
                                        <h4 class="mb-4 font-lg fw-700 mont-font mb-5">Video Features</h4>
                                        <ul class="list-inline mb-4">
                                            <li class="list-inline-item d-block border-bottom mr-0"><Link to={"/video_features/markers"} class="pt-2 pb-2 d-flex"><i class="btn-round-md bg-gold-gradiant text-white feather-play-circle font-md mr-3"></i> <h4 class="fw-600 font-xssss mb-0 mt-3">Video with note</h4><i class="ti-angle-right font-xsss text-grey-500 ml-auto mt-3"></i></Link></li>

                                            <li class="list-inline-item d-block border-bottom mr-0"><Link to={"/video_features/marker_single"} class="pt-2 pb-2 d-flex"><i class="btn-round-md bg-gold-gradiant text-white feather-play-circle font-md mr-3"></i> <h4 class="fw-600 font-xssss mb-0 mt-3">Video with single note</h4><i class="ti-angle-right font-xsss text-grey-500 ml-auto mt-3"></i></Link></li>

                                            <li class="list-inline-item d-block border-bottom mr-0"><Link to={"/video_features/video_with_watermark"}  class="pt-2 pb-2 d-flex"><i class="btn-round-md bg-gold-gradiant text-white feather-play-circle font-md mr-3"></i> <h4 class="fw-600 font-xssss mb-0 mt-3">Video with water mark</h4><i class="ti-angle-right font-xsss text-grey-500 ml-auto mt-3"></i></Link></li>

                                            <li class="list-inline-item d-block border-bottom mr-0"><a href="#" class="pt-2 pb-2 d-flex"><i class="btn-round-md bg-gold-gradiant text-white feather-map-pin font-md mr-3"></i> <h4 class="fw-600 font-xssss mb-0 mt-3">Video Encryption</h4><i class="ti-angle-right font-xsss text-grey-500 ml-auto mt-3"></i></a></li>


                                            <li class="list-inline-item d-block border-bottom mr-0"><a href="#" class="pt-2 pb-2 d-flex"><i class="btn-round-md bg-gold-gradiant text-white feather-map-pin font-md mr-3"></i> <h4 class="fw-600 font-xssss mb-0 mt-3">Video Playback</h4><i class="ti-angle-right font-xsss text-grey-500 ml-auto mt-3"></i></a></li>
                                        </ul>
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

export default VideoFeatures
