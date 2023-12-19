




import React from 'react';
import MainLayout from './MainLayout';
import ProtectedRoute from "./pages/util/ProtectedRoute";

const withLayoutAndProtection = (Component, options = {}) => {
  // This function returns another function that returns JSX
  return function LayoutAndProtection(props) {
    // The element to be protected
    const element = 
      // <MainLayout>
        <Component {...props} />
      {/* </MainLayout> */}
   

    // Return the ProtectedRoute with the allowedTypes and the element
    return <ProtectedRoute allowedTypes={options.allowedTypes} element={element} />;
  };
};

export default withLayoutAndProtection;

