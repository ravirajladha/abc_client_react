import React, { useState } from "react";

function SchoolDocuments() {
  const [mou, setMou] = useState(null);
  const [nda, setNda] = useState(null);
  const [declarationForm, setDeclarationForm] = useState(null);
  const [otherDocument, setOtherDocument] = useState(null);

  const handleMouChange = (e) => setMou(e.target.files[0]);
  const handleNdaChange = (e) => setNda(e.target.files[0]);
  const handleDeclarationFormChange = (e) =>
    setDeclarationForm(e.target.files[0]);
  const handleOtherDocumentChange = (e) => setOtherDocument(e.target.files[0]);

  return (
    <>
      <div className="card-box">
        <div className="card-head">
          <h4 className="font-xs mont-font fw-600">School Documents</h4>
        </div>
        <div className="card-body row">
          <div className="col-md-6 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Upload MOU<span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="file"
                onChange={handleMouChange}
              />
            </div>
          </div>

          <div className="col-md-6 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Upload NDA<span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="file"
                onChange={handleNdaChange}
              />
            </div>
          </div>

          <div className="col-md-6 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Upload Declaration Form<span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="file"
                onChange={handleDeclarationFormChange}
              />
            </div>
          </div>

          <div className="col-md-6 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Upload Other Documents<span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="file"
                onChange={handleOtherDocumentChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SchoolDocuments;
