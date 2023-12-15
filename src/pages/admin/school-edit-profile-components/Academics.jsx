import React, { useState } from "react";

function Academics() {
  const [academicInfo, setAcademicInfo] = useState("");
  const [academicImages, setAcademicImages] = useState([]);

  const handleAcademicInfoChange = (e) => {
    setAcademicInfo(e.target.value);
  };
  const handleAcademicImagesChange = (e) => {
    setAcademicImages([...e.target.files]);
  };
  return (
    <>
      <div className="card-box">
        <div className="card-head">
          <h4 className="font-xs mont-font fw-600">Academics</h4>
        </div>

        <div className="card-body row">
          <div className="col-md-12 col-sm-12">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Academics<span>*</span>
              </label>
              <br />
              <textarea
                className="form-control"
                id="oodles_editor9"
                rows="2"
                cols="60"
                name="academic_info"
                value={academicInfo}
                onChange={handleAcademicInfoChange}
              ></textarea>
            </div>
          </div>

          <div className="col-md-12 col-sm-12">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Insert Multiple Images{" "}
              </label>
              <br />
              <input
                className="form-control"
                type="file"
                name="academic_images[]"
                multiple
                onChange={handleAcademicImagesChange}
                accept="image/*"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Academics;
