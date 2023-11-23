import React, { Component } from 'react';
import Darkbutton from './Darkbutton';
import Sidebartoggle from './Sidebartoggle';

  function AdminTopnav() {
    return (
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow-xs ">
        <Sidebartoggle />

        <div className="form-group mb-0 icon-input d-none d-lg-block ml-auto mr-2">
          <i className="feather-search font-sm text-grey-400"></i>
          <input
            type="text"
            placeholder="Start typing to search.."
            className="lh-38 pt-2 pb-2 pl-5 pr-3 font-xssss fw-500 rounded-xl posr"
          />
        </div>

        <ul className="navbar-nav">
          <li className="nav-item dropdown no-arrow d-sm-none">
            <a
              className="navi-link dropdown-toggle"
              href="/"
              id="searchDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="feather-search mt-n1"></i>
            </a>

            <div
              className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
              aria-labelledby="searchDropdown"
            >
              <form className="form-inline mr-auto w-100 navbar-search">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control bg-light border-0 small"
                    placeholder="Search for..."
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <i className="feather-search fa-sm"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>

          <li className="nav-item dropdown no-arrow mx-1">
            <a
              className="navi-link dropdown-toggle"
              href="/"
              id="alertsDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="feather-bell"></i>

              <span className="badge badge-danger badge-counter">3+</span>
            </a>
          </li>

          <li className="nav-item dropdown no-arrow mx-1">
            <a
              className="navi-link dropdown-toggle"
              href="/"
              id="messagesDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="feather-mail"></i>

              <span className="badge badge-danger badge-counter">7</span>
            </a>
          </li>

          <Darkbutton />

          <li className="nav-item dropdown no-arrow">
            <a
              className="navi-link dropdown-toggle"
              href="/"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                src="assets/images/user.png"
                alt="user"
                className="w45 mt-n1 rounded-circle"
              />
              <span className="d-none d-lg-inline text-grey-600 fw-700 ml-2 mr-2 font-xssss">
                Douglas McGee
                <i className="font-xsssss d-block text-grey-500 fw-500">
                  Python Dev
                </i>
              </span>
              <i className="ms-3 feather-log-out d-none d-lg-block"></i>
            </a>

            <div
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              <a className="dropdown-item" href="/">
                <i className="fas fa-user fa-sm fa-fw mr-2 text-grey-900"></i>
                Profile
              </a>
              <a className="dropdown-item" href="/">
                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                Settings
              </a>
              <a className="dropdown-item" href="/">
                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                Activity Log
              </a>
              <div className="dropdown-divider"></div>
              <a
                className="dropdown-item"
                href="/"
                data-toggle="modal"
                data-target="#logoutModal"
              >
                <i className="fas fa-sign-out-alt fa-sm fa-fw ml-2 text-gray-400"></i>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>
    );
  }


export default AdminTopnav;
