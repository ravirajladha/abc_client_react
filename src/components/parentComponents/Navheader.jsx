import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  clearSessionStorage,
  getUserFromSessionStorage,
} from "../../pages/util/SessionStorage";

function Navheader() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const navClass = `${isOpen ? " nav-active" : ""}`;

  const navigate = useNavigate();

  const [loggedOut, setLoggedOut] = useState(false);
  const logout = () => {
    // Clear user data from session storage
    clearSessionStorage();
    setLoggedOut(true);
  };
  useEffect(() => {
    if (loggedOut) {
      // After the logout state changes, navigate to the appropriate page
      const userData = getUserFromSessionStorage();
      if (userData && userData.user && userData.user.type === "admin") {
        navigate("/admin");
      } else if (
        userData &&
        userData.user &&
        userData.user.type === "teacher"
      ) {
        navigate("/teacher");
      } else if (
        userData &&
        userData.user &&
        userData.user.type === "sub_admin"
      ) {
        navigate("/");
      } else if (userData && userData.user && userData.user.type === "parent") {
        navigate("/");
      } else {
        navigate("/");
      }
    }
  }, [loggedOut, navigate]);

  const [child, setChild] = useState([]);
  // const [studentId, setStudentId] = useState([]);

  const getChild = (studentId) => {
    const userData = getUserFromSessionStorage();
    console.log(userData.user);
    // setStudentId(userData.student.id)
    fetch(baseUrl + `api/get_child/${userData.user.id}`)
      .then((result) => result.json())
      .then((jsonbody) => {
        console.warn(jsonbody);
        setChild(jsonbody);
      })
      .catch((error) => {
        console.error("Error fetching messages for student:", error);
      });
  };
  useEffect(() => {
    getChild();
  }, []);
  return (
    <nav
      className={`navigation scroll-bar ${navClass}`}
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
                src="/assets/images/abc_logo.png"
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
            <li className="nav-item">
              <NavLink className="navi-link" to="/parent">
                <i className="feather-home mr-2"></i>
                <span>Home</span>
              </NavLink>
            </li>
            {child
              ? child.map((c, index) => (
                  <li className="has-droupdown nav-item" key={index}>
                    <Link to="#" className="navi-link">
                      <i className="feather-user mr-2 droupdown-toggle"></i>
                      <span>{c.name}</span>
                    </Link>
                    <ul className="submenu">
                      <li className="nav-item">
                        <NavLink
                          className="navi-link"
                          to={"/parent_subjects/" + c.id}
                        >
                          Subjetcs
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className="navi-link"
                          to={"/parent_assessments/" + c.id}
                        >
                          Assessments
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className="navi-link"
                          to={"/parent_tests/" + c.id}
                        >
                          Tests
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                ))
              : ""}

            {/* <li className="nav-item">
              <NavLink className="navi-link" to="student">
                <i className="feather-book-open mr-2"></i>
                <span>Student name</span>
              </NavLink>
            </li> */}
            {/* <li className="nav-item">
              <NavLink className="navi-link" to="/teachers">
                <i className="feather-briefcase mr-2"></i>
                <span>Teachers</span>
              </NavLink>
            </li> */}
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
              <Link
                onClick={logout}
                className="nav-content-bttn open-font h-auto pt-2 pb-2"
              >
                <i className="font-sm feather-log-out mr-3 text-grey-500"></i>
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navheader;