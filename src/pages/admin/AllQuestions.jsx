import React, { useState, useEffect } from 'react'
import Appheader from '../../components/adminComponents/Appheader';
import Appfooter from '../../components/adminComponents/Appfooter';
import Dropdown from '../../components/inputs/Dropdown';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AllQuestions() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    useEffect(() => {
        getClasses();
    }, [])

    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState([]);

    const [questions, setQuestion] = useState([]);


    function getClasses() {
        let result = fetch(baseUrl + 'api/get_classes').then(function (result) {
            result.json().then(function (jsonbody) {
                console.warn(jsonbody);
                setClasses(jsonbody);
            })
        });
    }
    function getSubjects() {
        let result = fetch(baseUrl + 'api/get_subjects_by_class/' + selectedClass).then(function (result) {
            result.json().then(function (jsonbody) {
                console.warn(jsonbody);
                setSubjects(jsonbody);
            })
        });
    }

    const handleClassChange = (e) => {
        const selectedValue = e.target.value;
        // console.log(selectedValue);
        setSelectedClass(selectedValue);
        // getSubjects();
    };
    const handleSubjectChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedSubject(selectedValue);
    };

    useEffect(() => {
        getSubjects();
    }, [selectedClass]);

    const filterQuestions = (e) => {

        console.log(selectedSubject);
        let result = fetch(baseUrl + 'api/get_questions_by_subject/' + selectedSubject).then(function (result) {
            result.json().then(function (jsonbody) {
                console.warn(jsonbody);
                setQuestion(jsonbody);
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

                                <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                    <h2 className="fw-400 font-lg d-block ml-2">Test <b> Questions</b> </h2>
                                    <div className="card-body p-lg-5 px-4 w-100 border-0 ">
                                        <div className="row mb-6">
                                            <div className="col-lg-5">
                                                <label className="mont-font fw-600 font-xsss">Select Class</label><br />
                                                <Dropdown
                                                    options={classes}
                                                    column_name='class'
                                                    value={selectedClass}
                                                    onChange={handleClassChange} />
                                            </div>
                                            <div className="col-lg-5">
                                                <label className="mont-font fw-600 font-xsss">Select
                                                    Subject</label><br />
                                                <Dropdown
                                                    options={subjects}
                                                    column_name='subject_name'
                                                    value={selectedSubject}
                                                    onChange={handleSubjectChange} />
                                            </div>
                                            <div className="col-lg-2">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss"></label><br />
                                                    <button type="button" className="mt-1 btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0" onClick={filterQuestions}>Show</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    questions ? (
                                        questions && questions.map((question, index) => (
                                            <div className="col-xl-6 col-lg-6 col-md-6" key={index}>
                                                <div className="card w-100 border-0 bg-white shadow-lg p-0 mb-2">
                                                    <div className="card-body p-4 w-100 border-0 rounded-lg">
                                                        <h4 class="fw-600 font-xss mt-4" >{`Q ${index + 1}. ${question.question}`} </h4>
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

export default AllQuestions
