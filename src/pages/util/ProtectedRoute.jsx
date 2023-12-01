// ProtectedRoute.js

import React from 'react';
import {  Navigate } from 'react-router-dom';
import { getUserFromLocalStorage } from './SessionStorage';
import NotFound from "../Notfound";

const ProtectedRoute = ({ element, allowedTypes }) => {
  const userData = getUserFromLocalStorage();
  const userType = userData?.user?.type;
  console.log(`User Data: ${JSON.stringify(userData)}`); // Add logging to check the userData structure
  console.log(`Allowed Types: ${allowedTypes}`);
   // User is signed in but does not have permission to view this route
   if (!userData) {
    return <Navigate to="/" replace />;
  } else if (!allowedTypes.includes(userType)) {
    return <NotFound />;
  }

 // If the user type is allowed, render the protected component
 return element;
};

export default ProtectedRoute;