import React from "react";

const FormPageFive = () => {
  return (
    <div className="card d-block w-100 border-0 rounded-lg overflow-hidden">
      <div className="card-body mb-3 pb-0">
        <h2 className="fw-400 font-lg d-block">
          <b>Bank Details of Parent/Guardian</b>
        </h2>
      </div>
      <div className="card-body pb-0">
        <div className="row">
          <div className="col-xl-12">
            <form
              action="/add_profile"
              method="post"
              enctype="multipart/form-data"
            >
              <div className="row">
                {/* Bank Name */}
                <div className="col-lg-6 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      name="bank_name"
                      value={""}
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Bank's Branch Name */}
                <div className="col-lg-6 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Bank's Branch Name
                    </label>
                    <input
                      type="text"
                      name="bank_branch"
                      value={""}
                      className="form-control"
                    />
                  </div>
                </div>

                {/* IFSC Code */}
                <div className="col-lg-6 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      IFSC Code
                    </label>
                    <input
                      type="text"
                      name="ifsc_code"
                      value={""}
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Upload Bank Passbook/Statement/Cancelled Cheque */}
                <div className="col-lg-6 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Upload Bank Passbook/Statement/Cancelled Cheque
                    </label>
                    <input
                      type="file"
                      name="passbook_statement"
                      className="form-control"
                      style={{ lineHeight: "30px" }}
                      accept="image/*,.pdf"
                    />
                  </div>
                </div>

                {/* Savings Bank Account Number */}
                <div className="col-lg-6 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Savings Bank Account Number
                    </label>
                    <input
                      type="text"
                      name="account_no"
                      value={""}
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Re-enter Savings Bank Account Number */}
                <div className="col-lg-6 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Re-enter Savings Bank Account Number
                    </label>
                    <input
                      type="text"
                      name="re_account_no"
                      value={""}
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Enter name as per Passbook */}
                <div className="col-lg-12 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Enter name as per Passbook
                    </label>
                    <input
                      type="text"
                      name="name_as_per_bank"
                      value={""}
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Save Button */}
                <div className="col-lg-12 mb-3">
                  <button
                    type="submit"
                    name="bank_submit"
                    value="1"
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
    </div>
  );
};

export default FormPageFive;
