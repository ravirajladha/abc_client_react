import React, { useState } from "react";

function Achievements() {
  const [achievementInfo, setAchievementInfo] = useState("");
  const [achievementImages, setAchievementImages] = useState([]);

  const handleAchievementInfoChange = (e) => {
    setAchievementInfo(e.target.value);
  };
  const handleAchievementImagesChange = (e) => {
    setAchievementImages([...e.target.files]);
  };
  return (
    <>
      <div className="card-box">
        <div className="accordion" id="accordionExample">
          <div className="card-head">
            <h4 className="font-xs mont-font fw-600">Achievements</h4>
          </div>
        </div>

        <div className="card-body row">
          <div className="col-md-12 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Achievements<span>*</span>
              </label>
              <br />
              <textarea
                className="form-control"
                id="oodles_editor6"
                rows="1"
                cols="13"
                name="achievement_info"
                value={achievementInfo}
                onChange={handleAchievementInfoChange}
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
                name="achievement_images[]"
                multiple
                onChange={handleAchievementImagesChange}
                accept="image/*"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Achievements;
