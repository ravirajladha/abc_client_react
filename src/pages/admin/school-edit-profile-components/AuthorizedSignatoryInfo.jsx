import React, { useState } from "react";

function AuthorizedSignatoryInfo() {
  const [signatoryInfo, setSignatoryInfo] = useState({
    authName: "",
    authDesignation: "",
    authAadharNo: "",
    authEmail: "",
    password: "",
    authContactNumber: "",
    authContactPerson: "",
    contactPersonDesignation: "",
    contactPersonDetails: "",
  });

  const handleChange = (e) => {
    setSignatoryInfo({
      ...signatoryInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="card-box">
        <div className="card-head">
          <h4 className="font-xs mont-font fw-600">
            Personal Information of Authorized Signatory
          </h4>
        </div>
        <div className="card-body row">
          {/* Name */}
          <div className="col-md-4 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Name<span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="text"
                name="authName"
                placeholder="Enter Name"
                required
                value={signatoryInfo.authName}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Designation */}
          <div className="col-md-4 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Designation<span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="text"
                name="authDesignation"
                placeholder="Enter Designation"
                value={signatoryInfo.authDesignation}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Aadhar Number */}
          <div className="col-md-4 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Aadhar Number<span>*</span>{" "}
              </label>
              <br />
              <input
                className="form-control"
                type="number"
                name="authAadharNo"
                placeholder="Enter Aadhar Number"
                maxLength="12"
                value={signatoryInfo.authAadharNo}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email ID */}
          <div className="col-md-4 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Email ID<span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="email"
                name="authEmail"
                placeholder="Enter Email ID"
                required
                value={signatoryInfo.authEmail}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password */}
          <div className="col-md-4 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Password<span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Enter Password"
                required
                value={signatoryInfo.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Contact Number */}
          <div className="col-md-4 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Contact Number<span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="number"
                name="authContactNumber"
                placeholder="Enter Contact Number"
                maxLength="10"
                required
                value={signatoryInfo.authContactNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* First Contact Person */}
          <div className="col-md-4 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                First Contact Person(Name)<span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="text"
                name="authContactPerson"
                placeholder="Enter First Contact Person Name"
                value={signatoryInfo.authContactPerson}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Contact Person Designation */}
          <div className="col-md-4 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Contact Person Designation<span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="text"
                name="contactPersonDesignation"
                placeholder="Enter Contact Person Designation"
                value={signatoryInfo.contactPersonDesignation}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Contact Person Details */}
          <div className="col-md-4 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Contact Person Details<span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="text"
                name="contactPersonDetails"
                placeholder="Contact Person Details"
                value={signatoryInfo.contactPersonDetails}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthorizedSignatoryInfo;
