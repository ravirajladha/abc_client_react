import React, { useState,useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackButton from "../../components/navigation/BackButton";
import LoaderCard from "../../components/common/LoaderCard";

function UploadOldApplications() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

    const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a CSV file.");
      return;
    }

    setIsSubmitting(true);

    try {
      // You can use the 'fetch' API to send the file to your server
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${baseUrl}api/school/upload-old-applications`, {
        method: "POST",
        body: formData,
      });
      const responseData = await response.json();
      if (response.ok) {
        toast.success(responseData.msg);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      setFile(null);

      } else {
        toast.error("Failed to upload file. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("An error occurred while uploading the file.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    {isSubmitting && (
        <LoaderCard isSubmitting={isSubmitting} />
      )}
    <div className="middle-sidebar-bottom">
      <div className="middle-sidebar-left">
        <ToastContainer autoClose={3000} />
        <div className="card-body p-4 w-100 border-0 d-flex rounded-lg justify-content-between">
          <h2 className="fw-400 font-lg d-block">
            Upload <b> Applications</b>
          </h2>
          <BackButton />
        </div>
        <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
          <div></div>
          <div className="card-body p-lg-5 p-4 w-100 border-0">
            <form
              onSubmit={handleSubmit}
              method="post"
              encType="multipart/form-data"
            >
              <div className="row mb-6">
                <div className="col-lg-6">
                  <div className="">
                    <label className="mont-font fw-600 font-xsss"> File</label>
                    <br />
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="form-control"
                      ref={fileInputRef}
                      required
                      accept=".csv"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0 mt-4"
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
    </>
  );
}

export default UploadOldApplications;
