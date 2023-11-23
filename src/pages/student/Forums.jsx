import React, { useState, useEffect } from 'react';
import Appfooter from '../../components/Appfooter';
import Navheader from '../../components/Navheader';
import Appheader from '../../components/Appheader';
import Profile from '../../components/Profile';
import Myclass from '../../components/Myclass';
import Subscribe from '../../components/Subscribe';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchResults from '../../components/SearchResults';

import { Link } from 'react-router-dom';


function Forums() {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    
    const userString = sessionStorage.getItem("rexkod_user");
    const user = JSON.parse(userString);
    const userId = user.user.id


    const [question, setQuestion] = useState("");

    const submitSchoolForum = (e) => {
        let inputobj = {
            "question": question,
            "userId": userId
        };

        e.preventDefault();

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
            let result = fetch('http://localhost:8000/api/school_search_forum_questions/' + name).then(function (result) {
                result.json().then(function (jsonbody) {
                    console.warn(jsonbody);
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
                                    <Link to={"/school_forums/view_forum/"+forumId} id="search-button"
                                            className="w-100 d-block btn bg-current text-white font-xssss fw-600 ls-3 style1-input p-3 border-0 text-uppercase ">Search</Link>
                                    </div>
                                </div>
                                {allForums && allForums.length > 0 && <SearchResults results={allForums} onResultClick={handleResultClick} />}
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
    );
}


export default Forums;
