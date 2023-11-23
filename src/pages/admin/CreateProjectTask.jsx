import React, { useState, useEffect } from 'react'
import Appheader from '../../components/adminComponents/Appheader';
import Appfooter from '../../components/adminComponents/Appfooter';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dropdown from '../../components/inputs/Dropdown';


function CreateProjectTask() {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState([]);

    const [labCode, setLabCode] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");

    useEffect(() => {
        getProjects();
    }, [])
    function getProjects() {
        let result = fetch(baseUrl + 'api/get_mini_projects').then(function (result) {
            result.json().then(function (jsonbody) {
                console.warn(jsonbody);
                setProjects(jsonbody);
            })
        });
    }
    const handleProjectChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedProject(selectedValue);
    };
    const createProjectTask = (e) => {

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('project', selectedProject);
        formData.append('labCode', labCode);
        formData.append('duration', duration);
        e.preventDefault();

        console.log(formData);
        fetch(baseUrl + "api/create_project_task", {
            method: 'POST',
            body: formData
        }).then((res) => {
            return res.json();
        }).then((resp) => {
            setSelectedProject("");
            setLabCode("");
            setDuration("");
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
                                        <h2 className="fw-400 font-lg d-block">Create <b> Mini Project Task</b> </h2>

                                    </div>
                                    <ToastContainer autoClose={3000} />

                                    <div className="card-body p-lg-5 p-4 w-100 border-0 ">


                                        <form encType="multipart/form-data" onSubmit={createProjectTask}>

                                            <div className="row mb-6">
                                                <div className="col-lg-6">
                                                    <div
                                                        className="">
                                                        <label className="mont-font fw-600 font-xsss">Select
                                                            Project</label><br />
                                                        <Dropdown
                                                            options={projects}
                                                            column_name='project_name'
                                                            value={selectedProject}
                                                            onChange={handleProjectChange} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="">
                                                        <label className="mont-font fw-600 font-xsss">Task Name</label><br />
                                                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Enter task name" required />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 mt-3"  >
                                                    <iframe
                                                        frameBorder="0"
                                                        height="450px"
                                                        src="https://onecompiler.com/embed/java"
                                                        width="100%"
                                                    ></iframe>
                                                </div>


                                                <div className="col-lg-6">
                                                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width">
                                                        <label className="mont-font fw-600 font-xsss">Lab code</label><br />
                                                        <input type="text" placeholder="Enter lab code" value={labCode} onChange={(e) => setLabCode(e.target.value)} className="form-control" required />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width">
                                                        <label className="mont-font fw-600 font-xsss">Duration</label><br />
                                                        <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} className="form-control" placeholder="Enter Duration" required />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">

                                                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width">
                                                        <label className="mont-font fw-600 font-xsss">Decription</label><br />
                                                        <textarea rows="4" cols="70" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Description.." required></textarea>
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

export default CreateProjectTask
