import React, { useState } from "react";

function AdmissionProcedure() {
  const [modeOfAdmission, setModeOfAdmission] = useState("");
  const [howToApply, setHowToApply] = useState("");

  const handleModeOfAdmissionChange = (e) => {
    setModeOfAdmission(e.target.value);
  };
  const handleHowToApplyChange = (e) => {
    setHowToApply(e.target.value);
  };
  return (
    <>
      <div className="card-box">
        <div className="card-head">
          <h4 className="font-xs mont-font fw-600">Admission & Procedure</h4>
        </div>

        <div className="card-body row">
          <div className="col-md-12 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Application Mode<span>*</span>
              </label>
              <br />
              <select
                name="mode_of_admission"
                className="form-control"
                value={modeOfAdmission}
                onChange={handleModeOfAdmissionChange}
              >
                <option value="" disabled>
                  -Select Type-
                </option>
                <option value="1">Online</option>
                <option value="2">Offline</option>
                <option value="3">Both</option>
              </select>
            </div>
          </div>

          <div className="col-md-12 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                How to apply?<span>*</span>
              </label>
              <br />
              <textarea
                className="form-control"
                id="oodles_editor3"
                rows="2"
                cols="60"
                name="how_to_apply"
                value={howToApply}
                onChange={handleHowToApplyChange}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdmissionProcedure;
