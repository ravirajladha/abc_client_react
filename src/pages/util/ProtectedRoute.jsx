// ProtectedRoute.js

import React from 'react';
import {  Navigate ,useLocation } from 'react-router-dom';
import { getUserFromLocalStorage } from './SessionStorage';
import NotFound from "../common/Notfound";

const ProtectedRoute = ({  allowedTypes,element }) => {
  console.log("element", element, allowedTypes)
  const userData = getUserFromLocalStorage();
  const userType = userData?.user?.type;
  const location = useLocation();

  // Define the home paths for different user types
  const homePaths = {
   
    teacher: '/teacher',
    sub_admin: '/school',
    parent: '/parent',
    school_student: '/home',
    admin: '/admin',// Assuming 'school_student' is already defined
    // Add any other user types and their home paths here
  };
  // console.log(`User Data: ${JSON.stringify(userData)}`); // Add logging to check the userData structure
  console.log(`Allowed Types: ${allowedTypes}`);
    // Get the redirect path from the homePaths based on the userType or default to '/home'
    const redirectPath = homePaths[userType];

    if (!userData) {
      console.log("1",redirectPath);
      return <Navigate to="/" replace />;
    } else if (allowedTypes && !allowedTypes.includes(userType)) {
      console.log("2",redirectPath);
      return <NotFound />;
    } else if (location.pathname === '/' || location.pathname === '/register') {
      console.log("3",redirectPath);
      // Redirect to the appropriate home page based on userType
      return <Navigate to={redirectPath} replace />;
    }
  console.log("4",element);
    return element; // User is signed in and has permission
  };



export default ProtectedRoute;