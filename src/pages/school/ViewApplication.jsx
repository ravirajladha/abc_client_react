import React, { useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";
import BackButton from "../../components/navigation/BackButton";
import Loader from "../../components/common/Loader.jsx";
import NoContent from "../../components/common/NoContent.jsx";
import { useParams } from "react-router-dom";
import moment from "moment";

function ViewApplication() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const { applicationId } = useParams();
  const [application, setApplications] = useState([]);
  const getApplication = () => {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}api/school/get-application-by-id/${applicationId}`)
        .then((result) => result.json())
        .then((jsonbody) => {
          console.warn(jsonbody);
          setApplications(jsonbody.application);
          resolve(jsonbody);
        })
        .catch((error) => {
          console.error("Error fetching student applications:", error);
          reject(error);
        });
    });
  };
  useEffect(() => {
    getApplication().catch((error) => {
      console.error("Error fetching student applications:", error);
    });
  }, []);
  return (
    <>
      <div className="middle-sidebar-bottom">
        <div className="middle-sidebar-left">
          <div className="row">
            <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
              <div>
                <h2 className="fw-400 font-lg d-block">
                  <b>Applications #{applicationId}</b>
                </h2>
              </div>
              <div className="float-right">
                <Link
                  to={`/school/applications/print-applications/${application.id}`}
                  className="p-2 d-inline-block me-2 text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current text-uppercase"
                  target="_blank"
                  rel="noopener noreferrer" // Adding rel attribute for security
                >
                  Print
                </Link>
                <BackButton />
              </div>
            </div>
            {application && application ? (
              <div className="col-lg-10 pt-0 my-3 mx-auto">
                <div className="card w-100 border-0 bg-white shadow-md p-0 px-5 mt-3">
                  {/* <div className="mx-5"> */}
                  <div className="row">
                    <div className="col-lg-3">
                      <img
                        src="/assets/images/abc_logo.jpg"
                        alt="icon"
                        className="p-1"
                        width={200}
                      />
                    </div>
                    <div className="col-lg-9">
                      <h2 className="fw-400 font-xl d-block ml-5">
                        <b>AGASTHYA VIDYANIKETHAN</b>
                      </h2>
                      <p className="fw-500 font-xs d-block float-right mr-5">
                        Branch: {application.branch ?? "___________________"}
                      </p>
                    </div>
                    <div className="row mt-4">
                      <h2 className="fw-400 font-xs d-block text-center mb-2">
                        <b>Application For Admission</b>
                      </h2>
                      <div className="col-lg-6">
                        <p className="fw-500 font-xs d-block mb-2">
                          Academic Year: 2024 - 2025
                        </p>
                        <p className="fw-500 font-xs d-block  mb-2">
                          Admission for Class:{" "}
                          {application.classname ?? "___________________"}
                        </p>
                        <p className="fw-500 font-xs d-block  mb-2">
                          STS No:___________________
                        </p>
                        <p className="fw-500 font-xs d-block  mb-2">
                          Admission No :{" "}
                          {application.id ?? "___________________"}
                        </p>
                      </div>
                      <div className="col-lg-6 d-flex flex-column align-items-end">
                        <div
                          style={{
                            width: "150px",
                            height: "150px",
                            border: "1px solid #000",
                          }}
                          className="text-center"
                        >
                          <p className="fw-400 font-xs d-block">
                            Affix 1 <br /> passport size <br /> photograph of{" "}
                            <br /> the student{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <h2 className="fw-400 font-xs d-block text-center mb-2">
                        <b>STUDENT PROFILE</b>
                      </h2>
                      <div className="col-lg-12">
                        <p className="fw-500 font-xs d-block mb-2 text-uppercase">
                          Full Name of the Child (in capital) :{" "}
                          {application.student_fname ?? "___________________"}
                        </p>
                      </div>
                      <div className="col-lg-6">
                        <p className="fw-500 font-xs d-block mb-2">
                          Pet Name :{" "}
                          {application.student_pname ?? "___________________"}
                        </p>
                        <p className="fw-500 font-xs d-block  mb-2">
                          Aadhar Card No :{" "}
                          {application.student_aadhaar ?? "___________________"}
                        </p>
                        <p className="fw-500 font-xs d-block  mb-2">
                          Mother tongue :{" "}
                          {application.student_mt ?? "___________________"}
                        </p>
                        <p className="fw-500 font-xs d-block  mb-2">
                          Religion :{" "}
                          {application.student_religion ??
                            "___________________"}
                        </p>
                        <p className="fw-500 font-xs d-block  mb-2">
                          Blood Group :{" "}
                          {application.student_blood_group ??
                            "___________________"}
                        </p>
                      </div>

                      <div className="col-lg-6">
                        <p className="fw-500 font-xs d-block mb-2">
                          Date of Birth :{" "}
                          {application.student_dob ? moment(application.student_dob).format('DD/MM/YYYY') : '___________________'}
                        </p>
                        <p className="fw-500 font-xs d-block  mb-2">
                          {/* Sex : {application.student_gender === 'Male' ? 'M ☑  F ☐' : 'M ☐  F ☑'} */}
                          Sex :{" "}
                          {application.student_gender ?? "___________________"}
                        </p>
                        <p className="fw-500 font-xs d-block  mb-2">
                          Nationality :{" "}
                          {application.student_nationality ??
                            "___________________"}
                        </p>
                        <p className="fw-500 font-xs d-block  mb-0">
                          Caste :{" "}
                          {application.student_caste ?? "___________________"}
                        </p>
                        <p className="fw-400 font-xsss">
                          (it is a govt. requirement){" "}
                        </p>
                      </div>
                      <div className="col-lg-12">
                        <p className="fw-500 font-xs d-block  mb-2">
                          Last School Attended (if any) :{" "}
                          {application.last_school_name ??
                            "___________________"}
                        </p>
                      </div>
                      <div className="col-lg-12">
                        <p className="fw-500 font-xss d-block  mb-2">
                          List any special problems that your child may have,
                          such as allergies, existing illness, previous serious
                          illness, injuries and hospitalizations during the past
                          12 months, any medication prescribed long-term
                          continuous, and any other information which the school
                          should be aware of: <br />
                          {application.issues ??
                            "___________________________________________"}
                        </p>
                      </div>
                    </div>

                    <div className="row mt-3 ">
                      <h2 className="fw-400 font-xs d-block text-center mb-2">
                        <b>PARENT PROFILE</b>
                      </h2>

                      <div className="col-lg-6 border-right border-dark">
                        <p className="fw-500 font-xs d-block mb-2 text-center">
                          <b>Father</b>
                        </p>
                        <p className="fw-500 font-xs d-block mb-2">
                          Name : {application.fname ?? "___________________"}
                        </p>
                        <p className="fw-500 font-xs d-block  mb-2">
                          Qualification :{" "}
                          {application.f_qual ?? "___________________"}
                        </p>
                        <p className="fw-500 font-xs d-block  mb-2">
                          Designation :{" "}
                          {application.f_desig ?? "___________________"}
                        </p>
                        <p className="fw-500 font-xs d-block  mb-2">
                          Mobile No :{" "}
                          {application.f_mob ?? "___________________"}
                        </p>
                        <p className="fw-500 font-xs d-block  mb-2">
                          Aadhar Card No :{" "}
                          {application.f_aadhar ?? "___________________"}
                        </p>
                        <p className="fw-500 font-xs d-block  mb-2">
                          Company :{" "}
                          {application.f_comp ?? "___________________"}
                        </p>
                        <p className="fw-500 font-xs d-block  mb-2">
                          Annual Income :{" "}
                          {application.f_sal ?? "___________________"}
                        </p>
                        <p className="fw-500 font-xs d-block  mb-2">
                          Office Tel No :{" "}
                          {application.f_tel ?? "___________________"}
                        </p>
                        <p className="fw-500 font-xs d-block  mb-2">
                          Blood Group :{" "}
                          {application.f_bld ?? "___________________"}
                        </p>
                        <p className="fw-500 font-xs d-block  mb-2">
                          E-mail :{" "}
                          {application.f_email ?? "___________________"}
                        </p>
                      </div>

                      <div className="col-lg-6">
                        <p className="fw-500 font-xs d-block mb-2 text-center">
                          <b>Mother</b>
                        </p>
                        <p className="fw-500 font-xs d-block mb-2">
                          Name : {application.m_name ?? "___________________"}
                        </p>
                        <p className="fw-500 font-xs d-block  mb-2">
                          Qualification :{" "}
                          {application.m_qual ?? "___________________"}
                        </p>
                        <p className="fw-500 font-xs d-block  mb-2">
                          Designation :{" "}
                          {application.m_desig ?? "___________________"}
                        </p>
                        <p className="fw-500 font-xs d-block  mb-2">
                          Mobile No :{" "}
                          {application.m_mob ?? "___________________"}
                        </p>
                        <p className="fw-500 font-xs d-block  mb-2">
                          Aadhar Card No :{" "}
                          {application.m_adhar ?? "___________________"}
                        </p>
                        <p className="fw-500 font-xs d-block  mb-2">
                          Company :{" "}
                          {application.m_comp ?? "___________________"}
                        </p>
                        <p className="fw-500 font-xs d-block  mb-2">
                          Annual Income :{" "}
                          {application.m_sal ?? "___________________"}
                        </p>
                        <p className="fw-500 font-xs d-block  mb-2">
                          Office Tel No :{" "}
                          {application.m_tel ?? "___________________"}
                        </p>
                        <p className="fw-500 font-xs d-block  mb-2">
                          Blood Group :{" "}
                          {application.m_bld ?? "___________________"}
                        </p>
                        <p className="fw-500 font-xs d-block  mb-2">
                          E-mail :{" "}
                          {application.m_email ?? "___________________"}
                        </p>
                      </div>
                      <div className="col-lg-12">
                        <p className="fw-500 font-xs d-block  mb-2">
                          Residential address :{" "}
                          {application.res_add ?? "___________________"}
                        </p>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <h2 className="fw-400 font-xs d-block text-center mb-2">
                        <b>
                          Emergency contact person (other than parents above)
                        </b>
                      </h2>
                      <div className="col-lg-6">
                        <p className="fw-500 font-xs d-block mb-2">
                          Relatives Name :{" "}
                          {application.rel_name ?? "___________________"}
                        </p>
                      </div>
                      <div className="col-lg-6">
                        <p className="fw-500 font-xs d-block  mb-2">
                          Tel No :{" "}
                          {application.rel_phone ?? "___________________"}
                        </p>
                      </div>
                      <div className="col-lg-12">
                        <p className="fw-500 font-xs d-block  mb-2">
                          Relationship with the child :{" "}
                          {application.relation_ch ?? "___________________"}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* </div> */}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewApplication;
