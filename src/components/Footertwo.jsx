import React, { Component } from 'react';
import { Link } from 'react-router-dom';

  function Footertwo() {
    return (
      <div className="footer-wrapper layer-after bg-dark mt-0">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 text-left">
              <h4 className="mb-4 text-grey-300 fw-300 font-xl open-font lh-3 d-inline-block">
                We are digital agency, a small design agency based in paris as i
                was groping to remove the chain from about my victim’s neck only
                through language.
              </h4>
            </div>
            <div className="col-sm-6 text-left">
              <ul className="d-flex align-items-center mt-2 float-left xs-mb-2">
                <li className="mr-2">
                  <Link to="/" className="btn-round-md bg-facebook">
                    <i className="font-xs ti-facebook text-white"></i>
                  </Link>
                </li>
                <li className="mr-2">
                  <Link to="/" className="btn-round-md bg-twiiter">
                    <i className="font-xs ti-twitter-alt text-white"></i>
                  </Link>
                </li>
                <li className="mr-2">
                  <Link to="/" className="btn-round-md bg-linkedin">
                    <i className="font-xs ti-linkedin text-white"></i>
                  </Link>
                </li>
                <li className="mr-2">
                  <Link to="/" className="btn-round-md bg-instagram">
                    <i className="font-xs ti-instagram text-white"></i>
                  </Link>
                </li>
                <li className="mr-2">
                  <Link to="/" className="btn-round-md bg-pinterest">
                    <i className="font-xs ti-pinterest text-white"></i>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-sm-5 offset-sm-1 text-right">
              <form className="mt-2">
                <input type="text" placeholder="Email" />
                <button>Submit</button>
              </form>
            </div>
            <div className="col-sm-12">
              <div className="middle-footer">
                <div className="row">
                  <div className="col-md-4 col-lg-2 col-sm-6 col-xs-6 sm-mb-4">
                    <h5>Social Link</h5>
                    <ul>
                      <li>
                        <Link to="/">Facebook</Link>
                      </li>
                      <li>
                        <Link to="/">Twitter</Link>
                      </li>
                      <li>
                        <Link to="/">Instagram</Link>
                      </li>
                      <li>
                        <Link to="/">Youtube</Link>
                      </li>
                      <li>
                        <Link to="/">Dribble</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4 col-lg-2 col-sm-6 col-xs-6 sm-mb-4">
                    <h5>Online</h5>
                    <ul>
                      <li>
                        <Link to="/">Web</Link>
                      </li>
                      <li>
                        <Link to="/">Series</Link>
                      </li>
                      <li>
                        <Link to="/">Natak</Link>
                      </li>
                      <li>
                        <Link to="/">Comedy</Link>
                      </li>
                      <li>
                        <Link to="/">Action</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4 col-lg-2 col-sm-6 col-xs-6 sm-mb-4">
                    <h5>Language</h5>
                    <ul>
                      <li>
                        <Link to="/">English</Link>
                      </li>
                      <li>
                        <Link to="/">Spanish</Link>
                      </li>
                      <li>
                        <Link to="/">Arab</Link>
                      </li>
                      <li>
                        <Link to="/">Urdu</Link>
                      </li>
                      <li>
                        <Link to="/">Brazil</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4 col-lg-2 col-sm-6 col-xs-6">
                    <h5>Channel</h5>
                    <ul>
                      <li>
                        <Link to="/">Makeup</Link>
                      </li>
                      <li>
                        <Link to="/">Dresses</Link>
                      </li>
                      <li>
                        <Link to="/">Girls</Link>
                      </li>
                      <li>
                        <Link to="/">Sandals</Link>
                      </li>
                      <li>
                        <Link to="/">Headphones</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4 col-lg-2 col-sm-6 col-xs-6">
                    <h5>About</h5>
                    <ul>
                      <li>
                        <Link to="/">FAQ</Link>
                      </li>
                      <li>
                        <Link to="/">Term of use</Link>
                      </li>
                      <li>
                        <Link to="/">Privacy Policy</Link>
                      </li>
                      <li>
                        <Link to="/">Feedback</Link>
                      </li>
                      <li>
                        <Link to="/">Careers</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4 col-lg-2 col-sm-6 col-xs-6">
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
              </div>
            </div>

            <div className="col-sm-12 lower-footer"></div>
            <div className="col-sm-6">
              <p className="copyright-text">
                © 2021 copyright. All rights reserved.
              </p>
            </div>
            <div className="col-sm-6 text-right">
              <p className="float-right copyright-text">
                In case of any concern, <Link to="/contact">contact us</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }


export default Footertwo;
