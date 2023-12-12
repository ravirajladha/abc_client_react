import React, { useState, useEffect } from "react";
import AppHeader from "../../components/includes/AppHeader.jsx";
import AppFooter from "../../components/includes/AppFooter.jsx";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { AuthContext } from "../../lib/AuthContext.js";
import { Link } from "react-router-dom";
import BackButton from "../../components/navigation/BackButton.jsx";

const baseUrl = process.env.REACT_APP_BASE_URL;

function ParentSettings() {
    const [parentCode, setParentCode] = useState("");  
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
  
  
    useEffect(() => {
      fetchUserDetails();
    }, [userDetails]);
  return (
    <div className="main-wrapper">
      <div className="main-content menu-active" id="main-content">
        <AppHeader />
        <div className="p-5 theme-dark-bg">
          <div className="middle-sidebar-left">
            <div className="row">
              <div className="col-lg-12 pt-0 my-3 d-flex justify-content-between align-items-center ">
                <h2 className="fw-400 font-lg d-block">
                  <b> Settings</b>
                </h2>
                <div className="float-right">
                <Link
                      to={"/parent/add_student"}
                      className="p-2 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current mx-1"
                    >    Add  Student
                    </Link>
                  <BackButton />
                </div>
              </div>
              <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                <div className="col-lg-12 pt-0 my-3 d-flex justify-content-between align-items-center ">
                    <h2 className="text-grey-900 font-md fw-500">
                      Parent Code: {parentCode}
                    </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}

export default ParentSettings;
