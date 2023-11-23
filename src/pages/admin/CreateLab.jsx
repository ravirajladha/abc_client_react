import React, { Component, Fragment, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

import Appheader from '../../components/adminComponents/Appheader';
import Appfooter from '../../components/adminComponents/Appfooter';


function CreateLab() {

    return (
        <>
            <div className="main-wrapper">

                <div className="main-content menu-active">
                    <Appheader />

                    <div className="middle-sidebar-bottom theme-dark-bg">
                        <div className="middle-sidebar-left">
                            <div className="row">
                                <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                    <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                                        <form method="POST" action="/admin/add_lab" enctype="multipart/form-data" autocomplete="OFF">
                                            <div className="row">
                                                <div className=" col-sm-12">
                                                    <div className="card-box">

                                                        <div className="row">
                                                            <div className="col-md-12 col-sm-12">
                                                                <div className="form-group mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width">
                                                                    <div className="row">

                                                                        <div className="col-lg-6">
                                                                            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width">
                                                                                <label className="mont-font fw-600 font-xsss">Select Class</label><br />
                                                                                <select name="course" id="course" className="form-control">
                                                                                    <option readonly disabled selected value="">-Select-</option>

                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-6">
                                                                            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width">
                                                                                <label className="mont-font fw-600 font-xsss">Select Subject</label><br />

                                                                                <select name="section" id="section-dropdown" className="form-control">
                                                                                    <option readonly disabled selected value="">--Select--</option>

                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-6">
                                                                            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width">
                                                                                <label className="mont-font fw-600 font-xsss">Select Chapter</label><br />

                                                                                <select name="video" id="video-dropdown" className="form-control">
                                                                                    <option readonly disabled selected value="">--Select--</option>

                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-6">
                                                                            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width">
                                                                                <label className="mont-font fw-600 font-xsss">Select Video</label><br />

                                                                                <select name="video" id="video-dropdown" className="form-control">
                                                                                    <option readonly disabled selected value="">--Select--</option>

                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-12 mt-3"  >
                                                                            <iframe
                                                                                frameBorder="0"
                                                                                height="450px"
                                                                                src="https://onecompiler.com/embed/java/"
                                                                                width="100%"
                                                                            ></iframe>
                                                                        </div>

                                                                    </div>

                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="mont-font fw-600 font-xsss">Name</label>
                                                        <input type="text" name="name" className="form-control" placeholder="Enter Name" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="mont-font fw-600 font-xsss">Code</label>
                                                        <input type="text" name="code" className="form-control" placeholder="Enter code" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <button type="submit" className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0 float-right" >Procced</button>
                                                </div>
                                            </div>

                                        </form>

                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                <Appfooter />
            </div>
        </>
    );
}


export default CreateLab;
