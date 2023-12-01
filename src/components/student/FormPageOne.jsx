import React from "react";

const FormPageOne = () => {
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
                />
              </div>
            </div>

            {/* Checkbox for WhatsApp same as phone */}
            <div className="col-lg-1 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss"></label>
                <br />
                <input
                  type="checkbox"
                  name="same_as_phone"
                  className="form-control mt-1"
                />
              </div>
            </div>

            {/* DOB as per Aadhar */}
            <div className="col-lg-6 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  DOB as Aadhaar
                </label>
                <input type="date" name="dob" className="form-control" />
              </div>
            </div>

            {/* Gender */}
            <div className="col-lg-6 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Gender</label>
                <select className="form-control" name="gender">
                  <option value="">-Select-</option>
                  {/* Populate options */}
                </select>
              </div>
            </div>

            {/* Religion */}
            <div className="col-lg-4 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Religion</label>
                <select className="form-control" name="religion">
                  <option value="">-Select-</option>
                  {/* Populate options */}
                </select>
              </div>
            </div>

            {/* Category */}
            <div className="col-lg-4 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Category</label>
                <select className="form-control" name="category">
                  <option value="">-Select-</option>
                  {/* Populate options */}
                </select>
              </div>
            </div>

            {/* Physically Challenged */}
            <div className="col-lg-4 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Physically Challenged
                </label>
                <select className="form-control" name="physically">
                  <option value="">-Select-</option>
                  {/* Populate options */}
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
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="col-lg-12 text-right">
              <button
                type="submit"
                name="personal_submit"
                className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0"
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
