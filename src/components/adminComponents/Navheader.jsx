import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { clearSessionStorage, getUserFromSessionStorage } from '../../pages/util/SessionStorage';


function Navheader() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const navClass = `${isOpen ? ' nav-active' : ''}`;

  const navigate = useNavigate();

  const [loggedOut, setLoggedOut] = useState(false);
  const logout = () => {
    // Clear user data from session storage
    clearSessionStorage();
    setLoggedOut(true);
  };
  useEffect(() => {
    if (loggedOut) {
      // After the logout state changes, navigate to the appropriate page
      const userData = getUserFromSessionStorage();
      if (userData && userData.user && userData.user.type === 'admin') {
        navigate('/admin');
      } else if(userData && userData.user && userData.user.type === 'teacher'){
        navigate('/');
      }else if(userData && userData.user && userData.user.type === 'sub_admin'){
        navigate('/');
      }else if(userData && userData.user && userData.user.type === 'parent'){
        navigate('/');
      }else{
        navigate('/');
      }
    }
  }, [loggedOut, navigate]);


  return (
    <nav className={`navigation scroll-bar menu-active ${navClass}`} style={{ zIndex: 999 }}>
      <div className="container pl-0 pr-0">
        <div className="nav-content">
          <div className="nav-top">
            <Link to="/" className='justify-content-center pl-0'>
              {/* <i className="feather-slack text-success display1-size mr-3 ml-3"></i>
              <span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xl logo-text mb-0">
                Elomoas.
              </span> */}
              <img
                src="/assets/images/abc_logo.png"
                alt="logo"
                className="" width={60}
              />
            </Link>
            <span
              onClick={toggleOpen}
              className="close-nav d-inline-block d-lg-none"
            >
              <i className="ti-close bg-grey mb-4 btn-round-sm font-xssss fw-700 text-dark ml-auto mr-2 "></i>
            </span>
          </div>
          <div className="nav-caption fw-600 font-xssss text-grey-500">
            <span></span>Feeds
          </div>
          <ul className="mb-3">
            <li className="logo d-none d-xl-block d-lg-block"></li>
            <li className="nav-item">
              <NavLink className="navi-link" to="/admin">
                <i className="feather-home mr-2"></i>
                <span>Home</span>
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink className="navi-link" to="/all_subjects">
                <i className="feather-book-open mr-2"></i>
                <span>Subjects</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="navi-link" to="/assessments">
                <i className="feather-briefcase mr-2"></i>
                <span>Assessments</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="navi-link" to="/tests">
                <i className="feather-mail mr-2"></i>
                <span>Tests</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="navi-link" to="/mini_projects">
                <i className="feather-shopping-bag mr-2"></i>
                <span>Mini Projects</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="navi-link" to="/schools">
                <i className="feather-monitor mr-2"></i>
                <span>Schools</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="navi-link" to="/create_lab">
                <i className="feather-monitor mr-2"></i>
                <span>Labs</span>
              </NavLink>
            </li>
          </ul>

          <div className="nav-caption fw-600 font-xssss text-grey-500">
            <span></span> Account
          </div>
          <ul className="mb-3">
            <li className="logo d-none d-xl-block d-lg-block"></li>
            <li>
              <Link
                to="/settings"
                className="nav-content-bttn open-font h-auto pt-2 pb-2"
              >
                <i className="font-sm feather-settings mr-3 text-grey-500"></i>
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <Link

                onClick={logout}
                className="nav-content-bttn open-font h-auto pt-2 pb-2"
              >
                <i className="font-sm feather-log-out mr-3 text-grey-500"></i>
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}


export default Navheader;
