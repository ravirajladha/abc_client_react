import React, { Component } from 'react';
import { Link } from 'react-router-dom';

  function Upperheader() {
    return (
      <div className="upper-header bg-greylight">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-xs-6 d-none d-block-md">
              <ul className="list-inline list-item-style mt-0 float-left pl-1">
                <li className="list-inline-item pl-0">
                  <Link to="#">(+1)866-540-3229</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-6 col-xs-6 d-none d-block-md">
              <ul className="list-inline list-item-style mt-0 float-right">
                <li className="list-inline-item">
                  <Link to="#">
                    <i className="ti-user mr-2"></i> My Account
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-12 d-none d-lg-block">
              <ul className="list-inline list-item-style mt-0 float-left pl-1">
                <li className="list-inline-item pl-0">
                  <Link to="#">BECOME AN AGENT</Link>
                </li>
                <li className="list-inline-item">
                  <Link to="#">PRIVACY</Link>
                </li>
                <li className="list-inline-item">
                  <Link to="#">CUSTOMER SERVICE </Link>
                </li>
              </ul>

              <ul className="list-inline list-item-style mt-0 float-right">
                <li className="list-inline-item">
                  <Link to="#">
                    <i className="ti-location-pin mr-2"></i> Store Locator
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="#">
                    <i className="ti-user mr-2"></i> My Account
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }


export default Upperheader;
