import React, { useState, useEffect } from "react";
import BackButton from "../../components/navigation/BackButton";
import { useContext } from "react";
import { AuthContext } from "../../lib/AuthContext.js";
import { useParams, Link } from "react-router-dom";
import Loader from "../../components/common/Loader.jsx";
import NoContent from "../../components/common/NoContent.jsx";

const ClassSubjects = () => {
  const { classId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const user = useContext(AuthContext).user;

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [subjects, setSubjects] = useState([]);

  function getSubjects(classId) {
    fetch(baseUrl + "api/admin/get_subjects/" + classId).then(function (
      result
    ) {
      result
        .json()
        .then(function (jsonBody) {
          console.warn(jsonBody);
          setSubjects(jsonBody);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching subjects:", error);
          setIsLoading(false);
        });
    });
  }

  useEffect(() => {
    if (classId) {
      getSubjects(classId);
    }
  }, [classId]);

  return (
    <>
      <div className="middle-sidebar-bottom">
        <div className="middle-sidebar-left">
          <div className="row">
            <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
              <div>
                <h2 className="fw-400 font-lg d-block">
                  <b> Subjects</b>
                </h2>
              </div>
              <div className="float-right">
                <BackButton />
              </div>
            </div>

            {isLoading ? (
              <Loader />
            ) : subjects.length > 0 ? (
              <div className="card-body p-2 w-100 border-0 ">
                <div className="row">
                  {subjects.map((subject, index) => (
                    <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                      <div className="card mb-4 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
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
                        <h4 className="fw-700 font-xs mt-4 capitalize">
                          {subject.subject_name}
                        </h4>
                        <div className="card-footer bg-transparent border-top-0">
                          <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-success d-inline-block text-dark mb-1 mr-1">
                            Chapter Count
                          </span>
                          <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-info d-inline-block text-info mb-1">
                            {subject.chapter_count}
                          </span>
                        </div>
                        <div className="card-footer bg-transparent border-top-0 d-flex align-items-center justify-content-center gap-2">
                          <Link
                            to={
                              user.user.type === "admin"
                                ? `/admin/results/all_chapters_assessment/${subject.id}`
                                : user.user.type === "sub_admin"
                                ? `/school/results/all_chapters_assessment/${subject.id}`
                                : `/teachers/all_classes/results/all_chapters_assessment/${subject.id}`
                            }
                            className="px-3 py-1 me-2 d-inline-block text-white fw-700 lh-10 rounded-lg text-center font-xsssss bg-current"
                          >
                            ALL CHAPTERS
                          </Link>
                          <Link
                            to={
                              user.user.type === "admin"
                                ? `/admin/results/class/${classId}/subject/${subject.id}/results`
                                : user.user.type === "sub_admin"
                                ? `/school/results/class/${classId}/subject/${subject.id}/results`
                                : `/teachers/results/class/${classId}/subject/${subject.id}/results`
                            }
                            className="px-3 py-1 me-2 d-inline-block text-white fw-700 lh-10 rounded-lg text-center font-xsssss bg-current"
                          >
                            TEST RESULTS
                          </Link>
                          <Link
                            to={
                              user.user.type === "admin"
                                ? `/admin/results/assessments/${subject.id}/results`
                                : user.user.type === "sub_admin"
                                ? `/school/results/assessments/${subject.id}/results`
                                : `/teachers/results/assessments/${subject.id}/results`
                            }
                            className="px-3 py-1 me-2 d-inline-block text-white fw-700 lh-10 rounded-lg text-center font-xsssss bg-current"
                          >
                            ASSESSMENT RESULTS
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <NoContent contentName="subjects" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassSubjects;
