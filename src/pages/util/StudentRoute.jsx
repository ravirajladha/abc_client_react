// StudentRoute.js

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import {getUserFromSessionStorage} from '../util/SessionStorage';


const StudentRoute = ({ element }) => {
  const userData = getUserFromSessionStorage();
  let isStudent;

  if(userData){
     isStudent = userData.user && userData.user.type === "school_student";

  }else{
    isStudent = null;
}

  if (isStudent) {
    return element;
  } else {
    return <Navigate to="/" />;
  }
};

export default StudentRoute;
