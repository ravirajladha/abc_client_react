import React, { useState, useEffect, useContext } from "react";

import BackButton from "../../components/navigation/BackButton";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../lib/AuthContext";

function EditTeacher() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const { teacherId } = useParams();
  const navigate = useNavigate();

  const userDetails = useContext(AuthContext).user;
  // console.log("user_id", userDetails.user.id);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fields, setFields] = useState([
    { className: "", subject: "", subjectsList: [] },
  ]);

  const [classList, setClassList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const getTeacher = async () => {
    try {
      const response = await fetch(
        baseUrl + `api/get-teacher-details/${teacherId}`
      );
      const data = await response.json();

      setFormData({
        name: data.name,
        email: data.email,
        phone: data.phone,
      });

      if (data.class_and_subject) {
        const parsedData = JSON.parse(data.class_and_subject);
        
        const fieldsData = await Promise.all(parsedData.map(async (item) => {
          const subjectResponse = await fetch(baseUrl + `api/admin/apigetSubjects/${item.class_id}`);
          const subjectsData = await subjectResponse.json();
          return {
            className: item.class_id,
            subject: item.subject_id,
            subjectsList: subjectsData,
          };
        }));

        setFields(fieldsData);
      }
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const fetchSubjectsForClass = (classId) => {
    fetch(baseUrl + `api/admin/apigetSubjects/${classId}`)
      .then((response) => response.json())
      .then((subjectsData) => {
        setSubjectList(subjectsData);
      })
      .catch((error) => console.error("Error fetching subjects:", error));
  };

  useEffect(() => {
    getTeacher();
  }, []);

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

  const handleClassChange = async (index, e) => {
    const selectedClassId = e.target.value;

    try {
      const response = await fetch(
        baseUrl + `api/admin/apigetSubjects/${selectedClassId}`
      );
      const subjectsData = await response.json();

      setFields(
        fields.map((field, idx) => {
          if (idx === index) {
            return {
              ...field,
              className: selectedClassId,
              subject: "",
              subjectsList: subjectsData,
            };
          }
          return field;
        })
      );
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const fieldName = name.includes("className") ? "className" : "subject";

    setFields(
      fields.map((field, idx) => {
        if (idx === index) {
          return { ...field, [fieldName]: value };
        }
        return field;
      })
    );
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
    setIsSubmitting(true);

    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    const classAndSubjectData = fields.map((field) => ({
      class_id: field.className,
      subject_id: field.subject,
    }));

    const filteredClassAndSubjectData = classAndSubjectData.filter(
      (field) => field.class_id && field.subject_id
    );

    const classAndSubjectJson = JSON.stringify(filteredClassAndSubjectData);

    formDataToSend.append("class_and_subject", classAndSubjectJson);

    formDataToSend.append("created_by", userDetails.user.id);

    for (var pair of formDataToSend.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    fetch(baseUrl + "api/update-teacher-details/" + teacherId, {
      method: "POST",
      body: formDataToSend,
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            if (response.status === 409) {
              throw new Error(data.error || "Duplicate email found");
            } else {
              throw new Error(data.error || "Failed to update teacher");
            }
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Teacher updated successfully", data);
        toast.success("Teacher updated successfully!");
        navigate(`${process.env.PUBLIC_URL}/school/teachers`);
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          created_by: "",
        });
        setFields([{ className: "", subject: "" }]);

        setSubjectList([]);
      })
      .catch((error) => {
        console.error("Error adding teacher:", error);
        toast.error(error.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <div className="custom-middle-sidebar-bottom  p-3">
        <div className="middle-sidebar-left">
          <ToastContainer autoClose={3000} />

          <div className="card-body p-4 w-100 border-0 d-flex rounded-lg justify-content-between">
            <h2 className="fw-400 font-lg d-block">
              Edit <b>Teacher</b>
            </h2>

            <div className="float-right">
              <BackButton />
            </div>
          </div>
          <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
            <div className="card-body p-4 w-100 border-0 d-flex rounded-lg justify-content-between">
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
                          type="tel"
                          name="phone"
                          className="form-control"
                          placeholder="Enter Teacher Phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          maxLength="10"
                          pattern="\d{10}"
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
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="row">
                        <div className="col-lg-1">
                          <div className="form-group">
                            <button
                              type="button"
                              id="addFields"
                              className="btn btn-icon bg-success text-center text-white font-xsss fw-600  w80 rounded-lg d-inline-block border-0"
                              onClick={handleAddFields}
                              title="Add New Class and Subject for Teacher"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="col-lg-11">
                          <div className="dynamic">
                            {fields.map((field, index) => (
                              <div
                                className="class-subject-fields row"
                                key={index}
                              >
                                <div className="col-lg-5">
                                  <div className="form-group">
                                    <label className="mont-font fw-600 font-xsss">
                                      Class
                                    </label>
                                    <br />
                                    <select
                                      name={`className_${index}`}
                                      value={field.className}
                                      onChange={(e) =>
                                        handleClassChange(index, e)
                                      }
                                      className="form-control"
                                    >
                                      <option value="">-Select-</option>
                                      {classList?.map((classItem) => (
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
                                      value={field.subject}
                                      onChange={(e) => handleChange(index, e)}
                                      className="form-control"
                                    >
                                      <option value="">-Select-</option>
                                      {field.subjectsList?.map((subject) => (
                                        <option
                                          key={subject.id}
                                          value={subject.id}
                                        >
                                          {subject.subject_name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                                <div className="col-lg-2 my-auto">
                                  <div className="form-group">
                                    <div className="form-label"></div>
                                    <button
                                      type="button"
                                      className="remove-field btn bg-danger text-center text-white font-xsss fw-600 rounded-lg d-inline-block border-0"
                                      onClick={() => handleRemoveFields(index)}
                                    >
                                      -
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    &nbsp;&nbsp;&nbsp;
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0"
                      style={{ marginTop: "2rem", float: "right" }}
                    >
                      Submit
                    </button>
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

export default EditTeacher;
