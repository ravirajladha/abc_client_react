import React, { useState, useEffect } from "react";
import AppFooter from "../../components/includes/AppFooter";
import AppHeader from "../../components/includes/AppHeader";
import BackButton from "../../components/navigation/BackButton";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { AuthContext } from "../../lib/AuthContext.js";

function Settings() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const user = useContext(AuthContext).user;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.user.name,
        email: user.user.email,
        password: "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    console.log(user.user);
    formDataToSend.append("type", user.user.type);
    console.log("user_id", user.user.id);
    fetch(baseUrl + "api/update_password/" + user.user.id, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Password updated successfully", data);
        toast.success(`Password updated successfully!`);
        setFormData({
          name: user.user.name,
          email: user.user.email,
          password: "",
        });
      })
      .catch((error) => {
        console.error("Error updating password:", error);
        setFormData({
          name: user.user.name,
          email: user.user.email,
          password: "",
        });
      });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  if (!user) {
    console.log("No user found. User might be logged out.");
    return <div>User is not logged in</div>;
  }

  const userId = user.user.id;
  return (
    <>
      <div className="middle-sidebar-bottom theme-dark-bg bg-lightblue">
        <div className="middle-sidebar-left">
          <div className="row">
            <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
              <div>
                <h2 className="fw-400 font-lg d-block">
                  <b> Settings</b>
                </h2>
              </div>
              <div className="float-right">
                <BackButton />
              </div>
            </div>
            <ToastContainer autoClose={3000} />
            <div className="col-lg-12">
              <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                <div className="card-body p-4 w-100 border-0 rounded-lg">
                  <h2 className="fw-400 font-lg d-block mb-2">
                    Update <b> Password</b>{" "}
                  </h2>
                  <form
                    onSubmit={handleFormSubmit}
                    method="post"
                    encType="multipart/form-data"
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <div class="row my-3">
                            <label
                              for="name"
                              className="col-sm-2 mont-font fw-600 font-xsss col-form-label d-flex justify-content-center align-items-center"
                            >
                              Name
                            </label>
                            <div class="col-sm-10">
                              <input
                                type="hidden"
                                className="form-control"
                                placeholder="Enter Name"
                                name="name"
                                value={formData.name}
                                id="name"
                                disabled
                              />
                              <p className="d-flex align-items-center fw-300 font-md">
                                {formData.name}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <div class="row mb-3">
                            <label
                              for="email"
                              className="col-sm-2 mont-font fw-600 font-xsss col-form-label d-flex justify-content-center align-items-center"
                            >
                              Email
                            </label>
                            <div class="col-sm-10">
                              <input
                                type="hidden"
                                className="form-control"
                                placeholder="Enter Email"
                                name="email"
                                value={formData.email || ""}
                                disabled
                              />
                              <p className="d-flex align-items-center fw-300 font-xs">
                                {formData.email
                                  ? formData.email
                                  : "Email not provided yet"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <div class="row mb-3">
                            <label
                              for="password"
                              className="col-sm-2 mont-font fw-600 font-xsss col-form-label d-flex justify-content-center align-items-center"
                            >
                              Password
                            </label>
                            <div class="col-sm-10">
                              <input
                                type="password"
                                className="form-control"
                                placeholder="Enter Password"
                                name="password"
                                onChange={handleInputChange}
                                value={formData.password || ""}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <button
                          type="submit"
                          className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0 float-end"
                        >
                          Update Password
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
