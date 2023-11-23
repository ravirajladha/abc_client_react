import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

import Appheader from '../../components/adminComponents/Appheader';
import Appfooter from '../../components/adminComponents/Appfooter';
import { Link } from 'react-router-dom';


function MiniProjects() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    useEffect(() => {
        getMiniProjects();
    }, [])

    const [miniProjects, setMiniProjects] = useState([]);
    function getMiniProjects() {
        let result = fetch(baseUrl + 'api/get_mini_projects').then(function (result) {
            result.json().then(function (jsonbody) {
                console.warn(jsonbody);
                setMiniProjects(jsonbody);
            })
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
                                <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                                    <div>
                                        <h2 className="fw-400 font-lg d-block">All <b> Mini Projects</b> </h2>
                                    </div>
                                    <div className="float-right">
                                        <Link to={"/mini_projects/create_project"} className="p-2  d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current mx-1">CREATE PROJECT</Link>
                                        <Link to={"/mini_projects/create_project_task"} className="p-2  d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current mx-1">CREATE TASK</Link>

                                    </div>
                                </div>
                                {
                                    miniProjects ? (
                                        miniProjects && miniProjects.map((miniProject, index) => (
                                            <div className="col-lg-2 col-md-6 col-12 col-sm-6 " key={index}>
                                                <div className="item">
                                                    <div className="card w200 d-block border-0 shadow-xss rounded-lg overflow-hidden mb-4">
                                                        <div className="card-image w-100">
                                                            <img src={baseUrl + miniProject.project_image} alt="image" className="w-100" style={{height: 100}} />
                                                        </div>
                                                        <div className="card-body d-block w-100 pl-4 pr-4 pb-4 text-center">

                                                            <div className="clearfix"></div>
                                                            <h4 className="fw-700 font-xsss mt-3 mb-1"><a href="#" className="text-dark text-grey-900"> </a>{miniProject.project_name}</h4>
                                                            <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-2">{miniProject.description}</p>

                                                        </div>
                                                    </div>
                                                </div>

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
                <Appfooter />
            </div>
        </>
    );
}


export default MiniProjects;



