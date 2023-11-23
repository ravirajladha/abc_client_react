import React, { Component } from 'react';

  function Darkmode() {
    return (
      <div className="card theme-light-bg overflow-hidden rounded-xxl border-0 mb-3">
        <div className="card-body d-flex justify-content-between align-items-end p-4">
          <div>
            <h4 className="font-xsss text-grey-900 mb-2 d-flex align-items-center justify-content-between mt-2 fw-700">
              Dark Mode
            </h4>
          </div>
          <div className="custom-control custom-switch">
            <input
              type="checkbox"
              className="custom-control-input dark-mode-switch"
              id="darkmodeswitch"
            />
            <label
              className="custom-control-label bg-success"
              htmlFor="darkmodeswitch"
            ></label>
          </div>
        </div>
      </div>
    );
  }


export default Darkmode;
