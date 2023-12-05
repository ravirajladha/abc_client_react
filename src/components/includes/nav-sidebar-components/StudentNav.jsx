import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  clearLocalStorage,
  getUserFromLocalStorage,
} from "../../../pages/util/SessionStorage.jsx";
import { useContext } from 'react';
import { AuthContext } from "../../../lib/AuthContext.js"
import LogoutButton from "../../common/LogoutButton.jsx"
function StudentNav() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const navClass = `${isOpen ? " nav-active" : ""}`;
  // const navigate = useNavigate();
  // const { logout } = useContext(AuthContext); // Get logout from AuthContext

  // When the logout button is pressed, call the logout function with navigate
  // const handleLogout = () => {
  //   console.log('Logout button clicked');
  //   logout(navigate);
  // };


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
          <div className="nav-caption fw-600 font-xssss text-grey-500">
            <span></span>Feeds
          </div>
          <ul className="mb-3">
            <li className="logo d-none d-xl-block d-lg-block"></li>
            <li>
              <NavLink
                activeClassName="active"
                to="/home"
                className="nav-content-bttn open-font"
                data-tab="chats"
              >
                <i className="feather-tv mr-3"></i>
                <span>Course Feed</span>
              </NavLink>
            </li>
            <div className="nav-caption fw-600 font-xssss text-grey-500">
              Home
            </div>
            <li>
              <NavLink
                activeClassName="active"
                to="/subjects"
                className=" nav-content-bttn open-font"
                data-tab="friends"
              >
                <i className="feather-shopping-bag mr-3"></i>
                <span>Subjects</span>
              </NavLink>
            </li>
            <div className="nav-caption fw-600 font-xssss text-grey-500">
              Subjects
            </div>
            <li>
              <NavLink
                activeClassName="active"
                to="/school_qna"
                className="nav-content-bttn open-font"
                data-tab="favorites"
              >
                <i className="feather-globe mr-3"></i>
                <span>Qna</span>
              </NavLink>
            </li>
            <div className="nav-caption fw-600 font-xssss text-grey-500">
              Qna
            </div>
            <li>
              <NavLink
                activeClassName="active"
                to="/school_forums"
                className="nav-content-bttn open-font"
                data-tab="favorites"
              >
                <i className="feather-user mr-3"></i>
                <span>Forums</span>
              </NavLink>
            </li>
            <div className="nav-caption fw-600 font-xssss text-grey-500">
              Forums
            </div>
            <li>
              <NavLink
                activeClassName="active"
                to="/video_features"
                className="nav-content-bttn open-font"
                data-tab="favorites"
              >
                <i className="feather-play-circle mr-3"></i>
                <span>Video Features</span>
              </NavLink>
            </li>
            <div className="nav-caption fw-600 font-xssss text-grey-500">
              Video Features
            </div>
          </ul>

          <div className="nav-caption fw-600 font-xssss text-grey-500">
            <span></span> Account
          </div>
          <ul className="mb-3">
            <li className="logo d-none d-xl-block d-lg-block"></li>
            <li>
              <Link
                to="/settings"
                className="nav-content-bttn open-font h-auto pt-2 pb-2"
              >
                <i className="font-sm feather-settings mr-3 text-grey-500"></i>
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

export default StudentNav;
