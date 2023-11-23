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
import Appheader from "../../components/schoolComponents/Appheader";
import Appfooter from "../../components/schoolComponents/Appfooter";
import Topbar from "../../components/subAdminComponents/Topbar";
import { useNavigate } from "react-router-dom";

function AddStudent() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [schools, setSchools] = useState([]);
  const [classes, setClasses] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  // Call the function to fetch schools
  useEffect(() => {
    getAllClasses();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    school: "",
    className: "",
    section: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Access the form data
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    // Perform your logic for sending the student data
    fetch(baseUrl + "api/school/add_student", {
      method: "POST",
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success
        console.log("Student added successfully", data);

        setFormSubmitted(true);

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
      });
  };

  const navigate = useNavigate();

  const navigateToTeacherPage = () => {
    navigate(`${process.env.PUBLIC_URL}/school/students`);
  };

  useEffect(() => {
    if (formSubmitted) {
      navigateToTeacherPage();
    }
  }, [formSubmitted]);

  return (
    <div>
      <div className="main-wrapper">
        <div className="main-content menu-active">
          <Appheader />
          <div className="middle-sidebar-bottom">
            <div className="middle-sidebar-left">
              <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                <div className="card-body p-4 w-100 border-0 d-flex rounded-lg justify-content-between">
                  <h2 className="fw-400 font-lg d-block">
                    Add <b> Student</b>
                  </h2>
                  <Breadcrumb style={{ padding: "0.25rem 1rem" }}>
                    <Breadcrumb.Item href="#">
                      <i className="fa fa-home"></i>&nbsp;Home&nbsp;
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="#">
                      Course&nbsp;<i className="fa fa-angle-right"></i>
                    </Breadcrumb.Item>
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
                      <div className="col-lg-6">
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
                      <div className="col-lg-6">
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
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            className
                          </label>
                          <br />
                          <select
                            name="className"
                            id=""
                            className="form-control"
                            value={formData.className}
                            onChange={handleChange}
                          >
                            <option value="">-Select-</option>
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
                      <div className="col-lg-6">
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
                            <option value="">-Select-</option>
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
                          type="submit"
                          className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0"
                          style={{
                            marginTop: "2rem !important",
                            float: "right",
                          }}
                        >
                          save
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
