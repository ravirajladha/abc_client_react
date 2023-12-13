import React from "react";

const ProfileCard = ({ studentDetails }) => {
  const displayValueOrDefault = (
    value,
    label,
    defaultValue = "Not provided"
  ) => {
    return `${label}: ${
      value !== undefined && value !== "" ? value : defaultValue
    }`;
  };

  const groupFieldsIntoRows = (fields) => {
    // You can implement this function based on your layout requirements
    // This is a simple example that puts all fields in a single row
    return [fields];
  };

  const fieldsToDisplay = [
    { label: "First Name", value: studentDetails?.f_name },
    { label: "Last Name", value: studentDetails?.l_name },
    { label: "Mother Name", value: studentDetails?.mother_name },
    { label: "Father Name", value: studentDetails?.father_name },
    { label: "Date of Birth", value: studentDetails?.dob },
    { label: "Email", value: studentDetails?.email },
    { label: "WhatsApp No", value: studentDetails?.whatsapp_no },
    { label: "Gender", value: studentDetails?.gender },
    { label: "Religion", value: studentDetails?.religion },
    { label: "Category", value: studentDetails?.category },
    {
      label: "Physically Challenged",
      value: studentDetails?.physically_challenged,
    },
    { label: "Aadhar", value: studentDetails?.aadhar },
    { label: "Address Proof", value: studentDetails?.address_proof },
    { label: "Identity Proof", value: studentDetails?.identity_proof },
    { label: "Siblings", value: studentDetails?.siblings },
    { label: "Annual Income", value: studentDetails?.annual_income },
    { label: "Father Phone", value: studentDetails?.f_phone },
    { label: "Father Email", value: studentDetails?.f_email_id },
    { label: "Mother Phone", value: studentDetails?.m_phone },
    { label: "Communication Address", value: studentDetails?.comm_address },
    { label: "Communication Pin Code", value: studentDetails?.comm_pin_code },
    { label: "Communication Village", value: studentDetails?.comm_village },
    { label: "Communication Block", value: studentDetails?.comm_block },
    { label: "Communication State", value: studentDetails?.comm_state },
    { label: "Phone No", value: studentDetails?.phone_no },
    { label: "Permanent Address", value: studentDetails?.perm_address },
    { label: "Permanent Village", value: studentDetails?.perm_village },
    { label: "Permanent Block", value: studentDetails?.perm_block },
    { label: "Permanent State", value: studentDetails?.perm_state },
    { label: "Description", value: studentDetails?.description },
    { label: "Hobby", value: studentDetails?.hobby },
    { label: "Mother Tongue", value: studentDetails?.motherTongue },
    { label: "Created At", value: studentDetails?.created_at },
  ];

  const rowsOfFields = groupFieldsIntoRows(fieldsToDisplay);

  return (
    <div className="card d-block w-100 border-0 shadow-xss rounded-lg overflow-hidden p-lg-4 p-2">
      <div className="card-body mb-lg-3 pb-0">
        <h2 className="fw-400 font-lg d-block">
          <b>About Me</b>
          <a href="/default-user-profile" className="float-right">
            <i className="feather-edit text-grey-500 font-xs"></i>
          </a>
        </h2>
      </div>
      <div className="card-body pb-0">
        {rowsOfFields.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            <div className="col-xl-12">
              <div className="row" key={rowIndex}>
                {row.map((field, fieldIndex) => (
                  <div className="col-xl-4" key={fieldIndex}>
                    <div className="profile-details-grid">
                      <div className="profile-details-row">
                        <div className="profile-details-value p-3 border border-primary">
                          {displayValueOrDefault(field.value, field.label)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        <ul className="d-flex align-items-center mt-2 mb-3 float-left">
          {/* Social media links */}
        </ul>
      </div>
    </div>
  );
};

export default ProfileCard;
