import React, { useState, useEffect } from 'react';
import AppHeader from '../../components/includes/AppHeader';
import AppFooter from '../../components/includes/AppFooter';
import StudentSidebar from '../../components/includes/StudentSidebar';
import BackButton from '../../components/navigation/BackButton';
import { useNavigate } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from "../../lib/AuthContext.js"

function AnswerForum() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    let { forumId } = useParams();
    const [answer, setAnswer] = useState("");
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [forum, setForum] = useState([]);

    const user = useContext(AuthContext).user;

    const submitSchoolForum = (e) => {
        let inputobj = {
            "answer": answer,
            "userId": userId
        };

        e.preventDefault();
        setIsSubmitting(true);

        if (validate()) {
            fetch(baseUrl + "api/submitSchoolForumAnswer/" + forumId, {
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
                navigate(-1); 

            }).catch((err) => {
                toast.error('Could not submit answer :' + err.message);
            }).finally(() => {
                setIsSubmitting(false); // Re-enable the submit button
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
        if (!user) {
            console.log("No user found. User might be logged out.");
            // Optionally redirect to login page here
        } else {
            getForum(); // Call the function only if there is a user
        }
    }, [user, forumId]);
    if (!user) {
        // Handle the case when there is no user. You might want to redirect
        // to a login page or return null or some placeholder content.
        console.log("No user found. User might be logged out.");
        return <div>User is not logged in</div>;
    }
    const userId = user.user.id

    function getForum() {
        let result = fetch(baseUrl + 'api/get_school_forum_single/' + forumId).then(function (result) {
            result.json().then(function (jsonbody) {
                //console.warn(jsonbody);
                setForum(jsonbody);
            })
        });
    }

    return (
        <>
            <div className="main-wrapper">

                <div className="main-content menu-active">
                    <AppHeader />

                    <div className="middle-sidebar-bottom theme-dark-bg">
                        <div className="middle-sidebar-left">
                            <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                                <div>
                                    <h2 className="fw-400 font-lg d-block">
                                        <b> Forums</b>
                                    </h2>
                                </div>
                                <div className="float-right">
                                  <BackButton />
                                </div>
                            </div>
                            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">

                                <ToastContainer autoClose={3000} />
                                <div className="card-body px-5 w-100 border-0 ">
                                    <form onSubmit={submitSchoolForum}>
                                        <div className="row mb-6">
                                            <div className="col-lg-12">
                                                <label className="mont-font fw-600 font-xsss">Question: {forum && forum.forum_question ? (
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
                                                <button type="submit" disabled={isSubmitting}  className="btn bg-current text-center text-white font-xsss fw-600 p-3 mt-4 w175 rounded-lg d-inline-block border-0">Submit</button>
                                            </div>
                                        </div>
                                    </form>

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

export default AnswerForum
