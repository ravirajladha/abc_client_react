import React, { useState } from "react";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateClass() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [className, setClassName] = useState("");

  const createClass = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("class_name", className);

    fetch(baseUrl + "api/create_class", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setClassName("");
        toast.success(resp.msg);
      })
      .catch((err) => {
        toast.error("Could not create class: " + err.message);
      });
  };

  return (
    <>
      <div className="main-wrapper">
        <div className="main-content menu-active">
          <AppHeader />
          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="middle-sidebar-left">
              <div className="row">
                <ToastContainer autoClose={3000} />
                <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                  <h2 className="fw-400 font-lg d-block ml-2">
                    Create <b> Class</b>{" "}
                  </h2>
                  <div className="card-body p-lg-5 px-4 w-100 border-0 ">
                    <form onSubmit={createClass}>
                      <div className="row mb-3">
                        <div className="col-lg-6">
                          <label className="mont-font fw-600 font-xsss">
                            Class Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Class Name"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-lg-12">
                          <button
                            type="submit"
                            className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0 mt-2"
                          >
                            Submit
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
        <AppFooter />
      </div>
    </>
  );
}

export default CreateClass;
