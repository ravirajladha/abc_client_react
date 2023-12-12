import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast styles
const baseUrl = process.env.REACT_APP_BASE_URL;

const FormPageSix = ({ allFormData, onSubmit, goToPreviousForm }) => {
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

  // Load form data from local storage on component mount
  useEffect(() => {
    const savedFormState = localStorage.getItem("formPageSixData");
    if (savedFormState) {
      setFormState(JSON.parse(savedFormState));
    }
  }, []);

  // Save form data to local storage whenever formState changes
  useEffect(() => {
    localStorage.setItem("formPageSixData", JSON.stringify(formState));
  }, [formState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object
    const formData = new FormData();

    // Add data from FormPageOne
    for (const key in allFormData.formOneData) {
      const value = allFormData.formOneData[key] ?? ""; // Default to empty string if null/undefined
      formData.append(key, value);
    }

    // Add data from FormPageThree
    for (const key in allFormData.formThreeData) {
      formData.append(key, allFormData.formThreeData[key]);
    }

    // Add data from FormPageFour
    for (const key in allFormData.formFourData) {
      formData.append(key, allFormData.formFourData[key]);
    }

    // Add data from FormPageSix
    for (const key in formState) {
      formData.append(key, formState[key]);
    }

    formData.append("auth_id", id);
    formData.append("created_by", createdBy);
    for (let [key, value] of formData.entries()) {
      console.log("final:",`${key}: ${value}`);
    }
  
    // Send the FormData to the API endpoint using a POST request
    fetch(baseUrl + "api/school/edit_student_profile/" + id, {
      method: "POST",
      body: formData, // Send the FormData object
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

        // Clear the local storage for the form data
        localStorage.removeItem("formPageOneData");
        localStorage.removeItem("formPageThreeData");
        localStorage.removeItem("formPageFourData");
        localStorage.removeItem("formPageSixData");

        // Display a success toast message
        toast.success("Form submitted successfully!", {
          autoClose: 3000, // Toast will auto-close after 3 seconds
        });

        // Use navigate to go to the students page after a delay
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
    <div className="card d-block w-100 border-0 rounded-lg overflow-hidden">
      <div className="card-body mb-3 pb-0">
        <h2 className="fw-400 font-lg d-block">
          <b>About yourself</b>
        </h2>
      </div>
      <div className="card-body pb-0">
        <div className="row">
          <div className="col-xl-12">
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
                    />
                  </div>
                </div>
                <div className="col-lg-12">
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
          </div>
        </div>
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default FormPageSix;
