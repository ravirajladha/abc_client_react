import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";

import { Link, useParams } from "react-router-dom";
import BackButton from "../../components/navigation/BackButton";

function StudentDetails() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const userString = localStorage.getItem("rexkod_user");
  const { studentId } = useParams();

  const [student, setStudent] = useState();

  async function getStudent() {
    try {
      const response = await fetch(baseUrl + "api/student/" + studentId);
      const student = await response.json();
      console.warn(student.data);
      setStudent(student.data);
      if (student.data.class_id) {
        await getSubjects(student.data.class_id);
      }
    } catch (error) {
      console.error("There was a problem fetching student details:", error);
    }
  }

  const [subjects, setSubjects] = useState([]);

  async function getSubjects(classId) {
    try {
      const response = await fetch(
        baseUrl + "api/admin/get_subjects/" + classId
      );
      const subjectsData = await response.json();
      console.warn(subjectsData);

      setSubjects(subjectsData);
    } catch (error) {
      console.error("There was a problem fetching subjects:", error);
    }
  }

  useEffect(() => {
    getStudent();
  }, []);

  return (
    <div className="main-wrapper">
      <div className="main-content menu-active" id="main-content">
        <AppHeader />
        <div className="p-5 theme-dark-bg">
          <div className="middle-sidebar-left">
            <div className="row">
              <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                <div className="col-lg-12 pt-0 my-3 d-flex justify-content-between align-items-center ">
                  <div>
                    {student && (
                      <h2 className="fw-400 font-lg d-block ml-2">
                        Student: <b> {student.name}</b>
                        <span className="capitalize">
                          ({student.class} 
                          {student.class_rank && (
                            <span> - Rank: {student.class_rank}</span>
                          )}
                          )</span>
                      </h2>
                    )}
                  </div>
                  <div className="float-right">
                    <BackButton />
                  </div>
                </div>
                <div className="card-body row">
                  {subjects ? (
                    subjects.map((subject, index) => (
                      <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                        <div className="mb-2 rounded-lg p-xxl-5 p-2 border-0 text-center">
                          <Link
                            to={`/subject/${subject.id}`}
                            className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto"
                          >
                            <img
                              src={baseUrl + subject.subject_image}
                              alt="subject"
                              className="p-1"
                            />
                          </Link>
                          <h4 className="fw-700 font-xs capitalize mt-4">
                            {subject.subject_name}
                          </h4>
                          <div className="card-footer bg-transparent border-top-0">
                            <Link
                              to={`/student/${student.id}/tests/${subject.id}`}
                              className="p-2 mt-4 ml-2 d-inline-block text-white fw-700 lh-30 rounded-lg w100 text-center font-xsssss ls-3 bg-current"
                            >
                              Tests
                            </Link>
                            <Link
                              to={`/student/${student.id}/assessments/${subject.id}`}
                              className="p-2 mt-4 ml-2 d-inline-block text-white fw-700 lh-30 rounded-lg w100 text-center font-xsssss ls-3 bg-current"
                            >
                              Assessments
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : subjects.length > 0 ? (
                    subjects.map((video, index) => (
                      // ...video card JSX
                      <h1>Subjects Loading...</h1>
                    ))
                  ) : (
                    <h2 className="fw-400 font-lg d-block text-center">
                      No Subjects
                    </h2>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}

export default StudentDetails;
