// ProtectedRoute.js

import React from 'react';
import {  Navigate } from 'react-router-dom';
import { getUserFromSessionStorage } from './SessionStorage';
import NotFound from "../Notfound";

const ProtectedRoute = ({ element, allowedTypes }) => {
  const userData = getUserFromSessionStorage();
  const userType = userData?.user?.type;

   // User is signed in but does not have permission to view this route
   if (userData && !allowedTypes.includes(userType)) {
    return <NotFound />;
  }

  if (allowedTypes.includes(userType)) {
    return element;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
