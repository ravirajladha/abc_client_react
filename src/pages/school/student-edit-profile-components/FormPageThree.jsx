import React, { useState, useEffect } from "react";

function FormPageThree({ formData, onSubmit, goToNextForm, goToPreviousForm }) {
  const [formState, setFormState] = useState(
    formData.formThreeData || {
      siblings: "",
      annual_income: "",
      father_name: "",
      f_phone: "",
      f_email_id: "",
      mother_name: "",
      m_phone: "",
    }
  );

  // Set initial form values based on formData prop when the component mounts
  useEffect(() => {
    if (formData) {
      setFormState(formData);
    }
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("formPageThreeData", JSON.stringify(formState));
  }, [formState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSubmit(formState);
    goToNextForm();
  };

  return (
    <>
      <div className="rounded-lg overflow-hidden">
        <div className="mb-4">
          <h2 className="fw-400 font-lg d-block">
            <b>Family Information</b>
          </h2>
        </div>
        <div>
          <form encType="multipart/form-data" onSubmit={handleSave}>
            <div className="row mb-4">
              {/* Siblings and Annual Income */}
              <div className="col-lg-6">
                <label className="mont-font fw-600 font-xsss">
                  Number of Siblings
                </label>
                <input
                  type="text"
                  name="siblings"
                  className="form-control"
                  placeholder="Enter number of siblings"
                  value={formState.siblings}
                  onChange={handleChange}
                />
              </div>
              <div className="col-lg-6">
                <label className="mont-font fw-600 font-xsss">
                  Family Annual Income
                </label>
                <input
                  type="text"
                  name="annual_income"
                  className="form-control"
                  placeholder="Enter annual income"
                  value={formState.annual_income}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Father/Mother Details */}
            <h4 className="font-weight-bold">Father/Mother Details</h4>
            <br />
            <div className="row mb-4">
              <div className="col-lg-6">
                <label className="mont-font fw-600 font-xsss">
                  Father Name as per Aadhar
                </label>
                <input
                  type="text"
                  name="father_name"
                  className="form-control"
                  placeholder="Enter father's name"
                  value={formState.father_name}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-6">
                <label className="mont-font fw-600 font-xsss">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="f_phone"
                  className="form-control"
                  placeholder="Enter mobile number"
                  value={formState.f_phone}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4">
                <label className="mont-font fw-600 font-xsss">Email Id</label>
                <input
                  type="email"
                  name="f_email_id"
                  className="form-control"
                  placeholder="Enter email id"
                  value={formState.f_email_id}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Guardian Details */}
            <h5 className="font-weight-bold">Guardian Details</h5>
            <br />
            <div className="row mb-4">
              <div className="col-lg-6">
                <label className="mont-font fw-600 font-xsss">
                  Name as per Aadhar
                </label>
                <input
                  type="text"
                  name="mother_name"
                  className="form-control"
                  placeholder="Enter mother's name"
                  value={formState.mother_name}
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-4">
                <label className="mont-font fw-600 font-xsss">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="m_phone"
                  className="form-control"
                  placeholder="Enter mobile number"
                  value={formState.m_phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="text-right position-absolute mb-5 fixed-bottom">
              <button
                type="button"
                className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0"
                onClick={goToPreviousForm}
              >
                Previous
              </button>
              <button
                type="submit"
                name="family_submit"
                className="btn bg-success text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0 ml-2"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default FormPageThree;
