import React, { createContext, useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { saveUserToLocalStorage, getUserFromLocalStorage, clearLocalStorage } from '../pages/util/SessionStorage';

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromLocalStorage());
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation();

  // Log the user state upon component mount and whenever it changes
  useEffect(() => {
    // console.log('AuthProvider mounted or user state changed:', user);
  }, [user]);

  
  const logout = useCallback(() => {
    clearLocalStorage();
    setUser(null); // This will trigger the useEffect below due to the state update
    console.log('User logged out and localStorage cleared');
  }, [navigate]);

  // Make sure to save the user to local storage when setUser is called
  const handleSetUser = (newUser) => {
    saveUserToLocalStorage(newUser);
    setUser(newUser);
    console.log('User set and localStorage updated:', newUser);
  };

  const isPathPublic = (pathname, publicPaths) => {
    // Exact match
    if (publicPaths.includes(pathname)) {
      return true;
    }
  
    // Match against dynamic paths
    const dynamicPaths = publicPaths.filter(p => p.includes('/:')); // Paths that include a dynamic segment
    return dynamicPaths.some(publicPath => {
      const regex = new RegExp("^" + publicPath.replace(/:[^\s/]+/, '(.+)') + "$");
      return regex.test(pathname);
    });
  };

  useEffect(() => {
    const homePaths = {
      school_student: '/home',
      admin: '/admin',
      teacher: '/teacher',
      sub_admin: '/school',
      parent: '/parent',
      recruiter: '/recruiter',
     
      // ... other user types
    };

    const redirectTo = user ? (homePaths[user.user.type] || '/') : '/';
    
    const publicPaths = ['/register', '/notfound', '/','/ebooks/private_ebook/:ebook_id'];
    // const pathIsPublic = publicPaths.includes(location.pathname);
      const pathIsPublic = isPathPublic(location.pathname, publicPaths);
    if (user && pathIsPublic) {
      navigate(redirectTo); // Redirect logged-in users to their home page
    } else if (!user && !pathIsPublic) {
      navigate('/'); // Redirect to login if there's no user and the path isn't public
    }
  }, [user, navigate, location.pathname]);
  // Providing the user and logout function in the context value
  return (
    <AuthContext.Provider value={{ user, setUser: handleSetUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
