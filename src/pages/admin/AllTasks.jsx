import React, { useState, useEffect } from "react";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
import { Link } from "react-router-dom";
import BackButton from "../../components/navigation/BackButton";
import { useParams } from 'react-router-dom';
import moment from 'moment';
function AllTasks() {
  const { projectId } = useParams();  // Ensure that the route parameter name matches what's defined in your route

  const [tasks, setTasks] = useState([]);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchTasks = async () => {
      if (!projectId) return;

      try {
        const response = await fetch(`${baseUrl}api/get_tasks/${projectId}`);
        const data = await response.json();
        console.log("tasks", data.data);
        setTasks(data.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [projectId]);
  return (
    <>
      <div className="main-wrapper">
        <div className="main-content menu-active">
          <AppHeader />

          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="custom-middle-sidebar-left">
              <div className="row">
                <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                  <div>
                    <h2 className="fw-400 font-lg d-block">
                      All <b> E-Labs</b>
                    </h2>
                  </div>
                  <div className="float-right">
                  <Link to={"/mini_projects/create_project_task"} className="p-2 me-2 d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current mx-1">CREATE TASK</Link>
                    <BackButton />
                  </div>
                </div>
                <div className="col-lg-12 mb-3">
                  <div className="table-content table-responsive">
                    <table className="table text-center">
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
                            <td>{moment(lab.created_at).format('MM/DD/YYYY h:mm:ss a')}</td>

                     
                           
                           
                          </tr>
                        ))}
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

export default AllTasks;
