import React, { Component, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Darkbutton from './Darkbutton';
import Navheader from './Navheader';

// class Appheader extends Component {
//   state = {
//     isOpen: false,
//     isActive: false,
//   };
//   toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });
//   toggleActive = () => this.setState({ isActive: !this.state.isActive });

//   render() {
//     const navClass = `${this.state.isOpen ? ' nav-active' : ''}`;
//     const searchClass = `${this.state.isActive ? ' show' : ''}`;
function Appheader(){
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => setIsActive(!isActive);

  const searchClass = `${isActive ? ' show' : ''}`;

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

        <button  className="header-menu"></button>
        <form action="#" className="float-left header-search">
          <div className="form-group mb-0 icon-input">
            <i className="feather-search font-lg text-grey-400"></i>
            <input
              type="text"
              placeholder="Start typing to search.."
              className="bg-transparent border-0 lh-32 pt-2 pb-2 pl-5 pr-3 font-xsss fw-500 rounded-xl w350"
            />
          </div>
        </form>
        <ul className="d-flex ml-auto right-menu-icon">
          <li>
            <Link to="#">
              <span className="dot-count bg-warning"></span>
              <i className="feather-bell font-xl text-current"></i>
              <div className="menu-dropdown">
                <h4 className="fw-700 font-xs mb-4">Notification</h4>
                <div className="card bg-transparent-card w-100 border-0 pl-5 mb-3">
                  <img
                    src="assets/images/user-8.png"
                    alt="user"
                    className="w40 position-absolute left-0"
                  />
                  <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                    Hendrix Stamp
                    <span className="text-grey-400 font-xsssss fw-600 float-right mt-1">
                      3 min
                    </span>
                  </h5>
                  <h6 className="text-grey-500 fw-500 font-xssss lh-4">
                    There are many variations of pass..
                  </h6>
                </div>
                <div className="card bg-transparent-card w-100 border-0 pl-5 mb-3">
                  <img
                    src="assets/images/user-4.png"
                    alt="user"
                    className="w40 position-absolute left-0"
                  />
                  <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                    Goria Coast
                    <span className="text-grey-400 font-xsssss fw-600 float-right mt-1">
                      2 min
                    </span>
                  </h5>
                  <h6 className="text-grey-500 fw-500 font-xssss lh-4">
                    Mobile Apps UI Designer is require..
                  </h6>
                </div>

                <div className="card bg-transparent-card w-100 border-0 pl-5 mb-3">
                  <img
                    src="assets/images/user-7.png"
                    alt="user"
                    className="w40 position-absolute left-0"
                  />
                  <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                    Surfiya Zakir
                    <span className="text-grey-400 font-xsssss fw-600 float-right mt-1">
                      1 min
                    </span>
                  </h5>
                  <h6 className="text-grey-500 fw-500 font-xssss lh-4">
                    Mobile Apps UI Designer is require..
                  </h6>
                </div>
                <div className="card bg-transparent-card w-100 border-0 pl-5">
                  <img
                    src="assets/images/user-6.png"
                    alt="user"
                    className="w40 position-absolute left-0"
                  />
                  <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                    Victor Exrixon
                    <span className="text-grey-400 font-xsssss fw-600 float-right mt-1">
                      30 sec
                    </span>
                  </h5>
                  <h6 className="text-grey-500 fw-500 font-xssss lh-4">
                    Mobile Apps UI Designer is require..
                  </h6>
                </div>
              </div>
            </Link>
          </li>
          <Darkbutton />

          <li>
            <Link to="/message">
              <i className="feather-message-square font-xl text-current"></i>
            </Link>
          </li>
          <li>
            <Link to="/default-user-profile">
              <img
                src="/assets/images/user.png"
                alt="user"
                className="w40 mt--1 rounded-circle"
              />
            </Link>
          </li>
          <li>
            <span onClick={toggleActive} className="menu-search-icon">
              <i className="feather-search text-grey-900 font-lg"></i>
            </span>
          </li>
        </ul>

        <Navheader/>
      </div>
    );
  }


export default Appheader;
