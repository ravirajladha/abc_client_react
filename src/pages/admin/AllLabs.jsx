import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import BackButton from "../../components/navigation/BackButton";
import Loader from "../../components/common/Loader.jsx";
import NoContent from "../../components/common/NoContent.jsx";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import "datatables.net";

function AllLabs() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const tableRef = useRef();
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await fetch(baseUrl + "api/get_labs");
        const data = await response.json();
        console.log("data", data.data);
        setLabs(data.data);
        setLoading(false);
        initializeDataTable();
      } catch (error) {
        console.error("Error fetching labs:", error);
        setLoading(false);
      }
    };

    fetchLabs();
  }, []);

  // Helper function to parse language JSON
  const parseLanguage = (languageStr) => {
    try {
      const languageObj = JSON.parse(languageStr);
      return languageObj.value || "N/A";
    } catch (error) {
      console.error("Error parsing language JSON", error);
      return "N/A";
    }
  };

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
                  All <b> E-Labs</b>
                </h2>
              </div>
              <div className="float-right">
                <Link
                  to={"/all_labs/create-lab"}
                  className="p-2 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current mx-1"
                >
                  ADD E-LAB
                </Link>
                <BackButton />
              </div>
            </div>
            {loading ? (
              <Loader />
            ) : labs && labs.length > 0 ? (
              <div className="col-lg-12 mb-3">
                <div className="table-content table-responsive">
                  <table className="table text-center" ref={tableRef}>
                    <thead className="bg-greyblue rounded-lg">
                      <tr>
                        <th className="border-0 p-4 text-left">Id</th>
                        <th className="border-0 p-4">Problem</th>
                        <th className="border-0 p-4">Class</th>
                        <th className="border-0 p-4">Subject</th>
                        <th className="border-0 p-4">Language</th>
                        <th className="border-0 p-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {labs.map((lab, index) => (
                        <tr key={index}>
                          <td className="text-left">{lab.id}</td>
                          <td>{lab.name}</td>
                          <td>{lab.class_name}</td>
                          <td>{lab.subject_name}</td>
                          <td>{parseLanguage(lab.language)}</td>
                          <td>
                            <Link
                              to={`/all_labs/edit-e-labs/${lab.id}`}
                              className="p-2 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current mx-1"
                            >
                              Edit
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <NoContent contentName="labs" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AllLabs;
