import React, { useState, useEffect } from 'react'
import Appheader from '../../components/adminComponents/Appheader';
import Appfooter from '../../components/adminComponents/Appfooter';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
function AddQuestionsToTest() {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const location = useLocation();
    const { subjectId, testId } = location.state || {};
    const [questions, setQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [selectedQuestionsId, setSelectedQuestionsId] = useState([]);

    const getQuestions = (e) => {
        let result = fetch(baseUrl + 'api/get_questions_by_subject/' + subjectId).then(function (result) {
            result.json().then(function (jsonbody) {
                console.warn(jsonbody);
                setQuestions(jsonbody);
            })
        });
    }
    useEffect(() => {
        getQuestions();
    }, []);

    const selectQuestion = (question) => {
        setSelectedQuestions([...selectedQuestions, question]);
        setSelectedQuestionsId([...selectedQuestionsId, question.id]);
        setQuestions(questions.filter(q => q.id !== question.id));
    };
    const deleteQuestion = (question) => {
        setQuestions([...questions, question]);
        setSelectedQuestions(selectedQuestions.filter(q => q.id !== question.id));
        setSelectedQuestionsId(selectedQuestionsId.filter(id => id !== question.id));
    };
    const navigate = useNavigate();

    const addQuestionsToTest = (e) => {

        const formData = new FormData();
        formData.append('test_id', testId);
        formData.append('subject_id', subjectId);
        formData.append('selectedQuestionsId', selectedQuestionsId.join(','));
        
        e.preventDefault();
        // console.log(selectedQuestionsId.join(','));

        fetch(baseUrl + "api/add_question_to_test", {
            method: 'POST',
            body: formData
        }).then((res) => {
            return res.json();
        }).then((resp) => {
            navigate("/tests");
        }).catch((err) => {
            toast.error('Could not submit question :' + err.message);
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
                                <div className="col-lg-6">
                                    <div className="card w-100 border-0 bg-white shadow-sm p-0 mb-4">
                                        <h2 className="fw-400 font-lg d-block ml-2">Select <b> Questions</b> </h2>
                                        <div className="card-body p-lg-5 px-4 w-100 border-0 ">
                                            {
                                                questions ? (
                                                    questions && questions.map((question, index) => (
                                                        <div key={index}>

                                                            <h4 class="fw-600 font-xss mt-4" >{`Q ${index + 1}. ${question.question}`} </h4>
                                                            <button type="button" id="" class="btn btn-default btn-add bg-current text-white font-xsss float-right"
                                                            onClick={() => selectQuestion(question)}>
                                            <i class="feather-plus"></i></button>
                                                            {
                                                                question.question_code ? (
                                                                    <pre className="text-wrap bg-grey p-2" >{question.question_code}</pre>
                                                                )
                                                                    :
                                                                    ""
                                                            }
                                                            <p className={`fw-500 font-xsss mt-3 ${question.answer === "option1" ? 'text-success' : ''}`}>A. {question.option1}</p>
                                                            <p className={`fw-500 font-xsss mt-3 ${question.answer === "option2" ? 'text-success' : ''}`}>B. {question.option2}</p>
                                                            <p className={`fw-500 font-xsss mt-3 ${question.answer === "option3" ? 'text-success' : ''}`}>C. {question.option3}</p>
                                                            <p className={`fw-500 font-xsss mt-3 ${question.answer === "option4" ? 'text-success' : ''}`}>D. {question.option4}</p>
                                                            <hr />
                                                        </div>
                                                    ))
                                                )
                                                    :
                                                    ""
                                            }


                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="card w-100 border-0 bg-white shadow-sm p-0 mb-4">
                                        <h2 className="fw-400 font-lg d-block ml-2">Selected <b> Questions</b> </h2>
                                        <div className="card-body p-lg-5 px-4 w-100 border-0 ">
                                        {
                                                selectedQuestions ? (
                                                    selectedQuestions && selectedQuestions.map((question, index) => (
                                                        <div key={index}>
                                                            <h4 class="fw-600 font-xss mt-4" >{`Q ${index + 1}. ${question.question}`} </h4>
                                                            <button type="button" id="" class="btn btn-default btn-add bg-current text-white font-xsss float-right"
                                                            onClick={() => deleteQuestion(question)}>
                                            <i class="feather-minus"></i></button>
                                                            {
                                                                question.question_code ? (
                                                                    <pre className="text-wrap bg-grey p-2" >{question.question_code}</pre>
                                                                )
                                                                    :
                                                                    ""
                                                            }
                                                            <p className={`fw-500 font-xsss mt-3 ${question.answer === "option1" ? 'text-success' : ''}`}>A. {question.option1}</p>
                                                            <p className={`fw-500 font-xsss mt-3 ${question.answer === "option2" ? 'text-success' : ''}`}>B. {question.option2}</p>
                                                            <p className={`fw-500 font-xsss mt-3 ${question.answer === "option3" ? 'text-success' : ''}`}>C. {question.option3}</p>
                                                            <p className={`fw-500 font-xsss mt-3 ${question.answer === "option4" ? 'text-success' : ''}`}>D. {question.option4}</p>
                                                            <hr />
                                                        </div>
                                                    ))
                                                )
                                                    :
                                                    ""
                                            }
                                                <button type="button" className="mt-1 btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0"
                                                onClick={addQuestionsToTest}>Submit</button>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
                <Appfooter />
            </div>
        </>
    )
}

export default AddQuestionsToTest
