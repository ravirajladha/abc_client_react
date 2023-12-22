// LogoutButton.js
import React, { useContext } from 'react';
import { AuthContext } from '../../lib/AuthContext'; // Adjust path as necessary
import {Link} from  "react-router-dom";
function LogoutButton() {
    const { logout } = useContext(AuthContext); // Use the logout function from context

    const handleLogout = () => {
      logout(); // Call logout directly
    };

  return (
    <Link
    onClick={handleLogout}
    className="nav-content-bttn open-font h-auto pt-2 pb-2"
  >
    <i className="font-sm feather-log-out mr-3 text-dark"></i>
    <span>Logout</span>
  </Link>
  );
}

export default LogoutButton;
