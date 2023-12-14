import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppHeader from '../../components/includes/AppHeader';
import BackButton from "../../components/navigation/BackButton";

function Teachers() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [teachers, setTeachers] = useState([]);

  const getTeachers = () => {
    fetch(baseUrl + "api/school/api_all_teachers")
      .then((result) => result.json())
      .then((jsonbody) => {
        console.log(jsonbody);
        setTeachers(jsonbody);
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
      });
  };

  useEffect(() => {
    getTeachers();
  }, []);

  function formatClassSubject(subjectString) {
    // Check if subjectString is a truthy value; if not, return a default message
    if (!subjectString) {
      return 'No subjects available';
    }
    
    try {
      // Parse the JSON string into an array of objects
      const subjects = JSON.parse(subjectString);
  
      // Map over the array and format the class and subject into a string
      return subjects.map(sub => `Class ${sub.class_id}, Subject ${sub.subject_id}`).join(' ~|~ ');
    } catch (error) {
      console.error('Error parsing subjects JSON:', error);
      return 'Invalid subjects data'; // or some other error handling
    }
  }
  
  
  return (
    <div className="main-wrapper">
      <div className="main-content menu-active">
        <AppHeader />
        <div className="middle-sidebar-bottom">
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
                    to="/school/add_teacher"
                    className="p-2 d-inline-block text-white me-2 fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current"
                  >
                    Add Teacher
                  </Link>
                  <BackButton/>
                </div>
              </div>

              <div className="card-body p-lg-5 p-4 w-100 border-0">
                <table id="myTable" className="table">
                  <thead>
                    <tr>
                      <th scope="col">Sl. No.</th>
                      <th scope="col">Name</th>
                      <th scope="col">Subject & Class</th>
                      
                      {/* <th scope="col" className="text-dark">
                        Action
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((teacher) => (
                      <tr key={teacher.id}>
                        <td>{teacher.id}</td>
                        <td>{teacher.user.name}</td>
                        <td>{formatClassSubject(teacher.class_and_subject)} </td>
                        {/* <td>
                          <Link
                            to="#"
                            className="btn bg-current text-center text-white font-xsss fw-600 p-2 rounded-lg d-inline-block border-0"
                          >
                            View
                          </Link>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="app-footer border-0 shadow-lg">
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
      </div>
    </div>
  );
}

export default Teachers;
