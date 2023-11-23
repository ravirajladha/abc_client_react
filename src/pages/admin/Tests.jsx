import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

import Appheader from '../../components/adminComponents/Appheader';
import Appfooter from '../../components/adminComponents/Appfooter';
import { Link } from 'react-router-dom';


function Tests() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    useEffect(() => {
        getTests();
    }, [])

    const [tests, setTests] = useState([]);
    function getTests() {
        let result = fetch(baseUrl + 'api/get_tests').then(function (result) {
            result.json().then(function (jsonbody) {
                console.warn(jsonbody);
                setTests(jsonbody);
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
                                        <h2 className="fw-400 font-lg d-block">All <b> Tests</b> </h2>
                                    </div>
                                    <div className="float-right">
                                        <Link to={"/tests/create_question"}
                                            className="p-2  d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current mx-1">ADD
                                            QUESTIONS</Link>
                                        <Link to={"/tests/all_questions"}
                                            className="p-2  d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current mx-1">ALL
                                            QUESTIONS</Link>
                                        <Link to={"/tests/create_test"}
                                            className="p-2  d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current mx-1">CREATE
                                            TEST</Link>
                                    </div>
                                </div>
                                {
                                    tests ? (
                                        tests && tests.map((test, index) => (
                                            <div className="col-lg-3 col-md-6 col-12 col-sm-6" key={index}>
                                                <div className="item">
                                                    <div className="card p-0 shadow-xss border-0 rounded-lg overflow-hidden mr-1 mb-4">
                                                        <div className="card-image w-100 mb-3">
                                                            <a href="" className="position-relative d-block"><img
                                                                src={baseUrl + test.image} alt="image" className="w-100"
                                                                style={{ height: 200 }} /></a>
                                                        </div>
                                                        <div className="card-body pt-0 text-center">
                                                            <span
                                                                className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-danger d-inline-block text-danger mr-1">{test.subject.subject_name}</span>
                                                            <h4 className="fw-700 font-xss mt-3 lh-28 mt-0"><a href="default_course_details"
                                                                className="text-dark text-grey-900">{test.title}</a></h4>

                                                            <div className="text-center">
                                                                <Link to={"/tests/test_details/"+test.id} 
                                                                    className="p-2 mt-4 d-inline-block text-white fw-700 lh-30 rounded-lg w100 text-center font-xsssss ls-3 bg-current mx-1">DETAILS</Link>
                                                                <Link to={"/tests/test_results/"+test.id} 
                                                                    className="p-2 mt-4 d-inline-block text-white fw-700 lh-30 rounded-lg w100 text-center font-xsssss ls-3 bg-current mx-1">RESULTS</Link>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )
                                        :
                                        ""
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


export default Tests;

