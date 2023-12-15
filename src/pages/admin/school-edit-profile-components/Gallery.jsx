import React, { useState } from "react";

function Gallery() {
  const [galleryImages, setGalleryImages] = useState([]);

  const handleImageChange = (e) => {
    setGalleryImages([...e.target.files]);
  };
  return (
    <>
      <div className="card-box">
        <div className="card-head">
          <h4 className="font-xs mont-font fw-600">Gallery</h4>
        </div>
        <div className="card-body row">
          <div className="col-md-12 col-sm-12">
            <div>
              <label className="mont-font fw-600 font-xsss">
                Insert Multiple Images
              </label>
              <br />
              <input
                className="form-control"
                type="file"
                name="gallery[]"
                multiple
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Gallery;
