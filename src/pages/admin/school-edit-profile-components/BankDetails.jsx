import React, { useState } from "react";

function BankDetails() {
  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    branchName: "",
    ifsc: "",
    accountNo: "",
    reAccountNo: "",
    schoolNameAsPerBank: "",
    cancelledCheque: null,
  });

  const handleInputChange = (e) => {
    setBankDetails({
      ...bankDetails,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });
  };
  
  return (
    <>
      <div className="card-box">
        <div className="card-head">
          <h4 className="font-xs mont-font fw-600">Bank Details of School</h4>
        </div>
        <div className="card-body row">
          {/* Bank Name */}
          <div className="col-md-4 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Bank Name<span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="text"
                name="bankName"
                placeholder="Enter Bank Name"
                value={bankDetails.bankName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Branch Name */}
          <div className="col-md-4 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Branch Name<span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="text"
                name="branchName"
                placeholder="Enter Branch Name"
                value={bankDetails.branchName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* IFSC */}
          <div className="col-md-4 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                IFSC<span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="text"
                name="ifsc"
                placeholder="Enter IFSC Code"
                value={bankDetails.ifsc}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Account Number */}
          <div className="col-md-3 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Account Number<span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="number"
                name="accountNo"
                placeholder="Enter Account Number"
                value={bankDetails.accountNo}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Re-Account Number */}
          <div className="col-md-3 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Re-Account Number<span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="number"
                name="reAccountNo"
                placeholder="Enter the Account Number to Verify"
                value={bankDetails.reAccountNo}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Name of Institute as per Bank Records */}
          <div className="col-md-6 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Name of Institute as per Bank Records
                <span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="text"
                name="schoolNameAsPerBank"
                placeholder="Enter the Name of Institute as per Bank Records"
                value={bankDetails.schoolNameAsPerBank}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Upload Cancelled Cheque */}
          <div className="col-md-12 col-sm-6">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                Upload Cancelled Cheque/ Bank statement
                <span>*</span>
              </label>
              <br />
              <input
                className="form-control"
                type="file"
                name="cancelledCheque"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BankDetails;
