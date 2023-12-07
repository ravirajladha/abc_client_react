import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

import AppHeader from '../../components/includes/AppHeader';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from "../../lib/AuthContext.js"

function AddStudent() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [schools, setSchools] = useState([]);
  const [classes, setClasses] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const  user = useContext(AuthContext).user;
  const [isSubmitting, setIsSubmitting] = useState(false);

 
 // Define the initial formData state with empty values or derived from user if available
 const [formData, setFormData] = useState({
  name: "",
  school: user ? user.user.id : "", // Conditional property access with default
  className: "",
  section: "",
});

console.log("formdata",formData.school) ;
useEffect(() => {
  getAllSchools();
  getAllClasses();
  // If formSubmitted is true, navigate to the teacher page
  if (formSubmitted) {
    navigate(`${process.env.PUBLIC_URL}/school/students`);
  }
}, [formSubmitted]); // React to formSubmitted changes
  const getAllSchools = async () => {
    try {
      const response = await fetch(baseUrl + "api/school/api_get_schools");
      const data = await response.json();
      setSchools(data);
    } catch (error) {
      console.error("Error fetching schools:", error);
    }
  };

  // Call the function to fetch schools
  useEffect(() => {
    getAllSchools();
  }, []);

  const getAllClasses = async () => {
    try {
      const response = await fetch(baseUrl + "api/school/api_get_classes");
      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    // Access the form data
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
  
    // Echo the formDataToSend
    for (let [key, value] of formDataToSend) {
      console.log(`${key}: ${value}`);
    }
  
    fetch(baseUrl + "api/school/add_student", {
      method: "POST",
      body: formDataToSend,
    })
    .then((response) => response.json())
    .then((data) => {
      // Handle success
      setFormSubmitted(true);
      toast.success("Teacher added successfully!");
      // Clear form values after successful submission
      setFormData({
        name: "",
        school: "",
        className: "",
        section: "",
      });
    })
    .catch((error) => {
      setFormSubmitted(false);
      console.error("Error adding student:", error);
    }).finally(() => {
      setIsSubmitting(false); // Re-enable the submit button
  });
  }
  

  const navigate = useNavigate();

  const navigateToTeacherPage = () => {
    navigate(`${process.env.PUBLIC_URL}/school/students`);
  };

  useEffect(() => {
    if (formSubmitted) {
      navigateToTeacherPage();
    }
  }, [formSubmitted]);
  if (!user) {
    console.log("No user found. User might be logged out.");
    // Handle the redirect to login or return placeholder content here
    return <div>User is not logged in</div>;
}
  return (
    <div>
      <div className="main-wrapper">
        <div className="main-content menu-active">
          <AppHeader />
          <div className="middle-sidebar-bottom">
            <div className="custom-middle-sidebar-left">
              <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                <div className="card-body p-4 w-100 border-0 d-flex rounded-lg justify-content-between">
                  <h2 className="fw-400 font-lg d-block">
                    Add <b> Student</b>
                    <ToastContainer autoClose={3000} />
                  </h2>
                  <Breadcrumb style={{ padding: "0.25rem 1rem" }}>
                  <Breadcrumb.Item href="/school">
                      <i className="fa fa-home"></i>&nbsp;Home&nbsp;
                    </Breadcrumb.Item>
                    {/* <Breadcrumb.Item href="#">
                      Course&nbsp;<i className="fa fa-angle-right"></i>
                    </Breadcrumb.Item> */}
                    <Breadcrumb.Item active className="fw-500 text-black">
                      &nbsp;Add Student
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </div>
                <div></div>
                <div className="card-body p-lg-5 p-4 w-100 border-0">
                  <form
                    onSubmit={handleSubmit}
                    method="post"
                    encType="multipart/form-data"
                  >
                    <div className="row mb-6">
                      <div className="col-lg-4">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Student Name
                          </label>
                          <br />
                          <input
                            placeholder="Student Name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-4" hidden>
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            School Name
                          </label>
                          <br />
                          <select
                            name="school"
                            id=""
                            className="form-control"
                            value={formData.school}
                            onChange={handleChange}
                          >
                            <option value="">-Select-</option>
                            {schools.map((school) => (
                              <option
                                key={school.school_name}
                                value={school.school_name}
                              >
                                {school.school_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Class
                          </label>
                          <br />
                          <select
                            name="className"
                            id=""
                            className="form-control"
                            value={formData.className}
                            onChange={handleChange}
                          >
                            <option value="">Select Class</option>
                            {classes.map((classVal) => (
                              <option
                                key={classVal.class}
                                value={classVal.class}
                              >
                                {classVal.class}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Section
                          </label>
                          <br />
                          <select
                            name="section"
                            id=""
                            className="form-control"
                            value={formData.section}
                            onChange={handleChange}
                          >
                            <option value="">Select Section</option>
                            <option value="1">A</option>
                            <option value="2">B</option>
                          </select>
                        </div>
                      </div>
                      {/* <div className="col-lg-6">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Student Email
                          </label>
                          <br />
                          <input
                            placeholder="Student Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                      </div> */}
                      <div className="col-lg-12">
                        &nbsp;&nbsp;&nbsp;
                        <button
                          type="submit" disabled={isSubmitting} 
                          className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0"
                          style={{
                            marginTop: "2rem !important",
                            float: "right",
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddStudent;
