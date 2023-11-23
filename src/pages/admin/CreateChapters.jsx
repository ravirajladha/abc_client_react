import React, { useState, useEffect } from 'react';
import Appheader from '../../components/adminComponents/Appheader';
import Appfooter from '../../components/adminComponents/Appfooter';
import Dropdown from '../../components/inputs/Dropdown';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateChapters() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    useEffect(() => {
        getClasses();
    }, []);

    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState("");
    const [chapterNames, setChapterNames] = useState([""]); // Array to store chapter names

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
        console.log(selectedValue);
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

    const addChapterField = () => {
        setChapterNames([...chapterNames, ""]);
    };

    const deleteChapterField = (index) => {
        const updatedChapterNames = [...chapterNames];
        updatedChapterNames.splice(index, 1);
        setChapterNames(updatedChapterNames);
    };
    const createChapter = (e) => {

        const formData = new FormData();
        formData.append('class', selectedClass);
        formData.append('subject', selectedSubject);
        formData.append('chapterNames', JSON.stringify(chapterNames));
        e.preventDefault();

        fetch(baseUrl + "api/create_chapter", {
            method: 'POST',
            body: formData
        })
            .then((res) => res.json())
            .then((resp) => {
                setSelectedClass("");
                setSelectedSubject("");
                setChapterNames([""]); // Reset chapterNames to initial state
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
                                    <h2 className="fw-400 font-lg d-block ml-2">Create <b> Chapter</b> </h2>
                                    <div className="card-body p-lg-5 px-4 w-100 border-0 ">
                                        <form encType="multipart/form-data" onSubmit={createChapter}>
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
                                                    <label className="mont-font fw-600 font-xsss">Chapter Name</label><br />
                                                    {chapterNames.map((name, index) => (
                                                        <div key={index} className="d-flex mb-2">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Enter Name"
                                                                value={name}
                                                                onChange={(e) => {
                                                                    const updatedChapterNames = [...chapterNames];
                                                                    updatedChapterNames[index] = e.target.value;
                                                                    setChapterNames(updatedChapterNames);
                                                                }}
                                                                required
                                                            />
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger ml-2"
                                                                onClick={() => deleteChapterField(index)}
                                                            >
                                                                <i class="feather-minus"></i>
                                                            </button>
                                                        </div>
                                                    ))}
                                                    <button
                                                        type="button"
                                                        className="btn bg-current mt-2 text-white"
                                                        onClick={addChapterField}
                                                    >
                                                        Add Chapter
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

export default CreateChapters
