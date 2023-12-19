import React from 'react';
import AppFooter from '../../components/includes/AppFooter';
import AppHeader from '../../components/includes/AppHeader';
import StudentSidebar from '../../components/includes/StudentSidebar';
import BackButton from '../../components/navigation/BackButton';

import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Elab() {
    return (
        <>
          
                    <div className="middle-sidebar-bottom theme-dark-bg bg-lightblue">
                        <div className="middle-sidebar-left">
                            <div className="row">
                                <ToastContainer autoClose={3000} />
                                <div className="col-lg-12">
                                    <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                        <div className="card-body p-4 w-100 border-0 rounded-lg">
                                            <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                                                <div>
                                                    <h2 className="fw-400 font-lg d-block">  <b> Elab</b> </h2>
                                                </div>
                                                <div className="float-right">
                                                    <BackButton />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <StudentSidebar />
                    </div>
              
        </>
    )
}

export default Elab
