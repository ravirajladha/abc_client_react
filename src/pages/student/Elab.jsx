import React, { useState, useEffect, useRef } from 'react';
import AppFooter from '../../components/includes/AppFooter';
import Navheader from '../../components/Navheader';
import AppHeader from '../../components/includes/AppHeader';
import Profile from '../../components/Profile';
import Myclass from '../../components/Myclass';
import Subscribe from '../../components/Subscribe';


import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Elab() {
    return (
        <>
            <div className="main-wrapper">
                <div className="main-content menu-active">
                    <AppHeader />

                    <div className="middle-sidebar-bottom theme-dark-bg bg-lightblue">
                        <div className="middle-sidebar-left">
                            <div className="row">
                                <ToastContainer autoClose={3000} />
                                <div className="col-lg-12">
                                    <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                        <div className="card-body p-4 w-100 border-0 rounded-lg">
                                            <h2 className="fw-300 font-400 d-block"> <b> Elab</b> </h2>

                                        </div>

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

                <AppFooter />
            </div>
        </>
    )
}

export default Elab
