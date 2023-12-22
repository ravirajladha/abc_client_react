import React, { useState, useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppHeader from "../../components/includes/AppHeader.jsx";
import { useContext } from "react";
import { AuthContext } from "../../lib/AuthContext.js";
import BackButton from "../../components/navigation/BackButton.jsx";

function ParentAddStudent() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const user = useContext(AuthContext).user;
  const [classes, setClasses] = useState([]);
  const [schools, setSchools] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const getAllClasses = async () => {
    try {
      const response = await fetch(baseUrl + "api/school/api_get_classes");
      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };
  const getAllSchools = async () => {
    try {
      const response = await fetch(baseUrl + "api/school/api_get_schools");
      const data = await response.json();
      setSchools(data);
    } catch (error) {
      console.error("Error fetching schools:", error);
    }
  };
  useEffect(() => {
    getAllClasses();
    getAllSchools();
  }, []);
    // Define the initial formData state with empty values or derived from user if available
    const [formData, setFormData] = useState({
      created_by: user.user.id,
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
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
  
      console.log(formData);
      // Access the form data
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
  console.log("dprdata",formDataToSend);
      try {
        const response = await fetch(baseUrl + "api/add_student", {
          method: "POST",
          body: formDataToSend,
        });
  
        if (response.ok) {
          // Handle success
          setFormSubmitted(true);
          toast.success("Student added successfully!");
          // Clear form values after successful submission
          setFormData({
            created_by: "",
            name: "",
            school: "",
            className: "",
            section: "",
          });
        } else {
          // Handle errors here if needed
          toast.error("Error adding student.");
        }
      } catch (error) {
        console.error("Error adding student:", error);
      } finally {
        setIsSubmitting(false); // Re-enable the submit button
      }
    };
  if (!user) {
    console.log("No user found. User might be logged out.");
    // Handle the redirect to login or return placeholder content here
    return <div>User is not logged in</div>;
  }

  return (
    <div>
   
          <div className="middle-sidebar-bottom">
            <div className="middle-sidebar-left">
            <div className="row">
            <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                  <h2 className="fw-400 font-lg d-block">
                    Add <b> Student</b>
                  </h2>
                  <div className="float-right">
                    <BackButton />
                  </div>
                  </div>
                  </div>
              <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                <div className="card-body p-4 w-100 border-0 d-flex rounded-lg justify-content-between">
                  <ToastContainer />
                </div>
                <div></div>
                <div className="card-body p-lg-5 p-4 w-100 border-0">
                  <form method="post" encType="multipart/form-data" 
                    onSubmit={handleSubmit}
                    >
                    <div className="row mb-6">
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
                            <option value="">Select School</option>
                            {schools.map((school) => (
                              <option
                                key={school.auth_id}
                                value={school.auth_id}
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
                                key={classVal.id}
                                value={classVal.id}
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
                           <select name="section" id="" className="form-control"
                           value={formData.section}
                           onChange={handleChange}>
                           <option value="">Select Section</option>
                          <option value="1">A</option>
                          <option value="2">B</option>
                          </select>
                        </div>
                      </div>
                      {/* <div className="col-lg-12">
                        &nbsp;&nbsp;&nbsp;
                        <h4 className="font-md fw-500 text-right text-muted">
                          ₹9999/Year
                        </h4>
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
                          Register Student
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
  
  );
}

export default ParentAddStudent;
