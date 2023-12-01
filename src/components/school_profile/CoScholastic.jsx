import React, { useState } from "react";

function CoScholastic() {
  const [coScholasticType, setCoScholasticType] = useState("");
  const [coScholasticInfo, setCoScholasticInfo] = useState("");

  const handleCoScholasticTypeChange = (e) => {
    setCoScholasticType(e.target.value);
  };
  const handleCoScholasticInfoChange = (e) => {
    setCoScholasticInfo(e.target.value);
  };
  return (
    <>
      <div className="card-box">
        <div className="accordion" id="accordionExample">
          <div className="card-head">
            <h4 className="font-xs mont-font fw-600">Co-Scholastic</h4>
          </div>
        </div>

        <div className="card-body row">
          <div className="col-md-12 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Co-scholastic<span>*</span>
              </label>
              <br />
              <select
                name="coscholastic"
                className="form-control"
                value={coScholasticType}
                onChange={handleCoScholasticTypeChange}
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
                Co-scholastic Info<span>*</span>
              </label>
              <br />
              <textarea
                className="form-control"
                id="oodles_editor5"
                rows="1"
                cols="13"
                name="coscholastic_info"
                value={coScholasticInfo}
                onChange={handleCoScholasticInfoChange}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CoScholastic;
