import React from 'react';
import { useLocation } from 'react-router-dom';
import AppHeader from './components/includes/AppHeader';
import AppFooter from './components/includes/AppFooter';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;
//There is nolayoutroutes, where the exact location has been passed to not show the header and footer
// Wherever there is no need of passing the header and footer, we are not passing the two div block also.
// Currently I have used only two routes name using Startswith, later we need to give more strict notes

  // Define routes where you don't want the header, footer, and additional divs
  const noLayoutRoutes = ['/register', '/login']; // Adjust this list as needed

  console.log("path", path);
  const showLayout = () => {
    // Check for exact matches
    if (noLayoutRoutes.includes(path)) {
      return false;
    }
    
    // Check for dynamic route patterns
    if (path.startsWith('/ebooks/preview') || path.startsWith('/editor_practicse/')) { 
      return false;
    }

    return true;
  };

  if (!showLayout()) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="main-wrapper">
        <div className="main-content menu-active">
          <AppHeader />
          {children}
        </div>
        <AppFooter />
      </div>
    </>
  );
};

export default MainLayout;
