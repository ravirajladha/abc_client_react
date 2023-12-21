import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import BackButton from "../../components/navigation/BackButton";
import { AuthContext } from "../../lib/AuthContext.js";
import { useContext } from "react";
import Loader from "../../components/common/Loader.jsx";
import NoContent from "../../components/common/NoContent.jsx";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import "datatables.net";

function AssessmentListVideoWise() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const user = useContext(AuthContext).user;
  const tableRef = useRef(null);

  const [assessments, setAssessments] = useState([]);
  const { assessment_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const getAssessments = (e) => {
    fetch(
      baseUrl + `api/get_assessments_chapter_wise_of_video/${assessment_id}`
    ).then(function (result) {
      result.json().then(function (jsonbody) {
        console.log("assessment", jsonbody);
        setAssessments(jsonbody);
        setIsLoading(false);
        initializeDataTable();
      });
    });
  };

  const initializeDataTable = () => {
    $(tableRef.current).DataTable();
  };

  useEffect(() => {
    getAssessments();
  }, []);

  return (
    <>
      <div className="middle-sidebar-bottom theme-dark-bg">
        <div className="middle-sidebar-left">
          <div className="row">
            <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
              <div>
                <h2 className="fw-400 font-lg d-block">
                  <b> Assessments</b>
                </h2>
              </div>
              <div className="float-right">
                <BackButton />
              </div>
            </div>
            {isLoading ? (
              <Loader />
            ) : assessments && assessments.length > 0 ? (
              <div className="card-body p-lg-5 px-4 w-100 border-0 ">
                <div className="table-responsive">
                  <table className="table table-admin mb-0" ref={tableRef}>
                    <thead className="bg-greylight rounded-10 ovh">
                      <tr>
                        <th className="border-0">Sl no.</th>
                        <th className="border-0" scope="col">
                          Video Name
                        </th>
                        <th className="border-0" scope="col">
                          Name
                        </th>
                        <th className="border-0" scope="col">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {assessments.map((assessment, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <b>{assessment.video_name}</b>
                          </td>
                          <td>
                            <b>{assessment.assessment_name}</b>
                          </td>
                          <td>
                            <Link
                              to={
                                user.user.type === "admin"
                                  ? `/assessments/results/student_wise_assessment_result/${assessment.assessment_id}`
                                  : user.user.type === "sub_admin"
                                  ? `/school/results/student_wise_assessment_result/${assessment.assessment_id}`
                                  : `/teachers/all_classes/results/student_wise_assessment_result/${assessment.assessment_id}`
                              }
                              className=""
                            >
                              <button className="p-2 d-inline-block text-white fw-700 lh-30 rounded-lg text-center w100 font-xsssss ls-3 bg-current mx-1">
                                View
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <NoContent contentName="assessments" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AssessmentListVideoWise;
