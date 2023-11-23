import React, { useState, useEffect } from 'react'
import Appheader from '../../components/adminComponents/Appheader';
import Appfooter from '../../components/adminComponents/Appfooter';
import { useParams } from 'react-router-dom';


function SingleTestDetails() {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const [testDetails, setTestDetails] = useState([]);
    const [testQuestions, setTestQuestions] = useState([]);
    const { testId } = useParams();
    const getTestDetails = (e) => {
        let result = fetch(baseUrl + 'api/get_test_details/' + testId).then(function (result) {
            result.json().then(function (jsonbody) {
                console.warn(jsonbody.test.classes.class);
                setTestDetails(jsonbody.test);
                setTestQuestions(jsonbody.test_questions);
            })
        });
    }
    useEffect(() => {
        getTestDetails();
    }, [])
    return (
        <>
            <div className="main-wrapper">
                <div className="main-content menu-active">
                    <Appheader />
                    <div className="middle-sidebar-bottom theme-dark-bg">
                        <div className="middle-sidebar-left">
                            <div className="row">

                                <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                    <h2 className="fw-400 font-lg d-block ml-2">Test <b> Details</b> </h2>
                                    <div className="card-body p-lg-5 px-4 w-100 border-0 ">
                                        <div className="row mb-6">
                                            <div className="col-lg-4">
                                                <img
                                                    src={baseUrl + testDetails.image} alt="image" className="w-50"
                                                    style={{ height: "auto" }} />
                                            </div>
                                            {
                                                testDetails && testDetails.classes ?
                                                    <div className="col-lg-4">

                                                        <h4 className="fw-700 font-xss mt-4">Class: <span className="fw-500">{testDetails.classes.class}</span></h4>
                                                        <h4 className="fw-700 font-xss mt-4">Subject: <span className="fw-500">{testDetails.title}</span></h4>
                                                    </div>
                                                    :
                                                    ""
                                            }

                                            <div className="col-lg-4">
                                                <h4 className="fw-700 font-xss mt-4">Test Name: <span className="fw-500">{testDetails.title}</span></h4>
                                                <h4 className="fw-700 font-xss mt-4">Description: <span className="fw-500">{testDetails.description}</span></h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    testQuestions ? (
                                        testQuestions && testQuestions.map((question, index) => (
                                            <div className="col-xl-6 col-lg-6 col-md-6" key={index}>
                                                <div className="card w-100 border-0 bg-white shadow-lg p-0 mb-2">
                                                    <div className="card-body p-4 w-100 border-0 rounded-lg">
                                                        <h4 className="fw-600 font-xss mt-4" >{`Q ${index + 1}. ${question.question}`} </h4>
                                                        {
                                                            question.question_code ? (
                                                                <pre className="text-wrap bg-grey p-2" >{question.question_code}</pre>
                                                            )
                                                                :
                                                                ""
                                                        }
                                                        <p className={`fw-500 font-xsss mt-3 ${question.answer === "option1" ? 'text-success' : ''}`}>A. {question.option1}</p>
                                                        <p className={`fw-500 font-xsss mt-3 ${question.answer === "option2" ? 'text-success' : ''}`}>A. {question.option2}</p>
                                                        <p className={`fw-500 font-xsss mt-3 ${question.answer === "option3" ? 'text-success' : ''}`}>A. {question.option3}</p>
                                                        <p className={`fw-500 font-xsss mt-3 ${question.answer === "option4" ? 'text-success' : ''}`}>A. {question.option4}</p>
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
    )
}

export default SingleTestDetails
