import React, { useState } from 'react';
import AppFooter from '../../components/includes/AppFooter';
import AppHeader from '../../components/includes/AppHeader';
import StudentSidebar from '../../components/includes/StudentSidebar';
import BackButton from '../../components/navigation/BackButton';


import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchResults from '../../components/common/SearchResults';

import { Link } from 'react-router-dom';


function Forums() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [isSubmitting, setIsSubmitting] = useState(false);


    const userString = localStorage.getItem("rexkod_user");
    const user = JSON.parse(userString);
    const userId = user.user.id


    const [question, setQuestion] = useState("");

    const submitSchoolForum = (e) => {
        let inputobj = {
            "question": question,
            "userId": userId
        };

        e.preventDefault();
        setIsSubmitting(true);

        if (validate()) {
            fetch(baseUrl + "api/submitSchoolForum", {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(inputobj)
            }).then((res) => {
                return res.json();
            }).then((resp) => {
                setQuestion("");
                toast.success(resp.msg);

            }).catch((err) => {
                toast.error('Could not submit question :' + err.message);
            }).finally(() => {
                setIsSubmitting(false); // Re-enable the submit button
            });
        }
    }
    const validate = () => {
        let result = true;

        if (question === '' || question === null) {
            result = false;
            toast.warning('Please Enter Question');
        }

        return result;
    }

    const [allForums, setAllForums] = useState([]);
    function search(name) {
        setSearchValue(name);
        if (name.trim() === "") {
            // If the search input is empty or only contains spaces, clear the results
            setAllForums([]);
        } else {
            let result =   fetch(baseUrl + "api/school_search_forum_questions/" + name).then(function (result) {
                result.json().then(function (jsonbody) {
                    //console.warn(jsonbody);
                    setAllForums(jsonbody);
                })
            })
        }
    }

    const [searchValue, setSearchValue] = useState([]);
    const [forumId, setForumId] = useState([]);
    function handleResultClick(selectedValue, selectedId) {
        setSearchValue(selectedValue); // Set the input field value to the selected result
        setForumId(selectedId);
        setAllForums([]);
    }

    return (
        <>
           

                    <div className="middle-sidebar-bottom theme-dark-bg">
                        <div className="middle-sidebar-left">
                            <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                                <div>
                                    <h2 className="fw-400 font-lg d-block"> <b> Forums</b> </h2>
                                </div>
                                <div className="float-right">
                                    <BackButton />
                                </div>
                            </div>
                            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                <div className="row">
                                    <div className="col-lg-10 col-10">
                                        <div className="form-group icon-input mb-0 search-box">
                                            <i className="ti-search font-xs text-grey-400"></i>
                                            <input type="text"
                                                className="style1-input bg-transparent border-0 pl-5 font-xsss mb-0 text-grey-500 fw-500"
                                                placeholder="Search questions.."
                                                onChange={(e) => search(e.target.value)}
                                                value={searchValue}
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-2">
                                        <Link to={"/school_forums/view_forum/" + forumId} id="search-button"
                                            className="w-100 d-block btn bg-current text-white font-xssss fw-600 ls-3 style1-input p-3 border-0 text-uppercase ">Search</Link>
                                    </div>
                                </div>
                                <div>
                                {allForums && allForums.length > 0 && <SearchResults results={allForums} onResultClick={handleResultClick} />}
                                </div>
                                
                            </div>
                            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">

                                <div className="card-body p-4 w-100 border-0 d-flex rounded-lg">
                                    <h2 className="fw-300 font-400 d-block">Ask <b> Question</b> </h2>
                                </div>
                                <ToastContainer autoClose={3000} />
                                <div className="card-body px-5 w-100 border-0 ">
                                    <form onSubmit={submitSchoolForum}>
                                        <div className="row mb-6">
                                            <div className="col-lg-12">
                                                <label className="mont-font fw-600 font-xsss">Question</label><br />
                                                <textarea rows="4" cols="70" className="form-control" placeholder="Enter Question.."
                                                    required
                                                    value={question}
                                                    onChange={e => setQuestion(e.target.value)}
                                                ></textarea>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-lg-4 mt-4">
                                                <button type="submit" disabled={isSubmitting}  className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0">Submit</button>
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                        <StudentSidebar />
                    </div>
            
        </>
    );
}


export default Forums;
