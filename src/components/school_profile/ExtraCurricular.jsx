import React,{useState} from "react";

function ExtraCurricular() {
  const [extraCurricularInfo, setExtraCurricularInfo] = useState("");
  const [extraCurricularImages, setExtraCurricularImages] = useState([]);

  const handleExtraCurricularInfoChange = (e) => {
    setExtraCurricularInfo(e.target.value);
  };
  const handleExtraCurricularImagesChange = (e) => {
    setExtraCurricularImages([...e.target.files]);
  };
  return (
    <>
      <div className="card-box">
        <div className="card-head">
          <h4 className="font-xs mont-font fw-600">Extra Curricular</h4>
        </div>

        <div className="card-body row">
          <div className="col-md-12 col-sm-12">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Extra Curricular<span>*</span>
              </label>
              <br />
              <textarea
                className="form-control"
                id="oodles_editor8"
                rows="2"
                cols="60"
                name="extra_curricular_info"
                value={extraCurricularInfo}
                onChange={handleExtraCurricularInfoChange}
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
                name="extra_curricular_images[]"
                multiple
                onChange={handleExtraCurricularImagesChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExtraCurricular;
