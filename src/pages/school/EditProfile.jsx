// EditProfile.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import FormPageOne from "./student-edit-profile-components/FormPageOne";
import FormPageThree from "./student-edit-profile-components/FormPageThree";
import FormPageFour from "./student-edit-profile-components/FormPageFour";
import FormPageSix from "./student-edit-profile-components/FormPageSix";
import Sidebar from "./student-edit-profile-components/Sidebar";
import Appheader from "../../components/includes/AppHeader";

const EditProfile = () => {
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    formOneData: {},
    formThreeData: {},
    formFourData: {},
    formSixData: {},
  });

  const goToNextForm = () => {
    setCurrentStep(currentStep + 1);
  };

  const goToPreviousForm = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (formName, data) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [formName]: data,
    }));
    setCurrentStep((prevStep) => prevStep + 1);
  };

  console.log("complete form data:", formData);

  const getStepComponent = () => {
    switch (currentStep) {
      case 0:
        return (
          <FormPageOne
            formData={formData.formOneData}
            onSubmit={(data) => handleSubmit("formOneData", data)}
            goToNextForm={goToNextForm}
          />
        );
      case 1:
        return (
          <FormPageThree
            formData={formData.formThreeData}
            onSubmit={(data) => handleSubmit("formThreeData", data)}
            goToNextForm={goToNextForm}
            goToPreviousForm={goToPreviousForm}
          />
        );
      case 2:
        return (
          <FormPageFour
            formData={formData.formFourData}
            onSubmit={(data) => handleSubmit("formFourData", data)}
            goToNextForm={goToNextForm}
            goToPreviousForm={goToPreviousForm}
          />
        );
      case 3:
        return (
          <FormPageSix
            allFormData={formData}
            formData={formData.formSixData}
            onSubmit={(data) => handleSubmit("formSixData", data)}
            goToPreviousForm={goToPreviousForm}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="main-wrapper">
      <div className="main-content menu-active m-3">
        <Appheader />
        <div className="middle-sidebar-bottom theme-dark-bg">
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
  );
};

export default EditProfile;
