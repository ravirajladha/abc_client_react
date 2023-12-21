import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import BackButton from "../../components/navigation/BackButton";
import Loader from "../../components/common/Loader.jsx";
import NoContent from "../../components/common/NoContent.jsx";
import { useParams } from "react-router-dom";
import moment from "moment";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import "datatables.net";

function InternshipTasks() {
  const { internshipId } = useParams();
  const tableRef = useRef(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);

      if (!internshipId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${baseUrl}api/get_internship_tasks/${internshipId}`
        );
        const data = await response.json();
        console.log("tasks", data);
        setTasks(data.data);
        setLoading(false);
        initializeDataTable();
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [internshipId]);

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
                  All <b> Internship Tasks</b>
                </h2>
              </div>
              <div className="float-right">
                <Link
                  to={`/create_internship_task/${internshipId}`}
                  className="p-2 me-2 d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current mx-1"
                >
                  CREATE TASK
                </Link>
                <BackButton />
              </div>
            </div>

            {loading ? (
              <Loader />
            ) : tasks && tasks.length > 0 ? (
              <div className="col-lg-12 mb-3">
                <div className="table-content table-responsive">
                  <table className="table text-center" ref={tableRef}>
                    <thead className="bg-greyblue rounded-lg">
                      <tr>
                        <th className="border-0 p-4 text-left">Id</th>
                        <th className="border-0 p-4">Name</th>
                        <th className="border-0 p-4">Description</th>
                        <th className="border-0 p-4">Duration</th>
                        <th className="border-0 p-4">Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.map((lab, index) => (
                        <tr key={index}>
                          <td className="text-left">{lab.id}</td>
                          <td>{lab.name}</td>
                          <td>{lab.description}</td>
                          <td>{lab.duration} seconds</td>
                          <td>
                            {moment(lab.created_at).format(
                              "MM/DD/YYYY h:mm:ss a"
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <NoContent contentName="tasks" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default InternshipTasks;
