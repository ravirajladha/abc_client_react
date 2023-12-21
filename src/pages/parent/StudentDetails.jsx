import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BackButton from "../../components/navigation/BackButton";
import Loader from "../../components/common/Loader";
import NoContent from "../../components/common/NoContent";

function StudentDetails() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const userString = localStorage.getItem("rexkod_user");
  const { studentId } = useParams();

  const [student, setStudent] = useState();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getStudent() {
    try {
      const response = await fetch(baseUrl + "api/student/" + studentId);
      const studentData = await response.json();
      setStudent(studentData.data);
      setLoading(false);

      if (studentData.data.class_id) {
        await getSubjects(studentData.data.class_id);
      }
    } catch (error) {
      console.error("There was a problem fetching student details:", error);
      setLoading(false);
    }
  }

  async function getSubjects(classId) {
    setLoading(true);
    try {
      const response = await fetch(
        baseUrl + "api/admin/get_subjects/" + classId
      );
      const subjectsData = await response.json();
      setSubjects(subjectsData);
      setLoading(false);
    } catch (error) {
      console.error("There was a problem fetching subjects:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getStudent();
    getSubjects();
  }, []);

  return (
    <div className="p-5 theme-dark-bg">
      <div className="middle-sidebar-left">
        <div className="row">
          <div className="col-lg-12 pt-0 my-3 d-flex justify-content-between align-items-center ">
            <div>
              {student && (
                <h2 className="fw-400 font-lg d-block ml-2">
                  Student: <b>{student.name}</b>
                  <span className="capitalize">
                    ({student.class}
                    {student.class_rank && (
                      <span> - Rank: {student.class_rank}</span>
                    )}
                    )
                  </span>
                </h2>
              )}
            </div>
            <div className="float-right">
              <BackButton />
            </div>
          </div>
          <div className=" w-100 border-0  ">
            <div className=" row">
              {loading ? (
                <Loader />
              ) : subjects && subjects.length > 0 ? (
                subjects.map((subject, index) => (
                  <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                    <div className="card mb-4 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                      <Link
                        to={`/subject/${subject.id}`}
                        className="ml-auto mr-auto rounded-lg overflow-hidden d-inline-block"
                      >
                        <img
                          src={baseUrl + subject.subject_image}
                          alt="subject"
                          className="p-0 w100 shadow-xss"
                        />
                      </Link>
                      <h4 className="fw-700 font-xs capitalize mt-4">
                        {subject.subject_name}
                      </h4>
                      <div className="card-footer bg-transparent border-top-0">
                        <Link
                          to={`/student/${student.id}/tests/${subject.id}`}
                          className="p-2 mx-2 my-4 text-uppercase d-inline-block text-white fw-700 lh-30 rounded-lg w100 text-center font-xsssss ls-4 bg-current"
                        >
                          Tests
                        </Link>
                        <Link
                          to={`/student/${student.id}/assessments/${subject.id}`}
                          className="p-2 mx-2 my-4 text-uppercase d-inline-block text-white fw-700 lh-30 rounded-lg w100 text-center font-xsssss ls-4 bg-current"
                        >
                          Assessments
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <NoContent contentName="subject details" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;
