import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import BackButton from "../../components/navigation/BackButton";
import { useParams } from "react-router-dom";
import moment from "moment";
import Loader from "../../components/common/Loader.jsx";
import NoContent from "../../components/common/NoContent.jsx";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import "datatables.net";

function AllTasks() {
  const { projectId } = useParams();
  const tableRef = useRef(null);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);

      if (!projectId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${baseUrl}api/get_project_tasks/${projectId}`
        );
        const data = await response.json();
        console.log("tasks", data);
        setTasks(data);
        setLoading(false);
        initializeDataTable();
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [projectId]);

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
                  to={`/mini_projects/create_project_task/${projectId}`}
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
                        <th className="border-0 p-4">Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.map((lab, index) => (
                        <tr key={index}>
                          <td className="text-left">{lab.id}</td>
                          <td>{lab.name}</td>
                          <td>{lab.description}</td>
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

export default AllTasks;
