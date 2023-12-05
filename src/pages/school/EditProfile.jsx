import React, { useState } from "react";
import FormPageOne from "./student-edit-profile-components/FormPageOne";
// import FormPageTwo from "./student-edit-profile-components/FormPageTwo";
import FormPageThree from "./student-edit-profile-components/FormPageThree";
import FormPageFour from "./student-edit-profile-components/FormPageFour";

import FormPageSix from "./student-edit-profile-components/FormPageSix";
import Sidebar from "./student-edit-profile-components/Sidebar";
import Appheader from "../../components/includes/AppHeader";

const EditProfile = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const getStepComponent = () => {
    switch (currentStep) {
      case 0:
        return <FormPageOne />;
      // case 1:
      //   return <FormPageTwo />;
      case 1:
        return <FormPageThree />;
      case 2:
        return <FormPageFour />;
     
      case 3:
        return <FormPageSix />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="main-wrapper">
        <div className="main-content menu-active m-3">
          <Appheader />
          <div className="middle-sidebar-bottom theme-dark-bg ">
            <div className="middle-sidebar-left">
              <div className="row d-flex vh-100">
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
    </>
  );
};

export default EditProfile;
