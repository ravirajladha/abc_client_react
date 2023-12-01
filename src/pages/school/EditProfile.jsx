import React, { useState } from "react";
import FormPageOne from "../../components/student/FormPageOne";
import FormPageTwo from "../../components/student/FormPageTwo";
import FormPageThree from "../../components/student/FormPageThree";
import FormPageFour from "../../components/student/FormPageFour";
import FormPageFive from "../../components/student/FormPageFive";
import FormPageSix from "../../components/student/FormPageSix";
import Sidebar from "../../components/student/Sidebar";
import Appheader from "../../components/includes/AppHeader";

const EditProfile = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const getStepComponent = () => {
    switch (currentStep) {
      case 0:
        return <FormPageOne />;
      case 1:
        return <FormPageTwo />;
      case 2:
        return <FormPageThree />;
      case 3:
        return <FormPageFour />;
      case 4:
        return <FormPageFive />;
      case 5:
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
