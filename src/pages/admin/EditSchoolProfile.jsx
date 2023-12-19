import React, { useState } from "react";
import Appheader from "../../components/includes/AppHeader";
import { useParams } from "react-router-dom";
import SchoolDetailsForm from "./school-edit-profile-components/SchoolDetailsForm";
import Application from "./school-edit-profile-components/Application";
import Students from "./school-edit-profile-components/Students";
import Teachers from "./school-edit-profile-components/Teachers";
import Sidebar from "./school-edit-profile-components/Sidebar";
import BackButton from "../../components/navigation/BackButton";

function EditSchoolProfile() {
  const [currentStep, setCurrentStep] = useState(1);
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
  
  return (
    <>
   
          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="middle-sidebar-left">
              <div className="row">
                <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                  <div>
                    <h2 className="fw-400 font-lg d-block">
                      School <b> Info</b>{" "}
                    </h2>
                  </div>
                  <div className="float-right">
                   
                    <BackButton />
                  </div>
                </div>
                <div className="col-lg-12 mb-3">
                  <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                    <div className="card-body p-lg-5 p-4 w-100 border-0 ">
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
