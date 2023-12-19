import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import BackButton from "../../../components/navigation/BackButton";

function EditClass() {
  const { classId } = useParams();
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [className, setClassName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchClass = async () => {
    try {
      const response = await fetch(
        baseUrl + `api/get-class-details/${classId}`
      );
      const data = await response.json();
      setClassName(data.class);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    fetchClass();
  }, []);

  const editClass = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("class", className);

      const response = await fetch(
        `${baseUrl}api/update-class-details/${classId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setClassName("");
        toast.success("Class updated successfully");
        navigate("/all_classes");
      } else {
        throw new Error("Failed to update class");
      }
    } catch (error) {
      toast.error("Could not update class: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="custom-middle-sidebar-bottom p-3 theme-dark-bg">
        <div className="middle-sidebar-left">
          <div className="row">
            <ToastContainer autoClose={3000} />
            <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
              <div>
                <h2 className="fw-400 font-lg d-block">
                  Edit <b>Class</b>
                </h2>
              </div>
              <div className="float-right">
                <Link
                  to={"/all_classes"}
                  className="p-2 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current mx-1"
                >
                  View Classes
                </Link>
                <BackButton />
              </div>
            </div>
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-6 col-sm-12">
                <div className="card w-100 mt-4 border-0 bg-white shadow-xs p-0 mb-4">
                  <div className="card-body p-lg-5 px-4 w-100 border-0 ">
                    <form onSubmit={editClass}>
                      <div className="row mb-3 gap-2">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">
                              Class Name
                            </label>
                            <input
                              type="text"
                              name="class"
                              className="form-control"
                              placeholder="Enter Class Name"
                              value={className}
                              onChange={(e) => setClassName(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <button
                            type="submit"
                            className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0 mt-2"
                            disabled={isSubmitting}
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
      </div>
    </>
  );
}

export default EditClass;
