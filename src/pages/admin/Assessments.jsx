import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

import AppHeader from '../../components/includes/AppHeader';
import AppFooter from '../../components/includes/AppFooter';
import { Link } from 'react-router-dom';
import BackButton from '../../components/navigation/BackButton';


function Assessments() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    useEffect(() => {
        getSubjects();
    }, [])

    const [data, setData] = useState([]);

    function getSubjects() {
        return fetch(baseUrl + 'api/get-classes-and-subjects')
            .then(function (result) {
                return result.json();
            })
            .then(function (res) {
                setData(res);
            })
            .catch(function (error) {
                console.error('Error fetching subjects:', error);
            });
    }

    //filter to show classses which have subjects
    const classesWithSubjects = data.filter(classItem => classItem.subjects.length > 0);

    return (
        <>
            <div className="main-wrapper">

                <div className="main-content menu-active">
                    <AppHeader />

                    <div className="middle-sidebar-bottom theme-dark-bg">
                        <div className="middle-sidebar-left">
                            <div className="row">
                                <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                                    <div>
                                        <h2 className="fw-400 font-lg d-block">All <b> Assesments</b> </h2>
                                    </div>
                                    <div className="float-right">
                                        <Link to={"/assessments/create_assessments"} className="p-2 me-2  d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current">Create Assesments</Link>
                                        <BackButton />
                                    </div>
                                </div>

                                { classesWithSubjects ? (classesWithSubjects.map((classItem, index) => (
                                    <div className="row" key={classItem.id}>
                                        <h2 className="fw-400 font-lg d-block mb-2">{classItem.class}</h2>
                                        {classItem.subjects.map(subject => (
                                            <div className="col-xl-4 col-lg-6 col-md-6" key={subject.id}>
                                                <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                                                    <a href="" className="position-absolute right-0 mr-4 top-0 mt-3"><i className="ti-more text-grey-500 font-xs"></i></a>
                                                    <a href="#" className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto">
                                                        <img src={baseUrl + subject.subject_image} alt="icon" className="p-1" />
                                                    </a>
                                                    <h4 className="fw-700 font-xs mt-4">{subject.subject_name}</h4>
                                                    <div className="clearfix"></div>
                                                    <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-success d-inline-block text-success mb-1 mr-1">Full Time</span>

                                                    <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-info d-inline-block text-info mb-1">30 Min</span>
                                                    <div className="clearfix"></div>

                                                    <Link to={"/assessments/view_assessments/" + subject.id} className="p-2 mt-4 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current">VIEW ASSESMENTS</Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))) : ""}

                            </div>

                        </div>
                    </div>
                </div>
                <AppFooter />
            </div>
        </>
    );
}


export default Assessments;
