import React, { useState } from "react";
import Appheader from "../../components/includes/AppHeader";
import { useParams } from "react-router-dom";
import SchoolDetailsForm from "./school-edit-profile-components/SchoolDetailsForm";
import Application from "./school-edit-profile-components/Application";
import Students from "./school-edit-profile-components/Students";
import Teachers from "./school-edit-profile-components/Teachers";
import Sidebar from "./school-edit-profile-components/Sidebar";

function EditSchoolProfile() {
  const [currentStep, setCurrentStep] = useState(0);
  const { id } = useParams();

  const getStepComponent = () => {
    switch (currentStep) {
      case 0:
        return <SchoolDetailsForm />;
      case 1:
        return <Application />;
      case 2:
        return <Students />;
      case 3:
        return <Teachers />;
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
            <div className="custom-middle-sidebar-left">
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

export default EditSchoolProfile;
