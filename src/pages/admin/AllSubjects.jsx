import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

import Appheader from '../../components/adminComponents/Appheader';
import Appfooter from '../../components/adminComponents/Appfooter';
import { Link } from 'react-router-dom';


function AllSubjects() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    useEffect(() => {
        getSubjects();
    }, [])

    const [subjects, setSubjects] = useState([]);
    function getSubjects() {
        let result = fetch(baseUrl + 'api/get_subjects').then(function (result) {
            result.json().then(function (jsonbody) {
                console.warn(jsonbody);
                setSubjects(jsonbody);
            })
        });
    }

    return (
        <>
            <div className="main-wrapper">

<div className="main-content menu-active">
    <Appheader />

    <div className="middle-sidebar-bottom theme-dark-bg">
        <div className="middle-sidebar-left">

        <div className="row">
                                <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                                    <div>
                                        <h2 className="fw-400 font-lg d-block">All <b> Subjects</b> </h2>
                                    </div>
                                    <div className="float-right">
                                    <Link to={'/all_subjects/create_subject'} className="p-2  d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current mx-1">ADD SUBJECT</Link>
                                    <Link to={'/all_subjects/create_chapters'} className="p-2  d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current mx-1">ADD CHAPTERS</Link>
                                    <Link to={'/all_subjects/create_videos'} className="p-2  d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current mx-1">ADD VIDEOS</Link>
                                </div>
                            </div>
                            {
                                subjects ? (
                                    subjects && subjects.map((subject, index) => (
                                        <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                                            <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                                                <a href="" className="position-absolute right-0 mr-4 top-0 mt-3"><i className="ti-more text-grey-500 font-xs"></i></a>
                                                <a href="#" className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto">
                                                    <img src={baseUrl + subject.subject_image} alt="icon" className="p-1" style={{ width: 50, height: 50 }} />
                                                </a>
                                                <h4 className="fw-700 font-xs mt-4">{subject.subject_name}</h4>
                                                <div className="clearfix"></div>
                                                <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-success d-inline-block text-success mb-1 mr-1">Full Time</span>

                                                <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-info d-inline-block text-info mb-1">30 Min</span>
                                                <div className="clearfix"></div>

                                                <a href="#" className="p-2 mt-4 d-inline-block text-white fw-700 lh-30 rounded-lg w100 text-center font-xsssss ls-3 bg-current">Students</a>
                                            </div>
                                        </div>
                                    ))
                                )
                                    :
                                    <h2 className="fw-400 font-lg d-block">Loading ... </h2>
                                    
                            }
                        </div>

        </div>
    </div>
</div>
<Appfooter />
</div>
        </>
    );
}


export default AllSubjects;
