import React, { useState, useEffect, useRef } from 'react';
import Appfooter from '../../components/Appfooter';
import Navheader from '../../components/Navheader';
import Appheader from '../../components/Appheader';
import Profile from '../../components/Profile';
import Myclass from '../../components/Myclass';
import Subscribe from '../../components/Subscribe';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserFromSessionStorage } from '../util/SessionStorage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TakeAssessments() {

    const baseUrl = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();

    const { video_id } = useParams();

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);

    const [selectedOption, setSelectedOption] = useState(null);

    const [formIsSubmitting, setFormIsSubmitting] = useState(false);

    const user = getUserFromSessionStorage();
    const user_id = user.user.id;

    const get_assesments = (e) => {
        fetch(baseUrl + "api/get_assesments_for_video/" + video_id, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
        }).then((res) => {
            return res.json();
        }).then((resp) => {
            // setAllSubjectData(resp);
            console.log(resp);
            setQuestions(resp);
            // setLoading(false);
            // console.log(questions[currentQuestionIndex]);

        });
    }
    useEffect(() => {
        get_assesments();
    }, [])
    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedQuestionIds((prevSelectedQuestionIds) => [
            ...prevSelectedQuestionIds,
            currentQuestion.id,
        ]);
        setActiveOption(null);
        if (selectedOption) {
            setSelectedAnswers((prevSelectedAnswers) => [...prevSelectedAnswers, selectedOption]);
        }
        setSelectedOption(null); // Reset selected option for the next question
        // console.log(selectedAnswers);

    };
    useEffect(() => {
        // console.log(selectedAnswers);
        // console.log(selectedQuestionIds);
        // console.log(video_id);
        // console.log(user_id);
        if (formIsSubmitting) {
            // Send selectedAnswers to the API
            const formData = new FormData();
            formData.append('selectedAnswers', selectedAnswers);
            formData.append('selectedQuestionIds', selectedQuestionIds);
            // formData.append('subject_id', questions[0].subject_id);
            // formData.append('chapter_id', questions[0].chapter_id);
            formData.append('video_id', video_id);
            formData.append('user_id', user_id);
            fetch(baseUrl + 'api/submit_assessment', {
                method: 'POST',
                body: formData,
            })
                .then((res) => res.json())
                .then((resp) => {
                    // Handle the API response
                    console.log(resp);
                    // toast.success(resp.msg);
                    navigate('/subject_stream/view_assessment_score/'+video_id);
                })
                .catch((err) => {
                    // Handle errors
                    console.error('Error submitting answers:', err);
                })
               
        }
    }, [formIsSubmitting, selectedAnswers, currentQuestionIndex, questions]);

    const hideStyle = {
        display: 'none'
    };


    const currentQuestion = questions[currentQuestionIndex];
    const [activeOption, setActiveOption] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedQuestionIds((prevSelectedQuestionIds) => [
            ...prevSelectedQuestionIds,
            currentQuestion.id,
        ]);
        setActiveOption(null);
        if (selectedOption) {
            setSelectedAnswers((prevSelectedAnswers) => [...prevSelectedAnswers, selectedOption]);
        }
        setSelectedOption(null);

        setFormIsSubmitting(true);

    };

    return (
        <>
            <div className="main-wrapper">

                <div className="main-content menu-active">
                    <Appheader />
                    <div className="middle-sidebar-bottom theme-dark-bg">
                        <div className="middle-sidebar-left">

                            <ToastContainer autoClose={3000} />

                            {
                                currentQuestion ? (
                                    <div className="d-flex flex-column question-div">
                                        <h4 className="font-xssss text-uppercase text-current fw-700 ls-3">{`Question ${currentQuestionIndex + 1}`}</h4>
                                        <h3 className="font-sm text-grey-800 fw-700 lh-32 mt-4 mb-4">{currentQuestion.question}</h3>

                                        {['option1', 'option2', 'option3', 'option4'].map((option, index) => (
                                            <React.Fragment key={index}>

                                                <input
                                                    type="radio"
                                                    id={`${option}_${index}`}
                                                    value={option}
                                                    style={hideStyle}
                                                    checked={selectedOption === option}
                                                    onChange={(e) => {
                                                        setSelectedOption(option);
                                                        setSelectedAnswers((prevSelectedAnswers) => [
                                                            ...prevSelectedAnswers,
                                                            e.target.value,
                                                        ]);
                                                    }}
                                                />
                                                <p
                                                    className={`bg-lightblue theme-dark-bg p-2 mt-3 question-ans style2 rounded-lg font-xssss fw-600 lh-28 text-grey-700 mb-0 p-2 ${selectedOption === option ? 'active' : ''
                                                        }`}
                                                    onClick={() => setSelectedOption(option)}
                                                >
                                                    <span className="pt-2 pb-2 pl-3 pr-3 mr-4 d-inline-block rounded-lg bg-current text-white font-xssss fw-600">
                                                        {String.fromCharCode(65 + index)}
                                                    </span>
                                                    {currentQuestion[option]}
                                                </p>
                                            </React.Fragment>
                                        ))}

                                        {currentQuestionIndex === questions.length - 1 ? (
                                            <button
                                                type="submit"
                                                onClick={handleSubmit}
                                                className="p-2 mt-3 d-inline-block text-white fw-700 lh-30 rounded-lg w200 text-center font-xsssss ls-3 bg-current border-0"
                                            >
                                                SUBMIT
                                            </button>
                                        ) : (
                                            <button
                                                type='button'
                                                onClick={handleNextQuestion}
                                                className="next-bttn p-2 mt-3 d-inline-block text-white fw-700 lh-30 rounded-lg w200 text-center font-xsssss ls-3 bg-current border-0"
                                            >
                                                NEXT
                                            </button>
                                        )}
                                    </div>
                                )
                                    :
                                    ""
                            }

                        </div>
                        <div className="middle-sidebar-right scroll-bar">
                            <div className="middle-sidebar-right-content">
                                <Profile />
                                <Myclass />
                                <Subscribe />
                            </div>
                        </div>
                    </div>
                </div>
                <Appfooter />
            </div>
        </>
    )
}

export default TakeAssessments
