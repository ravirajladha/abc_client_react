import React, { useEffect, useState } from 'react'
import Appfooter from '../../components/Appfooter';
import Appheader from '../../components/Appheader';
import Profile from '../../components/Profile';
import Myclass from '../../components/Myclass';
import Subscribe from '../../components/Subscribe';
import { useParams } from 'react-router-dom';

function ViewQna() {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    let { qnaId } = useParams();

    useEffect(() => {
        getQna();
    }, [])

    const [qna, setQna] = useState([]);
    function getQna() {
        let result = fetch(baseUrl + 'api/get_school_qna_single/' + qnaId).then(function (result) {
            result.json().then(function (jsonbody) {
                console.warn(jsonbody);
                setQna(jsonbody);
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
                            <h2 className="fw-400 font-lg d-block">ABC <b> Qna</b> </h2>
                            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">

                            </div>

                            <div className="row">
                                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
                                    <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-2 border-0 text-left question-div">
                                        <div className="card-body p-0" id="question">
                                            <div className="d-flex flex-column p-3">
                                                <h4 className="font-xssss text-uppercase text-current fw-700 ls-3">QUESTION</h4>
                                                <h3 className="font-sm text-grey-800 fw-700 lh-32 mt-4 mb-4">{qna.question} <hr />
                                                {
                                                    qna.answer ? 
                                                    <pre className="text-wrap bg-grey p-2" >{qna.answer}</pre>
                                                    :
                                                    <pre className="text-wrap bg-grey p-2" >Not answered yet !</pre>
                                                }
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

export default ViewQna
