import React, { useState, useEffect, useRef } from "react";
import BackButton from "../../components/navigation/BackButton";
import Loader from "../../components/common/Loader.jsx";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import "datatables.net";

function Payments() {
  const tableRef = useRef(null);
  // Use state to track loading state
  const [loading, setLoading] = useState(true);

  // Simulating an asynchronous operation (e.g., fetching data)
  useEffect(() => {
    const fetchData = async () => {
      // Simulate delay for 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
      initializeDataTable();
    };

    fetchData();
  }, []);

  const initializeDataTable = () => {
    $(tableRef.current).DataTable();
  };

  return (
    <>
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
            {/* Display loader when loading is true */}
            {loading && <Loader />}

            {/* Display content when loading is false */}
            {!loading && (
              <div className="col-lg-12 mb-3">
                <div className="table-content table-responsive">
                  <table className="table text-center" ref={tableRef}>
                    <thead className="bg-greyblue rounded-lg">
                      <tr>
                        <th className="border-0 p-4 text-left">Sl No.</th>
                        <th className="border-0 p-4">Parent Id</th>
                        <th className="border-0 p-4">Parent Name</th>
                        <th className="border-0 p-4">Student Id</th>
                        <th className="border-0 p-4">Student Name</th>
                        <th className="border-0 p-4">
                          Subscription Start Date
                        </th>
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Payments;
