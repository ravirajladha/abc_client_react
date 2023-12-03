import React from "react";

function FormPageThree() {
  return (
    <div className="container">
      <div className="rounded-lg overflow-hidden">
        <div className="mb-4">
          <h2 className="fw-400 font-lg d-block">
            <b>Family Information</b>
          </h2>
        </div>
        <div>
          <form encType="multipart/form-data">
            <div className="row mb-4">
              {/* Siblings and Annual Income */}
              <div className="col-lg-6">
                <label className="font-weight-bold">Number of Siblings</label>
                <input
                  type="text"
                  name="siblings"
                  className="form-control"
                  placeholder="Enter number of siblings"
                />
              </div>
              <div className="col-lg-6">
                <label className="font-weight-bold">Family Annual Income</label>
                <input
                  type="text"
                  name="annual_income"
                  className="form-control"
                  placeholder="Enter annual income"
                />
              </div>
            </div>

            {/* Father/Guardian Details */}
            <h5 className="font-weight-bold mt-4">Father/Guardian Details</h5>
            <div className="row mb-4">
              <div className="col-lg-6">
                <label className="font-weight-bold">Name as per Aadhar</label>
                <input
                  type="text"
                  name="father_name"
                  className="form-control"
                  placeholder="Enter father's name"
                />
              </div>
              <div className="col-lg-6">
                <label className="font-weight-bold">Aadhar Number</label>
                <input
                  type="text"
                  name="f_aadhar"
                  className="form-control"
                  placeholder="Enter Aadhar number"
                />
              </div>
              <div className="col-lg-4">
                <label className="font-weight-bold">Mobile Number</label>
                <input
                  type="text"
                  name="f_phone"
                  className="form-control"
                  placeholder="Enter mobile number"
                />
              </div>
              <div className="col-lg-4">
                <label className="font-weight-bold">Upload Aadhar Card</label>
                <input
                  type="file"
                  name="father_aadhar_doc"
                  className="form-control"
                />
              </div>
              <div className="col-lg-4">
                <label className="font-weight-bold">Email Id</label>
                <input
                  type="email"
                  name="f_email_id"
                  className="form-control"
                  placeholder="Enter email id"
                />
              </div>
            </div>

            {/* Mother/Guardian Details */}
            <h5 className="font-weight-bold mt-4">Mother/Guardian Details</h5>
            <div className="row mb-4">
              <div className="col-lg-6">
                <label className="font-weight-bold">Name as per Aadhar</label>
                <input
                  type="text"
                  name="mother_name"
                  className="form-control"
                  placeholder="Enter mother's name"
                />
              </div>
              <div className="col-lg-6">
                <label className="font-weight-bold">Aadhar Number</label>
                <input
                  type="text"
                  name="m_aadhar"
                  className="form-control"
                  placeholder="Enter Aadhar number"
                />
              </div>
              <div className="col-lg-4">
                <label className="font-weight-bold">Mobile Number</label>
                <input
                  type="text"
                  name="m_phone"
                  className="form-control"
                  placeholder="Enter mobile number"
                />
              </div>
              <div className="col-lg-4">
                <label className="font-weight-bold">Upload Aadhar Card</label>
                <input
                  type="file"
                  name="mother_aadhar_doc"
                  className="form-control"
                />
              </div>
              <div className="col-lg-4">
                <label className="font-weight-bold">Email Id</label>
                <input
                  type="email"
                  name="m_email_id"
                  className="form-control"
                  placeholder="Enter email id"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="text-right">
              <button
                type="submit"
                name="family_submit"
                className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormPageThree;