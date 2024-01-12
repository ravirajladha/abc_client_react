import React, { useState, useEffect } from "react";
import AppHeader from "../../../components/includes/AppHeader";
import AppFooter from "../../../components/includes/AppFooter";
import { Link, useParams } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import BackButton from "../../../components/navigation/BackButton";

function AddCaseStudyElements() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const { sectionId } = useParams();
  const [selectedElement, setSelectedElement] = useState("");
  const [additionalField, setAdditionalField] = useState(null);
  const [inputFields, setInputFields] = useState({});

  const handleInputChange = (event, fieldName) => {
    const value = event.target.value;
    // console.log(value);
    setInputFields((prevInputFields) => ({
      ...prevInputFields,
      [fieldName]: value,
    }));
  };
  const handleInputArrayChange = (event, fieldName, index) => {
    const value = event.target.value;
    setInputFields((prevInputFields) => {
      // Clone the previous state
      const newInputFields = { ...prevInputFields };

      // Initialize the array if it's undefined
      if (!Array.isArray(newInputFields[fieldName])) {
        newInputFields[fieldName] = [];
      }

      // Update the specific element at the given index
      newInputFields[fieldName][index] = value;

      return newInputFields;
    });
  };

  const [caseStudySection, setCaseStudySection] = useState([]);

  const [caseStudyTitle, setCaseStudyTitle] = useState('');
      const [caseStudyModuleTitle, setCaseStudyModuleTitle] = useState('');
      const [caseStudySectionTitle, setCaseStudySectionTitle] = useState('');
  const getCaseStudySection = async () => {
    try {
      const response = await fetch(
        baseUrl + `api/get-case-study-section-by-id/${sectionId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch ebook section");
      }
      const data = await response.json();
      setCaseStudySection(data.caseStudySection);
      setCaseStudySectionTitle(data.caseStudySection.section_title);
      setCaseStudyModuleTitle(data.caseStudySection.case_study_module.module_title);
      setCaseStudyTitle(data.caseStudySection.case_study_module.case_study.title);
      console.log(data);
    } catch (error) {
      console.error("Error fetching ebook section:", error.message);
    }
  };
  useEffect(() => {
    getCaseStudySection();
  }, []);
  const handleElementChange = (event) => {
    const selectedElementId = event.target.value;
    if (selectedElementId === "1") {
      // Paragraph
      setAdditionalField(
        <>
          <div className="col-lg-12 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">Paragraph</label>
              <textarea
                name="paragraph"
                className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                rows="5"
                placeholder="Enter Description..."
                spellCheck="false"
                id="abc_editor"
                value={inputFields.paragraph}
                onChange={(e) => handleInputChange(e, "paragraph")}
              />
            </div>
          </div>
        </>
      );
    } else if (selectedElementId === "2") {
      // List
      const handleCountChange = (event) => {
        const count = parseInt(event.target.value, 10);

        // Generate an array of length 'count' to iterate over
        const inputArray = Array.from({ length: count }, (_, index) => index);

        // Render additional input fields
        setAdditionalField(
          <>
            <div className="col-lg-6 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">List Type</label>
                <select
                  className="form-control"
                  name="list_type"
                  id="list_type"
                  onChange={(e) => handleInputChange(e, "list_type")}
                >
                  <option value="" selected disabled readOnly>
                    --select--
                  </option>
                  <option value="bullet">Bullet</option>
                  <option value="check">Check</option>
                  <option value="arrow">Arrow</option>
                  <option value="star">Star</option>
                <option value="square">Square</option>

                </select>
              </div>
            </div>
            
            <div className="col-lg-6 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  No of Points
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="example_count"
                  placeholder="Enter Count"
                  name="example_count"
                  onChange={(e) => handleCountChange(e)}
                />
              </div>
            </div>
            {inputArray.map((index) => (
              <div className="row" key={index}>
                <div className="col-lg-6 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">Points</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Points"
                      onChange={(e) =>
                        handleInputArrayChange(e, "list_points", index)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </>
        );
      };
      setAdditionalField(
        <>
          <div className="col-lg-6 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">List Type</label>
              <select
                className="form-control"
                name="list_type"
                id="list_type"
                onChange={(e) => handleInputChange(e, "list_type")}
              >
                <option value="" selected disabled readOnly>
                  --select--
                </option>
                <option value="bullet">Bullet</option>
                <option value="check">Check</option>
                <option value="arrow">Arrow</option>
                <option value="star">Star</option>
                <option value="square">Square</option>
              </select>
            </div>
          </div>
          
          <div className="col-lg-6 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">No of Points</label>
              <input
                type="text"
                className="form-control"
                id="example_count"
                placeholder="Enter Count"
                name="example_count"
                onChange={(e) => handleCountChange(e)}
              />
            </div>
          </div>
        </>
      );
    } else if (selectedElementId === "3") {
      // List
      const handleCountChange = (event) => {
        const count = parseInt(event.target.value, 10);

        // Generate an array of length 'count' to iterate over
        const inputArray = Array.from({ length: count }, (_, index) => index);

        // Render additional input fields
        setAdditionalField(
          <>
            <div className="col-lg-6 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">List Type</label>
                <select
                  className="form-control"
                  name="list_type"
                  id="list_type"
                  onChange={(e) => handleInputChange(e, "list_type")}
                >
                  <option value="" selected disabled readOnly>
                    --select--
                  </option>
                  <option value="bullet">Bullet</option>
                  <option value="check">Check</option>
                  <option value="arrow">Arrow</option>
                  <option value="star">Star</option>
                <option value="square">Square</option>

                </select>
              </div>
            </div>
            
            <div className="col-lg-6 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  No of Points
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="example_count"
                  placeholder="Enter Count"
                  name="example_count"
                  onChange={(e) => handleCountChange(e)}
                />
              </div>
            </div>
            {inputArray.map((index) => (
              <div className="row" key={index}>
                <div className="col-lg-6 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">Points</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Points"
                      onChange={(e) =>
                        handleInputArrayChange(e, "list_points", index)
                      }
                    />
                  </div>
                </div>
                <div className="col-lg-6 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Points"
                      onChange={(e) =>
                        handleInputArrayChange(e, "list_description", index)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </>
        );
      };
      setAdditionalField(
        <>
          <div className="col-lg-6 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">List Type</label>
              <select
                className="form-control"
                name="list_type"
                id="list_type"
                onChange={(e) => handleInputChange(e, "list_type")}
              >
                <option value="" selected disabled readOnly>
                  --select--
                </option>
                <option value="bullet">Bullet</option>
                <option value="check">Check</option>
                <option value="arrow">Arrow</option>
                <option value="star">Star</option>
                <option value="square">Square</option>

              </select>
            </div>
          </div>
          
          <div className="col-lg-6 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">No of Points</label>
              <input
                type="text"
                className="form-control"
                id="example_count"
                placeholder="Enter Count"
                name="example_count"
                onChange={(e) => handleCountChange(e)}
              />
            </div>
          </div>
        </>
      );
    }else if (selectedElementId === "4") {
      // List
      const handleCountChange = (event) => {
        const count = parseInt(event.target.value, 10);

        // Generate an array of length 'count' to iterate over
        const inputArray = Array.from({ length: count }, (_, index) => index);

        // Render additional input fields
        setAdditionalField(
          <>
            <div className="col-lg-6 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  No of Points
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="example_count"
                  placeholder="Enter Count"
                  name="example_count"
                  onChange={(e) => handleCountChange(e)}
                />
              </div>
            </div>
            {inputArray.map((index) => (
              <div className="row" key={index}>
                <div className="col-lg-4 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">Heading</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Points"
                      onChange={(e) =>
                        handleInputArrayChange(e, "appendices_heading", index)
                      }
                    />
                  </div>
                </div>
                <div className="col-lg-4 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">Sub Heading</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Points"
                      onChange={(e) =>
                        handleInputArrayChange(e, "appendices_sub_heading", index)
                      }
                    />
                  </div>
                </div>
                <div className="col-lg-4 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Points"
                      onChange={(e) =>
                        handleInputArrayChange(e, "appendices_desc", index)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </>
        );
      };
      setAdditionalField(
        <>
          
          <div className="col-lg-6 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">No of Points</label>
              <input
                type="text"
                className="form-control"
                id="example_count"
                placeholder="Enter Count"
                name="example_count"
                onChange={(e) => handleCountChange(e)}
              />
            </div>
          </div>
        </>
      );
    }else {
      setAdditionalField(null); // Clear additional fields if no matching element is found
    }

    setSelectedElement(selectedElementId);
    setInputFields({});
  };
  const addElements = async (e) => {
    console.warn(inputFields);
    const formData = new FormData();

    Object.keys(inputFields).forEach((fieldName) => {
      const fieldValues = inputFields[fieldName];

      if (Array.isArray(fieldValues)) {
        fieldValues.forEach((value, index) => {
          formData.append(`${fieldName}[${index}]`, value);
        });
      } else {
        // If there is only one value, treat it as a single value
        formData.append(fieldName, fieldValues);
      }
    });

    // Add other form fields as needed
    formData.append("sectionId", sectionId);
    formData.append("elementId", selectedElement);
    e.preventDefault();
    try {
      const response = await fetch(baseUrl + "api/add-case-study-element", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add elements");
      }
      const responseData = await response.json();

      // Log the response data to the console
      console.log(responseData);
      setSelectedElement("");
      setAdditionalField(null);
      setInputFields({});
      // Handle success, you may show a success toast or redirect the user
      toast.success("Elements added successfully");
    } catch (error) {
      // Handle error, you may show an error toast
      console.error("Error adding elements:", error.message);
      toast.error("Failed to add elements");
    }
  };
  return (
    <>
      <div className="middle-sidebar-bottom theme-dark-bg">
        <div className="middle-sidebar-left">
          <div>
            <div className="p-4 w-100 border-0 d-flex rounded-lg justify-content-between">
              <h2 className="fw-400 font-lg d-block">
                Add <b> Elements</b>{" "}
              </h2>
              <div className="float-right">
                {/* <Link
                  to={"/ebooks/preview_ebook_admin/" + ebookId}
                  className="px-3 py-2 me-2  d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current mx-1"
                >
                  VIEW
                </Link> */}
                <BackButton />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="card w-100 border-0 bg-white shadow-md p-0 mb-4">
              <ToastContainer autoClose={3000} />
              <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                <form encType="multipart/form-data" onSubmit={addElements}>
                  <div className="row g-3 mb-6">
                    <div className="col-lg-4">
                      <div>
                        <label className="mont-font fw-600 font-xsss">
                          Case Study Title
                        </label>
                        <br />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Ebook Title"
                          value={
                            caseStudyTitle
                          }
                          readOnly
                          disabled
                        />
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div>
                        <label className="mont-font fw-600 font-xsss">
                          Module title
                        </label>
                        <br />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Ebook title"
                          value={
                            caseStudyModuleTitle
                          }
                          readOnly
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div>
                        <label className="mont-font fw-600 font-xsss">
                          Section title
                        </label>
                        <br />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Ebook title"
                          value={caseStudySectionTitle}
                          readOnly
                          disabled
                        />
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div>
                        <label className="mont-font fw-600 font-xsss">
                          Elements
                        </label>
                        <br />
                        <select
                          name="course"
                          id="course"
                          className="form-control"
                          onChange={handleElementChange}
                          value={selectedElement}
                        >
                          <option readOnly disabled value="">
                            -Select-
                          </option>
                          <option value="1">Paragraph</option>
                          <option value="2">Points</option>
                          <option value="3">Points with description</option>
                          <option value="4">Appendices</option>
                        </select>
                      </div>
                    </div>

                    {additionalField}
                  </div>
                  <div className="col-lg-12 mt-3">
                    <button
                      type="submit"
                      className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0 float-right"
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

export default AddCaseStudyElements;
