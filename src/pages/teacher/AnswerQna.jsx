import React, { useState, useEffect } from 'react'
import Appheader from '../../components/teacherComponents/Appheader';
import Appfooter from '../../components/teacherComponents/Appfooter';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

import {getUserFromSessionStorage} from '../util/SessionStorage';


function AnswerQna() {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const {qna_id} = useParams();

    const [answer, setAnswer] = useState("");
    const [question, setQuestion] = useState("");
    const user = getUserFromSessionStorage();
    const auth_id = user.user.id;
    const getQna = (e) => {
        let result = fetch(baseUrl + 'api/get_qna/' + qna_id).then(function (result) {
            result.json().then(function (jsonbody) {
                console.warn(jsonbody);
                setQuestion(jsonbody);
            })
        });
    }
    useEffect(() => {
        getQna();
    }, [])

    const answerQna = (e) => {

        const formData = new FormData();
        formData.append('answer', answer);
        formData.append('qna_id', qna_id);
        formData.append('auth_id', auth_id);
        e.preventDefault();

        fetch(baseUrl + "api/answer_qna", {
            method: 'POST',
            body: formData
        }).then((res) => {
            return res.json();
        }).then((resp) => {
            setAnswer("");        
            toast.success(resp.msg);

        }).catch((err) => {
            toast.error('Could not submit question :' + err.message);
        });
    }

    return (
        <>
            <div className="main-wrapper">

                <div className="main-content menu-active">
                    <Appheader />

                    <div className="middle-sidebar-bottom theme-dark-bg">
                        <div className="middle-sidebar-left">
                        <ToastContainer autoClose={3000} />
                            <div className="row">
                                <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                    <h2 className="fw-400 font-lg d-block ml-2">Give <b> Answer</b> </h2>
                                    <div className="card-body p-lg-5 px-4 w-100 border-0 ">
                                    <form encType="multipart/form-data" onSubmit={answerQna}>

                                        <div class="col-lg-12">
                                            <h4>Q. { question.question }</h4>
                                        </div>
                                        <div className="col-lg-12">
                                            <label className="mont-font fw-600 font-xsss">Answer</label><br />
                                            <textarea rows="4" cols="70" className="form-control" placeholder="Enter Answer.." value={answer} onChange={(e) => setAnswer(e.target.value)} required></textarea>
                                        </div>
                                        <div className="col-lg-12">
                                            <button type="submit" className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0 mt-2">Submit</button>
                                        </div>
                                        </form>

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

export default AnswerQna
