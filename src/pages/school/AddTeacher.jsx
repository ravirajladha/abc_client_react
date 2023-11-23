import React, { useState, useEffect } from "react";
import Appheader from "../../components/schoolComponents/Appheader";
import Breadcrumb from "react-bootstrap/Breadcrumb";

function AddTeacher() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [fields, setFields] = useState([{ className: "", subject: "" }]);
  const [classList, setClassList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  // Fetch the list of classes
  useEffect(() => {
    fetch(baseUrl + "api/admin/apigetClasses")
      .then((response) => response.json())
      .then((data) => setClassList(data))
      .catch((error) => console.error("Error fetching classes:", error));
  }, []);

  const handleAddFields = () => {
    setFields([...fields, { className: "", subject: "" }]);
  };

  const handleRemoveFields = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleChange = (index, e) => {
    const updatedFields = [...fields];
    updatedFields[index][e.target.name] = e.target.value;
    setFields(updatedFields);
  };

  const handleClassChange = (index, e) => {
    const selectedClassId = e.target.value;
    fetch(baseUrl + `api/admin/apigetSubjects/${selectedClassId}`)
      .then((response) => response.json())
      .then((data) => {
        const updatedFields = [...fields];
        console.log(updatedFields);
        updatedFields[index].className = selectedClassId;
        setFields(updatedFields);
        setSubjectList(data);
      })
      .catch((error) => console.error("Error fetching subjects:", error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Access the form data
    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    // Separate arrays for classes and subjects
    // const classesArray = [];
    // const subjectsArray = [];

    // Add selected class and subject names to the form data
    fields.forEach((field, index) => {
      const selectedClass = field.className;
      const selectedSubject = field.subject;

      // if (selectedClass && selectedSubject) {
      //   classesArray.push(selectedClass);
      //   subjectsArray.push(selectedSubject);
      // }

      console.log(formDataToSend);

      // formDataToSend.class.append(selectedClass);
      // formDataToSend.subject.append(selectedSubject);
    });

    // Add arrays to form data
    // formDataToSend.append("class", classesArray.join(", "));
    // formDataToSend.append("subject", subjectsArray.join(", "));

    fetch(baseUrl + "api/school/api_add_teacher", {
      method: "POST",
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success
        console.log("Teacher added successfully", data);

        // Clear form values after successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          class: "",
          subject: "",
        });
      })
      .catch((error) => {
        console.error("Error adding teacher:", error);
      });
  };

  return (
    <div className="main-wrapper">
      <div className="main-content menu-active">
        <Appheader />
        <div className="middle-sidebar-bottom bg-lightblue theme-dark-bg">
          <div className="middle-sidebar-left">
            <div className="mb-3">
              <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                <div className="card-body p-4 w-100 border-0 d-flex rounded-lg justify-content-between">
                  <h2 className="fw-400 font-lg d-block">
                    Add <b> Teacher</b>
                  </h2>

                  <div className="float-right">
                    <Breadcrumb style={{ padding: "0.25rem 1rem" }}>
                      <Breadcrumb style={{ padding: "0.25rem 1rem" }}>
                        <Breadcrumb.Item href="/admin/index">
                          <i className="fa fa-home"></i>&nbsp; Home
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="/admin/all_courses">
                          &nbsp; Course
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active className="fw-500 text-black">
                          &nbsp; Add Teacher
                        </Breadcrumb.Item>
                      </Breadcrumb>
                    </Breadcrumb>
                  </div>
                </div>

                <div className="card-body p-lg-5 p-4 w-100 border-0">
                  <form
                    method="post"
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                  >
                    <div className="row mb-6">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Teacher Name
                          </label>
                          <br />
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Enter Teacher name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Teacher Email
                          </label>
                          <br />
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter Teacher Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Teacher Phone
                          </label>
                          <br />
                          <input
                            type="number"
                            name="phone"
                            className="form-control"
                            placeholder="Enter Teacher Phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Password
                          </label>
                          <br />
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter Teacher password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <button
                            type="button"
                            id="addFields"
                            className="btn bg-current text-center text-white font-xsss fw-600 p-1 w80 rounded-lg d-inline-block border-0"
                            style={{ float: "right" }}
                            onClick={handleAddFields}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="dynamic">
                      {fields.map((field, index) => (
                        <div className="class-subject-fields row" key={index}>
                          <div className="col-lg-5">
                            <div className="form-group">
                              <label className="mont-font fw-600 font-xsss">
                                Class
                              </label>
                              <br />
                              <select
                                name={`className_${index}`}
                                onChange={(e) => handleClassChange(index, e)}
                                className="form-control"
                              >
                                <option value="">-Select-</option>
                                {classList.map((classItem) => (
                                  <option
                                    key={classItem.id}
                                    value={classItem.id}
                                  >
                                    {classItem.class}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-5">
                            <div className="form-group">
                              <label className="mont-font fw-600 font-xsss">
                                Subject
                              </label>
                              <br />
                              <select
                                name={`subject_${index}`}
                                value={field.subject_name}
                                onChange={(e) => handleChange(index, e)}
                                className="form-control"
                              >
                                <option value="">-Select-</option>
                                {subjectList.map((subject) => (
                                  <option
                                    key={subject.id}
                                    value={subject.subject_name}
                                  >
                                    {subject.subject_name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-2 my-auto">
                            <button
                              type="button"
                              className="remove-field btn bg-danger text-center text-white font-xsss fw-600 p-1 w80 rounded-lg d-inline-block border-0"
                              onClick={() => handleRemoveFields(index)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="col-lg-12">
                      &nbsp;&nbsp;&nbsp;
                      <button
                        type="submit"
                        className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0"
                        style={{ marginTop: "2rem", float: "right" }}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTeacher;
