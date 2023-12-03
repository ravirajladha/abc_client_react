import React,{useState} from "react";

function Facilities() {
  const [facilityInfo, setFacilityInfo] = useState("");
  const [selectedFacility, setSelectedFacility] = useState("");
  const [facilityImages, setFacilityImages] = useState([]);

  const handleFacilityInfoChange = (e) => {
    setFacilityInfo(e.target.value);
  };
  const handleFacilityChange = (e) => {
    setSelectedFacility(e.target.value);
  };
  const handleFacilityImagesChange = (e) => {
    setFacilityImages([...e.target.files]);
  };
  return (
    <>
      <div className="card-box">
        <div className="card-head">
          <h4 className="font-xs mont-font fw-600">
            Facilities & Infrastructure
          </h4>
        </div>

        <div className="card-body row">
          <div className="col-md-12 col-sm-12">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Facilities<span>*</span>
              </label>
              <br />
              <select
                name="facility"
                className="form-control"
                value={selectedFacility}
                onChange={handleFacilityChange}
              >
                <option value="">-Select Facility-</option>
                <option value="Library">Library</option>
                <option value="Medical">Medical</option>
                <option value="Hostel">Hostel</option>
                <option value="Medical Ventilated">Medical Ventilated</option>
              </select>
            </div>
          </div>

          <div className="col-md-12 col-sm-12">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Facilities Info<span>*</span>
              </label>
              <br />
              <textarea
                className="form-control"
                id="oodles_editor7"
                rows="2"
                cols="60"
                name="facility_info"
                value={facilityInfo}
                onChange={handleFacilityInfoChange}
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
                name="facility_images[]"
                multiple
                onChange={handleFacilityImagesChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Facilities;
