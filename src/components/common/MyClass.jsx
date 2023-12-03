import React, { Component } from 'react';

const classList = [
  {
    imageUrl: 'user.png',
    title: 'Advanced Python Sass',
    per: '87',
    status: 'bg-warning',
  },
  {
    imageUrl: 'user.png',
    title: 'Bootstrap SASS CSS ',
    per: '96',
    status: 'bg-success',
  },
  {
    imageUrl: 'user.png',
    title: 'Basic JAVA',
    per: '95',
    status: 'bg-primary',
  },
  {
    imageUrl: 'user.png',
    title: 'React JS',
    per: '55',
    status: 'bg-warning',
  },
];

  function Myclass() {
    return (
      <div className="card theme-light-bg overflow-hidden rounded-xxl border-0 mb-3">
        <div className="card-body d-flex justify-content-between align-items-end pl-4 pr-4 pt-4 pb-3">
          <h4 className="fw-700 font-xsss">My Class</h4>
          <a href="/" className="position-absolute right-0 mr-4">
            <i className="ti-more-alt text-grey-500 font-xs"></i>
          </a>
        </div>
        {classList.map((value, index) => (
          <div
            className="card-body pl-4 pr-4 pt-0 pb-3 border-0 w-100 d-block"
            key={index}
          >
            <div className="row">
              <div className="col-3 p-0">
                <a
                  href="/"
                  className="btn-round-lg rounded-lg bg-lightblue ml-3"
                >
                  <img
                    src={`assets/images/${value.imageUrl}`}
                    alt="icon"
                    className="p-1 w-100"
                  />
                </a>
              </div>
              <div className="col-9 pr-3">
                <h4 className="font-xssss d-block fw-700 mt-2">
                  {value.title}
                  <span className="float-right mt-1 font-xsssss text-grey-500">
                    {value.per}%
                  </span>
                </h4>
                <div className="progress mt-2 h5 w-100">
                  <div
                    className={`progress-bar ${value.status}`}
                    role="progressbar"
                    style={{ width: `${value.per}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }


export default Myclass;
