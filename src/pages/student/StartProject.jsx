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

function StartProject() {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const { project_id, task_id } = useParams();
    const navigate = useNavigate();
    const update_project_status = (e) => {
        fetch(baseUrl + "api/update_project_task_status/" + task_id, {
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
            navigate("/subject_stream/view_project/"+project_id);


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
                                    <div class="float-right">
                                        <button type='button' onClick={update_project_status} class="p-2  d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current border-0">COMPLETED</button>
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

export default StartProject
