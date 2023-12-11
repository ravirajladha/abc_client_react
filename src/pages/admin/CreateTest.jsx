import React, { useState, useEffect } from "react";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
import Dropdown from "../../components/inputs/Dropdown";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/navigation/BackButton";

function CreateTest() {
  const terms = [
    { id: '1', term: 'Term 1' },
    { id: '2', term: 'Term 2' },
    { id: '3', term: 'Term 3' }
];

  const baseUrl = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    getClasses();
  }, []);

  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState("");

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function getClasses() {
    let result = fetch(baseUrl + "api/get_classes").then(function (result) {
      result.json().then(function (jsonbody) {
        //console.warn(jsonbody);
        setClasses(jsonbody);
      });
    });
  }
  async function getSubjects() {
    try {
      const response = await fetch(baseUrl + "api/get_subjects_by_class/" + selectedClass);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonbody = await response.json();
      console.warn("subject", jsonbody);
      setSubjects(jsonbody);
    } catch (error) {
      console.error("Failed to fetch subjects:", error);
    }
  }
  

  const handleClassChange = (e) => {
    const selectedValue = e.target.value;
    // console.log(selectedValue);
    setSelectedClass(selectedValue);
    // getSubjects();
  };
  const handleSubjectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedSubject(selectedValue);
  };
  const handleTermChange = (e) => {
    setSelectedTerm(e.target.value);
  };

  useEffect(() => {
    getSubjects();
  }, [selectedClass]);

  const navigate = useNavigate();
  const createTest = (e) => {
    const formData = new FormData();
    formData.append("class", selectedClass);
    formData.append("subject", selectedSubject);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("term", selectedTerm); // Append selected term here

    e.preventDefault();

    fetch(baseUrl + "api/create_test", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        // Additional response handling
        navigate("/tests/add_question_to_test", {
          state: { subjectId: selectedSubject, testId: resp.test.id },
        });
      })
      .catch((err) => {
        toast.error("Could not submit question :" + err.message);
      });
  };

  // Define the terms array
  return (
    <>
      <div className="main-wrapper">
        <div className="main-content menu-active">
          <AppHeader />
          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="middle-sidebar-left">
              <div className="row">
                <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                  <div className="card-body p-lg-5 px-4 w-100 border-0 d-flex rounded-lg justify-content-between">
                    <div className="">
                      <h2 className="fw-400 font-lg d-block ml-2">
                        Create <b> Test</b>{" "}
                      </h2>
                    </div>
                    <div className="float-right">
                      <BackButton />
                    </div>
                  </div>
                  <div className="card-body p-lg-5 px-4 w-100 border-0 ">
                    <form encType="multipart/form-data" onSubmit={createTest}>
                      <div className="row mb-6">
                        <div className="col-lg-6">
                          <label className="mont-font fw-600 font-xsss">
                            Select Class
                          </label>
                          <br />
                          <Dropdown
                            options={classes}
                            column_name="class"
                            value={selectedClass}
                            onChange={handleClassChange}
                          />
                        </div>
                        <div className="col-lg-6">
                          <label className="mont-font fw-600 font-xsss">
                            Select Subject
                          </label>
                          <br />
                          <Dropdown
                            options={subjects}
                            column_name="subject_name"
                            value={selectedSubject}
                            onChange={handleSubjectChange}
                          />
                        </div>
                        <div className="col-lg-6">
                          <label className="mont-font fw-600 font-xsss">
                            Test Name
                          </label>
                          <br />
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-lg-6">
                          <label className="mont-font fw-600 font-xsss">
                            Test Image
                          </label>
                          <br />
                          <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="col-lg-6">
                          <label className="mont-font fw-600 font-xsss">
                            Select Term
                          </label>
                          <br />
                          <Dropdown
                            options={terms} // Use the terms array here
                            column_name="term"
                            value={selectedTerm.value}
                            onChange={handleTermChange}
                          />
                        </div>
                        <div className="col-lg-12">
                          <label className="mont-font fw-600 font-xsss">
                            Decription
                          </label>
                          <br />
                          <textarea
                            rows="4"
                            cols="70"
                            className="form-control"
                            placeholder="Enter Description.."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                          ></textarea>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group float-right">
                            <label className="mont-font fw-600 font-xsss"></label>
                            <br />
                            <button
                              type="submit"
                              className="mt-1 btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0"
                            >
                              Next
                            </button>
                          </div>
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

export default CreateTest;
