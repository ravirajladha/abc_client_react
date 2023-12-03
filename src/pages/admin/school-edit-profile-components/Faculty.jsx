import React, { useState } from "react";

function Faculty() {
  const [facultyInfo, setFacultyInfo] = useState("");
  const [facultyImages, setFacultyImages] = useState([]);

  const handleFacultyInfoChange = (e) => {
    setFacultyInfo(e.target.value);
  };
  const handleFacultyImagesChange = (e) => {
    setFacultyImages([...e.target.files]);
  };
  return (
    <>
      <div className="card-box">
        <div className="card-head">
          <h4 className="font-xs mont-font fw-600">Faculty</h4>
        </div>

        <div className="card-body row">
          <div className="col-md-12 col-sm-12">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Faculty<span>*</span>
              </label>
              <br />
              <textarea
                className="form-control"
                id="oodles_editor10"
                rows="4"
                cols="60"
                name="faculty_info"
                value={facultyInfo}
                onChange={handleFacultyInfoChange}
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
                name="faculty_images[]"
                multiple
                onChange={handleFacultyImagesChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Faculty;
