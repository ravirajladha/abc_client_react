import React, { useState, useEffect } from 'react';
import Appfooter from '../../components/Appfooter';
import Navheader from '../../components/Navheader';
import Appheader from '../../components/Appheader';
import Profile from '../../components/Profile';
import Myclass from '../../components/Myclass';
import Subscribe from '../../components/Subscribe';
import { Link } from 'react-router-dom';


  function Subjects() {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const userString = sessionStorage.getItem("rexkod_user");
    const user = JSON.parse(userString);
    const classId = user.student.class_id;
  
      useEffect(() => {
        getSubjects();
      },[])
  
      const [subjects, setSubjects] = useState([]);
      function getSubjects() {
        let result = fetch(baseUrl+'api/get_subjects/'+ classId).then(function (result) {
            result.json().then(function (jsonbody) {
                console.warn(jsonbody);
                setSubjects(jsonbody);
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
                  {subjects.map((value, index) => (
                    <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                      <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                        <Link
                          to={"#"}
                          className="position-absolute right-0 mr-4 top-0 mt-3"
                        >
                          <i className="ti-more text-grey-500 font-xs"></i>
                        </Link>
                        <Link
                          to={"/subject_stream/"+value.id}
                          className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto"
                        >
                          <img
                            src={baseUrl+value.subject_image}
                            alt="icon"
                            className="p-1 w-100"
                          />
                        </Link>
                        <h4 className="fw-700 font-xs mt-4">{value.subject_name}</h4>
                        {/* <p className="fw-500 font-xssss text-grey-500 mt-3">
                          {value.des}
                        </p> */}
                        <div className="clearfix"></div>
                        <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-success d-inline-block text-success mb-1 mr-1">
                            FULL TIME
                          </span>
                        <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-info d-inline-block text-info mb-1">
                            30 MIN
                          </span>
                        
                        <div className="clearfix"></div>
                        <Link
                          to={"/subject_stream/"+value.id}
                          className="p-2 mt-4 mr-1 d-inline-block text-white fw-700 lh-30 rounded-lg w100 text-center font-xsssss ls-3 bg-current"
                        >
                          LEARN
                        </Link>
                        <a
                          href="#"
                          className="p-2 mt-4 d-inline-block text-white fw-700 lh-30 rounded-lg w100 text-center font-xsssss ls-3 bg-current"
                        >
                          TAKE TEST
                        </a>
                      </div>
                    </div>
                  ))}
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


export default Subjects;
