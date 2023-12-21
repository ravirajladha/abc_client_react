import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BackButton from "../../components/navigation/BackButton";
import { useContext } from "react";
import { AuthContext } from "../../lib/AuthContext.js";
import Loader from "../../components/common/Loader.jsx";
import NoContent from "../../components/common/NoContent.jsx";

function Teachers() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [teachers, setTeachers] = useState([]);
  const userDetails = useContext(AuthContext).user;
  const [isLoading, setIsLoading] = useState(true);

  const getTeachers = () => {
    const creatorId = userDetails.user.id;

    fetch(
      `${baseUrl}api/school/get_all_teachers_school_wise?created_by=${creatorId}`
    )
      .then((result) => result.json())
      .then((json) => {
        console.log("all teacher_school", json);
        setTeachers(json);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getTeachers();
  }, []);

  function formatClassSubject(subjectString) {
    if (!subjectString) {
      return "No subjects available";
    }

    try {
      const subjects = JSON.parse(subjectString);
      return subjects
        .map((sub) => `Class ${sub.class_id}, Subject ${sub.subject_id}`)
        .join(" ~|~ ");
    } catch (error) {
      console.error("Error parsing subjects JSON:", error);
      return "Invalid subjects data";
    }
  }

  return (
    <>
      <div className="custom-middle-sidebar-bottom p-3">
        <div className="middle-sidebar-left">
          <div className="row">
            <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
              <div>
                <h2 className="fw-400 font-lg d-block">
                  All <b> Teachers</b>
                </h2>
              </div>
              <div className="float-right">
                <Link
                  to="/school/teachers/add_teacher"
                  className="px-3 py-2 d-inline-block text-white me-2 fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current uppercase"
                >
                  Add Teacher
                </Link>
                <BackButton />
              </div>
            </div>

            {isLoading ? (
              <Loader />
            ) : teachers && teachers.length > 0 ? (
              <div className="card border-0  shadow-sm mx-2">
                <div className="card-body p-lg-5 p-4 w-100 border-0">
                  <table id="myTable" className="table">
                    <thead>
                      <tr>
                        <th scope="col">Sl. No.</th>
                        <th scope="col">Teacher Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Subject & Class</th>
                        <th scope="col" className="text-dark">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {teachers.map((teacher, index) => (
                        <tr key={index} >
                          <td className="align-middle">{index + 1}</td>
                          <td className="align-middle">{teacher.auth_id}</td>
                          <td className="align-middle">{teacher.name}</td>
                          <td className="align-middle">{teacher.email}</td>
                          <td className="align-middle">
                            {teacher.class_and_subject.map((item, idx) => (
                              <div key={idx}>
                                {item.class_name ? item.class_name : "No Class"}
                                {", "}
                                {item.subject_name
                                  ? item.subject_name
                                  : "No Subject"}
                              </div>
                            ))}
                          </td>
                          <td className="text-dark align-middle">
                            <Link
                              to={`/school/teacher/${teacher.auth_id}/edit`}
                              className="px-3 py-2 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current uppercase"
                            >
                              Edit
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <NoContent contentName="teachers" />
            )}
          </div>
        </div>
      </div>

      {/* <div className="app-footer border-0 shadow-lg">
        <Link to="default.html" className="nav-content-bttn nav-center">
          <i className="feather-home"></i>
        </Link>
        <Link to="default-follower.html" className="nav-content-bttn">
          <i className="feather-package"></i>
        </Link>
        <Link
          to="default-live-stream.html"
          className="nav-content-bttn"
          data-tab="chats"
        >
          <i className="feather-layout"></i>
        </Link>
        <Link to="#" className="nav-content-bttn sidebar-layer">
          <i className="feather-layers"></i>
        </Link>
        <Link to="default-settings.html" className="nav-content-bttn">
          <img
            src="https://via.placeholder.com/50x50.png"
            alt="user"
            className="w30 shadow-xss"
          />
        </Link>
      </div>

      <div className="app-header-search">
        <form className="search-form">
          <div className="form-group searchbox mb-0 border-0 p-1">
            <input
              type="text"
              className="form-control border-0"
              placeholder="Search..."
            />
            <i className="input-icon">
              <ion-icon
                name="search-outline"
                role="img"
                className="md hydrated"
                aria-label="search outline"
              ></ion-icon>
            </i>
            <Link
              to="#"
              className="ml-1 mt-1 d-inline-block close searchbox-close"
            >
              <i className="ti-close font-xs"></i>
            </Link>
          </div>
        </form>
      </div> */}
    </>
  );
}

export default Teachers;
