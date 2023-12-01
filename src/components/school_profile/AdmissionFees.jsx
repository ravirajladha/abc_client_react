import React, { useState } from "react";

function AdmissionFees() {
  const [admissionFee, setAdmissionFee] = useState("");
  const handleAdmissionFeeChange = (e) => { setAdmissionFee(e.target.value); };

  return (
    <>
      <div className="card-box">
        <div className="accordion" id="accordionExample">
          <div className="card-head">
            <h4 className="font-xs mont-font fw-600">Admission & Fees</h4>
          </div>
        </div>

        <div className="card-body row">
          <div className="col-md-12 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Admission & Fees<span>*</span>
              </label>
              <br />
              <textarea
                className="form-control"
                id="oodles_editor2"
                rows="1"
                cols="10"
                name="admission_fee"
                value={admissionFee}
                onChange={handleAdmissionFeeChange}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdmissionFees;
