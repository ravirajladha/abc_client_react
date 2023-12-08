import React from "react";

const Sidebar = ({ currentStep, changeStep }) => {
  const steps = [
    { label: "School Details", componentKey: "stepOne" },
    { label: "Admission Fees", componentKey: "stepTwo" },
    { label: "Admission Procedure", componentKey: "stepThree" },
    { label: "Scholastic", componentKey: "stepFour" },
    { label: "CoScholastic", componentKey: "stepFive" },
    { label: "Achievements", componentKey: "stepSix" },
    { label: "Facilities", componentKey: "stepSeven" },
    { label: "ExtraCurricular", componentKey: "stepEight" },
    { label: "Academics", componentKey: "stepNine" },
    { label: "Faculty", componentKey: "stepTen" },
    { label: "Reviews", componentKey: "stepEleven" },
    { label: "Gallery", componentKey: "stepTwelve" },
    { label: "FAQ", componentKey: "stepThirteen" },
    { label: "SchoolDocuments", componentKey: "stepFourteen" },
    { label: "AuthorizedSignatoryInfo", componentKey: "stepFifteen" },
    { label: "AuthorizedSignatoryDocs", componentKey: "stepSixteen" },
    { label: "BankDetails", componentKey: "stepSeventeen" },
    { label: "BillingDetails", componentKey: "stepEighteen" },
  ];

  return (
    <div
      className="m-4 p-4"
      style={{
        backgroundImage:
          "url(https://multi-step-react.vercel.app/assets/bg-sidebar-desktop-e6d2744a.svg)",
        backgroundSize: "cover",
        height: "96%",
        margin: "10px",
        borderRadius: "10px",
      }}
    >
      {steps.map((step, index) => (
        <div
          key={index}
          className={`d-flex align-items-center mb-3 p-2 ${
            index === currentStep
              ? "bg-blur rounded"
              : "bg-blur-transparent rounded"
          }`}
          onClick={() => changeStep(index)}
          style={{ cursor: "pointer" }}
        >
          <div
            className={`rounded-circle d-flex justify-content-center align-items-center mr-2 border border-white ${
              index === currentStep ? "bg-light text-dark" : "text-light"
            }`}
            style={{ width: "25px", height: "25px" }}
          >
            {index + 1}
          </div>
          <div className="font-size-14 text-white">{step.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
