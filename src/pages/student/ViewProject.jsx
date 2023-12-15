import React, { useState, useEffect } from "react";
import AppFooter from "../../components/includes/AppFooter";
import AppHeader from "../../components/includes/AppHeader";
import StudentSidebar from '../../components/includes/StudentSidebar';
import { useParams, useNavigate, Link } from "react-router-dom";
import { getUserFromLocalStorage } from "../util/SessionStorage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ViewProject() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const user = getUserFromLocalStorage();
    const user_id = user.user.id;
    const { project_id } = useParams();
    console.log("project+id",project_id)
    const navigate = useNavigate();

    const [projectTask, setProjectTask] = useState([]);
    const [projectTodo, setProjectTodo] = useState([]);

    const [projectName, setProjectName] = useState('');

    const getProjectName = () => {
        fetch(baseUrl + "api/get-mini-project/" + project_id)
            .then((res) => {
                return res.json();
            }).then(data => {
                setProjectName(data.project_name);
            })
            .catch(error => {
                console.error('Error fetching project name:', error);
            });
    }

    const get_project_tasks = (e) => {
        fetch(baseUrl + "api/get_project_tasks/" + project_id, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((resp) => {
                // setAllSubjectData(resp);
                setProjectTask(resp);
            });
    };
    useEffect(() => {
        get_project_tasks();
        getProjectName();
    }, []);
    const get_project_task_todo = (e) => {
        fetch(baseUrl + "api/get_project_task_todo/" + user_id + "/" + project_id, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((resp) => {
                // setAllSubjectData(resp);
                setProjectTodo(resp);
            });
    };
    useEffect(() => {
        get_project_task_todo();
    }, []);

    const start_project_task = (task_id, lab_code,project_id) => {
        fetch(baseUrl + "api/start_project_task/" + user_id + "/" + task_id, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((resp) => {
                console.log("inside project_id",project_id,task_id,lab_code);
                // window.location.reload();
                navigate("/editor/1/"+project_id+"/" + task_id + "/"+ lab_code);
            });
    };

    const complete_task = (task_id, lab_code) => {
        fetch(baseUrl + "api/complete-project-task/" + task_id, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((resp) => {
                console.log(resp);
                window.location.reload();
                // navigate("/subject_stream/start_project/" + project_id + "/" + task_id + "/" + lab_code);
            });
    };

    return (
        <>
            <div className="main-wrapper">
                <div className="main-content menu-active">
                    <AppHeader />

                    <div className="middle-sidebar-bottom theme-dark-bg">
                        <div className="middle-sidebar-left">
                            <div className="row">
                                <div className="col-lg-12 pt-0 mb-3 mt-4 d-flex justify-content-between">
                                    <h2 className="fw-400 font-lg d-block">
                                        <b>{projectName}</b>
                                    </h2>
                                </div>
                                <div className="col-lg-6 col-xl-4 col-md-6 mb-2 mt-2">
                                    <div className="card p-0 bg-white rounded-lg shadow-xs border-0">
                                        <div className="card-body p-3 border-top-lg border-size-lg border-primary p-0">
                                            <h4>
                                                <span className="font-xsss fw-700 text-grey-900 mt-2 d-inline-block">
                                                    To Do
                                                </span>
                                                <span className="float-right btn-round-sm bg-greylight">
                                                    <i className="feather-plus font-xss text-grey-900"></i>
                                                </span>
                                            </h4>
                                        </div>
                                        {projectTask
                                            ? projectTask.map((task, index) => (
                                                <div
                                                    className="card-body p-3 bg-lightblue m-3 rounded-lg"
                                                    key={index}
                                                >
                                                    <h4 className="font-xsss fw-700 text-grey-900 mb-2 mt-1 d-block">
                                                        {task.name}
                                                    </h4>
                                                    <p className="font-xssss lh-24 fw-500 text-grey-500 mt-3 d-block mb-3">
                                                        {task.description}
                                                    </p>
                                                    <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-info  me-2 d-inline-block text-info">
                                                        {task.duration}
                                                    </span>
                                                    <button type="button" onClick={() => start_project_task(project_id,task.id, task.lab_code)}>
                                                        <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-success d-inline-block text-success mr-1 border-0">Start</span>
                                                    </button>
                                                </div>
                                            ))
                                            : ""}
                                    </div>
                                </div>

                                <div className="col-lg-6 col-xl-4 col-md-6 mb-2 mt-2">
                                    <div className="card p-0 bg-white rounded-lg shadow-xs border-0">
                                        <div className="card-body p-3 border-top-lg border-size-lg border-warning p-0">
                                            <h4>
                                                <span className="font-xsss fw-700 text-grey-900 mt-2 d-inline-block">
                                                    In progress{" "}
                                                </span>
                                                <span className="float-right btn-round-sm bg-greylight">
                                                    <i className="feather-plus font-xss text-grey-900"></i>
                                                </span>
                                            </h4>
                                        </div>
                                        {projectTodo
                                            ? projectTodo
                                                .filter((task) => task.status === 1)
                                                .map((task, index) => (
                                                    <div
                                                        className="card-body p-3 bg-lightbrown m-3 rounded-lg"
                                                        key={index}
                                                    >
                                                        <h4 className="font-xsss fw-700 text-grey-900 mb-2 mt-1 d-block">
                                                            {task.name}
                                                        </h4>
                                                        <p className="font-xssss lh-24 fw-500 text-grey-500 mt-3 d-block mb-3">
                                                            {task.description}
                                                        </p>
                                                        <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 me-2 alert-info d-inline-block text-info">
                                                            {task.duration}
                                                        </span>
                                                        <Link
                                                            to={`/editor/1/${task.project_id}/${task.task_id}/${task.lab_code}`}
                                                        >
                                                            <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-success d-inline-block text-success mr-1">
                                                                Continue
                                                            </span>
                                                        </Link>
                                                        {/* <button type="button" onClick={() => complete_task(task.id, task.lab_code)}>
                                                            <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-success d-inline-block text-success mr-1 border-0">CONTINUE</span>
                                                        </button> */}
                                                    </div>
                                                ))
                                            : ""}
                                    </div>
                                </div>

                                <div className="col-lg-6 col-xl-4 col-md-6 mb-2 mt-2">
                                    <div className="card p-0 bg-white rounded-lg shadow-xs border-0">
                                        <div className="card-body p-3 border-top-lg border-size-lg border-success p-0">
                                            <h4>
                                                <span className="font-xsss fw-700 text-grey-900 mt-2 d-inline-block">
                                                    Done
                                                </span>
                                                <span className="float-right btn-round-sm bg-greylight">
                                                    <i className="feather-plus font-xss text-grey-900"></i>
                                                </span>
                                            </h4>
                                        </div>
                                        {projectTodo
                                            ? projectTodo
                                                .filter((task) => task.status === 2)
                                                .map((task, index) => (
                                                    <div
                                                        className="card-body p-3 bg-lightgreen m-3 rounded-lg"
                                                        key={index}
                                                    >
                                                        <h4 className="font-xsss fw-700 text-grey-900 mb-2 mt-1 d-block">
                                                            {task.name}
                                                        </h4>
                                                        <p className="font-xssss lh-24 fw-500 text-grey-500 mt-3 d-block mb-3">
                                                            {task.description}
                                                        </p>
                                                        <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2  me-2 alert-info d-inline-block text-info">
                                                            {task.duration}
                                                        </span>
                                                        <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-success d-inline-block text-success mr-1">
                                                            Completed
                                                        </span>
                                                    </div>
                                                ))
                                            : ""}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <StudentSidebar />
                    </div>
                </div>

                <AppFooter />
            </div>
        </>
    );
}

export default ViewProject;
