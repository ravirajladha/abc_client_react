import React, { Component } from 'react';

  function Pagination(props) {
    const { divClass } = props;
    return (
      <ul className={divClass}>
        <li className="page-item m-1">
          <a
            className="page-link rounded-lg btn-round-md p-0 fw-600 shadow-xss bg-white text-grey-900 border-0"
            href="/"
            tabIndex="-1"
            aria-disabled="true"
          >
            <i className="ti-angle-left"></i>
          </a>
        </li>
        <li className="page-item m-1">
          <a
            className="page-link rounded-lg btn-round-md p-0 fw-600 font-xssss shadow-xss bg-white text-grey-900 border-0"
            href="/"
          >
            1
          </a>
        </li>
        <li className="page-item m-1">
          <a
            className="page-link rounded-lg btn-round-md p-0 fw-600 font-xssss shadow-xss bg-primary text-white border-0"
            href="/"
          >
            2
          </a>
        </li>
        <li className="page-item m-1">
          <a
            className="page-link rounded-lg btn-round-md p-0 fw-600 font-xssss shadow-xss bg-white text-grey-900 border-0"
            href="/"
          >
            3
          </a>
        </li>
        <li className="page-item m-1">
          <a
            className="page-link rounded-lg btn-round-md p-0 fw-600 font-xssss shadow-xss bg-white text-grey-900 border-0"
            href="/"
          >
            4
          </a>
        </li>
        <li className="page-item m-1">
          <a
            className="page-link rounded-lg btn-round-md p-0 fw-600 font-xssss shadow-xss bg-white text-grey-900 border-0"
            href="/"
          >
            5
          </a>
        </li>
        <li className="page-item m-1">
          <a
            className="page-link rounded-lg btn-round-md p-0 fw-600 shadow-xss bg-white text-grey-900 border-0"
            href="/"
          >
            <i className="ti-angle-right"></i>
          </a>
        </li>
      </ul>
    );
  }


export default Pagination;
