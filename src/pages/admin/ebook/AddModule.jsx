import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import AppHeader from "../../../components/includes/AppHeader";
import AppFooter from "../../../components/includes/AppFooter";
import BackButton from "../../../components/navigation/BackButton";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddModule = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { ebookId } = useParams();
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  async function postData() {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await fetch(
        baseUrl + "api/ebook/" + ebookId + "/store-module",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add module");
      }

      toast.success("Module added successfully");
      const message = "Module added successfully";
      // navigate('/ebooks/ebook_modules/' + ebookId );
      navigate(
        `/ebooks/ebook_modules/${ebookId}?message=${encodeURIComponent(
          message
        )}`
      );
      // setTitle("");
      // setDescription("");
    } catch (error) {
      toast.error("Failed to add module");
    }
  }

  return (
    <>
      

          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="middle-sidebar-left">
              <div className="row">
                <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                  <h2 className="fw-400 font-lg d-block">
                    Add <b> Ebook Module</b>
                  </h2>
                  <div className="float-right">
                    <BackButton />
                  </div>
                </div>
                <div className="card w-100 border-0 bg-white shadow-lg p-0 mb-4">
                  <ToastContainer autoClose={3000} />
                  <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                    <form encType="multipart/form-data" onSubmit={postData}>
                      <div className="row">
                        <div className="col-lg-4">
                          <label className="mont-font fw-600 font-xsss">
                            Title
                          </label>
                          <br />
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Module Title"
                            value={title}
                            onChange={handleTitleChange}
                            required
                          />
                        </div>
                        <div className="col-lg-6">
                          <label className="mont-font fw-600 font-xsss">
                            Description
                          </label>
                          <br />
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Module Description"
                            value={description}
                            onChange={handleDescriptionChange}
                          />
                        </div>
                        <div className="col-lg-2">
                          <label htmlFor=""></label>
                          <br />
                          <button
                            type="submit"
                            className="btn bg-current text-center text-white font-xsss fw-600 mt-1 p-3 w175 rounded-lg d-inline-block"
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
       
    </>
  );
};

export default AddModule;
