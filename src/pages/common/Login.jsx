import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../lib/AuthContext.js";
import { useContext } from "react";

import {
  saveUserToLocalStorage,
  getUserFromLocalStorage,
} from "../util/SessionStorage.jsx";

function Login() {
  const { setUser } = useContext(AuthContext);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const usenavigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    if (validate()) {
      let inputobj = {
        email: email,
        password: password,
      };

      fetch(baseUrl + "api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(inputobj),
      })
        .then((res) => {
          // Check the HTTP status code before proceeding
          if (!res.ok) {
            throw new Error(res.status === 402 ? "Credentials not Enabled" : "Invalid Credentials"); // This will be caught by the catch block below
          }
          return res.json();
        })
        .then((resp) => {
          // Now we know the login is successful
          toast.success("Success");
          saveUserToLocalStorage(resp);
          setUser(resp);
          const user = getUserFromLocalStorage();
          console.log(user);
          // Your navigation logic based on user type
          if (user.user.type === "admin") {
            usenavigate("/admin");
          } else if (user.user.type === "teacher") {
            usenavigate("/teacher");
          } else if (user.user.type === "sub_admin") {
            usenavigate("/school");
          } else if (user.user.type === "parent") {
            usenavigate("/parent");
          } else {
            usenavigate("/home");
          }
        })
        .catch((err) => {
          // Handle errors here, including the error thrown for invalid credentials
          toast.error(err.message);
        });
    }
  };
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validate = () => {
    let result = true;
    if (email === "" || email === null) {
      result = false;
      toast.warning("Please Enter Eamil/userid");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Password");
    }
    return result;
  };
  return (
    <>
      <div className="main-wrap">
        <div className="row">
          <div
            className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/classroom1.jpg)`,
            }}
          ></div>

          <div className="col-xl-7 vh-lg-100 align-items-center d-flex bg-white rounded-lg overflow-hidden">
            <div className="card shadow-none border-0 ml-auto mr-auto login-card">
              <div className="card-body rounded-0 text-left">
                <img
                  src="assets/images/abc_logo.jpg"
                  alt="logo"
                  className="inline-center flex center"
                  width={100}
                />
                <br />
                <h2 className="fw-700 display1-size display2-md-size mb-3">
                  Login into <br />
                  your account
                </h2>
                <form onSubmit={login}>
                  <ToastContainer autoClose={3000} />
                  <div className="form-group icon-input mb-3">
                    <i className="font-sm ti-email text-grey-500 pr-0"></i>
                    <input
                      type="text"
                      className="style2-input pl-5 form-control text-grey-900 font-xssss fw-600"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {/* <div className="form-group icon-input mb-1">
                    <input
                      type="Password"
                      className="style2-input pl-5 form-control text-grey-900 font-xssss ls-3"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <i className="font-sm ti-lock text-grey-500 pr-0"></i>
                  </div> */}
                  <div className="form-group my-3">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="font-sm ti-lock text-grey-500 pr-0"></i>
                        </span>
                      </div>
                      <input
                        type={passwordVisible ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control style2-input"
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="password-toggle"
                      />
                      <div className="input-group-append">
                        <button
                          className="input-group-text"
                          id="password-toggle"
                          type="button"
                          onClick={togglePasswordVisibility}
                        >
                          {passwordVisible ? (
                            <i className="font-sm feather-eye text-grey-500 pr-0"></i>
                          ) : (
                            <i className="font-sm feather-eye-off text-grey-500 pr-0"></i>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* <div className="form-check text-left mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input mt-2"
                      id="exampleCheck1"
                    />
                    <label
                      className="form-check-label font-xssss text-grey-500"
                      htmlFor="exampleCheck1"
                    >
                      Remember me
                    </label>
                 
                    <a
                      href="/forgot"
                      className="fw-600 font-xssss text-grey-700 mt-1 float-right"
                    >
                      Forgot your Password?
                    </a>
                  </div> */}
                  <button
                    type="submit"
                    className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 "
                  >
                    Login
                  </button>
                </form>

                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
