import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Darkbutton from "../common/DarkButton.jsx";

import AdminNav from "./nav-sidebar-components/AdminNav.jsx";
import SchoolNav from "./nav-sidebar-components/SchoolNav.jsx";
import ParentNav from "./nav-sidebar-components/ParentNav.jsx";
import StudentNav from "./nav-sidebar-components/StudentNav.jsx";
import TeacherNav from "./nav-sidebar-components/TeacherNav.jsx";

import { useContext } from "react";
import { AuthContext } from "../../lib/AuthContext.js";
function AppHeader() {
  const { user } = useContext(AuthContext);
  const [isActive, setIsActive] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  //Nav toggle
  const handleSidebarToggle = () => {
    const sidebar = document.querySelector(".navigation");

    if (sidebar) {
      if (!isSidebarOpen) {
        sidebar.classList.add("nav-active");
      } else {
        sidebar.classList.remove("nav-active");
      }
    }

    setIsSidebarOpen(!isSidebarOpen);
  };

  //Search toggle
  const toggleActive = () => setIsActive(!isActive);
  const searchClass = `${isActive ? " show" : ""}`;

  const sidebarComponents = {
    admin: <AdminNav />,
    teacher: <TeacherNav />,
    sub_admin: <SchoolNav isSidebarOpen={isSidebarOpen} />,
    parent: <ParentNav />,
    default: <StudentNav />,
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdownMenu = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    navigate("/login");
  };

  // Use user from context
  const sidebar =
    sidebarComponents[user?.user?.type] || sidebarComponents.default;

  return (
    <div className="middle-sidebar-header bg-white">
      <div className={`app-header-search ${searchClass}`}>
        <form className="search-form">
          <div className="form-group searchbox mb-0 border-0 p-1">
            <input
              type="text"
              className="form-control border-0"
              placeholder="Search..."
            />
            <i className="input-icon">
              <ion-icon
                name="search-outline"
                role="img"
                className="md hydrated"
                aria-label="search outline"
              ></ion-icon>
            </i>
            <span className="ms-1 mt-1 d-inline-block close searchbox-close">
              <i className="ti-close font-xs" onClick={toggleActive}></i>
            </span>
          </div>
        </form>
      </div>

      <button onClick={handleSidebarToggle} className="header-menu"></button>
      {/* <form action="#" className="float-left header-search">
        <div className="form-group mb-0 icon-input">
          <i className="feather-search font-lg text-grey-400"></i>
          <input
            type="text"
            placeholder="Start typing to search.."
            className="bg-transparent border-0 lh-32 pt-2 pb-2 pl-5 pr-3 font-xsss fw-500 rounded-xl w350"
          />
        </div>
      </form> */}
      <div className="display1-size display2-sm-size d-inline-block float-left mb-0 text-grey-900 fw-700 ml-2" >
      <h1 style={{ letterSpacing: '2px',fontSize:'25px' }}>&nbsp;ATOMS&nbsp;</h1>
      </div>
    
      <ul className="d-flex ml-auto right-menu-icon px-3 pt-3">
        <Darkbutton />
        {user.user.type == 'school_student' && 
        <li>
          <Link to="#">
            <img
              src="/assets/images/user.png"
              alt="user"
              className="w40 mt--1 rounded-circle"
            />
            <div className="menu-dropdown" style={{ width: "170px" }}>
              <div className="font-xss text-grey-900 mb-2 mt-1 ml-0 fw-600 d-flex align-items-center">
                <i className="feather-settings text-grey-900 font-lg mr-2"></i>
                <Link to="/settings" onClick={() => setIsDropdownOpen(false)}>
                  Settings
                </Link>
              </div>
              
             
              <div className="font-xss text-grey-900 mb-0 py-2 fw-600 ml-0 d-flex align-items-center">
                <i className="feather-user text-grey-900 font-lg mr-2"></i>
                <Link
                  to="/student/default-user-profile"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Profile
                </Link>
              </div>


            </div>
          </Link>
        </li>
   
  }

        <li>
          <span onClick={toggleActive} className="menu-search-icon">
            <i className="feather-search text-grey-900 font-lg"></i>
          </span>
        </li>
      </ul>
      {sidebar}
    </div>
  );
}

export default AppHeader;
