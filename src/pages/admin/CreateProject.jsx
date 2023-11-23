import React, { useState, useEffect } from 'react';
import Appheader from '../../components/adminComponents/Appheader';
import Appfooter from '../../components/adminComponents/Appfooter';
import Dropdown from '../../components/inputs/Dropdown';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateProject() {

    const baseUrl = process.env.REACT_APP_BASE_URL;
    useEffect(() => {
        getClasses();
    }, [])

    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState([]);

    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");


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


    const createProject = (e) => {

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('subject', selectedSubject);
        formData.append('image', image);
        e.preventDefault();

        fetch(baseUrl + "api/create_project", {
            method: 'POST',
            body: formData
        }).then((res) => {
            return res.json();
        }).then((resp) => {
            setSelectedClass("");
            setSelectedSubject("");
            setImage("");
            setName("");
            setDescription("");
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
                                        <h2 className="fw-400 font-lg d-block">Create <b> Mini Project</b> </h2>
                                    </div>
                                    <ToastContainer autoClose={3000} />

                                    <div className="card-body p-lg-5 p-4 w-100 border-0 ">


                                        <form encType="multipart/form-data" onSubmit={createProject}>

                                            <div className="row mb-6">
                                                <div className="col-lg-6">
                                                    <div className="">
                                                        <label className="mont-font fw-600 font-xsss">Project Name</label><br />
                                                        <input type="text" className="form-control" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} required />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="">
                                                        <label className="mont-font fw-600 font-xsss">Project Image</label><br />
                                                        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="form-control" required />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="">
                                                        <label className="mont-font fw-600 font-xsss">Select Class</label><br />
                                                        <Dropdown
                                                            options={classes}
                                                            column_name='class'
                                                            value={selectedClass}
                                                            onChange={handleClassChange} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div
                                                        className="">
                                                        <label className="mont-font fw-600 font-xsss">Select
                                                            Subject</label><br />
                                                        <Dropdown
                                                            options={subjects}
                                                            column_name='subject_name'
                                                            value={selectedSubject}
                                                            onChange={handleSubjectChange} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="">
                                                        <label className="mont-font fw-600 font-xsss">Decription</label><br />
                                                        <textarea rows="4" cols="70" className="form-control" placeholder="Enter Description.." value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                                                    </div>
                                                </div>


                                            </div>
                                            <div className="row">
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

export default CreateProject
