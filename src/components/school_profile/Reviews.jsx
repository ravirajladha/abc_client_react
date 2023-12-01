import React, { useState } from "react";

function Reviews() {
  const [reviews, setReviews] = useState({
    review_academic: false,
    review_faculty: false,
    review_infra: false,
    review_nonacademic: false,
    review_school: false,
  });

  const handleCheckboxChange = (e) => {
    setReviews({
      ...reviews,
      [e.target.name]: e.target.checked,
    });
  };
  return (
    <>
      <div className="card-box">
        <div className="card-head">
          <h4 className="font-xs mont-font fw-600">Reviews</h4>
        </div>

        <div className="card-body row">
          <div>Select following parameters for visibility.</div>
          <div className="row form-group multiple-form-group input-group">
            <br />
            <div className="col-md-2">
              <br />
              <input
                type="checkbox"
                name="review_academic"
                value="1"
                checked={reviews.review_academic}
                onChange={handleCheckboxChange}
              />
              <label className="mont-font fw-600 font-xsss">Academic</label>
            </div>

            <div className="col-md-2">
              <br />
              <input
                type="checkbox"
                name="review_faculty"
                value="1"
                checked={reviews.review_faculty}
                onChange={handleCheckboxChange}
              />
              <label className="mont-font fw-600 font-xsss">Faculty </label>
            </div>

            <div className="col-md-2">
              <br />
              <input
                type="checkbox"
                name="review_infra"
                value="1"
                checked={reviews.review_infra}
                onChange={handleCheckboxChange}
              />
              <label className="mont-font fw-600 font-xsss">
                Infrastructure
              </label>
            </div>

            <div className="col-md-3">
              <br />
              <input
                type="checkbox"
                name="review_nonacademic"
                value="1"
                checked={reviews.review_nonacademic}
                onChange={handleCheckboxChange}
              />
              <label className="mont-font fw-600 font-xsss">
                Non Academic Activities
              </label>
            </div>

            <div className="col-md-2">
              <br />
              <input
                type="checkbox"
                name="review_school"
                value="1"
                checked={reviews.review_school}
                onChange={handleCheckboxChange}
              />
              <label className="mont-font fw-600 font-xsss">School</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reviews;
