import React from 'react';
import { Link } from 'react-router-dom';

// This component accepts a path template, parameters, and a label for the link
const DynamicLink = ({ pathTemplate, params, label }) => {
  // Replace placeholders in the path template with actual parameters from the params object
  const path = Object.keys(params).reduce(
    (path, param) => path.replace(`:${param}`, params[param]),
    pathTemplate
  );

  return (
    <Link
      to={path}
      className="ml-2 p-2 px-3 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current"
    >
      {label}
    </Link>
  );
};

export default DynamicLink;
