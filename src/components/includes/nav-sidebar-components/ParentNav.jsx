import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  clearLocalStorage,
  getUserFromLocalStorage,
} from "../../../pages/util/SessionStorage";
import LogoutButton from "../../common/LogoutButton";

function ParentNav() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const navigate = useNavigate();
  const [children, setChildren] = useState([]);
  const [isFull, setIsFull] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  const mainContent = document.getElementById('main-content');
  
  const toggleNav = () => {
    mainContent.classList.toggle('menu-active');
    setIsFull(!isFull);
  };

  const toggleNavClass = `${isFull ? "menu-active" : ""}`;


  const toggleOpen = () => setIsOpen(!isOpen);

  const navClass = `${isOpen ? " nav-active" : ""}`;

  const logout = () => {
    clearLocalStorage();
    setLoggedOut(true);
  };

  const getChildren = () => {
    const userData = getUserFromLocalStorage();
    // console.log(userData.user);
    fetch(baseUrl + `api/get_child/${userData.user.id}`)
      .then((result) => result.json())
      .then((res) => {
        // console.warn(res);
        setChildren(res);
      })
      .catch((error) => {
        console.error("Error fetching messages for student:", error);
      });
  };

  useEffect(() => {
    if (loggedOut) {
      navigate("/");
    }
  }, [loggedOut, navigate]);

  useEffect(() => {
    getChildren();
  }, []);
  return (
    <nav
      className={`navigation scroll-bar ${toggleNavClass} ${navClass}`}
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

          {/* Navigation */}

          <div className="nav-caption fw-600 font-xssss text-grey-500">
            <span></span>
          </div>

          <ul className="mb-3">
            <li className="logo d-none d-xl-block d-lg-block"></li>
            <li>
              <Link className="nav-link" to="/parent">
                <i className="feather-home mr-2"></i>
                <span>Home</span>
              </Link>
            </li>
          </ul>

          <div className="nav-caption fw-600 font-xssss text-grey-500 mt-1">
            Children
          </div>

          <ul className="mb-3">
            {children
              ? children.map((child, index) => (
                  <li key={index}>
                    <Link to={"/student/" + child.id} className="nav-link">
                      <i className="feather-user mr-2"></i>
                      <span>{child.name}</span>
                    </Link>
                  </li>
                ))
              : ""}
          </ul>
          
          {/* <ul className="mb-3">
            {children ? children.map((child, index) => (
            <li className="nav-item" key={index}>
              <Link to={"/parent_subjects/" + child.id} className="navi-link">
                <i className="feather-user mr-2 droupdown-toggle"></i>
                <div className="nav-caption fw-600 font-xssss text-grey-500 mt-1">
                  {child.name}
                </div>
              </Link>
              <ul className="submenu">
                <li className="nav-item">
                  <Link className="navi-link" to={"/parent_subjects/" + child.id}>
                    Subjects
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="navi-link"
                    to={"/parent_assessments/" + child.id}
                  >
                    Assessments
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="navi-link" to={"/parent_tests/" + child.id}>
                    Tests
                  </Link>
                </li>
              </ul>
            </li>
            )) : ""}
          </ul> */}

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
          <ul>
            <li className="logo d-none d-xl-block d-lg-block"></li>
            <li>
              <Link
                to="#"
                onClick={toggleNav}
                className="nav-content-bttn open-font h-auto pt-2 pb-2"
              >
                <i
                  className={`font-sm ${
                    isFull
                      ? "feather-arrow-right-circle"
                      : "feather-arrow-left-circle"
                  }  mr-3 text-grey-500`}
                ></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default ParentNav;
