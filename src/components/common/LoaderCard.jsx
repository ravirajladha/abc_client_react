import React from "react";
import { Bars } from "react-loader-spinner";

const LoaderCard = ({ showLoader, isSubmitting }) => {
  return (
    <div className="card w-25 border-0 bg-white shadow-xs p-0 mb-4 position-absolute top-50 start-50 translate-middle z-1">
      <div className="card-body border-0 text-center">
        {showLoader && (
          <div>
            <h4 className="fw-600 font-lg mb-4">Uploading...</h4>
            {/* <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${uploadProgress}%` }}
                aria-valuenow={uploadProgress}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div> */}
            <div className="row">
              <div className="col">
                <Bars
                  height="50"
                  width="50"
                  color="#ff9500"
                  ariaLabel="bars-loading"
                  wrapperClass="d-flex justify-content-center align-items-center"
                  visible={true}
                />
              </div>
            </div>
          </div>
        )}
        {isSubmitting && !showLoader && (
          <div>
            <h4 className="fw-600 font-lg mb-4">Processing...</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoaderCard;
