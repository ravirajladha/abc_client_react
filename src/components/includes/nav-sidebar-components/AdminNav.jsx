import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  clearLocalStorage,
  getUserFromLocalStorage,
} from "../../../pages/util/SessionStorage";
import LogoutButton from "../../common/LogoutButton";

function AdminNav() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const navClass = `${isOpen ? " nav-active" : ""}`;

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
          {/* <div className="nav-caption fw-600 font-xssss text-grey-500">
            <span></span>Home
          </div> */}
          <ul className="mb-3">
            <li className="logo d-none d-xl-block d-lg-block"></li>

            <li className="nav-item">
              <NavLink className="navi-link" to="/admin">
                <i className="feather-home mr-2"></i>
                <span>Home</span>
              </NavLink>
            </li>
            <div className="nav-caption fw-600 font-xssss text-grey-500">
              Home
            </div>

            <li className="nav-item">
              <NavLink className="navi-link" to="/all_classes">
                <i className="feather-book-open mr-2"></i>
                <span>Classes</span>
              </NavLink>
            </li>
            <div className="nav-caption fw-600 font-xssss text-grey-500">
              Classes
            </div>
            <li className="nav-item">
              <NavLink className="navi-link" to="/schools">
                <i className="feather-monitor mr-2"></i>
                <span>Schools</span>
              </NavLink>
            </li>
            <div className="nav-caption fw-600 font-xssss text-grey-500">
              Schools
            </div>
            <li className="nav-item">
              <NavLink className="navi-link" to="/assessments">
                <i className="feather-activity mr-2"></i>
                <span>Assessments</span>
              </NavLink>
            </li>
            <div className="nav-caption fw-600 font-xssss text-grey-500">
              Assessments
            </div>

            <li className="nav-item">
              <NavLink className="navi-link" to="/tests">
                <i className="feather-command mr-2"></i>
                <span>Tests</span>
              </NavLink>
            </li>
            <div className="nav-caption fw-600 font-xssss text-grey-500">
              Tests
            </div>

            <li className="nav-item">
              <NavLink className="navi-link" to="/mini_projects">
                <i className="feather-shopping-bag mr-2"></i>
                <span>Mini Projects</span>
              </NavLink>
            </li>
            <div className="nav-caption fw-600 font-xssss text-grey-500">
              Mini Project
            </div>

            <li className="nav-item">
              <NavLink className="navi-link" to="/all_labs">
                <i className="feather-code mr-2"></i>
                <span>E-Labs</span>
              </NavLink>
            </li>
            <div className="nav-caption fw-600 font-xssss text-grey-500">
              E-Lab
            </div>
            <li className="nav-item">
              <NavLink className="navi-link" to="/ebooks">
                <i className="feather-book mr-2"></i>
                <span>E-Book</span>
              </NavLink>
            </li>
            <div className="nav-caption fw-600 font-xssss text-grey-500">
              E-Book
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

export default AdminNav;
