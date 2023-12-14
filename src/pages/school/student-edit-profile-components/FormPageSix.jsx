import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast styles
const baseUrl = process.env.REACT_APP_BASE_URL;

const FormPageSix = ({ allFormData, formData, onSubmit, goToPreviousForm }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    description: "",
    hobby: "",
    achievements: "",
    motherTongue: "",
  });

  const userData = localStorage.getItem("rexkod_user");
  const userObject = JSON.parse(userData);
  const createdBy = userObject?.user?.id;

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (formData) {
      setFormState(formData);
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (const key in allFormData.formOneData) {
      const value = allFormData.formOneData[key] ?? "";
      formData.append(key, value);
    }

    for (const key in allFormData.formThreeData) {
      formData.append(key, allFormData.formThreeData[key]);
    }

    for (const key in allFormData.formFourData) {
      formData.append(key, allFormData.formFourData[key]);
    }

    for (const key in formState) {
      formData.append(key, formState[key]);
    }

    formData.append("auth_id", id);
    formData.append("created_by", createdBy);

    fetch(baseUrl + "api/school/edit_student_profile/" + id, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => {
        console.log("Form submitted successfully:", data);
        setIsSubmitted(true);

        localStorage.removeItem("formPageOneData");
        localStorage.removeItem("formPageThreeData");
        localStorage.removeItem("formPageFourData");
        localStorage.removeItem("formPageSixData");

        toast.success("Form submitted successfully!", {
          autoClose: 3000,
        });

        setTimeout(() => {
          navigate("/school/students");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  const handlePrevious = () => {
    goToPreviousForm();
  };

  return (
    <>
      <h2 className="fw-400 font-lg d-block mb-4">
        <b>About yourself</b>
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-6 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Say about yourself
              </label>
              <input
                type="text"
                name="description"
                value={formState.description}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter about yourself"
              />
            </div>
          </div>
          <div className="col-lg-6 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Hobbies (Select multiple which ever is applicable)
              </label>
              <input
                type="text"
                name="hobby"
                value={formState.hobby}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your hobbies"
              />
            </div>
          </div>
          <div className="col-lg-6 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Add Achievements
              </label>
              <input
                type="text"
                name="achievements"
                value={formState.achievements}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your Achievements"
              />
            </div>
          </div>
          <div className="col-lg-6 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Enter Mother Tongue
              </label>
              <input
                type="text"
                name="motherTongue"
                value={formState.motherTongue}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your mother tongue"
              />
            </div>
          </div>
          <div className="col-lg-12 my-4 d-flex justify-content-end position-absolute fixed-bottom">
            <button
              type="button"
              onClick={handlePrevious}
              className="btn bg-current text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0"
            >
              Previous
            </button>
            <button
              type="submit"
              name="about_submit"
              value="1"
              className="btn bg-success text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0 ml-2"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      <ToastContainer autoClose={3000} />
    </>
  );
};

export default FormPageSix;
