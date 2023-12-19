// Dropdown.js

import React from "react";

const Dropdown = ({ className,  options,  column_name,  value,  onChange,  placeholder,  required}) => {
  return (
    <select className={`form-control ${className}`} value={value} onChange={onChange} required={required} multiple={false}>
      {options.length === 0 ? (<option disabled value=""> No data found </option>
      ) : (
        <>
          { placeholder ? ( <option disabled value=""> {placeholder} </option>) :
            (<option disabled value=""> Select an option </option>) }

          { options.map((option) => (
            <option key={option.id} value={option.id}> {option[column_name]} </option> )) }
        </>
      )}
    </select>
  );
};

export default Dropdown;
