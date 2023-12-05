import React, { useState } from "react";
import Appheader from "../../components/includes/AppHeader";

import SchoolDetailsForm from "./school-edit-profile-components/SchoolDetailsForm";
import AdmissionFees from "./school-edit-profile-components/AdmissionFees";
import AdmissionProcedure from "./school-edit-profile-components/AdmissionProcedure";
import Scholastic from "./school-edit-profile-components/Scholastic";
import CoScholastic from "./school-edit-profile-components/CoScholastic";
import Achievements from "./school-edit-profile-components/Achievements";
import Facilities from "./school-edit-profile-components/Facilities";
import ExtraCurricular from "./school-edit-profile-components/ExtraCurricular";
import Academics from "./school-edit-profile-components/Academics";
import Faculty from "./school-edit-profile-components/Faculty";
import Reviews from "./school-edit-profile-components/Reviews";
import Gallery from "./school-edit-profile-components/Gallery";
import FAQ from "./school-edit-profile-components/FAQ";
import SchoolDocuments from "./school-edit-profile-components/SchoolDocuments";
import AuthorizedSignatoryInfo from "./school-edit-profile-components/AuthorizedSignatoryInfo";
import AuthorizedSignatoryDocs from "./school-edit-profile-components/AuthorizedSignatoryDocs";
import BankDetails from "./school-edit-profile-components/BankDetails";
import BillingDetails from "./school-edit-profile-components/BillingDetails";
import Sidebar from "./school-edit-profile-components/Sidebar";

function AddSchool() {
  const [currentStep, setCurrentStep] = useState(0);

  const getStepComponent = () => {
    switch (currentStep) {
      case 0:
        return <SchoolDetailsForm />;
      case 1:
        return <AdmissionFees />;
      case 2:
        return <AdmissionProcedure />;
      case 3:
        return <Scholastic />;
      case 4:
        return <CoScholastic />;
      case 5:
        return <Achievements />;
      case 6:
        return <Facilities />;
      case 7:
        return <ExtraCurricular />;
      case 8:
        return <Academics />;
      case 9:
        return <Faculty />;
      case 10:
        return <Reviews />;
      case 11:
        return <Gallery />;
      case 12:
        return <FAQ />;
      case 13:
        return <SchoolDocuments />;
      case 14:
        return <AuthorizedSignatoryInfo />;
      case 15:
        return <AuthorizedSignatoryDocs />;
      case 16:
        return <BankDetails />;
      case 17:
        return <BillingDetails />;
      default:
        return <SchoolDetailsForm />;
    }
  };
  // comment testing by ashutosh
  return (
    <>
      <div className="main-wrapper">
        <div className="main-content menu-active">
          <Appheader />
          <div className="card">
            <div className="card-body p-4 w-100 border-0 d-flex rounded-lg justify-content-between">
              <h2 className="fw-400 font-lg d-block">
                Add <b> School</b>
              </h2>
              <div className="float-right">
                <ol className="breadcrumb " style={{ padding: "0.25rem 1rem" }}>
                  <li>
                    <i className="fa fa-home"></i>&nbsp;
                    <a
                      className="fw-500 font-xsss text-dark"
                      href="/admin/index"
                    >
                      Home&nbsp; /
                    </a>
                    &nbsp;
                    <i className="fa fa-angle-right"></i>
                  </li>
                  <li>
                    <a
                      className="fw-500 font-xsss text-dark"
                      href="/admin/schools"
                    >
                      &nbsp; Schools&nbsp; /
                    </a>
                    &nbsp;
                    <i className="fa fa-angle-right"></i>
                  </li>
                  <li className="active fw-500 text-black">
                    &nbsp; Add School
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <div className="middle-sidebar-bottom bg-lightblue theme-dark-bg">
            <div className="middle-sidebar-left">
              <div className="mb-3">
                <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                  <div className="row">
                    <div className="col-md-3 p-0">
                      <Sidebar
                        currentStep={currentStep}
                        changeStep={setCurrentStep}
                      />
                    </div>
                    <div className="col-md-9 p-0">
                      <div className="card-body">{getStepComponent()}</div>
                      <div className="col-lg-12">
                        <button
                          type="submit"
                          className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0 ml-3"
                          style={{ float: "right" }}
                          id="submit"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddSchool;
