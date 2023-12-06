import React, { useState, useEffect } from "react";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { AuthContext } from "../../lib/AuthContext.js";
import { Link } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASE_URL;

function ParentHome() {
  const [parentCode, setParentCode] = useState("");
  const [children, setChildren] = useState([]);

  const userDetails = useContext(AuthContext).user;
  const fetchUserDetails = async () => {
    try {
      if (!userDetails) {
        console.log("No user found. User might be logged out.");
        return;
      }

      const userId = userDetails.user.id;
      const response = await axios.get(
        `${baseUrl}api/getParentCode?user_id=${userId}`
      );

      if (response.data.success) {
        console.log("Parent code:", response.data.data.parent_code);
        setParentCode(response.data.data.parent_code);
      } else {
        console.error("Failed to fetch user details");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const getChildren = () => {
    fetch(baseUrl + `api/get_child/${userDetails.user.id}`)
      .then((result) => result.json())
      .then((res) => {
        console.warn(res);
        setChildren(res);
      })
      .catch((error) => {
        console.error("Error fetching messages for student:", error);
      });
  };

    // const userDetails = getUserFromLocalStorage()
    return (
        <>
            <div className="main-wrapper">
                <div className="main-content">
                    <AppHeader />
                    <div className="middle-sidebar-bottom theme-dark-bg">
                        <div className="custom-middle-sidebar-left">
                            <div className="container p-2">
                                <div className="row mb-2">
                                    <h1>Welcome, {userDetails.user.name}! {parentCode}</h1> <br />
                                </div>
                                <div className="row">
                                <div className="col-lg-6 d-flex mb-4 justify float-right">
                                        <h2 className="text-grey-900 font-md fw-700">Parent Code:  {parentCode} </h2>
                                    </div>
                                    <div className="col-lg-6 d-flex mb-4 justify float-right">
                                        <select
                                            className="form-select ml-auto float-right border-0 font-xssss fw-600 text-grey-700 bg-transparent"
                                            aria-label="Default select example"
                                        >
                                            <option>Sort by latest</option>
                                            <option defaultValue="1">Sort by popularity</option>
                                            <option defaultValue="2">
                                            Sort by score : low to high
                      </option>
                      <option defaultValue="3">
                        Sort by score : high to low
                                            </option>
                                        </select>
                                    </div>
                                </div>

  return (
    <>
      <div className="main-wrapper">
        <div className="main-content  menu-active" id="main-content">
          <AppHeader />
          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="middle-sidebar-left">
              <div className="container p-2">
                <div className="row mb-2">
                  <h1>Welcome, {userDetails.user.name}!</h1>
                  <br />
                </div>
                <div className="row">
                  <div className="col-lg-6 d-flex mb-4 justify float-right">
                    <h2 className="text-grey-900 font-md fw-700">
                      Parent Code: {parentCode}
                    </h2>
                  </div>
                </div>
                <div className="row">
                  {children
                    ? children.map((child, index) => (
                        <div
                          className="col-xl-3 col-lg-6 col-md-6 col-sm-6"
                          key={index}
                        >
                          <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-4 border-0 text-center">
                            <div class="ml-auto mr-auto rounded-lg overflow-hidden d-inline-block">
                              <img
                                src="https://via.placeholder.com/100x100.png"
                                alt="icon"
                                class="p-0 w100 shadow-xss"
                              />
                            </div>
                            <Link
                              to={"/student/" + child.id}
                              className="nav-link"
                            >
                              <h4 className="font-xs mt-3 mb-1">
                                {child.name}
                              </h4>
                            </Link>
                            <p class="fw-600 font-xssss text-grey-500 mt-0 mb-2">
                            {child.email}
                            </p>
                            <ul class="list-inline border-0 mt-4">
                              <li class="list-inline-item text-center mr-4">
                                <h4 class="fw-700 font-md">
                                  90.3%
                                  <span class="font-xssss fw-500 mt-1 text-grey-500 d-block">
                                   Term Tests
                                  </span>
                                </h4>
                              </li>
                              <li class="list-inline-item text-center mr-4">
                                <h4 class="fw-700 font-md">
                                  88.7%
                                  <span class="font-xssss fw-500 mt-1 text-grey-500 d-block">
                                    Assessments
                                  </span>
                                </h4>
                              </li>
                            </ul>
                            <Link to={"/student/" + child.id} class="btn mt-3 px-4 py-2 d-inline-block rounded-xl bg-current font-xsssss fw-700 ls-lg text-white">Profile</Link>
                          </div>
                        </div>
                      ))
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    </>
  );
}

export default ParentHome;
