import React, { Component, Fragment } from 'react';
import Header from '../components/Header';
import Upperheader from '../components/Upperheader';
import Footer from '../components/Footer';

  function Notfound() {
    return (
      <Fragment>
        <Upperheader />
        <Header />
        <div className="vertical-wrapper pt-lg--10 pt-5 pb-lg--10 pb-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-8 text-center default-page">
                <div className="card border-0 text-center d-block">
                  <img
                    src="https://via.placeholder.com/150x150.png"
                    alt="icon"
                    className="w200 mb-4 ml-auto mr-auto "
                  />
                  <h1 className="fw-700 text-grey-900 display4-size display4-md-size">
                    Oops! It looks like you're lost.
                  </h1>
                  <p className="text-grey-500 font-xss">
                    The page you're looking for isn't available. Try to search
                    again or use the go to.
                  </p>
                  <a
                    href="/"
                    className="p-3 w175 bg-current text-white d-inline-block text-center fw-600 font-xssss rounded-lg text-uppercase ls-3"
                  >
                    Home Page
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </Fragment>
    );
  }


export default Notfound;
