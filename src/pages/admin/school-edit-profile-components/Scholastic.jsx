import React, { useState } from "react";

function Scholastic() {
  const [scholasticType, setScholasticType] = useState("");
  const [scholasticInfo, setScholasticInfo] = useState("");

  const handleScholasticTypeChange = (e) => {
    setScholasticType(e.target.value);
  };
  const handleScholasticInfoChange = (e) => {
    setScholasticInfo(e.target.value);
  };
  return (
    <>
      <div className="card-box">
        <div className="accordion" id="accordionExample">
          <div className="card-head">
            <h4 className="font-xs mont-font fw-600">Scholastic</h4>
          </div>
        </div>

        <div className="card-body row">
          <div className="col-md-12 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Scholastic<span>*</span>
              </label>
              <br />
              <select
                name="scholastic"
                className="form-control"
                value={scholasticType}
                onChange={handleScholasticTypeChange}
              >
                <option value="" disabled>
                  -Select Type-
                </option>
                <option value="1">A</option>
                <option value="2">B</option>
                <option value="3">C</option>
              </select>
            </div>
          </div>

          <div className="col-md-12 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Scholastic Info<span>*</span>
              </label>
              <br />
              <textarea
                className="form-control"
                id="oodles_editor4"
                rows="1"
                cols="12"
                name="scholastic_info"
                value={scholasticInfo}
                onChange={handleScholasticInfoChange}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Scholastic;
