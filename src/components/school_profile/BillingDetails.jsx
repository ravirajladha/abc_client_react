import React, { useState } from "react";

function BillingDetails() {
  const [packageDetails, setPackageDetails] = useState({
    package_name: "",
    package_cost: "",
    package_start_date: "",
    package_end_date: "",
    package_info: "",
    package_validity: "",
    package_other_detail: "",
    package_invoice: null,
    package_renewal: false,
  });

  const handlePackageDetails = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setPackageDetails({
      ...packageDetails,
      [name]: newValue,
    });
  };
  return (
    <>
      <div className="card-box">
        <div className="card-head">
          <h4 className="font-xs mont-font fw-600">Billing Detail</h4>
        </div>
        <div className="card-body row">
          <div className="col-md-3 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Package Name
                <span>
                  <label className="mont-font fw-600 font-xsss">
                    *(Renewal
                    <span></span>
                  </label>
                  &nbsp;
                  <input
                    type="checkbox"
                    id="vehicle1"
                    name="package_renewal"
                    value="1"
                    checked={packageDetails.package_renewal}
                    onChange={handlePackageDetails}
                  />
                  )
                </span>
              </label>
              <br />
              <input
                className="form-control"
                type="text"
                name="package_name"
                placeholder="Enter Package Name"
                value={packageDetails.package_name}
                onChange={handlePackageDetails}
              />
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Cost<span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="number"
                name="package_cost"
                placeholder="Enter Package Cost"
                value={packageDetails.package_cost}
                onChange={handlePackageDetails}
              />
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Start Date<span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="date"
                name="package_start_date"
                value={packageDetails.package_start_date}
                onChange={handlePackageDetails}
              />
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                End Date<span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="date"
                name="package_end_date"
                value={packageDetails.package_end_date}
                onChange={handlePackageDetails}
              />
            </div>
          </div>
          <div className="col-md-12 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Description<span>*</span>
              </label>
              <br />
              <textarea
                className="form-control"
                id="oodles_editor11"
                rows="4"
                cols="100"
                name="package_info"
                value={packageDetails.package_info}
                onChange={handlePackageDetails}
              ></textarea>
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <label for="list2" className="">
                Select Number of Year<span>*</span>
              </label>
              <br />
              <select
                name="package_validity"
                className="form-control"
                value={packageDetails.package_validity}
                onChange={handlePackageDetails}
              >
                <option value="">-Select Year-</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Add-ons<span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="text"
                name="package_other_detail"
                id="package_other_detail"
                placeholder="Additional service details"
                value={packageDetails.package_other_detail}
                onChange={handlePackageDetails}
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Upload Document / Invoice <span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="file"
                id="maxStu"
                name="package_invoice"
                onChange={handlePackageDetails}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BillingDetails;
