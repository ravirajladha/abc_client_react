import React from "react";

const Sidebar = ({ currentStep, changeStep }) => {
  const steps = [
    { label: "Personal Details", componentKey: "stepOne" },
    // { label: "Previous Academic Information", componentKey: "stepTwo" },
    { label: "Family Information", componentKey: "stepThree" },
    { label: "Communication Address", componentKey: "stepFour" },

    { label: "About Yourself", componentKey: "stepSix" },
  ];

  return (
    <div
      className="h-98 mb-5 p-4 rounded"
      style={{
        backgroundImage:
          "url(https://multi-step-react.vercel.app/assets/bg-sidebar-desktop-e6d2744a.svg)",
        backgroundSize: "cover",
        height: "96%",
        margin: "10px",
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
