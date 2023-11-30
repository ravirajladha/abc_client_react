import React, { useState, useEffect } from 'react';
import AppFooter from '../../components/includes/AppFooter';
import Navheader from '../../components/Navheader';
import AppHeader from '../../components/includes/AppHeader';
import Profile from '../../components/Profile';
import Myclass from '../../components/Myclass';
import Subscribe from '../../components/Subscribe';
import { Link } from 'react-router-dom';


function Subjects() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const userString = localStorage.getItem("rexkod_user");
  const user = JSON.parse(userString);
  const classId = user.student.class_id;

  
  useEffect(() => {
    getSubjects();
  }, [])

  const [subjects, setSubjects] = useState([]);

  function getSubjects() {
    fetch(baseUrl + 'api/get_subjects/' + classId).then(function (result) {
      result.json().then(function (jsonBody) {
        // console.warn(jsonBody);
        setSubjects(jsonBody);
      })
    });
  };

  return (
    <>
      <div className="main-wrapper">

        <div className="main-content menu-active">
          <AppHeader />

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
                        to={"/subject_stream/" + value.id}
                        className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto"
                      >
                        <img
                          src={baseUrl + value.subject_image}
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
                        to={"/subject_stream/" + value.id}
                        className="p-2 mt-4 mr-1 d-inline-block text-white fw-700 lh-30 rounded-lg w100 text-center font-xsssss ls-3 bg-current"
                      >
                        LEARN
                      </Link>
                       <Link
                        to={value.latest_test_id ? `/subject_stream/take_test/${value.id}/${value.latest_test_id}` : '#'}
                        className={`p-2 mt-4 d-inline-block fw-700 lh-30 rounded-lg w100 text-center font-xsssss ls-3 ${
                          value.latest_test_id ? 'bg-current text-white' : 'bg-light text-grey-500 bg-hover-light disabled'
                        }`}
                        style={value.latest_test_id ? {} : { pointerEvents: 'none', cursor: 'not-allowed' }}
                      >
                        TAKE TEST
                      </Link>
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

        <AppFooter />
      </div>
    </>
  );
}


export default Subjects;
