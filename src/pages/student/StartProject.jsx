import React, { useState, useEffect } from 'react';
import AppFooter from '../../components/includes/AppFooter';
import AppHeader from '../../components/includes/AppHeader';
import StudentSidebar from '../../components/includes/StudentSidebar';
import BackButton from '../../components/navigation/BackButton';

import { useParams, useNavigate, Link } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';

function StartProject() {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const [projectName, setProjectName] = useState('');
    const { project_id, task_id } = useParams();

    const navigate = useNavigate();

    const update_project_status = (e) => {
        fetch(baseUrl + "api/update_project_task_status/" + task_id, {
            method: 'PUT',
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
            navigate("/subject_stream/view_project/" + project_id);


        });
    }

    useEffect(() => {
        fetch(baseUrl + "api/get-mini-project/" + project_id)
            .then((res) => {
                return res.json();
            }).then(data => {
                setProjectName(data.project_name);
            })
            .catch(error => {
                console.error('Error fetching project name:', error);
            });
    }, []);

    return (
        <>
            <div className="main-wrapper">

                <div className="main-content menu-active">
                    <AppHeader />

                    <div className="middle-sidebar-bottom theme-dark-bg">
                        <div className="middle-sidebar-left">
                            <div className="row">
                                <div className="col-lg-12 pt-0 mb-3 mt-4 d-flex justify-content-between">
                                    <h2 className="fw-400 font-lg d-block"><b>{projectName}</b></h2>
                                    <div class="float-right">
                                        <button type='button' onClick={update_project_status} class="p-2  d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current border-0">COMPLETED</button>
                                        <BackButton />
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
    )
}

export default StartProject
