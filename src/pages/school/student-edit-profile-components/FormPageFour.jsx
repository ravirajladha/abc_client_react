import React, { useState, useEffect } from "react";

function FormPageFour({ formData, onSubmit, goToNextForm, goToPreviousForm }) {
  // You can access and use the formData for this page if needed

  const [formState, setFormState] = useState(
    formData.formThreeData || {
      comm_address: "",
      comm_pin_code: "",
      comm_village: "",
      comm_block: "",
      comm_state: "",
      same_as_comm_address: "",
      perm_address: "",
      perm_pin_code: "",
      perm_village: "",
      perm_block: "",
      perm_state: "",
    }
  );
  // Add any additional state or event handlers you need for this form

  const handlePrevious = () => {
    // Call the goToPreviousForm function to navigate to the previous form
    goToPreviousForm();
  };

  // Set initial form values based on formData prop when the component mounts
  useEffect(() => {
    if (formData) {
      setFormState(formData);
    }
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("formPageFourData", JSON.stringify(formState));
  }, [formState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
    onSubmit(formState);
    goToNextForm();
  };

  return (
    <div className="container">
      <div className="d-block w-100 border-0 rounded-lg overflow-hidden">
        <div className="mb-3 pb-0">
          <h2 className="fw-400 font-lg d-block">
            <b>Communication Address</b>
          </h2>
        </div>
        <div className="pb-0">
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            {/* Token handling and form submission logic would be here */}
            <div className="row">
              {/* Communication Address and Pin Code */}
              <div className="col-lg-6 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Communication Address
                  </label>
                  <input
                    type="text"
                    name="comm_address"
                    className="form-control"
                    placeholder="Enter communication address"
                    value={formState.comm_address}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-lg-6 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Pin Code</label>
                  <input
                    type="text"
                    name="comm_pin_code"
                    className="form-control"
                    placeholder="Enter pin code"
                    value={formState.comm_pin_code}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Village/Area/Locality */}
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Village/Area/Locality(Select Any)
                  </label>
                  <select
                    className="form-control"
                    name="comm_village"
                    value={formState.comm_village}
                    onChange={handleChange}
                  >
                    {/* Options would be dynamically populated here */}
                    <option value="">--select--</option>
                    <option value="abcd">abcd</option>
                  </select>
                </div>
              </div>

              {/* Block/Taluk/Town */}
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Block/Taluk/Town
                  </label>
                  <input
                    type="text"
                    name="comm_block"
                    className="form-control"
                    placeholder="Enter block/taluk/town"
                    value={formState.comm_block}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* State */}
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">State</label>
                  <input
                    type="text"
                    name="comm_state"
                    className="form-control"
                    placeholder="Enter state"
                    value={formState.comm_state}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Checkbox for Address Same As Communication */}
              <div className="col-lg-12 mb-3">
                <div className="form-group">
                  <input
                    type="checkbox"
                    id="checkbox2"
                    className="medium"
                    name="same_as_comm_address"
                    checked={formState.same_as_comm_address}
                    value={formState.same_as_comm_address}
                    onChange={handleChange}
                  />
                  <label>
                    Are the Permanent Address same as Communication Address?
                  </label>
                </div>
              </div>

              {/* Permanent Address and Pin Code */}
              <div className="col-lg-6 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Permanent Address
                  </label>
                  <input
                    type="text"
                    name="perm_address"
                    className="form-control"
                    placeholder="Enter permanent address"
                    value={formState.perm_address}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-lg-6 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Pin Code</label>
                  <input
                    type="text"
                    name="perm_pin_code"
                    className="form-control"
                    placeholder="Enter pin code"
                    value={formState.perm_pin_code}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Village/Area/Locality for Permanent Address */}
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Village/Area/Locality(Select Any)
                  </label>
                  <select
                    className="form-control"
                    name="perm_village"
                    value={formState.perm_village}
                    onChange={handleChange}
                  >
                    {/* Options would be dynamically populated here */}
                    <option value="">--select--</option>
                    <option value="abcd">abcd</option>
                  </select>
                </div>
              </div>

              {/* Block/Taluk/Town for Permanent Address */}
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Block/Taluk/Town
                  </label>
                  <input
                    type="text"
                    name="perm_block"
                    className="form-control"
                    placeholder="Enter block/taluk/town"
                    value={formState.perm_block}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* State for Permanent Address */}
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">State</label>
                  <input
                    type="text"
                    name="perm_state"
                    className="form-control"
                    placeholder="Enter state"
                    value={formState.perm_state}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Save & Previous Button */}
              <div className="col-lg-12 text-right">
                <button
                  type="button"
                  onClick={handlePrevious} // Call the handlePrevious function
                  className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0"
                >
                  Previous
                </button>
                <button
                  type="submit"
                  name="address_submit"
                  className="btn bg-success text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0 ml-2"
                >
                  Save & Next
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormPageFour;
