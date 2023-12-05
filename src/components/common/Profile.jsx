import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

import { useContext } from 'react';
import { AuthContext } from "../../lib/AuthContext.js"

function Profile() {
  const userDetails = useContext(AuthContext).user;

  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [projectTasks, setProjectTasks] = useState([]);

  const get_project_tasks = (e) => {
    fetch(baseUrl + "api/student/project-tasks/" + userDetails.user.id, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setProjectTasks(resp);
      });
  };

  useEffect(() => {
    // get_project_tasks();
  }, []);

  if (!userDetails) {
    console.log("No user found. User might be logged out.");
    return <div>User is not logged in</div>;
  } else {
    const user = userDetails.user;
  }


  const skillsettings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 300,
    centerMode: false,
    variableWidth: true,
  };
  return (
    <div className="card overflow-hidden subscribe-widget p-3 mb-3 rounded-xxl border-0">
      <div
        className="card-body p-2 d-block text-center bg-no-repeat bg-image-topcenter"
        style={{ backgroundImage: `url("assets/images/user-pattern.png")` }}
      >
        <figure className="avatar ml-auto mr-auto mb-0 mt-2 w90">
          <img
            src="assets/images/user.png"
            alt="avater"
            className="float-right shadow-sm rounded-circle w-100"
          />
        </figure>
        <div className="clearfix"></div>
        <h2 className="text-black font-xss lh-3 fw-700 mt-3 mb-1">
          {userDetails.user.name}
        </h2>
        {/* <h4 className="text-grey-500 font-xssss mt-0">
          <span className="d-inline-block bg-success btn-round-xss m-0"></span>
          Available
        </h4> */}
        <div className="clearfix"></div>
        <div className="col-12 text-center mt-4 mb-2">
          <a
            href="/message"
            className="p-0 ml-1 btn btn-round-md rounded-xl bg-current"
          >
            <i className="text-white ti-comment-alt font-sm"></i>
          </a>
          <a
            href="/settings"
            className="p-0 ml-2 btn btn-round-md rounded-xl bg-lightblue"
          >
            <i className="text-current ti-settings font-sm"></i>
          </a>

        </div>
        <ul className="list-inline border-0 mt-4">
          <li className="list-inline-item text-center mr-4">
            <h4 className="fw-700 font-md">
              50
              <span className="font-xsssss fw-500 mt-1 text-grey-500 d-block">
                Hours Attended
              </span>
            </h4>
          </li>
          <li className="list-inline-item text-center mr-4">
            <h4 className="fw-700 font-md">
              11
              <span className="font-xsssss fw-500 mt-1 text-grey-500 d-block">
                Tests Completed
              </span>
            </h4>
          </li>
        </ul>

        <div className="col-12 pl-0 mt-4 text-left">
          <h4 className="text-grey-800 font-xsss fw-700 mb-3 d-block">
            My Tasks
            <a href="/">
              <i className="ti-angle-right font-xsssss text-grey-700 float-right "></i>
            </a>
          </h4>
          {/* <Slider {...skillsettings}>
            {skillList.map((value, index) => (
              <div key={index} className="mr-1">
                <a href="/" className="btn-round-xxxl border bg-greylight">
                  <img
                    src={`assets/images/${value.skill}`}
                    alt="icon"
                    className="p-3 w-100"
                  />
                </a>
              </div>
            ))}
          </Slider> */}
        </div>
      </div>
    </div>
  );
}


export default Profile;
