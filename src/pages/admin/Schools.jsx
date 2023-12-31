import React, { useState, useEffect } from "react";
import { Modal, Button, Form, InputGroup,CloseButton  } from "react-bootstrap";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackButton from "../../components/navigation/BackButton";
import { AuthContext } from "../../lib/AuthContext.js";
import { useContext } from "react";
import Loader from "../../components/common/Loader.jsx";
import NoContent from "../../components/common/NoContent.jsx";

function Schools() {
  const user = useContext(AuthContext).user;
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [schools, setSchools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  useEffect(() => {
    getSchools();
  }, []);

  function getSchools() {
    let result = fetch(baseUrl + "api/get_schools").then(function (result) {
      result.json().then(function (jsonbody) {
        setSchools(jsonbody);
        setIsLoading(false);
      });
    });
  }

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevents multiple submissions if already submitting

    setIsSubmitting(true);
    const userData = { ...form };
    console.log("Sending data to the server:", userData);

    try {
      const response = await axios.post(`${baseUrl}api/addSchool`, userData);
      toast.success("School added successfully");
      setShowModal(false);
      getSchools();
      setForm("");
    } catch (error) {
      toast.error("Failed to add school");
      console.error("Error adding school:", error.response || error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add School</Modal.Title>
          <Button
                variant="grey"
                className="p-2 px-3 mr-5 float-right d-inline-block text-white fw-700 lh-30 rounded-xlg font-xsssss ls-3 bg-danger"
                onClick={handleCloseModal}
                style={{position: 'absolute',right:0}}
              >
                X
              </Button>
          {/* <CloseButton
      onClick={handleCloseModal}
      aria-label="Close"
      style={{
        padding: '0.5rem', // Adjust padding as needed
        margin: '-1rem -1rem -1rem auto', // Adjust margin as needed
        display: 'block' // Ensure the button is not accidentally hidden
      }}
    /> */}
          {/* <CloseButton onClick={handleCloseModal} aria-label="Close" /> */}
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleFormChange}
                required
                placeholder="Enter School Name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleFormChange}
                placeholder="Enter School Email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleFormChange}
                placeholder="Enter Phone Number"
                maxLength="10" // This limits the input to 10 characters
                pattern="\d{10}" // This pattern matches exactly 10 digits
                title="Please enter a 10-digit phone number"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleFormChange}
                  placeholder="Enter Password"
                  required
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? (
                    <i className="feather-eye text-grey-900 font-lg"></i>
                  ) : (
                    <i className="feather-eye-off text-grey-900 font-lg"></i>
                  )}
                </Button>
              </InputGroup>
            </Form.Group>
            <div className="d-flex justify-content-between">
              {/* <Button
                variant="secondary"
                className="p-2  d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current"
                onClick={handleCloseModal}
              >
                Close
              </Button> */}
              <div></div>
              <Button
                variant="primary"
                disabled={isSubmitting}
                className="p-2 px-3 d-inline-block me-2 text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current border-0"
                type="submit"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* <div className="main-wrapper">
        <div className="main-content menu-active">
          <AppHeader /> */}

      <div className="middle-sidebar-bottom theme-dark-bg">
        <div className="middle-sidebar-left">
          <div className="row">
            <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
              <div>
                <h2 className="fw-400 font-lg d-block">
                  All <b> Schools</b>{" "}
                </h2>
              </div>
              <div className="float-right">
                <button
                  onClick={handleShowModal}
                  className="p-2 px-3 d-inline-block me-2 text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current"
                >
                  Add School
                </button>
                <BackButton />
              </div>
            </div>
            {isLoading ? (
              <Loader />
            ) : schools && schools.length > 0 ? (
              schools.map((school, index) => (
                <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                  <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                    <h4 className="fw-700 font-xs mt-4 capitalize">
                      {school.school_name}
                    </h4>
                    <div className="card-footer bg-transparent border-top-0">
                      <Link
                        to={`/schools/edit-school-profile/${school.auth_id}`}
                        className="p-2 mt-4 d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current"
                      >
                        View Detail
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <NoContent contentName="schools" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Schools;
