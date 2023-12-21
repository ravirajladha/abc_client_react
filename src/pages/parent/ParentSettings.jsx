import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { AuthContext } from "../../lib/AuthContext.js";
import { Link } from "react-router-dom";
import BackButton from "../../components/navigation/BackButton.jsx";

const baseUrl = process.env.REACT_APP_BASE_URL;

function ParentSettings() {
  const [parentCode, setParentCode] = useState("");
  const userDetails = useContext(AuthContext).user;
  const fetchUserDetails = async () => {
    try {
      if (!userDetails) {
        console.log("No user found. User might be logged out.");
        return;
      }

      const userId = userDetails.user.id;
      const response = await axios.get(
        `${baseUrl}api/getParentCode?user_id=${userId}`
      );

      if (response.data.success) {
        console.log("Parent code:", response.data.data.parent_code);
        setParentCode(response.data.data.parent_code);
      } else {
        console.error("Failed to fetch user details");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userDetails]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (userDetails.user) {
      setFormData({
        name: userDetails.user.name,
        email: userDetails.user.email,
        password: "",
      });
    }
  }, [userDetails.user]);

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
    console.log("user_id", userDetails.user.id);
    fetch(baseUrl + "api/update_parent_password/" + userDetails.user.id, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Parent updated successfully", data);
        toast.success("Parent password updated successfully!");
        setFormData({
          name: userDetails.user.name,
          email: userDetails.user.email,
          password: "",
        });
      })
      .catch((error) => {
        console.error("Error updating password:", error);
        setFormData({
          name: userDetails.user.name,
          email: userDetails.user.email,
          password: "",
        });
      });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="p-5 theme-dark-bg">
      <div className="middle-sidebar-left">
        <div className="row">
          <div className="col-lg-12 pt-0 my-3 d-flex justify-content-between align-items-center ">
            <h2 className="fw-400 font-lg d-block">
              <b> Settings</b>
            </h2>
            <div className="float-right">
              <Link
                to={"/parent/add_student"}
                className="p-2 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current mx-1"
              >
                Add Student
              </Link>
              <BackButton />
            </div>
          </div>
          <ToastContainer autoClose={3000} />
          <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
            <div className="col-lg-12 pt-0 my-3 d-flex justify-content-between align-items-center ">
              <h2 className="text-grey-900 font-md fw-500">
                Parent Code: {parentCode}
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          <h2 className="fw-400 font-lg d-block mb-3">
            Update <b> Password</b>
          </h2>
          <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
            <form
              onSubmit={handleFormSubmit}
              method="post"
              enctype="multipart/form-data"
            >
              <div className="row p-3">
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
                          placeholder="Enter
            Email"
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
  );
}

export default ParentSettings;
