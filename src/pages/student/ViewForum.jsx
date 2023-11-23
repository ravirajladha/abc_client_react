import React, { useEffect, useState } from 'react'
import Appfooter from '../../components/Appfooter';
import Navheader from '../../components/Navheader';
import Appheader from '../../components/Appheader';
import Profile from '../../components/Profile';
import Myclass from '../../components/Myclass';
import Subscribe from '../../components/Subscribe';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


function ViewForum() {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    let { forumId } = useParams();

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
                            <h2 className="fw-400 font-lg d-block">ABC <b> Forum</b> </h2>
                            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">

                            </div>
                            <div className="row">
                                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
                                    <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-2 border-0 text-left question-div">
                                        <div className="card-body p-0" id="question">
                                            <div className="d-flex flex-column p-3">
                                                <h4 className="font-xssss text-uppercase text-current fw-700 ls-3">QUESTION
                                                <Link to={"/school_forums" } id="search-button"
                                                        className="d-block btn bg-current text-white font-xssss fw-600 ls-3  p-1 border-0 text-uppercase float-right"> <i className='feather-plus'></i>Ask Question</Link>
                                                        </h4>

                                                <h3 className="font-sm text-grey-800 fw-700 lh-32 mt-4 mb-4">
                                                    {forum && forum.forum_question ? (
                                                        forum.forum_question.question
                                                    ) : (
                                                        ''
                                                    )}
                                                    <Link to={"/school_forums/answer_forum/" + forumId} id="search-button"
                                                        className="d-block btn bg-current text-white font-xssss fw-600 ls-3  p-1 border-0 text-uppercase float-right"> <i className='feather-plus'></i>Answer</Link>
                                                    <hr />
                                                    {forum && forum.forum_answers ? (
                                                        forum.forum_answers.map((forum_answers, id) => (
                                                            <div key={id}>
                                                                <h4 className="font-xsss fw-600"><i className="feather-user bg-current mr-3 rounded-xl p-1"></i>{forum_answers.student.name}
                                                                    <span className='float-right'>
                                                                        <i className="feather-thumbs-up mr-3 rounded-xl p-1"></i>
                                                                        <i className="feather-thumbs-down mr-3 rounded-xl p-1"></i>
                                                                    </span>
                                                                </h4>

                                                                <pre className="text-wrap bg-grey p-2" >{forum_answers.answer}</pre>
                                                            </div>

                                                        ))
                                                    ) : (
                                                        <pre className="text-wrap bg-grey p-2">Not answered yet!</pre>
                                                    )}
                                                </h3>

                                            </div>
                                        </div>
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

export default ViewForum
