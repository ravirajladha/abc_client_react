import React, { useState, useEffect } from 'react'
import Appheader from '../../components/adminComponents/Appheader';
import Appfooter from '../../components/adminComponents/Appfooter';
import { useParams } from 'react-router-dom';

function ViewAssessments() {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const [assessments, setAssessments] = useState([]);
    const { subject_id } = useParams();
    const getAssessments = (e) => {
        let result = fetch(baseUrl + 'api/get_assessments/' + subject_id).then(function (result) {
            result.json().then(function (jsonbody) {
                console.log(jsonbody);
                setAssessments(jsonbody);
            })
        });
    }
    useEffect(() => {
        getAssessments();
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
                                    <h2 className="fw-400 font-lg d-block ml-2">All <b> Assessments</b> </h2>
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
                                                        Chapter Name
                                                        </th>
                                                        <th className="border-0" scope="col">
                                                        Video Name
                                                        </th>
                                                        <th className="border-0" scope="col">
                                                        Question
                                                        </th>
                                                        <th className="border-0" scope="col">
                                                        Code
                                                        </th>
                                                        <th className="border-0" scope="col">
                                                        Option 1
                                                        </th>
                                                        <th className="border-0" scope="col">
                                                        Option 2
                                                        </th>
                                                        <th className="border-0" scope="col">
                                                        Option 3
                                                        </th>
                                                        <th className="border-0" scope="col">
                                                        Option 4
                                                        </th>
                                                        <th className="border-0" scope="col">
                                                        Answer
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        assessments  ? (
                                                            assessments.map((assessment, index) => (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>
                                                                        <b>{assessment.subject.subject_name}</b>
                                                                    </td>
                                                                    <td>{assessment.chapter.chapter_name}</td>
                                                                    <td>{assessment.video.video_name}</td>
                                                                    <td>{assessment.question}</td>
                                                                    <td>{assessment.question_code}</td>
                                                                    <td>{assessment.option1}</td>
                                                                    <td>{assessment.option2}</td>
                                                                    <td>{assessment.option3}</td>
                                                                    <td>{assessment.option4}</td>
                                                                    <td>{assessment.answer}</td>
        
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

export default ViewAssessments
