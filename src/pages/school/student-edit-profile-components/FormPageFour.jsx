import React from "react";

function FormPageFour() {
  // State and event handlers for managing form inputs and submission would be implemented here

  return (
    <div className="container">
      <div className="d-block w-100 border-0 rounded-lg overflow-hidden">
        <div className="mb-3 pb-0">
          <h2 className="fw-400 font-lg d-block">
            <b>Communication Address</b>
          </h2>
        </div>
        <div className="pb-0">
          <form encType="multipart/form-data">
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
                  />
                </div>
              </div>

              {/* Village/Area/Locality */}
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Village/Area/Locality(Select Any)
                  </label>
                  <select className="form-control" name="comm_village">
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
                  />
                </div>
              </div>

              {/* Village/Area/Locality for Permanent Address */}
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Village/Area/Locality(Select Any)
                  </label>
                  <select className="form-control" name="perm_village">
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
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="col-lg-12 text-right">
                <button
                  type="submit"
                  name="address_submit"
                  className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0"
                >
                  Save
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
