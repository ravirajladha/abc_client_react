import React, { useState, useEffect } from 'react';
import Appheader from '../../components/adminComponents/Appheader';
import Appfooter from '../../components/adminComponents/Appfooter';
import Dropdown from '../../components/inputs/Dropdown';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateVideos() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    useEffect(() => {
        getClasses();
    }, []);

    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState("");
    const [chapters, setChapters] = useState([]);
    const [selectedChapter, setSelectedChapter] = useState("");

    const [videoNames, setVideoNames] = useState([""]); // Array to store video names
    const [videoFiles, setVideoFiles] = useState([""]); // Array to store video files


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
    const handleClassChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedClass(selectedValue);
    };
    const handleSubjectChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedSubject(selectedValue);
    };
    const handleChapterChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedChapter(selectedValue);
    };

    useEffect(() => {
        getSubjects();
    }, [selectedClass]);
    useEffect(() => {
        getChapters();
    }, [selectedSubject]);

    const addVideoField = () => {
        setVideoNames([...videoNames, ""]);
        setVideoFiles([...videoFiles, ""]);
    };

    const deleteVideoField = (index) => {
        const updatedVideoNames = [...videoNames];
        const updatedVideoFiles = [...videoFiles];
        updatedVideoNames.splice(index, 1);
        setVideoNames(updatedVideoNames);
        updatedVideoFiles.splice(index, 1);
        setVideoFiles(updatedVideoFiles);
    };
    const createVideo = (e) => {
        const formData = new FormData();
        formData.append('class', selectedClass);
        formData.append('subject', selectedSubject);
        formData.append('chapter', selectedChapter);
        formData.append('videoNames', JSON.stringify(videoNames));
        // formData.append('videoFiles', videoFiles);
        videoFiles.forEach((file) => formData.append('videoFiles[]', file));
        e.preventDefault();

        console.log(videoFiles);
        fetch(baseUrl + "api/create_video", {
            method: 'POST',
            body: formData
        })
            .then((res) => res.json())
            .then((resp) => {
                setSelectedClass("");
                setSelectedSubject("");
                setSelectedChapter("");
                setVideoNames([""]);
                setVideoFiles([""]);
                toast.success(resp.msg);
            })
            .catch((err) => {
                toast.error('Could not submit chapter names: ' + err.message);
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
                                <ToastContainer autoClose={3000} />

                                <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                    <h2 className="fw-400 font-lg d-block ml-2">Create <b> Video</b> </h2>
                                    <div className="card-body p-lg-5 px-4 w-100 border-0 ">
                                        <form encType="multipart/form-data" onSubmit={createVideo}>
                                            <div className="row mb-6">
                                                <div className="col-lg-4">
                                                    <label className="mont-font fw-600 font-xsss">Select Class</label><br />
                                                    <Dropdown
                                                        options={classes}
                                                        column_name='class'
                                                        value={selectedClass}
                                                        onChange={handleClassChange} />
                                                </div>
                                                <div className="col-lg-4">

                                                    <label className="mont-font fw-600 font-xsss">Select
                                                        Subject</label><br />
                                                    <Dropdown
                                                        options={subjects}
                                                        column_name='subject_name'
                                                        value={selectedSubject}
                                                        onChange={handleSubjectChange} />
                                                </div>
                                                <div className="col-lg-4">
                                                    <label className="mont-font fw-600 font-xsss">Select
                                                        Chapter</label><br />
                                                    <Dropdown
                                                        options={chapters}
                                                        column_name='chapter_name'
                                                        value={selectedChapter}
                                                        onChange={handleChapterChange} />
                                                </div>
                                                <div className="col-lg-12">
                                                    {videoNames.map((name, index) => (
                                                        <div className="row" key={index}>
                                                            <div className="col-lg-4">
                                                                <label className="mont-font fw-600 font-xsss">Video Name</label><br />

                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter Name"
                                                                    value={name}
                                                                    onChange={(e) => {
                                                                        const updatedVideoNames = [...videoNames];
                                                                        updatedVideoNames[index] = e.target.value;
                                                                        setVideoNames(updatedVideoNames);
                                                                    }}
                                                                    required
                                                                />

                                                            </div>
                                                            <div className="col-lg-4">
                                                                <label className="mont-font fw-600 font-xsss">Video File</label><br />
                                                                <input type="file" className="form-control"
                                                                onChange={(e) => {
                                                                    const updatedVideoFiles = [...videoFiles];
                                                                    updatedVideoFiles[index] = e.target.files[0];
                                                                    setVideoFiles(updatedVideoFiles);
                                                                }} 
                                                                required />
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-danger ml-2 mt-5"
                                                                    onClick={() => deleteVideoField(index)}
                                                                >
                                                                    <i class="feather-minus"></i>
                                                                </button>
                                                            </div>
                                                        </div>

                                                    ))}
                                                    <button
                                                        type="button"
                                                        className="btn bg-current mt-2 text-white"
                                                        onClick={addVideoField}
                                                    >
                                                        Add Video
                                                    </button>
                                                </div>

                                                <div className="col-lg-12">
                                                    <button type="submit" className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0 float-right mt-2">Submit</button>
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

export default CreateVideos
