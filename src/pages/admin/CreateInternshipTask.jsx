import React, { useState, useEffect } from "react";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropdown from "../../components/inputs/Dropdown";
import BackButton from "../../components/navigation/BackButton";
import { useParams } from "react-router-dom";

function CreateInternshipTask() {
  const { internshipId } = useParams();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [labCode, setLabCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [elabs, setElabs] = useState([]);
  const [selectedElab, setSelectedElab] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleElabChange = (e) => {
    setSelectedElab(e.target.value);
    console.log(e.target.value);
  };

  function getProjectElabs(internshipId) {
    fetch(`${baseUrl}api/get_elabs_by_internship/${internshipId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("elabs", data.data);
        const formattedData = data.data.map((elab) => ({
          id: elab.id,
          elab_name: elab.name,
        }));
        setElabs(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching project eLabs:", error);
        setElabs([]);
      });
  }

  // And in the useEffect:
  useEffect(() => {
    if (internshipId) {
      getProjectElabs(internshipId);
    }
  }, [internshipId]);

  const createInternshipTask = (e) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("internship_id", internshipId);
    formData.append("elab_id", selectedElab);
    formData.append("labCode", labCode);
    formData.append("duration", duration);

    e.preventDefault();
    setIsSubmitting(true);

    console.log(formData);
    fetch(baseUrl + "api/create_internship_task", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setLabCode("");
        setDuration("");
        setName("");
        setDescription("");
        setSelectedElab("");
        toast.success(resp.msg);
      })
      .catch((err) => {
        toast.error("Could not submit question :" + err.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };
  return (
    <>
  
          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="middle-sidebar-left">
              <div className="row">
                <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                  <div className="card-body p-4 w-100 border-0 d-flex rounded-lg justify-content-between">
                    <div className="">
                      <h2 className="fw-400 font-lg d-block">
                        Create <b> Internship Task</b>{" "}
                      </h2>
                    </div>
                    <div className="float-right">
                      <BackButton />
                    </div>
                  </div>
                  <ToastContainer autoClose={3000} />

                  <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                    <form
                      encType="multipart/form-data"
                      onSubmit={createInternshipTask}
                    >
                      <div className="row mb-6">
                        <div className="col-lg-6">
                          <div className="">
                            <label className="mont-font fw-600 font-xsss">
                              Task Name
                            </label>
                            <br />
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="form-control"
                              placeholder="Enter task name"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="">
                            <label className="mont-font fw-600 font-xsss">
                              Select Elab
                            </label>
                            <br />
                            <Dropdown
                              options={elabs}
                              column_name="elab_name"
                              value={selectedElab}
                              onChange={handleElabChange}
                              required="true"
                            />
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width">
                            <label className="mont-font fw-600 font-xsss">
                              Duration
                            </label>
                            <br />
                            <input
                              type="text"
                              value={duration}
                              onChange={(e) => setDuration(e.target.value)}
                              className="form-control"
                              placeholder="Enter Duration"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width">
                            <label className="mont-font fw-600 font-xsss">
                              Decription
                            </label>
                            <br />
                            <textarea
                              rows="4"
                              cols="70"
                              className="form-control"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              placeholder="Enter Description.."
                              required
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-lg-4">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0"
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
}

export default CreateInternshipTask;
