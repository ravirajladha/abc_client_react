import React, { useState, useEffect } from 'react'
import Appheader from '../../components/adminComponents/Appheader';
import Appfooter from '../../components/adminComponents/Appfooter';
import Dropdown from '../../components/inputs/Dropdown';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function CreateAssessments() {

    const baseUrl = process.env.REACT_APP_BASE_URL;
    useEffect(() => {
        getClasses();
    }, [])

    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [selectedChapter, setSelectedChapter] = useState([]);
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideos] = useState([]);

    const [question, setQuestion] = useState("");
    const [code, setCode] = useState("");
    const [showCode, setShowCode] = useState(false);

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
    function getChapters() {
        let result = fetch(baseUrl + 'api/get_chapters_by_subject/' + selectedSubject).then(function (result) {
            result.json().then(function (jsonbody) {
                console.warn(jsonbody);
                setChapters(jsonbody);
            })
        });
    }
    function getVideos() {
        let result = fetch(baseUrl + 'api/get_video_by_chapter/' + selectedChapter).then(function (result) {
            result.json().then(function (jsonbody) {
                console.warn(jsonbody);
                setVideos(jsonbody);
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
    const handleChapterChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedChapter(selectedValue);
    };
    const handleVideoChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedVideos(selectedValue);
    };

    useEffect(() => {
        getSubjects();
    }, [selectedClass]);
    useEffect(() => {
        getChapters();
    }, [selectedSubject]);
    useEffect(() => {
        getVideos();
    }, [selectedChapter]);

    const [selectedOption, setSelectedOption] = useState('');

    const [inputs, setInputs] = useState({
        option1: '',
        option2: '',
        option3: '',
        option4: ''
    });

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleInputChange = (event) => {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        });
    };
    const createAssessment = (e) => {

        const formData = new FormData();
        formData.append('class', selectedClass);
        formData.append('subject', selectedSubject);
        formData.append('chapter', selectedChapter);
        formData.append('video', selectedVideo);
        formData.append('question', question);
        formData.append('code', code);
        formData.append('selectedOption', selectedOption);
        formData.append('option1', inputs.option1);
        formData.append('option2', inputs.option2);
        formData.append('option3', inputs.option3);
        formData.append('option4', inputs.option4);

        e.preventDefault();

        console.log(selectedOption);
        fetch(baseUrl + "api/create_assessment", {
            method: 'POST',
            body: formData
        }).then((res) => {
            return res.json();
        }).then((resp) => {
            setSelectedClass("");
            setSelectedSubject("");
            setSelectedChapter("");
            setSelectedVideos("");
            setSelectedOption("");
            setQuestion("");
            setCode("");
            setShowCode(false);
            setInputs({
                option1: '',
                option2: '',
                option3: '',
                option4: ''
            });
            setSubjects([]);
            setChapters([]);
            setVideos([]);
            toast.success(resp.msg);

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
                                <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                    <div className="card-body p-4 w-100 border-0 d-flex rounded-lg justify-content-between">
                                        <h2 className="fw-400 font-lg d-block">Create <b> Assessments</b> </h2>
                                    </div>
                                    <ToastContainer autoClose={3000} />

                                    <div className="card-body p-lg-5 px-4 w-100 border-0 ">


                                        <form encType="multipart/form-data" onSubmit={createAssessment}>

                                            <div className="row mb-6">

                                                <div className="col-lg-6">
                                                    <label className="mont-font fw-600 font-xsss">Select Class</label><br />
                                                    <Dropdown
                                                        options={classes}
                                                        column_name='class'
                                                        value={selectedClass}
                                                        onChange={handleClassChange} />
                                                </div>
                                                <div className="col-lg-6">
                                                    <label className="mont-font fw-600 font-xsss">Select
                                                        Subject</label><br />
                                                    <Dropdown
                                                        options={subjects}
                                                        column_name='subject_name'
                                                        value={selectedSubject}
                                                        onChange={handleSubjectChange} />
                                                </div>
                                                <div className="col-lg-6">
                                                    <label className="mont-font fw-600 font-xsss">Select
                                                        Chapter</label><br />
                                                    <Dropdown
                                                        options={chapters}
                                                        column_name='chapter_name'
                                                        value={selectedChapter}
                                                        onChange={handleChapterChange} />
                                                </div>
                                                <div className="col-lg-6">
                                                    <label className="mont-font fw-600 font-xsss">Select
                                                        Video</label><br />
                                                    <Dropdown
                                                        options={videos}
                                                        column_name='video_name'
                                                        value={selectedVideo}
                                                        onChange={handleVideoChange} />
                                                </div>

                                                <div className="col-md-12 col-sm-12 mt-2">
                                                    <div className="d-flex justify-content-start align-items-center">
                                                        <label className="mont-font fw-600 font-xsss">Question</label>
                                                        <p
                                                            className="btn bg-current text-white ml-2"
                                                            onClick={() => setShowCode(!showCode)}
                                                        >
                                                            {showCode ? 'Hide' : 'Add'} Code
                                                        </p>
                                                    </div>
                                                    <textarea
                                                        rows="4"
                                                        cols="70"
                                                        className="form-control"
                                                        placeholder="Enter Question.."
                                                        value={question}
                                                        onChange={(e) => setQuestion(e.target.value)}
                                                        required
                                                    ></textarea>

                                                    {showCode && (
                                                        <textarea
                                                            rows="4"
                                                            cols="70"
                                                            className="form-control"
                                                            placeholder="Enter Code.."
                                                            value={code}
                                                            onChange={(e) => setCode(e.target.value)}
                                                        // You can manage a separate state for the second textarea's value if needed
                                                        ></textarea>
                                                    )}
                                                </div>
                                                {[...Array(4)].map((_, index) => {
                                                    const number = index + 1;
                                                    const optionName = `option${number}`;
                                                    return (
                                                        <div className="col-lg-6" key={optionName}>
                                                            <input
                                                                type="radio"
                                                                id={optionName}
                                                                name="option"
                                                                value={optionName}
                                                                checked={selectedOption === optionName}
                                                                onChange={handleOptionChange}
                                                            />
                                                            <label className="mont-font fw-600 font-xsss ml-2" htmlFor={optionName}>{`Option ${number}*`}</label>
                                                            <textarea
                                                                className="form-control"
                                                                name={optionName}
                                                                placeholder={`Enter ${number}th Option`}
                                                                value={inputs[optionName]}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            <div className="row mt-2">
                                                <div className="col-lg-4">
                                                    <button type="submit" className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0">Submit</button>
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
    )
}

export default CreateAssessments
