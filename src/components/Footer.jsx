import React, { Component } from 'react';
import { Link } from 'react-router-dom';

  function Footer(props) {
    const { bgColor } = props;
    return (
      <div className={`footer-wrapper mt-0 ${bgColor}`}>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="row">
                <div className="col-md-12 col-lg-4 col-sm-9 col-xs-12 md-mb-2">
                  <Link to="/">
                    <h1 className="fredoka-font ls-3 fw-700 text-current font-xxl">
                      Elomoas
                      <span className="d-block font-xsssss ls-1 text-grey-500 open-font ">
                        Online Learning Course
                      </span>
                    </h1>
                  </Link>
                  <p className="w-100 mt-5">
                    41 madison ave, floor 24 new work, <br />
                    NY 10010 1-877-932-7111 <br /> support@mail.com
                  </p>
                  <ul className="list-inline">
                    <li className="list-inline-item mr-3">
                      <Link to="#">
                        <i className="ti-facebook"></i>
                      </Link>
                    </li>
                    <li className="list-inline-item mr-3">
                      <Link to="#">
                        <i className="ti-twitter-alt"></i>
                      </Link>
                    </li>
                    <li className="list-inline-item mr-3">
                      <Link to="#">
                        <i className="ti-linkedin"></i>
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="#">
                        <i className="ti-instagram"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-md-3 col-lg-2 col-sm-3 col-xs-6 md-mb-2">
                  <h5>Language</h5>
                  <ul>
                    <li>
                      <Link to="#">English</Link>
                    </li>
                    <li>
                      <Link to="#">Spanish</Link>
                    </li>
                    <li>
                      <Link to="#">Arab</Link>
                    </li>
                    <li>
                      <Link to="#">Urdu</Link>
                    </li>
                    <li>
                      <Link to="#">Brazil</Link>
                    </li>
                  </ul>
                </div>
                <div className="col-md-3 col-lg-2 col-sm-4 col-xs-6">
                  <h5>Channel</h5>
                  <ul>
                    <li>
                      <Link to="#">Makeup</Link>
                    </li>
                    <li>
                      <Link to="#">Dresses</Link>
                    </li>
                    <li>
                      <Link to="#">Girls</Link>
                    </li>
                    <li>
                      <Link to="#">Sandals</Link>
                    </li>
                    <li>
                      <Link to="#">Headphones</Link>
                    </li>
                  </ul>
                </div>
                <div className="col-md-3 col-lg-2 col-sm-4 col-xs-6">
                  <h5>About</h5>
                  <ul>
                    <li>
                      <Link to="#">FAQ</Link>
                    </li>
                    <li>
                      <Link to="#">Term of use</Link>
                    </li>
                    <li>
                      <Link to="#">Privacy Policy</Link>
                    </li>
                    <li>
                      <Link to="#">Feedback</Link>
                    </li>
                    <li>
                      <Link to="#">Careers</Link>
                    </li>
                  </ul>
                </div>
                <div className="col-md-3 col-lg-2 col-sm-4 col-xs-6">
                  <h5 className="mb-3">Office</h5>
                  <p className="w-100">
                    41 madison ave, floor 24 new work, NY 10010 <br />
                    1-877-932-7111
                  </p>
                  <p className="w-100">
                    41 madison ave, floor 24 new work, NY 10010 <br />
                    1-877-932-7111
                  </p>
                </div>
              </div>
              <div className="middle-footer mt-5 pt-4"></div>
            </div>
            <div className="col-sm-12 lower-footer pt-0"></div>
            <div className="col-sm-6 col-xs-12">
              <p className="copyright-text">
                © 2021 copyright. All rights reserved.
              </p>
            </div>
            <div className="col-sm-6 col-xs-12 text-right">
              <p className="copyright-text float-right">
                Design by
                <Link to="#" className="">
                  uitheme
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }


export default Footer;
