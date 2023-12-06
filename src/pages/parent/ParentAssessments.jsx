import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

import AppHeader from '../../components/includes/AppHeader';
import AppFooter from '../../components/includes/AppFooter';
import BackButton from '../../components/navigation/BackButton';

import { Link, useParams } from 'react-router-dom';

function ParentAssessments() {
    return (
        <>
            <div className="main-wrapper">
                <div className="main-content">
                    <AppHeader />
                    <div className="middle-sidebar-bottom theme-dark-bg">
                        <div className="custom-middle-sidebar-left">
                            <div className="row">

                                <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                    <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                                        <div>
                                            <h2 className="fw-400 font-lg d-block ml-2">All <b> Assessments</b> </h2>
                                        </div>
                                        <div className="float-right">
                                            <BackButton />
                                        </div>
                                    </div>
                                    <div className="card-body p-lg-5 px-4 w-100 border-0 ">
                                        <div className="table-responsive">
                                            <table className="table table-admin mb-0">
                                                <thead className="bg-greylight rounded-10 ovh">
                                                    <tr>
                                                        <th className="border-0">Sl no.</th>
                                                        <th className="border-0" scope="col">
                                                            Subject Name
                                                        </th>
                                                        <th className="border-0" scope="col">
                                                            Chapter Name
                                                        </th>
                                                        <th className="border-0" scope="col">
                                                            Video Name
                                                        </th>
                                                        <th>Score</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* {
                                                        assessments  ? (
                                                            assessments.map((assessment, index) => (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>
                                                                        <b>{assessment.subject.subject_name}</b>
                                                                    </td>
                                                                    <td>{assessment.chapter.chapter_name}</td>
                                                                    <td>{assessment.video.video_name}</td>
                                                                    <td>{assessment.question}</td>
        
                                                                </tr>
                                                            ))
                                                        )
                                                        :
                                                        <h1>No data found</h1>
                                                    } */}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <AppFooter />
            </div>
        </>
    )
}

export default ParentAssessments
