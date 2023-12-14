// EditProfile.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FormPageOne from "./student-edit-profile-components/FormPageOne";
import FormPageThree from "./student-edit-profile-components/FormPageThree";
import FormPageFour from "./student-edit-profile-components/FormPageFour";
import FormPageSix from "./student-edit-profile-components/FormPageSix";
import Sidebar from "./student-edit-profile-components/Sidebar";
import Appheader from "../../components/includes/AppHeader";
import { Link } from "react-router-dom";
import BackButton from "../../components/navigation/BackButton";

const EditProfile = () => {
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [studentData, setStudentData] = useState({});
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const FetchStudentData = async () => {
    try {
      const response = await fetch(`${baseUrl}api/get_student_data/` + id);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setStudentData(data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  // useEffect to call the API when the component mounts
  useEffect(() => {
    FetchStudentData();
  }, []);

  const [formData, setFormData] = useState({
    formOneData: {},
    formThreeData: {},
    formFourData: {},
    formSixData: {},
  });

  useEffect(() => {
    if (studentData) {
      setFormData((prevState) => ({
        ...prevState,
        formOneData: {
          f_name: studentData.f_name || "",
          l_name: studentData.l_name || "",
          email: studentData.email || "",
          class: studentData.class || "",
          phone_no: studentData.phone_no || "",
          whatsapp_no: studentData.whatsapp_no || "",
          whatsapp_exist: studentData.whatsapp_exist === 1,
          dob: studentData.dob || "",
          gender: studentData.gender || "",
          religion: studentData.religion || "",
          category: studentData.category || "",
          physically_challenged: studentData.physically_challenged || "",
          aadhar: studentData.aadhar || "",
          address_proof: studentData.address_proof || null,
          identity_proof: studentData.identity_proof || null,
        },
        formThreeData: {
          siblings: studentData.siblings || "",
          annual_income: studentData.annual_income || "",
          father_name: studentData.father_name || "",
          f_phone: studentData.f_phone || "",
          f_email_id: studentData.f_email_id || "",
          mother_name: studentData.mother_name || "",
          m_phone: studentData.m_phone || "",
        },
        formFourData: {
          comm_address: studentData.comm_address || "",
          comm_pin_code: studentData.comm_pin_code || "",
          comm_village: studentData.comm_village || "",
          comm_block: studentData.comm_block || "",
          comm_state: studentData.comm_state || "",
          same_as_comm_address: studentData.same_as_comm_address || "",
          perm_address: studentData.perm_address || "",
          perm_pin_code: studentData.perm_pin_code || "",
          perm_village: studentData.perm_village || "",
          perm_block: studentData.perm_block || "",
          perm_state: studentData.perm_state || "",
        },
        formSixData: {
          description: studentData.description || "",
          hobby: studentData.hobby || "",
          achievements: studentData.achievements || "",
          motherTongue: studentData.motherTongue || "",
          // ... other fields specific to FormPageSix
        },
      }));
    }
  }, [studentData]);

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

  // console.log("complete form data:", formData);

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
            <div className="row">
              <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                <div>
                  <h2 className="fw-400 font-lg d-block">
                    Edit <b> Student</b>
                  </h2>
                </div>
                <div className="float-right">
                  <BackButton />
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 p-0 vh-100">
                  <Sidebar
                    currentStep={currentStep}
                    changeStep={setCurrentStep}
                  />
                </div>
                <div className="col-md-9 p-4 vh-100">{getStepComponent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
