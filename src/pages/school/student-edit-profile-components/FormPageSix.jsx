import React, { useState } from "react";

const FormPageSix = () => {
  const [description, setDescription] = useState("");
  const [hobby, setHobby] = useState("");
  const [achievements, setAchievements] = useState("");
  const [motherTongue, setMotherTongue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic for form submission here
    // You can use the state variables: description, hobby, achievements, motherTongue
  };

  return (
    <div className="card d-block w-100 border-0 rounded-lg overflow-hidden">
      <div className="card-body mb-3 pb-0">
        <h2 className="fw-400 font-lg d-block"><b>About yourself</b></h2>
      </div>
      <div className="card-body pb-0">
        <div className="row">
          <div className="col-xl-12">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-6 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Say about yourself
                    </label>
                    <input
                      type="text"
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-6 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Hobbies (Select multiple which ever is applicable)
                    </label>
                    <select
                      className="form-control mdl-textfield__input"
                      name="hobby"
                      id="select_change"
                      placeholder=""
                      value={hobby}
                      onChange={(e) => setHobby(e.target.value)}
                      required
                    >
                      <option value="">-Select-</option>
                      <option value="abcd">abcd</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Add Achievements
                    </label>
                    <input
                      type="text"
                      name="achievements"
                      value={achievements}
                      onChange={(e) => setAchievements(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-6 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Enter Mother Tongue
                    </label>
                    <input
                      type="text"
                      name="mother_tongue"
                      value={motherTongue}
                      onChange={(e) => setMotherTongue(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <button
                    type="submit"
                    name="about_submit"
                    value="1"
                    className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0"
                  >
                    save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPageSix;
