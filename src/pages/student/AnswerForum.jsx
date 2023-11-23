import React, { useState, useEffect } from 'react';
import Appfooter from '../../components/Appfooter';
import Navheader from '../../components/Navheader';
import Appheader from '../../components/Appheader';
import Profile from '../../components/Profile';
import Myclass from '../../components/Myclass';
import Subscribe from '../../components/Subscribe';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';


function AnswerForum() {

    const baseUrl = process.env.REACT_APP_BASE_URL;

    
    const userString = sessionStorage.getItem("rexkod_user");
    const user = JSON.parse(userString);
    const userId = user.user.id

    let { forumId } = useParams();
    const [answer, setAnswer] = useState("");

    const submitSchoolForum = (e) => {
        let inputobj = {
            "answer": answer,
            "userId": userId
        };

        e.preventDefault();

        if (validate()) {
            fetch(baseUrl + "api/submitSchoolForumAnswer/"+ forumId, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(inputobj)
            }).then((res) => {
                return res.json();
            }).then((resp) => {
                setAnswer("");
                toast.success(resp.msg);

            }).catch((err) => {
                toast.error('Could not submit answer :' + err.message);
            });
        }
    }
    const validate = () => {
        let result = true;

        if (answer === '' || answer === null) {
            result = false;
            toast.warning('Please Enter Answer');
        }

        return result;
    }

    useEffect(() => {
        getForum();
    }, [])

    const [forum, setForum] = useState([]);
    function getForum() {
        let result = fetch(baseUrl + 'api/get_school_forum_single/' + forumId).then(function (result) {
            result.json().then(function (jsonbody) {
                console.warn(jsonbody);
                setForum(jsonbody);
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
                            <h2 className="fw-400 font-lg d-block">ABC <b> Forums</b> </h2>
                            
                            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">

                                <ToastContainer autoClose={3000} />
                                <div className="card-body px-5 w-100 border-0 ">
                                    <form onSubmit={submitSchoolForum}>
                                        <div className="row mb-6">
                                            <div className="col-lg-12">
                                                <label className="mont-font fw-600 font-xsss">{forum && forum.forum_question ? (
                                                        forum.forum_question.question
                                                    ) : (
                                                        ''
                                                    )}</label><br />
                                                <textarea rows="4" cols="70" className="form-control" placeholder="Enter Answer.."
                                                    required
                                                    value={answer ? answer : ""}
                                                    onChange={e => setAnswer(e.target.value)}
                                                ></textarea>
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

export default AnswerForum
