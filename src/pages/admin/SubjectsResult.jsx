import React, { useState, useEffect, useRef } from 'react'
import AppHeader from '../../components/includes/AppHeader';
import AppFooter from '../../components/includes/AppFooter';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/navigation/BackButton';

import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net-buttons/js/dataTables.buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";

function SubjectResult() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const tableRef = useRef(null);

    const [results, setResults] = useState([]);
    const { subjectId } = useParams();
    const getTestResults = (e) => {
        console.log(subjectId);
        fetch(baseUrl + 'api/get-subject-results/' + subjectId).then(function (result) {
            result.json().then(function (jsonbody) {
                setResults(jsonbody);
                $(tableRef.current).DataTable();
            })
        });
    }
    useEffect(() => {
        getTestResults();
        // Cleanup function for DataTables
        return () => {
            const table = $(tableRef.current).DataTable();
            table.destroy();
        };
    }, [])
    return (
        <>
            <div className="main-wrapper">
                <div className="main-content menu-active">
                    <AppHeader />
                    <div className="middle-sidebar-bottom theme-dark-bg">
                        <div className="middle-sidebar-left">
                            <div className="row">
                                <div className="card-body p-lg-5 px-4 w-100 border-0 d-flex rounded-lg justify-content-between">
                                    <div className="">
                                    <h2 className="fw-400 font-lg d-block ml-2">Subject <b> Results</b> </h2>
                                    </div>
                                    <div className="float-right">
                                        <BackButton/>
                                    </div>
                                </div>

                                <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                    <div className="card-body p-lg-5 px-4 w-100 border-0 ">
                                        <div className="table-responsive">
                                            <table ref={tableRef} className="table mb-0">
                                                <thead className="bg-greylight rounded-10 ovh">
                                                    <tr>
                                                        <th className="border-0">Sl no.</th>
                                                        <th className="border-0" scope="col">
                                                            Test Name
                                                        </th>
                                                        <th className="border-0" scope="col">
                                                            Student Name
                                                        </th>
                                                        <th className="border-0" scope="col">
                                                            Score
                                                        </th>
                                                        <th className="border-0" scope="col">
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        results ? (
                                                            results.map((result, index) => (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>
                                                                        <b>{result.test.title}</b>
                                                                    </td>
                                                                    <td>{result.user.name}</td>
                                                                    <td>{result.score}</td>
                                                                    <td>view Profile</td>

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

export default SubjectResult
