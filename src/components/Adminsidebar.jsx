import React, { Component, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

  function Adminsidebar() {
    useEffect(() => {
      const elements = document.querySelectorAll('.has-droupdown > a');
      for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', function () {
          const submenu = this.parentElement.querySelector('.submenu');
          submenu.classList.toggle('active');
          this.classList.toggle('open');
        });
      }
    }, []);
    return (
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark scroll-bar"
        id="accordionSidebar"
      >
        <div
          className="sidebar-brand d-flex align-items-start justify-content-start"
          href="/admin"
        >
          <span className="d-inline-block fredoka-font ls-3 fw-600 text-success font-xl logo-text mb-0 text-capitalize lh-1">
            Elomoas.
          </span>
          {/* <Link to="/" className='justify-content-center pl-0'>
              <img 
              src="/assets/images/abc_logo.png"
                            alt="logo"
                            className="" width={80}
                          />
            </Link> */}
          <button className="ms-auto mt-2 d-lg-none" id="sidebarClose">
            <i className="ti-close text-white font-sm text-grey-100 "></i>
          </button>
        </div>

        <div className="sidebar-heading">Pages</div>

        <li className="nav-item">
          <NavLink className="navi-link" to="/admin">
            <i className="feather-pie-chart mr-2"></i>
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li className="has-droupdown nav-item">
          <Link to="#" className="navi-link">
            <i className="feather-video mr-2 droupdown-toggle"></i>
            <span>Course</span>
          </Link>
          <ul className="submenu">
            <li className="nav-item">
              <NavLink className="navi-link" to="/admin-productlist">
                Course List
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="navi-link" to="/admin-productgrid">
                Course grid
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="navi-link" to="/admin-productadd">
                Add Course
              </NavLink>
            </li>
          </ul>
        </li>
        <li className="has-droupdown nav-item">
          <Link to="#" className="navi-link">
            <i className="feather-slack droupdown-toggle mr-2"></i>
            <span>Channel</span>
          </Link>
          <ul className="submenu">
            <li className="nav-item">
              <NavLink className="navi-link" to="/admin-venderlist">
                Channel List
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="navi-link" to="/admin-venderview">
                Channel Details
              </NavLink>
            </li>
          </ul>
        </li>
        <li className="has-droupdown nav-item">
          <Link to="#" className="navi-link">
            <i className="feather-shopping-bag droupdown-toggle mr-2"></i>
            <span>Order</span>
          </Link>
          <ul className="submenu">
            <li className="nav-item">
              <NavLink className="navi-link" to="/admin-order">
                Order List
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="navi-link" to="/admin-orderview">
                Order Status
              </NavLink>
            </li>
          </ul>
        </li>
        <li className="has-droupdown nav-item">
          <Link to="#" className="navi-link">
            <i className="feather-user droupdown-toggle mr-2"></i>
            <span>Customer</span>
          </Link>
          <ul className="submenu">
            <li className="nav-item">
              <NavLink className="navi-link" to="/admin-customer">
                Customer List
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="navi-link" to="/admin-customerview">
                Customer Details
              </NavLink>
            </li>
          </ul>
        </li>
        

        <div className="sidebar-heading">Authentication</div>

        <li className="nav-item">
          <NavLink className="navi-link" to="/login">
            <i className="feather-award mr-2"></i>
            <span>Login Admin</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="navi-link" to="/register">
            <i className="feather-user mr-2"></i>
            <span>Register Admin</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="navi-link" to="/forgot">
            <i className="feather-lock mr-2"></i>
            <span>Forgot Password</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="navi-link" to="/notfound">
            <i className="feather-log-out mr-2"></i>
            <span>Verify Password</span>
          </NavLink>
        </li>

        <div className="mt-3"></div>

        <div className="sidebar-card d-lg-flex mt-auto p-4">
          <p className="text-center mb-3 font-xsss text-grey-100 fw-500">
            Become a <b>pro</b> <br /> Get more <b>features</b>
          </p>
          <NavLink
            to="/admin"
            className="bg-success text-white rounded-xl btn-cart w125 d-inline-block text-center font-xsssss p-3 fw-700 ls-3"
          >
            ANALYTICS
          </NavLink>
        </div>
      </ul>
    );
  }


export default Adminsidebar;
