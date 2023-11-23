import React, { useState, useEffect } from 'react';
import Appheader from '../../components/teacherComponents/Appheader';
import Appfooter from '../../components/teacherComponents/Appfooter';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {getUserFromSessionStorage} from '../util/SessionStorage';
import { Link, useParams } from 'react-router-dom';

function Qnas() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [qnas, setQnas] = useState([]);
    const user = getUserFromSessionStorage();
    const auth_id = user.user.id;
    const getQnas = (e) => {
        let result = fetch(baseUrl + 'api/get_qnas/' + auth_id).then(function (result) {
            result.json().then(function (jsonbody) {
                console.warn(jsonbody);
                setQnas(jsonbody);
            })
        });
    }
    useEffect(() => {
        getQnas();
    }, [])
    return (
        <>
            <div className="main-wrapper">

                <div className="main-content menu-active">
                    <Appheader />

                    <div className="middle-sidebar-bottom theme-dark-bg">
                        <div className="middle-sidebar-left">

                            <div className="row">
                            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                    <h2 className="fw-400 font-lg d-block ml-2">All <b> Qnas</b> </h2>
                                    <div className="card-body p-lg-5 px-4 w-100 border-0 ">
                                        <div className="table-responsive">
                                            <table className="table table-admin mb-0">
                                                <thead className="bg-greylight rounded-10 ovh">
                                                    <tr>
                                                        <th className="border-0">Sl no.</th>
                                                        <th className="border-0" scope="col">
                                                        Subject Name
                                                        </th>
                                                        <th className="border-0" scope="col">
                                                        Questions
                                                        </th>
                                                        <th className="border-0" scope="col">
                                                        Reply
                                                        </th>
                                                        
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        qnas ? (
                                                            qnas.map((qna, index) => (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>
                                                                        <b>{qna.subject.subject_name}</b>
                                                                    </td>
                                                                    <td>{qna.question}</td>
                                                                    <td><Link to={"/qnas/answer_qna/"+qna.id} class="btn bg-current text-center text-white font-xsss fw-600 p-1  rounded-lg d-inline-block border-0">Reply</Link></td>
        
                                                                </tr>
                                                            ))
                                                        )
                                                        :
                                                        <h1>No data found</h1>
                                                    }
                                                    
                                                </tbody>
                                            </table>
                                        </div>
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

export default Qnas
