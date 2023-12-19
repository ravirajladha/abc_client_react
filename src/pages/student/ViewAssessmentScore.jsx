import AppFooter from '../../components/includes/AppFooter';
import AppHeader from '../../components/includes/AppHeader';
import StudentSidebar from '../../components/includes/StudentSidebar';
import BackButton from '../../components/navigation/BackButton';

import { Link, useLocation, useParams } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';

function ViewAssessmentScore() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const location = useLocation();
    const { subjectId, resultData } = location.state || {};

  
    return (
        <>
        
                    <div className="middle-sidebar-bottom theme-dark-bg">
                        <div className="middle-sidebar-left">
                            <div className="row">
                                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
                                    <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-5 border-0 text-left question-div">
                                        <div
                                            className="card-body text-center p-3 bg-no-repeat bg-image-topcenter"
                                            id="question4"
                                        >
                                            <img
                                                src="/assets/images/star.png" width="100" alt="icon" className="d-inline-block" />

                                            <h3 className="fw-700 mt-5 text-grey-900 font-xxl">Your score : <span>{resultData && resultData.score}</span></h3>
                                            <h3 className="fw-700 mt-5 text-grey-900 font-xs">Your Percentage : <span>{resultData && resultData.score_percentage.toFixed(2)} %</span></h3>
                                            <p className="font-xssss fw-600 lh-30 text-grey-500 mb-0 p-2">Your test is completed, you can find your score above. </p>

                                            <Link to={"/subject_stream/" + subjectId} data-question="question4" className=" p-2 mt-3 d-inline-block text-white fw-700 lh-30 rounded-lg w200 text-center font-xsssss ls-3 bg-current">Go back to course</Link>
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

export default ViewAssessmentScore
