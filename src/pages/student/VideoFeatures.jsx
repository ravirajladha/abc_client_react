import React from 'react';
import AppFooter from '../../components/includes/AppFooter';
import AppHeader from '../../components/includes/AppHeader';
import StudentSidebar from '../../components/includes/StudentSidebar';
import BackButton from '../../components/navigation/BackButton';


import { Link } from 'react-router-dom';

function VideoFeatures() {
    return (
        <>
            <div className="main-wrapper">

                <div className="main-content menu-active">
                    <AppHeader />

                    <div className="middle-sidebar-bottom theme-dark-bg">
                        <div className="middle-sidebar-left">

                                <div className="row">
                                    <div class="col-lg-12">
                                        <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                                            <div>
                                                <h3 class="mb-4 font-lg fw-700 mont-font mb-5">Video Features</h3>
                                            </div>
                                            <div className="float-right">
                                                <BackButton />
                                            </div>
                                        </div>
                                        <ul class="list-inline mb-4">
                                            <li class="list-inline-item d-block border-bottom mr-0"><Link to={"/video_features/markers"} class="pt-2 pb-2 d-flex"><i class="btn-round-md bg-gold-gradiant text-white feather-play-circle font-md mr-3"></i> <h4 class="fw-600 font-xssss mb-0 mt-3">Video with note</h4><i class="ti-angle-right font-xsss text-grey-500 ml-auto mt-3"></i></Link></li>

                                            <li class="list-inline-item d-block border-bottom mr-0"><Link to={"/video_features/marker_single"} class="pt-2 pb-2 d-flex"><i class="btn-round-md bg-gold-gradiant text-white feather-play-circle font-md mr-3"></i> <h4 class="fw-600 font-xssss mb-0 mt-3">Video with single note</h4><i class="ti-angle-right font-xsss text-grey-500 ml-auto mt-3"></i></Link></li>

                                            <li class="list-inline-item d-block border-bottom mr-0"><Link to={"/video_features/video_with_watermark"} class="pt-2 pb-2 d-flex"><i class="btn-round-md bg-gold-gradiant text-white feather-play-circle font-md mr-3"></i> <h4 class="fw-600 font-xssss mb-0 mt-3">Video with water mark</h4><i class="ti-angle-right font-xsss text-grey-500 ml-auto mt-3"></i></Link></li>

                                            <li class="list-inline-item d-block border-bottom mr-0"><a href="#" class="pt-2 pb-2 d-flex"><i class="btn-round-md bg-gold-gradiant text-white feather-map-pin font-md mr-3"></i> <h4 class="fw-600 font-xssss mb-0 mt-3">Video Encryption</h4><i class="ti-angle-right font-xsss text-grey-500 ml-auto mt-3"></i></a></li>


                                            <li class="list-inline-item d-block border-bottom mr-0"><a href="#" class="pt-2 pb-2 d-flex"><i class="btn-round-md bg-gold-gradiant text-white feather-map-pin font-md mr-3"></i> <h4 class="fw-600 font-xssss mb-0 mt-3">Video Playback</h4><i class="ti-angle-right font-xsss text-grey-500 ml-auto mt-3"></i></a></li>
                                        </ul>
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

export default VideoFeatures
