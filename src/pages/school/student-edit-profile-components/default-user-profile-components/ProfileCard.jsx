import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
  FaTransgender,
  FaPray,
  FaUsers,
  FaWheelchair,
  FaIdCard,
  FaHome,
  FaInfoCircle,
  FaHeart,
  FaLanguage,
  FaClock,
} from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";
// ... import other icons you plan to use

const ProfileCard = ({ studentDetails }) => {
  const formatDetail = (value, defaultValue) => value || defaultValue;

  const detailWithIcon = (IconComponent, label, value) => (
    <div className="d-flex align-items-center mb-3">
      <div className="icon-container mr-3">
        <IconComponent className="icon" />
      </div>
      <div className="label-value-container">
        <strong className="mr-2">{label}:</strong>
        <span>{formatDetail(value, "Not provided")}</span>
      </div>
    </div>
  );

  return (
    <div className="card border-0 shadow rounded-lg">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center p-4">
        <h3 className="mb-0">About Me</h3>
        <a href="/default-user-profile" className="text-white">
          <i className="feather-edit"></i>
        </a>
      </div>
      <div className="card-body p-4">
        {detailWithIcon(FaUser, "First Name", studentDetails?.f_name)}
        {detailWithIcon(FaUser, "Last Name", studentDetails?.l_name)}
        {detailWithIcon(FaEnvelope, "Email", studentDetails?.email)}
        {detailWithIcon(FaPhone, "WhatsApp No", studentDetails?.whatsapp_no)}
        {detailWithIcon(FaBirthdayCake, "Date of Birth", studentDetails?.dob)}
        {detailWithIcon(FaTransgender, "Gender", studentDetails?.gender)}
        {detailWithIcon(FaPray, "Religion", studentDetails?.religion)}
        {detailWithIcon(FaUsers, "Category", studentDetails?.category)}
        {detailWithIcon(
          FaWheelchair,
          "Physically Challenged",
          studentDetails?.physically_challenged
        )}
        {detailWithIcon(FaIdCard, "Aadhar", studentDetails?.aadhar)}
        {detailWithIcon(
          FaHome,
          "Permanent Address",
          studentDetails?.perm_address
        )}
        {detailWithIcon(
          FaInfoCircle,
          "Description",
          studentDetails?.description
        )}
        {detailWithIcon(FaHeart, "Hobby", studentDetails?.hobby)}
        {detailWithIcon(
          FaLanguage,
          "Mother Tongue",
          studentDetails?.motherTongue
        )}
        {detailWithIcon(FaClock, "Created At", studentDetails?.created_at)}
        {detailWithIcon(
          BsCurrencyDollar,
          "Annual Income",
          studentDetails?.annual_income
        )}
        {/* ... continue with any additional fields you have */}
      </div>
      <div className="card-footer bg-white d-flex justify-content-center p-4">
        <a
          href="/default-user-profile"
          className="btn btn-circle btn-primary mr-2"
        >
          <i className="ti-facebook"></i>
        </a>
        {/* ... repeat for other social media links */}
      </div>
    </div>
  );
};

export default ProfileCard;
