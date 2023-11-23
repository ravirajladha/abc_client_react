import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

// class Header extends Component {
//   state = {
//     isOpen: false,
//   };
//   toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

//   render() {
//     const navClass = `${this.state.isOpen ? ' show' : ''}`;
//     const { divClass, color = 'light' } = this.props;
//     let colorClass;
//     if (color === 'dark') {
//       colorClass = 'text-white';
//     }
function Header(props){
  const [isOpen, setIsOpen] = useState(false);
  const { divClass, color = 'light' } = props;
  let colorClass;
  if (color === 'dark') {
    colorClass = 'text-white';
  }

  const toggleOpen = () => setIsOpen(!isOpen);
  const navClass = `${isOpen ? ' show' : ''}`;
    return (
      <div className={`header-wrapper pt-3 pb-3 shadow-xss ${divClass}`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-9 navbar pt-0 pb-0">
              <Link to="/">
                <h1 className="fredoka-font ls-3 fw-700 text-current font-xxl">
                  Elomoas
                  <span className="d-block font-xsssss ls-1 text-grey-500 open-font ">
                    Online Learning Course
                  </span>
                </h1>
              </Link>
              <button className="navbar-toggler" onClick={toggleOpen}>
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className={`collapse navbar-collapse ${navClass}`}
                id="navbarNavDropdown"
              >
                <Navbar
                  expand="lg"
                  className="dropdown-navbar slide-navmenu nav-menu"
                >
                  <Navbar id="basic-navbar-nav" className="w-100 d-block">
                    <Nav className={`${colorClass}`}>
                      <NavDropdown title="Home" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/home-2">
                          Home One
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/home-3">
                          Home Two
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/home-4">
                          Home Three
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/home-5">
                          Home Four
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/home-6">
                          Home Five
                        </NavDropdown.Item>
                      </NavDropdown>
                      <NavDropdown title="Pages" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/about">About</NavDropdown.Item>
                        <NavDropdown.Item href="/contact">
                          Contact
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/contact-2">
                          Contact 2
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/notfound">
                          404
                        </NavDropdown.Item>
                      </NavDropdown>
                      <NavDropdown title="Blog" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/blog">Blog</NavDropdown.Item>
                        <NavDropdown.Item href="/blog-sidebar">
                          Blog Sidebar
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/blog-single">
                          Blog Single
                        </NavDropdown.Item>
                      </NavDropdown>
                      <NavDropdown title="Courses" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/courses-grid-1">
                          Course Gird 1
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/courses-grid-2">
                          Course Gird 2
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/courses-grid-3">
                          Course Gird 3
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/course-details">
                          Single Course 1
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/course-details-2">
                          Single Course 2
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/user-profile">
                          User Profile
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/author-profile">
                          Author Profile
                        </NavDropdown.Item>
                      </NavDropdown>
                      <NavDropdown.Item href="/contact">
                        Contact
                      </NavDropdown.Item>
                    </Nav>
                  </Navbar>
                </Navbar>
              </div>
            </div>
            <div className="col-lg-3 text-right d-none d-lg-block">
              <Link
                to="#"
                data-toggle="modal"
                data-target="#ModalCart"
                className={`float-right text-center mt-1 ml-4 text-grey-800 position-relative ${colorClass}`}
              >
                <i className="ti-shopping-cart font-lg"></i>
                <span className="font-xssss fw-500 d-block lh-1">Cart</span>
                <span className="icon-count bg-current">3</span>
              </Link>
              <Link
                to="#"
                className={`float-right text-center mt-1 ml-4 text-grey-800 position-relative ${colorClass}`}
              >
                <i className="ti-heart font-lg"></i>
                <span className="font-xssss fw-500 d-block lh-1">Saved</span>
                <span className="icon-count bg-current">2</span>
              </Link>
              <Link
                to="#"
                className={`float-right d-none d-lg-block text-center mt-1 ml-4 text-grey-800 ${colorClass}`}
              >
                <i className="ti-user font-lg"></i>
                <span className="font-xssss fw-500 d-block lh-1">Account</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }


export default Header;
