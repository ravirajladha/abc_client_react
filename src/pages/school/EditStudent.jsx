import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../lib/AuthContext.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import BackButton from "../../components/navigation/BackButton";

function EditStudent() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const navigate = useNavigate();
  const { schoolId, studentId } = useParams();

  const [schools, setSchools] = useState([]);
  const [classes, setClasses] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const user = useContext(AuthContext).user;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    class_id: "",
    section_id: "",
  });

  const getStudent = async () => {
    try {
      const response = await fetch(
        baseUrl + `api/get-student-details/${studentId}`
      );
      const data = await response.json();
      formData.name = data.name;
      formData.class_id = data.class_id;
      formData.section_id = data.section_id;
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    getStudent();
  }, []);

  useEffect(() => {
    getAllSchools();
    getAllClasses();
  }, [formSubmitted]);

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
  
    if (name === 'className') {
      setFormData((prevData) => ({
        ...prevData,
        class_id: value,
      }));
    } else if (name === 'section') {
      setFormData((prevData) => ({
        ...prevData,
        section_id: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const navigateOutOfEdit = () => {
    navigate(`${process.env.PUBLIC_URL}/school/students`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const response = await fetch(
        baseUrl + "api/update-student-details/" + studentId,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        setFormSubmitted(true);
        setFormData({
          name: "",
          // school: "",
          class_id: "",
          section_id: "",
        });
        toast.success("Student updated successfully!");
      } else {
        toast.error("Error updating student.");
      }
    } catch (error) {
      console.error("Error updating student:", error);
    } finally {
      setIsSubmitting(false);
      navigateOutOfEdit();
    }
  };

  if (!user) {
    console.log("No user found. User might be logged out.");
    return <div>User is not logged in</div>;
  }

  return (
    <div className="custom-middle-sidebar-bottom p-3">
      <div className="middle-sidebar-left">
        <ToastContainer autoClose={3000} />
        <div className="card-body p-4 w-100 border-0 d-flex rounded-lg justify-content-between">
          <h2 className="fw-400 font-lg d-block">
            Edit <b> Student</b>
          </h2>
          <BackButton />
        </div>
        <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
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
                <div className="col-lg-4">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">Class</label>
                    <br />
                    <select
                      name="className"
                      id=""
                      className="form-control"
                      value={formData.class_id}
                      onChange={handleChange}
                    >
                      <option value="">Select Class</option>
                      {classes.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.class}
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
                      value={formData.section_id}
                      onChange={handleChange}
                    >
                      <option value="">Select Section</option>
                      <option value="1">A</option>
                      <option value="2">B</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-12">
                  &nbsp;&nbsp;&nbsp;
                  <button
                    type="submit"
                    disabled={isSubmitting}
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
  );
}

export default EditStudent;
