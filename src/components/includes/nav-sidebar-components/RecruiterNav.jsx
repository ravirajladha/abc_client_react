import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  clearLocalStorage,
  getUserFromLocalStorage,
} from "../../../pages/util/SessionStorage";
import LogoutButton from "../../common/LogoutButton";

function TeacherNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const navClass = `${isOpen ? " nav-active" : ""}`;

  const navigate = useNavigate();

  const [loggedOut, setLoggedOut] = useState(false);
  const logout = () => {
    // Clear user data from session storage
    clearLocalStorage();
    setLoggedOut(true);
  };
  useEffect(() => {
    if (loggedOut) {
      // After the logout state changes, navigate to the appropriate page
      navigate("/");
      // if (userData && userData.user && userData.user.type === 'admin') {
      //   navigate('/admin');
      // } else if(userData && userData.user && userData.user.type === 'teacher'){
      //   navigate('/teacher');
      // }else if(userData && userData.user && userData.user.type === 'sub_admin'){
      //   navigate('/');
      // }else if(userData && userData.user && userData.user.type === 'parent'){
      //   navigate('/');
      // }else{
      //   navigate('/');
      // }
    }
  }, [loggedOut, navigate]);

  return (
    <nav
      className={`navigation scroll-bar menu-active ${navClass}`}
      style={{ zIndex: 999 }}
    >
      <div className="container pl-0 pr-0">
        <div className="nav-content">
          <div className="nav-top">
            <Link to="/" className="justify-content-center pl-0">
              {/* <i className="feather-slack text-success display1-size mr-3 ml-3"></i>
              <span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xl logo-text mb-0">
                Elomoas.
              </span> */}
              <img
                src="/assets/images/abc_logo.jpg"
                alt="logo"
                className=""
                width={60}
              />
            </Link>
            <span
              onClick={toggleOpen}
              className="close-nav d-inline-block d-lg-none"
            >
              <i className="ti-close bg-grey mb-4 btn-round-sm font-xssss fw-700 text-dark ml-auto mr-2 "></i>
            </span>
          </div>
          {/* <div className="nav-caption fw-600 font-xssss text-dark">
            <span></span>Home
          </div> */}
          <ul className="mb-0">
            <li className="nav-item">
              <NavLink className="navi-link" to="/recruiter">
                <i className="feather-home mr-2"></i>
              </NavLink>
            </li>
            {/* <div className="nav-caption fw-600 font-xssss text-dark">
              Qna's
            </div> */}
            <li className="nav-caption fw-600 font-xssss text-dark">
              Home
            </li>

            <li className="nav-item">
              <NavLink className="navi-link" to="/all-jobs">
                <i className="feather-briefcase mr-2"></i>
                <span>Jobs</span>
              </NavLink>
            </li>
            <li className="nav-caption fw-600 font-xssss text-dark">
            Jobs
            </li>

            
          </ul>

          <ul className="mb-3">
            <li className="logo d-none d-xl-block d-lg-block"></li>
            <li>
              <Link
                to="/teacher/settings"
                className="nav-content-bttn open-font h-auto pt-2 pb-2"
              >
                <i className="font-sm feather-settings mr-3 text-dark"></i>
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <LogoutButton />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default TeacherNav;
