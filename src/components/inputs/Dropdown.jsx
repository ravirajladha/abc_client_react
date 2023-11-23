// Dropdown.js

import React from 'react';

const Dropdown = ({ options,column_name, value, onChange }) => {
  return (
    <select className="form-control" value={value} onChange={onChange}>
    {options.length === 0 ? (
      <option disabled value="">No data found</option>
    ) : (
      <>
        <option disabled value="">Select an option</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option[column_name]}
          </option>
        ))}
      </>
    )}
  </select>
  );
};

export default Dropdown;
