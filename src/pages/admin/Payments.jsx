import React from "react";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
import BackButton from "../../components/navigation/BackButton";

function Payments() {
  return (
    <>
      <div className="main-wrapper">
        <div className="main-content menu-active">
          <AppHeader />

          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="middle-sidebar-left">
              <div className="row">
                <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                  <div>
                    <h2 className="fw-400 font-lg d-block">
                      All <b> Payments</b>
                    </h2>
                  </div>
                  <div className="float-right">
                    
                    <BackButton />
                  </div>
                </div>
                <div className="col-lg-12 mb-3">
                  <div className="table-content table-responsive">
                    <table className="table text-center">
                      <thead className="bg-greyblue rounded-lg">
                        <tr>
                          <th className="border-0 p-4 text-left">Sl No.</th>
                          <th className="border-0 p-4">Parent Id</th>
                          <th className="border-0 p-4">Parent Name</th>
                          <th className="border-0 p-4">Student Id</th>
                          <th className="border-0 p-4">Student Name</th>
                          <th className="border-0 p-4">Subscription Start Date</th>
                          <th className="border-0 p-4">Subscription End Date</th>
                          <th className="border-0 p-4">Amount</th>
                          <th className="border-0 p-4">Transaction Id</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AppFooter />
        </div>
      </div>
    </>
  );
}

export default Payments;
