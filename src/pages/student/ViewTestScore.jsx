import Appfooter from '../../components/Appfooter';
import Navheader from '../../components/Navheader';
import Appheader from '../../components/Appheader';
import Profile from '../../components/Profile';
import Myclass from '../../components/Myclass';
import Subscribe from '../../components/Subscribe';
import { Link, useParams } from 'react-router-dom';
import { getUserFromSessionStorage } from '../util/SessionStorage';

import React, { useState, useEffect, useRef } from 'react';

function ViewTestScore() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const {subject_id, test_id} = useParams();

    const [score, setScore] = useState("");

    const user = getUserFromSessionStorage();
    const user_id = user.user.id;

    const get_test_score = (e) => {
        fetch(baseUrl + "api/get_test_score/" + test_id + "/" + user_id, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
        }).then((res) => {
            return res.json();
        }).then((resp) => {
            // setAllSubjectData(resp);
            console.log(resp);
            setScore(resp.score);
        });
    }
    useEffect(() => {
        get_test_score();
    }, [])
   
    return (
        <>
            <div className="main-wrapper">

<div className="main-content menu-active">
    <Appheader />
    <div className="middle-sidebar-bottom theme-dark-bg">
        <div className="middle-sidebar-left">

        <div className="row">
        <div className="col-xxl-1 col-xl-12 col-md-12">
            <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-5 border-0 text-left question-div">
                <div className="card-body text-center p-3 bg-no-repeat bg-image-topcenter" id="question4" >
                    <img src="/assets/images/check.gif" width="100" alt="icon" className="d-inline-block" />

                    <h3 className="fw-700 mt-5 text-grey-900 font-xxl">Your score : <span>{score}</span></h3>
                    <p className="font-xssss fw-600 lh-30 text-grey-500 mb-0 p-2">Your test is completed, you can find your score above. </p>

                    <Link to={"/subject_stream/"+subject_id} data-question="question4" className=" p-2 mt-3 d-inline-block text-white fw-700 lh-30 rounded-lg w200 text-center font-xsssss ls-3 bg-current">Go back to course</Link>
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

export default ViewTestScore
