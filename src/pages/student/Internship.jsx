import React from "react";
import AppFooter from "../../components/includes/AppFooter";
import AppHeader from "../../components/includes/AppHeader";
import StudentSidebar from "../../components/includes/StudentSidebar";
import BackButton from "../../components/navigation/BackButton";

function Internship() {
  const imageUrls = [
    "assets/images/user.png",
    "assets/images/user.png",
    "assets/images/user.png",
  ];

  const certificate =  "certificate.jpg";
  return (
    <div className="main-wrapper">
      <div className="main-content menu-active">
        <AppHeader />
        <div className="middle-sidebar-bottom theme-dark-bg">
          <div className="middle-sidebar-left">
            <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
              <div>
                <h2 className="fw-400 font-lg d-block">
                  <b>Internship</b>
                </h2>
              </div>
              <div className="float-right">
                <BackButton />
              </div>
            </div>
            <div className="row">
              {imageUrls.map((imageUrl, index) => (
                <div className="col-4" key={index}>
                  <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                    <div className="card w-100 shadow-xss rounded-10 overflow-hidden border-0 mb-3 mt-0 p-4">
                      <div className="card-body d-block pt-4 text-center">
                        <figure className="avatar position-relative w-110 z-index-1 w100 z-index-1 mr-auto ml-auto">
                          <img
                            src={imageUrl}
                            alt={`Image ${index + 1}`}
                            className="p-3 bg-greylight rounded-lg w-100"
                          />
                        </figure>
                        <h4 className="font-xs ls-1 fw-700 text-grey-900">
                          Internship Name
                          <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                            3 Stages
                          </span>
                        </h4>
                      </div>
                      <div className="card-body d-flex align-items-center justify-content-center pl-1 pr-1 pt-0">
                        <a
                          href={certificate}
                          download
                          className="bg-success text-white rounded-xl btn-cart w125 d-inline-block text-center font-xsssss p-3 fw-700 ls-3 text-uppercase"
                        >
                          Participate
                        </a>
                        <a
                          href={certificate}
                          download
                          className="bg-success text-white rounded-xl btn-cart w125 d-inline-block text-center font-xsssss p-3 fw-700 ls-3 text-uppercase"
                        >
                          Download
                        </a>
                        <a
                          href={certificate}
                          download
                          className="bg-greylight theme-white-bg btn-round-lg ml-1 rounded-3 text-grey-700"
                        >
                          <i className="feather-download-cloud"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <StudentSidebar />
          </div>
        </div>
        <AppFooter />
      </div>
    </div>
  );
}

export default Internship;
