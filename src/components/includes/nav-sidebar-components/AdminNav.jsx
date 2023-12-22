import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

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
          {/* <div className="nav-caption fw-600 font-xssss text-dark">
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
            <div className="nav-caption fw-600 font-xssss text-dark">
              Home
            </div>

            <li className="nav-item">
              <NavLink className="navi-link" to="/all_classes">
                <i className="feather-book-open mr-2"></i>
                <span>Classes</span>
              </NavLink>
            </li>
            <div className="nav-caption fw-600 font-xssss text-dark">
              Classes
            </div>
            <li className="nav-item">
              <NavLink className="navi-link" to="/schools">
                <i className="feather-monitor mr-2"></i>
                <span>Schools</span>
              </NavLink>
            </li>
            <div className="nav-caption fw-600 font-xssss text-dark">
              Schools
            </div>
            <li className="nav-item">
              <NavLink className="navi-link" to="/assessments">
                <i className="feather-activity mr-2"></i>
                <span>Assessments</span>
              </NavLink>
            </li>
            <div className="nav-caption fw-600 font-xssss text-dark">
              Assessments
            </div>

            <li className="nav-item">
              <NavLink className="navi-link" to="/tests">
                <i className="feather-command mr-2"></i>
                <span>Tests</span>
              </NavLink>
            </li>
            <div className="nav-caption fw-600 font-xssss text-dark">
              Tests
            </div>

            <li className="nav-item">
              <NavLink className="navi-link" to="/mini_projects">
                <i className="feather-shopping-bag mr-2"></i>
                <span>Mini Projects</span>
              </NavLink>
            </li>
            <div className="nav-caption fw-600 font-xssss text-dark">
              Mini Project
            </div>

            <li className="nav-item">
              <NavLink className="navi-link" to="/all_labs">
                <i className="feather-code mr-2"></i>
                <span>E-Labs</span>
              </NavLink>
            </li>
            <div className="nav-caption fw-600 font-xssss text-dark">
              E-Lab
            </div>
            <li className="nav-item">
              <NavLink className="navi-link" to="/ebooks">
                <i className="feather-book mr-2"></i>
                <span>E-Book</span>
              </NavLink>
              
            </li>
            <div className="nav-caption fw-600 font-xssss text-dark">
              E-Book
            </div>
          
            <li className="nav-item">
              <a
                href="https://atomstest.kods.app/admin/project_reports"
                className="navi-link"
                target="_blank"
              >
                <i className="feather-file mr-2 "></i>
                <span>Project Report</span>
              </a>
            </li>
            <div className="nav-caption fw-600 font-xssss text-dark">
              Project Report
            </div>
            <li className="nav-item">
              <a
                href="https://atomstest.kods.app/admin/use_cases"
                className="navi-link"
                target="_blank"
              >
                <i className="feather-codepen mr-2"></i>
                <span>Case Study</span>
              </a>
            </li>
            <div className="nav-caption fw-600 font-xssss text-dark">
            Case Study
            </div>
            <li className="nav-item">
              <NavLink className="navi-link" to="/viewInternship">
                <i class="feather-file-plus"></i>
                <span>Internship</span>
              </NavLink>
            </li>
            <div className="nav-caption fw-600 font-xssss text-dark">
              Internship
            </div>
            <li className="nav-item">
              <NavLink className="navi-link" to="/payments">
                <i className="feather-credit-card mr-2"></i>
                <span>Payments</span>
              </NavLink>
            </li>
            <div className="nav-caption fw-600 font-xssss text-dark">
              Payments
            </div>
          </ul>

          <div className="nav-caption fw-600 font-xssss text-dark">
            <span></span><u>Account</u>
          </div>
          <ul className="mb-3">
            <li className="logo d-none d-xl-block d-lg-block"></li>
            <li>
              <Link
                to="/admin/settings"
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

export default AdminNav;
