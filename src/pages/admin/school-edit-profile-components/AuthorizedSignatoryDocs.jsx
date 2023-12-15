import React, { useState } from "react";

function AuthorizedSignatoryDocs() {
  const [signatoryDocuments, setSignatoryDocuments] = useState({
    signatoryAadhar: null,
    authImage: null,
  });

  const handleFileChange = (e) => {
    setSignatoryDocuments({
      ...signatoryDocuments,
      [e.target.name]: e.target.files[0],
    });
  };
  return (
    <>
      <div className="card-box">
        <div className="card-head">
          <h4 className="font-xs mont-font fw-600">
            Authorized Signatory Documents
          </h4>
        </div>
        <div className="card-body row">
          {/* Upload Aadhar Copy */}
          <div className="col-md-6 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Upload Aadhar Copy of Authorized Signatory
                <span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="file"
                name="signatoryAadhar"
                onChange={handleFileChange}
                accept="image/*,.pdf"
              />
            </div>
          </div>

          {/* Upload Image */}
          <div className="col-md-6 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Upload Image of Authorized Signatory
                <span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="file"
                name="authImage"
                onChange={handleFileChange}
                accept="image/*,.pdf"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthorizedSignatoryDocs;
