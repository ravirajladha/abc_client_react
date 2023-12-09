import React, { useState, useEffect } from 'react';
import AppHeader from '../../components/includes/AppHeader';
import AppFooter from '../../components/includes/AppFooter';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getUserFromLocalStorage } from '../util/SessionStorage';
import { Link, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from "../../lib/AuthContext.js"
import BackButton from '../../components/navigation/BackButton.jsx';
function Qnas() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [qnas, setQnas] = useState([]);
    const user = useContext(AuthContext).user;

    useEffect(() => {
        if (user) { // Check if user is defined
            const getQnas = () => {
                fetch(`${baseUrl}api/get_qnas/${user.user.id}`) // Use template literals for cleaner code
                    .then((result) => result.json())
                    .then((jsonbody) => {
                        //console.warn(jsonbody);
                        setQnas(jsonbody);
                    })
                    .catch((error) => {
                        console.error('Error fetching QnAs:', error);
                    });
            };

            getQnas(); // Call the function to fetch data
        }
    }, [user, baseUrl]);
    if (!user) {
        // Handle the case when there is no user. You might want to redirect
        // to a login page or return null or some placeholder content.
        console.log("No user found. User might be logged out.");
        return <div>User is not logged in</div>;
    }
    return (
        <>
            <div className="main-wrapper">

                <div className="main-content menu-active">
                    <AppHeader />

                    <div className="middle-sidebar-bottom theme-dark-bg">
                        <div className="middle-sidebar-left">

                            <div className="row">
                                <div className="w-100 border-0 p-0 mb-4">
                                    <div className="p-lg-5 px-4 w-100 border-0 d-flex rounded-lg justify-content-between">
                                        <div className="">
                                            <h2 className="fw-400 font-lg d-block ml-2">All <b> Qnas</b> </h2>
                                        </div>
                                        <div className="float-right">
                                            <BackButton />
                                        </div>
                                    </div>
                                    <div className="p-lg-5 px-4 w-100 border-0 ">
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
                                                                    <td><Link to={"/qnas/answer_qna/" + qna.id} class="btn bg-current text-center text-white font-xsss fw-600 p-1  rounded-lg d-inline-block border-0">Reply</Link></td>

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
                <AppFooter />
            </div>
        </>
    )
}

export default Qnas
