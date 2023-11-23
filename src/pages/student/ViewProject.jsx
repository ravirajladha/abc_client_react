import React, { useState, useEffect, useRef } from 'react';
import Appfooter from '../../components/Appfooter';
import Navheader from '../../components/Navheader';
import Appheader from '../../components/Appheader';
import Profile from '../../components/Profile';
import Myclass from '../../components/Myclass';
import Subscribe from '../../components/Subscribe';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getUserFromSessionStorage } from '../util/SessionStorage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ViewProject() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const user = getUserFromSessionStorage();
    const user_id = user.user.id;
    const { project_id } = useParams();
    const navigate = useNavigate();

    const [projectTask, setProjectTask] = useState([]);
    const [projectTodo, setProjectTodo] = useState([]);

    const get_project_tasks = (e) => {
        fetch(baseUrl + "api/get_project_tasks/" + project_id, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
        }).then((res) => {
            return res.json();
        }).then((resp) => {
            // setAllSubjectData(resp);
            console.warn(resp);
            setProjectTask(resp);
        });
    }
    useEffect(() => {
        get_project_tasks();
    }, [])
    const get_project_task_todo = (e) => {
        fetch(baseUrl + "api/get_project_task_todo/" + user_id + "/" + project_id, {
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
            setProjectTodo(resp);

        });
    }
    useEffect(() => {
        get_project_task_todo();
    }, [])
    const start_project_task = (task_id, lab_code) => {
        fetch(baseUrl + "api/start_project_task/"+ user_id + "/" + task_id, {
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
            // setProjectTask(resp);
            navigate("/subject_stream/start_project/"+project_id+"/"+task_id+"/"+lab_code);


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
                                <div className="col-lg-12 pt-0 mb-3 mt-4 d-flex justify-content-between">
                                    <h2 className="fw-400 font-lg d-block"><b>project_name</b></h2>
                                    
                                </div>
                                <div className="col-lg-6 col-xl-4 col-md-6 mb-2 mt-2">
                                    <div className="card p-0 bg-white rounded-lg shadow-xs border-0">
                                        <div className="card-body p-3 border-top-lg border-size-lg border-primary p-0">
                                            <h4><span className="font-xsss fw-700 text-grey-900 mt-2 d-inline-block">To Do </span><a href="#" className="float-right btn-round-sm bg-greylight" data-toggle="modal" data-target="#Modaltodo"><i className="feather-plus font-xss text-grey-900"></i></a></h4>
                                        </div>
                                        {
                                            projectTask ? (
                                                projectTask
                                                    .filter((task) => !projectTodo.some((todo) => todo.task_id === task.id))
                                                    .map((task, index) => (
                                                        <div className="card-body p-3 bg-lightblue mt-0 mb-3 ml-3 mr-3 rounded-lg" key={index}>
                                                            <h4 className="font-xsss fw-700 text-grey-900 mb-2 mt-1 d-block">{task.name}</h4>
                                                            <p className="font-xssss lh-24 fw-500 text-grey-500 mt-3 d-block mb-3">{task.description}</p>
                                                            <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-info d-inline-block text-info">{task.duration}</span>
                                                            {/* <Link to={`/subject_stream/start_school_project/${project_id}/${task.id}/${task.lab_code}`}>
                                                                <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-success d-inline-block text-success mr-1">Start</span>
                                                            </Link> */}
                                                            <a type='button' onClick={() => start_project_task(task.id, task.lab_code)} >
                                                                <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-success d-inline-block text-success mr-1 border-0">Start</span>
                                                            </a>
                                                        </div>
                                                    ))
                                            )
                                                :
                                                ""
                                        }
                                    </div>
                                </div>
                                <div className="col-lg-6 col-xl-4 col-md-6 mb-2 mt-2">
                                    <div className="card p-0 bg-white rounded-lg shadow-xs border-0">
                                        <div className="card-body p-3 border-top-lg border-size-lg border-warning p-0">
                                            <h4><span className="font-xsss fw-700 text-grey-900 mt-2 d-inline-block">In progress </span><a href="#" className="float-right btn-round-sm bg-greylight" data-toggle="modal" data-target="#Modaltodo"><i className="feather-plus font-xss text-grey-900"></i></a></h4>
                                        </div>
                                        {
                                            projectTask ? (
                                                projectTask
                                                    .filter((task) => projectTodo.some((todo) => todo.id === task.id && todo.status === 1))
                                                    .map((task, index) => (
                                                        <div className="card-body p-3 bg-lightbrown mt-0 mb-3 ml-3 mr-3 rounded-lg" key={index}>
                                                            <h4 className="font-xsss fw-700 text-grey-900 mb-2 mt-1 d-block">{task.name}</h4>
                                                            <p className="font-xssss lh-24 fw-500 text-grey-500 mt-3 d-block mb-3">{task.description}</p>
                                                            <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-info d-inline-block text-info">{task.duration}</span>
                                                            <Link to={`/subject_stream/start_project/${project_id}/${task.id}/${task.lab_code}`}>
                                                                <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-success d-inline-block text-success mr-1">Continue</span></Link>
                                                        </div>
                                                    ))
                                            )
                                                :
                                                ""
                                        }

                                    </div>
                                </div>

                                <div className="col-lg-6 col-xl-4 col-md-6 mb-2 mt-2">
                                    <div className="card p-0 bg-white rounded-lg shadow-xs border-0">
                                        <div className="card-body p-3 border-top-lg border-size-lg border-success p-0">
                                            <h4><span className="font-xsss fw-700 text-grey-900 mt-2 d-inline-block">Done </span><a href="#" className="float-right btn-round-sm bg-greylight" data-toggle="modal" data-target="#Modaltodo"><i className="feather-plus font-xss text-grey-900"></i></a></h4>
                                        </div>
                                        {
                                            projectTask ? (
                                                projectTask
                                                    .filter((task) => projectTodo.some((todo) => todo.id === task.id &&  todo.status === 2))
                                                    .map((task, index) => (
                                                        <div className="card-body p-3 bg-lightgreen m-3 rounded-lg" key={index}>
                                                            <h4 className="font-xsss fw-700 text-grey-900 mb-2 mt-1 d-block">{task.name}</h4>
                                                            <p className="font-xssss lh-24 fw-500 text-grey-500 mt-3 d-block mb-3">{task.description}</p>
                                                            <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-info d-inline-block text-info">{task.duration}</span>
                                                            <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-success d-inline-block text-success mr-1">Completed</span>
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

export default ViewProject
