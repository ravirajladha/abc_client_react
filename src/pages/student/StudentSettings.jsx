import React, { useState, useEffect } from "react";
import AppFooter from "../../components/includes/AppFooter.jsx";
import AppHeader from "../../components/includes/AppHeader.jsx";
import StudentSidebar from "../../components/includes/StudentSidebar.jsx";
import BackButton from "../../components/navigation/BackButton.jsx";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { AuthContext } from "../../lib/AuthContext.js";
import { Bars } from "react-loader-spinner";

function StudentSettings() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const user = useContext(AuthContext).user;
  const userId = user.user.id;

  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState(null);
  const [parentData, setParentData] = useState(null);
  const [parentCode, setParentCode] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const get_student_details = () => {
    fetch(baseUrl + "api/get_student_info/" + userId, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        console.log(resp);
        setStudentData(resp);
        setFormData({
          name: resp.name,
          email: resp.email,
          password: "",
        });
        if (resp.parent_id) {
          getParent(resp.parent_id);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.error("Could not get the details :" + err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    get_student_details();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const getParent = (parentId) => {
    if (parentId) {
      fetch(baseUrl + "api/get_parent/" + parentId, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          setParentData(resp);
          setLoading(false);
        })
        .catch((err) => {
          toast.error("Could not submit Form :" + err.message);
          setLoading(false);
        });
    }
  };

  const connectParent = (e) => {
    e.preventDefault();

    let inputobj = {
      parentCode: parentCode,
      userId: userId,
    };

    if (validateParent()) {
      fetch(baseUrl + "api/connect_parent", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(inputobj),
      })
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          console.log(resp.parent);
          setParentData(resp.parent);
          toast.success(resp.msg);
        })
        .catch((err) => {
          toast.error("Could not submit Form :" + err.message);
        });
    }
  };

  const validateParent = () => {
    let result = true;
    if (parentCode === "" || parentCode === null) {
      result = false;
      toast.warning("Please Enter Parent Code");
    }
    return result;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    console.log("user_id", user.user.id);
    fetch(baseUrl + "api/update-student/" + user.user.id, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User updated successfully", data);
        toast.success("User password  updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating student:", error);
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

  return (
    <>
      <div className="middle-sidebar-bottom theme-dark-bg bg-lightblue">
        <div className="middle-sidebar-left">
          <div className="row">
            <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
              <div>
                <h2 className="fw-400 font-lg d-block">
                  <b> Settings</b>{" "}
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
            <div className="col-lg-12">
              <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                <div className="card-body p-4 w-100 border-0">
                  <h2 className="fw-400 font-lg d-block">
                    Connect <b> Parent</b>
                  </h2>
                  {/* {parentData ? (
                        <div className="row">
                          <div className="col-12 my-3 form-group">
                            <span className="mont-font fw-600 font-xsss mr-3">
                              Parent Name:
                            </span>
                            <span>{parentData.name}</span>
                          </div>
                          <div className="col-12 form-group">
                            <span className="mont-font fw-600 font-xsss mr-3">
                              Parent Code:
                            </span>
                            <span>{parentData.parent_code}</span>
                          </div>
                        </div>
                      ) : (
                        <form onSubmit={connectParent}>
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group">
                                <div class="row my-3">
                                  <label
                                    for="parentCode"
                                    className="col-sm-2 mont-font fw-600 font-xsss col-form-label d-flex justify-content-center align-items-center"
                                  >
                                    Unique Parent Code
                                  </label>
                                  <div class="col-sm-10">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter Unique Parent id"
                                      value={parentCode}
                                      name="parentCode"
                                      onChange={(e) =>
                                        setParentCode(e.target.value)
                                      }
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
                                Submit
                              </button>
                            </div>
                          </div>
                        </form>
                      )} */}
                  {loading ? (
                    <Bars
                      height="50"
                      width="50"
                      color="#ff9500"
                      ariaLabel="bars-loading"
                      wrapperClass="d-flex justify-content-center align-items-center"
                      visible={true}
                    />
                  ) : parentData ? (
                    <div className="row">
                      <div className="col-12 my-3 form-group">
                        <span className="mont-font fw-600 font-xsss mr-3">
                          Parent Name:
                        </span>
                        <span>{parentData.name}</span>
                      </div>
                      <div className="col-12 form-group">
                        <span className="mont-font fw-600 font-xsss mr-3">
                          Parent Code:
                        </span>
                        <span>{parentData.parent_code}</span>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={connectParent}>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <div class="row my-3">
                              <label
                                for="parentCode"
                                className="col-sm-2 mont-font fw-600 font-xsss col-form-label d-flex justify-content-center align-items-center"
                              >
                                Unique Parent Code
                              </label>
                              <div class="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Unique Parent id"
                                  value={parentCode}
                                  name="parentCode"
                                  onChange={(e) =>
                                    setParentCode(e.target.value)
                                  }
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
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <StudentSidebar />
      </div>
    </>
  );
}

export default StudentSettings;
