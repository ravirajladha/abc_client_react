import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

import Appheader from '../../components/adminComponents/Appheader';
import Appfooter from '../../components/adminComponents/Appfooter';


function Schools() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    useEffect(() => {
        getSchools();
    }, [])

    const [schools, setSchools] = useState([]);
    function getSchools() {
        let result = fetch(baseUrl + 'api/get_schools').then(function (result) {
            result.json().then(function (jsonbody) {
                console.warn(jsonbody);
                setSchools(jsonbody);
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
                            <div className="row">
                                <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                                    <div>
                                        <h2 className="fw-400 font-lg d-block">All <b> Schools</b> </h2>
                                    </div>
                                    <div className="float-right">
                                        <a href="/admin/add_school" className="p-2  d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current">Add Schools</a>
                                    </div>
                                </div>
                                {
                                    schools ? (
                                        schools && schools.map((school, index) => (
                                            <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                                                <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                                                    <a href="#" className="position-absolute right-0 mr-4 top-0 mt-3"><i className="ti-more text-grey-500 font-xs"></i></a>

                                                    <h4 className="fw-700 font-xs mt-4">{school.school_name}</h4>
                                                </div>
                                            </div>
                                        ))
                                    )
                                        :
                                        ""
                                }
                            </div>


                        </div>
                    </div>
                </div>
                <Appfooter />
            </div>
        </>
    );
}


export default Schools;
