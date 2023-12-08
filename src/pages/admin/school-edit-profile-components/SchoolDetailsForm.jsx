import React, { useState } from "react";

function SchoolDetailsForm() {
  const [schoolName, setSchoolName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [schoolAddress, setSchoolAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [yearOfEstablishment, setYearOfEstablishment] = useState(2022);
  const [schoolType, setSchoolType] = useState("");
  // const [studentTeacherRatio, setStudentTeacherRatio] = useState("");
  const [legalName, setLegalName] = useState("");
  const [registeredAddress, setRegisteredAddress] = useState("");
  // const [websiteLink, setWebsiteLink] = useState("");
  const [accreditedBy, setAccreditedBy] = useState("");
  const [accreditationNo, setAccreditationNo] = useState("");
  // const [recognizedBy, setRecognizedBy] = useState("");
  // const [category, setCategory] = useState("");
  const [schoolInfo, setSchoolInfo] = useState("");

  const handleSchoolNameChange = (e) => setSchoolName(e.target.value);
  const handleContactNoChange = (e) => setContactNo(e.target.value);
  const handleSchoolAddressChange = (e) => setSchoolAddress(e.target.value);
  const handlePinCodeChange = (e) => setPinCode(e.target.value);
  const handleCityChange = (e) => setCity(e.target.value);
  const handleStateChange = (e) => setState(e.target.value);
  const handleYearOfEstablishmentChange = (e) =>
    setYearOfEstablishment(e.target.value);
  const handleSchoolTypeChange = (e) => setSchoolType(e.target.value);
  // const handleStudentTeacherRatioChange = (e) =>
  //   setStudentTeacherRatio(e.target.value);
  const handleLegalNameChange = (e) => setLegalName(e.target.value);
  const handleRegisteredAddressChange = (e) =>
    setRegisteredAddress(e.target.value);
  // const handleWebsiteLinkChange = (e) => setWebsiteLink(e.target.value);
  const handleAccreditedByChange = (e) => setAccreditedBy(e.target.value);
  const handleAccreditationNoChange = (e) => setAccreditationNo(e.target.value);
  // const handleRecognizedByChange = (e) => setRecognizedBy(e.target.value);
  // const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleSchoolInfoChange = (e) => setSchoolInfo(e.target.value);

  return (
    <>
      <div className="card-box">
        <div className="card-head">
          <h2 className="fw-400 font-lg d-block my-3 ml-3">
            <b>Personal Details</b>
          </h2>
        </div>
        <div className="card-body row">
          {/* School Name */}
          <div className="col-md-4 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Name of the School
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name of the School"
                value={schoolName}
                onChange={handleSchoolNameChange}
              />
            </div>
          </div>

          {/* School Photo */}
          <div className="col-md-4 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Choose School Photo (required)<span>*</span>
              </label>
              <br />
              {/* File input handler to be implemented */}
              <input
                className="form-control"
                type="file"
                id="maxStu"
                name="school_image"
                required
              />
            </div>
          </div>

          {/* Contact No */}
          <div className="col-md-4 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Contact No<span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="text"
                placeholder="Enter Contact No"
                value={contactNo}
                onChange={handleContactNoChange}
                maxLength="10"
              />
            </div>
          </div>

          {/* Location / Address */}
          <div className="col-md-3 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Location / Address<span>*</span>
              </label>
              <br />
              <input
                type="text"
                className="form-control"
                placeholder="Enter Location / Address"
                value={schoolAddress}
                onChange={handleSchoolAddressChange}
              />
            </div>
          </div>

          {/* Pin Code */}
          <div className="col-md-3 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Pin Code<span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="text"
                placeholder="Enter Pin Code"
                value={pinCode}
                onChange={handlePinCodeChange}
                maxLength="6"
              />
            </div>
          </div>

          {/* City */}
          <div className="col-md-3 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                City<span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="text"
                placeholder="Enter City"
                value={city}
                onChange={handleCityChange}
              />
            </div>
          </div>

          {/* State */}
          <div className="col-md-3 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                State<span>*</span>
              </label>
              <br />
              <select
                className="form-control"
                value={state}
                onChange={handleStateChange}
              >
                <option value="">-Select State-</option>
                {/* State options */}
              </select>
            </div>
          </div>

          {/* Year of Establishment */}
          <div className="col-md-6 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Year of Establishment<span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="number"
                min="1900"
                max="2025"
                step="1"
                value={yearOfEstablishment}
                onChange={handleYearOfEstablishmentChange}
              />
            </div>
          </div>

          {/* School Type */}
          <div className="col-md-6 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Select School Type<span>*</span>
              </label>
              <br />
              <select
                className="form-control"
                value={schoolType}
                onChange={handleSchoolTypeChange}
              >
                <option value="">-Select Type-</option>
                {/* School type options */}
              </select>
            </div>
          </div>

          {/* Student : Teacher */}
          {/* <div className="col-md-6 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Student : Teacher<span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="text"
                placeholder="Enter Student Teacher Ratio"
                value={studentTeacherRatio}
                onChange={handleStudentTeacherRatioChange}
              />
            </div>
          </div> */}

          {/* Legal Name */}
          <div className="col-md-6 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Legal Name<span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="text"
                placeholder="Enter Legal Name"
                value={legalName}
                onChange={handleLegalNameChange}
              />
            </div>
          </div>

          {/* Registered Office Address */}
          <div className="col-md-6 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Registered Office Address<span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="text"
                placeholder="Enter Registered Office Address"
                value={registeredAddress}
                onChange={handleRegisteredAddressChange}
              />
            </div>
          </div>

          {/* Website Link */}
          {/* <div className="col-md-6 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Website Link<span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="text"
                placeholder="Enter Website Link"
                value={websiteLink}
                onChange={handleWebsiteLinkChange}
              />
            </div>
          </div> */}

          {/* Accredited By */}
          <div className="col-md-6 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Accredited By<span>*</span>
              </label>
              <br />
              <select
                className="form-control"
                value={accreditedBy}
                onChange={handleAccreditedByChange}
              >
                <option value="">-Select Type-</option>
                {/* Accreditation options */}
              </select>
            </div>
          </div>

          {/* Accreditation Number */}
          <div className="col-md-6 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Accreditation Number
              </label>
              <br />
              <input
                className="form-control"
                type="text"
                placeholder="Enter Accreditation Number"
                value={accreditationNo}
                onChange={handleAccreditationNoChange}
              />
            </div>
          </div>

          {/* Recognized By */}
          {/* <div className="col-md-6 col-md-6">
            <div className="form-group">
              <label className="">
                Recognized By<span>*</span>
              </label>
              <select
                className="form-control"
                value={recognizedBy}
                onChange={handleRecognizedByChange}
              >
                <option value="1">A</option>
                <option value="2">B</option>
                <option value="3">C</option>
              </select>
            </div>
          </div> */}

          {/* Category */}
          {/* <div className="col-md-6 col-sm-6">
            <div className="form-group">
              <label className="">
                Category (required)<span>*</span>
              </label>
              <br />
              <select
                className="form-control"
                required
                value={category}
                onChange={handleCategoryChange}
              >
                <option value="">-Select Type-</option>
                <option value="1">Pre School</option>
                <option value="2">Primary School</option>
                <option value="3">Higher Secondary School</option>
              </select>
            </div>
          </div> */}

          {/* School Info */}
          <div className="col-md-12 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                School Info<span>*</span>
              </label>
              <br />
              <textarea
                className="form-control"
                rows="3"
                cols="60"
                name="school_info"
                value={schoolInfo}
                onChange={handleSchoolInfoChange}
              ></textarea>
            </div>
          </div>

          <div className="col-lg-12">
            <button
              type="submit"
              className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0 ml-3"
              style={{ float: "right" }}
              id="submit"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SchoolDetailsForm;
