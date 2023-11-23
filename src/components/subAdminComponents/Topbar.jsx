import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="white" className="middle-sidebar-header">
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="header-menu" />

      <Form className="float-left header-search" action="#">
        <div className="form-group mb-0 icon-input">
          <i className="feather-search font-lg text-grey-400"></i>
          <FormControl
            type="text"
            placeholder="Start typing to search.."
            className="bg-transparent border-0 lh-32 pt-2 pb-2 pl-5 pr-3 font-xsss fw-500 rounded-xl w350"
          />
        </div>
      </Form>

      <Nav className="ml-auto right-menu-icon d-flex">
        <Nav.Item>
          <Nav.Link href="#">
            <span className="dot-count bg-warning"></span>
            <i className="feather-bell font-xl text-current"></i>
          </Nav.Link>
        </Nav.Item>

        {/* <Nav.Item>
          <Nav.Link href="/message/0"><i className="feather-message-square font-xl text-current"></i></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="default_user_profile">
            <img src="https://via.placeholder.com/50x50.png" alt="user" className="w40 rounded-circle mt--1" />
          </Nav.Link>
        </Nav.Item> */}

        <Nav.Item>
          <Nav.Link href="#" className="menu-search-icon">
            <i className="feather-search text-grey-900 font-lg"></i>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default Header;
