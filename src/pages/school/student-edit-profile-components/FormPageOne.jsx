import React, { useState, useEffect } from "react";

const FormPageOne = ({ formData, onSubmit, goToNextForm }) => {
  const [formState, setFormState] = useState({
    f_name: "",
    l_name: "",
    email: "",
    phone_no: "",
    whatsapp_no: "",
    whatsapp_exist: false,
    dob: "",
    gender: "",
    religion: "",
    category: "",
    physically_challenged: "",
    aadhar: "",
    address_proof: null,
    identity_proof: null,
  });

  const [options, setOptions] = useState({
    genderOptions: ["Male", "Female", "Other"],
    religionOptions: ["Religion 1", "Religion 2", "Religion 3"],
    categoryOptions: ["Category 1", "Category 2", "Category 3"],
    physicallyChallengedOptions: ["Yes", "No"],
  });

  // Set initial form values based on formData prop when the component mounts
  useEffect(() => {
    if (formData) {
      setFormState(formData);
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, type, checked, value, files } = e.target;
    if (type === "checkbox") {
      setFormState((prev) => ({ ...prev, [name]: checked }));
      if (!checked) {
        // Clear the WhatsApp number when unchecking the checkbox
        setFormState((prev) => ({ ...prev, whatsapp_no: "" }));
      } else {
        // Copy the Mobile Number to WhatsApp when checking the checkbox
        setFormState((prev) => ({ ...prev, whatsapp_no: formState.phone_no }));
      }
    } else if (type === "file") {
      setFormState((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log(formState);
    onSubmit(formState); // Submit form data to the parent component
  };

  const handleNext = () => {
    // Go to the next form
    onSubmit(formState);
    goToNextForm();
  };

  // Save form data to local storage whenever formState changes
  useEffect(() => {
    localStorage.setItem("formPageOneData", JSON.stringify(formState));
  }, [formState]);

  const isFormComplete = () => {
    // Simple check, consider more complex validation
    return Object.values(formData).every((field) => field !== "");
  };

  return (
    <div className="container">
      <div className="mb-3 pb-0">
        <h2 className="fw-400 font-lg d-block">
          <b>Personal Details</b>
        </h2>
      </div>
      <div className="pb-0">
        <form encType="multipart/form-data">
          <div className="row">
            {/* First Name */}
            <div className="col-lg-4 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  First Name as per Aadhar
                </label>
                <input
                  type="text"
                  name="f_name"
                  className="form-control"
                  placeholder="Enter your first name"
                  value={formState.f_name} // Populate the value from formState
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* Last Name */}
            <div className="col-lg-4 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Last Name as per Aadhar
                </label>
                <input
                  type="text"
                  name="l_name"
                  className="form-control"
                  placeholder="Enter your last name"
                  value={formState.l_name} // Populate the value from formState
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* Email */}
            <div className="col-lg-4 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Email Id</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={formState.email} // Populate the value from formState
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* Mobile Number */}
            <div className="col-lg-6 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Mobile Number
                </label>
                <input
                  type="number"
                  name="phone_no"
                  className="form-control"
                  placeholder="Enter your mobile number"
                  value={formState.phone_no} // Populate the value from formState
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* WhatsApp Number */}
            <div className="col-lg-5 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">WhatsApp</label>
                <input
                  type="number"
                  name="whatsapp_no"
                  className="form-control"
                  placeholder="Enter your WhatsApp number"
                  value={formState.whatsapp_no} // Populate the value from formState
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* Checkbox for WhatsApp*/}
            <div className="col-lg-1 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss"></label>
                <br />
                <input
                  type="checkbox"
                  name="whatsapp_exist"
                  className="form-check-input p-4"
                  checked={formState.whatsapp_exist} // Populate the value from formState
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* DOB as per Aadhar */}
            <div className="col-lg-6 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  DOB as Aadhaar
                </label>
                <input
                  type="date"
                  name="dob"
                  className="form-control"
                  value={formState.dob} // Populate the value from formState
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* Gender */}
            <div className="col-lg-6 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Gender</label>
                <select
                  className="form-control"
                  name="gender"
                  value={formState.gender} // Populate the value from formState
                  onChange={handleChange}
                >
                  <option value="">-Select-</option>
                  {options.genderOptions.map((gender, index) => (
                    <option key={index} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Religion */}
            <div className="col-lg-4 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Religion</label>
                <select
                  className="form-control"
                  name="religion"
                  value={formState.religion} // Populate the value from formState
                  onChange={handleChange}
                >
                  <option value="">-Select-</option>
                  {options.religionOptions.map((religion, index) => (
                    <option key={index} value={religion}>
                      {religion}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Category */}
            <div className="col-lg-4 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Category</label>
                <select
                  className="form-control"
                  name="category"
                  value={formState.category} // Populate the value from formState
                  onChange={handleChange}
                >
                  <option value="">-Select-</option>
                  {options.categoryOptions.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Physically Challenged */}
            <div className="col-lg-4 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Physically Challenged
                </label>
                <select
                  className="form-control"
                  name="physically_challenged"
                  value={formState.physically_challenged} // Populate the value from formState
                  onChange={handleChange}
                >
                  <option value="">-Select-</option>
                  {options.physicallyChallengedOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Aadhar Number */}
            <div className="col-lg-4 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Aadhaar Number
                </label>
                <input
                  type="number"
                  name="aadhar"
                  className="form-control"
                  maxLength="12"
                  placeholder="XXXXXXXXXXXX"
                  value={formState.aadhar} // Populate the value from formState
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* Address Proof */}
            <div className="col-lg-4 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Address Proof
                </label>
                <input
                  type="file"
                  name="address_proof"
                  className="form-control"
                  style={{ lineHeight: "30px" }}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* Identity Proof */}
            <div className="col-lg-4 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Identity Proof
                </label>
                <input
                  type="file"
                  name="identity_proof"
                  className="form-control"
                  style={{ lineHeight: "30px" }}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Save & Next Button */}
            <div className="col-lg-12 text-right">
              <button
                onClick={handleNext}
                className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0"
              >
                Next
              </button>
              <button
                // type="submit"
                onClick={handleSave}
                className="btn bg-success text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0 ml-2"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPageOne;
