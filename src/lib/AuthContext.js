import React, { createContext, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUserToLocalStorage,getUserFromLocalStorage, clearLocalStorage } from '../pages/util/SessionStorage';

export const AuthContext = createContext({
    user: null,
    setUser: () => {}, // Add setUser here
    logout: () => {}
  });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromLocalStorage());
  const navigate = useNavigate(); // Hook for navigation

  const logout = useCallback(() => {
    clearLocalStorage();
    setUser(null); // This will trigger the useEffect below due to the state update
  }, [navigate]);

    // Make sure to save the user to local storage when setUser is called
    const handleSetUser = (newUser) => {
        saveUserToLocalStorage(newUser);
        setUser(newUser);
      };

  // useEffect hook to navigate to the login page once the user state is set to null
  useEffect(() => {
    if (user === null) {
      navigate('/'); // Change this to your login route if different
    }
  }, [user, navigate]);

  // Providing the user and logout function in the context value
  return (
    <AuthContext.Provider value={{ user,setUser: handleSetUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
