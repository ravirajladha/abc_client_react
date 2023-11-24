import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


const Register = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    acceptTerms: false,
  });

  const { name, email, phone, password, acceptTerms } = formData;

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!acceptTerms) {
      alert("Please accept the terms and conditions.");
      return;
    }
  
    const user = { name, email, phone, password };
  
    console.log('Sending data to the server:', user); // This will log the data you're about to send
  
    try {
      const response = await axios.post(`${baseUrl}api/parent_registration`, user); // Include the correct base URL and endpoint
      console.log('Response from the server:', response.data);
      toast.success("Registration successful");
      window.location = '/login'; 
      // handle success (e.g., redirect to login)
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("Email already exists.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
      console.error("Registration error:", error);
    }
  };


  return (
    <>
      <ToastContainer />
      <div className="main-wrap">
        <div className="row">
          <div
            className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
            style={{
              backgroundImage: `url("https://img.freepik.com/free-photo/smiley-woman-holding-book-front-view_23-2149915887.jpg?w=740&t=st=1680948722~exp=1680949322~hmac=f11745674cdd4603e26546821f6cf0dd0d93a8e00c9d7b35bd149bc003461def")`,
            }}
          ></div>

          <div className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-lg overflow-hidden">
            <div className="card shadow-none border-0 ml-auto mr-auto login-card">
              <div className="card-body rounded-0 text-left">
                <img
                  src="assets/images/abc_logo.png"
                  alt="logo"
                  className=""
                  width={100}
                />
             

                <br />
                <h2 className="fw-700 display1-size display2-md-size mb-4">
                  Create <br />
                  Parent's account
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group icon-input mb-3">
                    <i className="font-sm ti-user text-grey-500 pr-0"></i>
                    <input
                      type="text"
                      name="name" // Add name attribute
                      value={formData.name} // Bind state value
                      onChange={handleChange} // Set the event handler
                      className="style2-input pl-5 form-control text-grey-900 font-xsss fw-600"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="form-group icon-input mb-3">
                    <i className="font-sm ti-email text-grey-500 pr-0"></i>
                    <input
                      type="email" // Change to type="email"
                      name="email" // Add name attribute
                      value={formData.email} // Bind state value
                      onChange={handleChange} // Set the event handler
                      className="style2-input pl-5 form-control text-grey-900 font-xsss fw-600"
                      placeholder="Your Email Address"
                    />
                  </div>
                  <div className="form-group icon-input mb-1">
                    <input
                      type="tel" // Change to type="tel"
                      name="phone" // Add name attribute
                      value={formData.phone} // Bind state value
                      onChange={handleChange} // Set the event handler
                      className="style2-input pl-5 form-control text-grey-900 font-xss ls-3"
                      placeholder="Your Phone Number"
                    />
                    <i className="font-sm feather-phone text-grey-500 pr-0"></i>
                  </div>
                  <div className="form-group icon-input mb-3">
                    <input
                      type="password" // Correct type attribute
                      name="password" // Add name attribute
                      value={formData.password} // Bind state value
                      onChange={handleChange} // Set the event handler
                      className="style2-input pl-5 form-control text-grey-900 font-xss ls-3"
                      placeholder="Password"
                    />
                    <i className="font-sm ti-lock text-grey-500 pr-0"></i>
                  </div>

                  <div className="form-check text-left mb-3">
                    <input
                      type="checkbox"
                      name="acceptTerms" // Add name attribute
                      checked={formData.acceptTerms} // Bind state value
                      onChange={handleChange} // Set the event handler
                      className="form-check-input mt-2"
                      id="exampleCheck1"
                    />
                    <label
                      className="form-check-label font-xssss text-grey-500"
                      htmlFor="exampleCheck1"
                    >
                      Accept Term and Conditions
                    </label>
                  </div>
           

                <div className="col-sm-12 p-0 text-left">
                  <div className="form-group mb-1">
                    <button
                      type="submit"
                      className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0"
                    >
                      Register
                    </button>
                  </div>
                  <h6 className="text-grey-500 font-xssss fw-500 mt-0 mb-0 lh-32">
                    Already have account{" "}
                    <Link to="/login" className="fw-700 ml-1">
    Login
  </Link>
                  </h6>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
