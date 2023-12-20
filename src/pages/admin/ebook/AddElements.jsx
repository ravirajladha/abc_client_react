import React, { useState, useEffect } from "react";
import AppHeader from "../../../components/includes/AppHeader";
import AppFooter from "../../../components/includes/AppFooter";
import { Link, useParams } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import BackButton from "../../../components/navigation/BackButton";

function AddElements() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { section_id } = useParams();

  useEffect(() => {
    getEbookSection();
    getEbookElements();
  }, []);

  const [ebookSection, setEbookSection] = useState([]);
  const getEbookSection = async () => {
    try {
      const response = await fetch(
        baseUrl + `api/get_section_by_id/${section_id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch ebook section");
      }
      const data = await response.json();
      setEbookSection(data);
    } catch (error) {
      console.error("Error fetching ebook section:", error.message);
    }
  };

  const [elements, setElements] = useState([]);
  const getEbookElements = async () => {
    try {
      const response = await fetch(baseUrl + "api/get_elements");
      if (!response.ok) {
        throw new Error("Failed to fetch elements");
      }
      const data = await response.json();
      setElements(data);
    } catch (error) {
      console.error("Error fetching elements:", error.message);
    }
  };

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
  const handleImageChange = (event, fieldName) => {
    const file = event.target.files[0];
    setInputFields((prevInputFields) => ({
      ...prevInputFields,
      [fieldName]: file,
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
  const handleFileArrayChange = (event, fieldName, index) => {
    const value = event.target.files[0];
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
  const [listPoints, setListPoints] = useState([]);
  const handleAddPoints = () => {
    setListPoints([...listPoints, "1"]);
    console.log(listPoints);
  };
  const handleElementChange = (event) => {
    const selectedElementId = event.target.value;

    if (selectedElementId === "1") {
      setAdditionalField(
        <>
          {/* Heading */}
          <div className="col-lg-4 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">Heading</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Heading"
                name="heading"
                value={inputFields.heading}
                onInput={(e) => handleInputChange(e, "heading")}
              />
            </div>
          </div>
          {/* Heading Type */}
          <div className="col-lg-4 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">Heading Type</label>
              <select
                className="form-control"
                name="heading_type"
                id="heading_type"
                value={inputFields.heading_type}
                onChange={(e) => handleInputChange(e, "heading_type")}
              >
                <option value="" disabled readOnly>
                  --select--
                </option>
                <option value="1">Type-1</option>
                <option value="2">Type 2</option>
              </select>
            </div>
          </div>
        </>
      );
    } else if (selectedElementId === "4") {
      // Single Image
      setAdditionalField(
        <>
          <div className="col-lg-4 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">Image</label>
              <input
                type="file"
                className="form-control"
                name="image"
                onChange={(e) => handleImageChange(e, "image")}
                accept="image/*"
              />
            </div>
          </div>
        </>
      );
    } else if (selectedElementId === "2") {
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
    } else if (selectedElementId === "3") {
      // Code with Output and Memory Allocation
      // setAdditionalField(
      //     <>
      //         {/* Code */}
      //         <div className="col-lg-12 mb-3">
      //             <div className="form-group">
      //                 <label className="mont-font fw-600 font-xsss">Code</label>
      //                 <textarea
      //                     name="code"
      //                     className="form-control mb-0 p-3 h100 bg-greylight lh-16"
      //                     rows="5"
      //                     placeholder="Enter Code..."
      //                     spellCheck="false"
      //                 />
      //             </div>
      //         </div>
      //         {/* Memory Allocation */}
      //         <div className="col-lg-12 mb-3">
      //             <div className="form-group">
      //                 <label className="mont-font fw-600 font-xsss">Memory Allocation</label>
      //                 <input type="file" className="form-control" name="memory" />
      //             </div>
      //         </div>
      //         {/* Output */}
      //         <div className="col-lg-12 mb-3">
      //             <div className="form-group">
      //                 <label className="mont-font fw-600 font-xsss">Output</label>
      //                 <textarea
      //                     name="output"
      //                     className="form-control mb-0 p-3 h100 bg-greylight lh-16"
      //                     rows="5"
      //                     placeholder="Enter Code Output..."
      //                     spellCheck="false"
      //                 />
      //             </div>
      //         </div>
      //     </>
      // );
    } else if (selectedElementId === "5") {
      // on changing the image type show the respective inputs
      const handleImageTypeChange = (event) => {
        const selectedValue = event.target.value;
        // SET input value of imag type
        handleInputChange(event, "image_type");
        if (selectedValue === "image_2_3") {
          setAdditionalField(
            <>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Image Type
                  </label>
                  <select
                    className="form-control"
                    name="image_type"
                    id="image_type_2"
                    onChange={handleImageTypeChange}
                  >
                    <option value="" selected disabled readOnly>
                      --select--
                    </option>
                    <option value="image_2_1">Type-1</option>
                    <option value="image_2_2">Type-2</option>
                    <option value="image_2_3">Type-3</option>
                    <option value="image_2_4">Type-4</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Heading</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Heading"
                    name="image_heading"
                    id="image_heading_2"
                    value={inputFields.image_heading}
                    onChange={(e) => handleInputChange(e, "image_heading")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <a
                  onClick={() =>
                    window.open(
                      "/assets_ebook/images/2.3.png",
                      "_blank",
                      "width=800,height=600"
                    )
                  }
                >
                  <img
                    src="/assets_ebook/images/2.3.png"
                    alt="photo1"
                    style={{ height: "100px", maxWidth: "100%" }}
                  />
                </a>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-1</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_1"
                    value={inputFields.image_text_1}
                    onChange={(e) => handleInputChange(e, "image_text_1")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_1"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_1}
                    onChange={(e) => handleInputChange(e, "image_desc_1")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-2</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_2"
                    value={inputFields.image_text_2}
                    onChange={(e) => handleInputChange(e, "image_text_2")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_2"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_2}
                    onChange={(e) => handleInputChange(e, "image_desc_2")}
                  ></textarea>
                </div>
              </div>
            </>
          );
        } else {
          const imageLink =
            selectedValue === "image_2_1"
              ? "/assets_ebook/images/2.1.png"
              : selectedValue === "image_2_2"
              ? "/assets_ebook/images/2.2.png"
              : "/assets_ebook/images/2.3.png";

          setAdditionalField(
            <>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Image Type
                  </label>
                  <select
                    className="form-control"
                    name="image_type"
                    id="image_type_2"
                    onChange={handleImageTypeChange}
                  >
                    <option value="" selected disabled readOnly>
                      --select--
                    </option>
                    <option value="image_2_1">Type-1</option>
                    <option value="image_2_2">Type-2</option>
                    <option value="image_2_3">Type-3</option>
                    <option value="image_2_4">Type-4</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <a
                  onClick={() =>
                    window.open(imageLink, "_blank", "width=800,height=600")
                  }
                >
                  <img
                    src={imageLink}
                    alt="photo1"
                    style={{ height: "100px", maxWidth: "100%" }}
                  />
                </a>
              </div>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-1</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_1"
                    value={inputFields.image_text_1}
                    onChange={(e) => handleInputChange(e, "image_text_1")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_1"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_1}
                    onChange={(e) => handleInputChange(e, "image_desc_1")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-2</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_2"
                    value={inputFields.image_text_2}
                    onChange={(e) => handleInputChange(e, "image_text_2")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_2"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_2}
                    onChange={(e) => handleInputChange(e, "image_desc_2")}
                  ></textarea>
                </div>
              </div>
            </>
          );
        }
      };

      // IMAGE -2
      setAdditionalField(
        <>
          <div className="col-lg-4 mb-3"></div>
          <div className="col-lg-4 mb-3"></div>
          <div className="col-lg-4 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">Image Type</label>
              <select
                className="form-control"
                name="image_type"
                id="image_type_2"
                onChange={handleImageTypeChange}
              >
                <option value="" selected disabled readOnly>
                  --select--
                </option>
                <option value="image_2_1">Type-1</option>
                <option value="image_2_2">Type-2</option>
                <option value="image_2_3">Type-3</option>
                <option value="image_2_4">Type-4</option>
              </select>
            </div>
          </div>
        </>
      );
    } else if (selectedElementId === "6") {
      // on changing the image type show the respective inputs
      const handleImage3TypeChange = (event) => {
        const selectedValue = event.target.value;
        handleInputChange(event, "image_type");
        if (selectedValue === "image_3_1") {
          setAdditionalField(
            <>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3"></div>
              {/* Image Type */}
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Image Type
                  </label>
                  <select
                    className="form-control"
                    name="image_type"
                    id="image_type"
                    onChange={handleImage3TypeChange}
                  >
                    <option value="" selected disabled readOnly>
                      --select--
                    </option>
                    <option value="image_3_1">Type-1</option>
                    <option value="image_3_2">Type-2</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <a
                  onClick={() =>
                    window.open(
                      "/assets_ebook/images/3.1.png",
                      "_blank",
                      "width=800,height=600"
                    )
                  }
                >
                  <img
                    src="/assets_ebook/images/3.1.png"
                    alt="photo1"
                    style={{ height: "100px", maxWidth: "100%" }}
                  />
                </a>
              </div>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Heading</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Heading"
                    name="image_heading"
                    value={inputFields.image_heading}
                    onChange={(e) => handleInputChange(e, "image_heading")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Sub Heading(Smaller)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Heading"
                    name="image_subheading"
                    value={inputFields.image_subheading}
                    onChange={(e) => handleInputChange(e, "image_subheading")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-1</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_1"
                    value={inputFields.image_text_1}
                    onChange={(e) => handleInputChange(e, "image_text_1")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_1"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_1}
                    onChange={(e) => handleInputChange(e, "image_desc_1")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-2</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_2"
                    value={inputFields.image_text_2}
                    onChange={(e) => handleInputChange(e, "image_text_2")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_2"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_2}
                    onChange={(e) => handleInputChange(e, "image_desc_2")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-3</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_3"
                    value={inputFields.image_text_3}
                    onChange={(e) => handleInputChange(e, "image_text_3")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_3"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_3}
                    onChange={(e) => handleInputChange(e, "image_desc_3")}
                  ></textarea>
                </div>
              </div>
            </>
          );
        } else {
          setAdditionalField(
            <>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3"></div>
              {/* Image Type */}
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Image Type
                  </label>
                  <select
                    className="form-control"
                    name="image_type"
                    id="image_type"
                    onChange={handleImage3TypeChange}
                  >
                    <option value="" selected disabled readOnly>
                      --select--
                    </option>
                    <option value="image_3_1">Type-1</option>
                    <option value="image_3_2">Type-2</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <a
                  onClick={() =>
                    window.open(
                      "/assets_ebook/images/3.2.png",
                      "_blank",
                      "width=800,height=600"
                    )
                  }
                >
                  <img
                    src="/assets_ebook/images/3.2.png"
                    alt="photo1"
                    style={{ height: "100px", maxWidth: "100%" }}
                  />
                </a>
              </div>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Heading</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Heading"
                    name="image_heading"
                    value={inputFields.image_heading}
                    onChange={(e) => handleInputChange(e, "image_heading")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Sub Heading(Smaller)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Heading"
                    name="image_subheading"
                    value={inputFields.image_subheading}
                    onChange={(e) => handleInputChange(e, "image_subheading")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-1</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_1"
                    value={inputFields.image_text_1}
                    onChange={(e) => handleInputChange(e, "image_text_1")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Sub Text-1(smaller)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_subtext_1"
                    value={inputFields.image_subtext_1}
                    onChange={(e) => handleInputChange(e, "image_subtext_1")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_1"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_1}
                    onChange={(e) => handleInputChange(e, "image_desc_1")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-2</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_2"
                    value={inputFields.image_text_2}
                    onChange={(e) => handleInputChange(e, "image_text_2")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Sub Text-2(smaller)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_subtext_2"
                    value={inputFields.image_subtext_2}
                    onChange={(e) => handleInputChange(e, "image_subtext_2")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_2"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_2}
                    onChange={(e) => handleInputChange(e, "image_desc_2")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-3</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_3"
                    value={inputFields.image_text_3}
                    onChange={(e) => handleInputChange(e, "image_text_3")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Sub Text-1(smaller)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_subtext_3"
                    value={inputFields.image_subtext_3}
                    onChange={(e) => handleInputChange(e, "image_subtext_3")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_3"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_3}
                    onChange={(e) => handleInputChange(e, "image_desc_3")}
                  ></textarea>
                </div>
              </div>
            </>
          );
        }
      };

      // IMAGE -3
      setAdditionalField(
        <>
          <div className="col-lg-4 mb-3"></div>
          <div className="col-lg-4 mb-3"></div>
          {/* Image Type */}
          <div className="col-lg-4 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">Image Type</label>
              <select
                className="form-control"
                name="image_type"
                id="image_type"
                onChange={handleImage3TypeChange}
              >
                <option value="" selected disabled readOnly>
                  --select--
                </option>
                <option value="image_3_1">Type-1</option>
                <option value="image_3_2">Type-2</option>
              </select>
            </div>
          </div>
        </>
      );
    } else if (selectedElementId === "7") {
      // on changing the image type show the respective inputs
      const handleImage4TypeChange = (event) => {
        const selectedValue = event.target.value;
        handleInputChange(event, "image_type");
        if (selectedValue === "image_4_1") {
          setAdditionalField(
            <>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3"></div>
              {/* Image Type */}
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Image Type
                  </label>
                  <select
                    className="form-control"
                    name="image_type"
                    id="image_type"
                    onChange={handleImage4TypeChange}
                  >
                    <option value="" selected disabled readOnly>
                      --select--
                    </option>
                    <option value="image_4_1">Type-1</option>
                    <option value="image_4_2">Type-2</option>
                    <option value="image_4_3">Type-3</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <a
                  onClick={() =>
                    window.open(
                      "/assets_ebook/images/4.1.png",
                      "_blank",
                      "width=800,height=600"
                    )
                  }
                >
                  <img
                    src="/assets_ebook/images/4.1.png"
                    alt="photo1"
                    style={{ height: "100px", maxWidth: "100%" }}
                  />
                </a>
              </div>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Heading</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Heading"
                    name="image_heading"
                    value={inputFields.image_heading}
                    onChange={(e) => handleInputChange(e, "image_heading")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Sub Heading(Smaller)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Heading"
                    name="image_subheading"
                    value={inputFields.image_subheading}
                    onChange={(e) => handleInputChange(e, "image_subheading")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-1</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_1"
                    value={inputFields.image_text_1}
                    onChange={(e) => handleInputChange(e, "image_text_1")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Sub Text-1(smaller)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_subtext_1"
                    value={inputFields.image_subtext_1}
                    onChange={(e) => handleInputChange(e, "image_subtext_1")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_1"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_1}
                    onChange={(e) => handleInputChange(e, "image_desc_1")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-2</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_2"
                    value={inputFields.image_text_2}
                    onChange={(e) => handleInputChange(e, "image_text_2")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Sub Text-2(smaller)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_subtext_2"
                    value={inputFields.image_subtext_2}
                    onChange={(e) => handleInputChange(e, "image_subtext_2")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_2"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_2}
                    onChange={(e) => handleInputChange(e, "image_desc_2")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-3</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_3"
                    value={inputFields.image_text_3}
                    onChange={(e) => handleInputChange(e, "image_text_3")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Sub Text-3(smaller)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_subtext_3"
                    value={inputFields.image_subtext_3}
                    onChange={(e) => handleInputChange(e, "image_subtext_3")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_3"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_1}
                    onChange={(e) => handleInputChange(e, "image_desc_3")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-4</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_4"
                    value={inputFields.image_text_4}
                    onChange={(e) => handleInputChange(e, "image_text_4")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Sub Text-4(smaller)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_subtext_4"
                    value={inputFields.image_subtext_4}
                    onChange={(e) => handleInputChange(e, "image_subtext_4")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_4"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_4}
                    onChange={(e) => handleInputChange(e, "image_desc_4")}
                  ></textarea>
                </div>
              </div>
            </>
          );
        } else if (selectedValue === "image_4_2") {
          setAdditionalField(
            <>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3"></div>
              {/* Image Type */}
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Image Type
                  </label>
                  <select
                    className="form-control"
                    name="image_type"
                    id="image_type"
                    onChange={handleImage4TypeChange}
                  >
                    <option value="" selected disabled readOnly>
                      --select--
                    </option>
                    <option value="image_4_1">Type-1</option>
                    <option value="image_4_2">Type-2</option>
                    <option value="image_4_3">Type-3</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <a
                  onClick={() =>
                    window.open(
                      "/assets_ebook/images/4.2.png",
                      "_blank",
                      "width=800,height=600"
                    )
                  }
                >
                  <img
                    src="/assets_ebook/images/4.2.png"
                    alt="photo1"
                    style={{ height: "100px", maxWidth: "100%" }}
                  />
                </a>
              </div>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Heading</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Heading"
                    name="image_heading"
                    value={inputFields.image_heading}
                    onChange={(e) => handleInputChange(e, "image_heading")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-1</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_1"
                    value={inputFields.image_text_1}
                    onChange={(e) => handleInputChange(e, "image_text_1")}
                  />
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_1"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_1}
                    onChange={(e) => handleInputChange(e, "image_desc_1")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-2</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_2"
                    value={inputFields.image_text_2}
                    onChange={(e) => handleInputChange(e, "image_text_2")}
                  />
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_2"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_2}
                    onChange={(e) => handleInputChange(e, "image_desc_2")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-3</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_3"
                    value={inputFields.image_text_3}
                    onChange={(e) => handleInputChange(e, "image_text_3")}
                  />
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_3"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_3}
                    onChange={(e) => handleInputChange(e, "image_desc_3")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-4</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_4"
                    value={inputFields.image_text_4}
                    onChange={(e) => handleInputChange(e, "image_text_4")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_4"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_4}
                    onChange={(e) => handleInputChange(e, "image_desc_4")}
                  ></textarea>
                </div>
              </div>
            </>
          );
        } else {
          setAdditionalField(
            <>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3"></div>
              {/* Image Type */}
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Image Type
                  </label>
                  <select
                    className="form-control"
                    name="image_type"
                    id="image_type"
                    onChange={handleImage4TypeChange}
                  >
                    <option value="" selected disabled readOnly>
                      --select--
                    </option>
                    <option value="image_4_1">Type-1</option>
                    <option value="image_4_2">Type-2</option>
                    <option value="image_4_3">Type-3</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <a
                  onClick={() =>
                    window.open(
                      "/assets_ebook/images/4.3.png",
                      "_blank",
                      "width=800,height=600"
                    )
                  }
                >
                  <img
                    src="/assets_ebook/images/4.3.png"
                    alt="photo1"
                    style={{ height: "100px", maxWidth: "100%" }}
                  />
                </a>
              </div>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Heading</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Heading"
                    name="image_heading"
                    value={inputFields.image_heading}
                    onChange={(e) => handleInputChange(e, "image_heading")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Sub Heading(Smaller)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Heading"
                    name="image_subheading"
                    value={inputFields.image_subheading}
                    onChange={(e) => handleInputChange(e, "image_subheading")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-1</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_1"
                    value={inputFields.image_text_1}
                    onChange={(e) => handleInputChange(e, "image_text_1")}
                  />
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_1"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_1}
                    onChange={(e) => handleInputChange(e, "image_desc_1")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-2</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_2"
                    value={inputFields.image_text_2}
                    onChange={(e) => handleInputChange(e, "image_text_2")}
                  />
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_2"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_2}
                    onChange={(e) => handleInputChange(e, "image_desc_2")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-3</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_3"
                    value={inputFields.image_text_3}
                    onChange={(e) => handleInputChange(e, "image_text_3")}
                  />
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_3"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_3}
                    onChange={(e) => handleInputChange(e, "image_desc_3")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-4</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_4"
                    value={inputFields.image_text_4}
                    onChange={(e) => handleInputChange(e, "image_text_4")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_4"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_4}
                    onChange={(e) => handleInputChange(e, "image_desc_4")}
                  ></textarea>
                </div>
              </div>
            </>
          );
        }
      };

      // IMAGE -4
      setAdditionalField(
        <>
          <div className="col-lg-4 mb-3"></div>
          <div className="col-lg-4 mb-3"></div>
          {/* Image Type */}
          <div className="col-lg-4 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">Image Type</label>
              <select
                className="form-control"
                name="image_type"
                id="image_type"
                onChange={handleImage4TypeChange}
              >
                <option value="" selected disabled readOnly>
                  --select--
                </option>
                <option value="image_4_1">Type-1</option>
                <option value="image_4_2">Type-2</option>
                <option value="image_4_3">Type-3</option>
              </select>
            </div>
          </div>
        </>
      );
    } else if (selectedElementId === "8") {
      // on changing the image type show the respective inputs
      const handleImage5TypeChange = (event) => {
        const selectedValue = event.target.value;
        handleInputChange(event, "image_type");
        if (selectedValue === "image_5_1") {
          setAdditionalField(
            <>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3"></div>
              {/* Image Type */}
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Image Type
                  </label>
                  <select
                    className="form-control"
                    name="image_type"
                    id="image_type"
                    onChange={handleImage5TypeChange}
                  >
                    <option value="" selected disabled readOnly>
                      --select--
                    </option>
                    <option value="image_5_1">Type-1</option>
                    <option value="image_5_2">Type-2</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <a
                  onClick={() =>
                    window.open(
                      "/assets_ebook/images/5.1.png",
                      "_blank",
                      "width=800,height=600"
                    )
                  }
                >
                  <img
                    src="/assets_ebook/images/5.1.png"
                    alt="photo1"
                    style={{ height: "100px", maxWidth: "100%" }}
                  />
                </a>
              </div>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Heading</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Heading"
                    name="image_heading"
                    value={inputFields.image_heading}
                    onChange={(e) => handleInputChange(e, "image_heading")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-1</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_1"
                    value={inputFields.image_text_1}
                    onChange={(e) => handleInputChange(e, "image_text_1")}
                  />
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_1"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_1}
                    onChange={(e) => handleInputChange(e, "image_desc_1")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-2</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_2"
                    value={inputFields.image_text_2}
                    onChange={(e) => handleInputChange(e, "image_text_2")}
                  />
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_2"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_2}
                    onChange={(e) => handleInputChange(e, "image_desc_2")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-3</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_3"
                    value={inputFields.image_text_3}
                    onChange={(e) => handleInputChange(e, "image_text_3")}
                  />
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_3"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_1}
                    onChange={(e) => handleInputChange(e, "image_desc_3")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-4</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_4"
                    value={inputFields.image_text_4}
                    onChange={(e) => handleInputChange(e, "image_text_4")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_4"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_4}
                    onChange={(e) => handleInputChange(e, "image_desc_4")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-5</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_5"
                    value={inputFields.image_text_5}
                    onChange={(e) => handleInputChange(e, "image_text_5")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_5"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_5}
                    onChange={(e) => handleInputChange(e, "image_desc_5")}
                  ></textarea>
                </div>
              </div>
            </>
          );
        } else if (selectedValue === "image_5_2") {
          setAdditionalField(
            <>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3"></div>
              {/* Image Type */}
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Image Type
                  </label>
                  <select
                    className="form-control"
                    name="image_type"
                    id="image_type"
                    onChange={handleImage5TypeChange}
                  >
                    <option value="" selected disabled readOnly>
                      --select--
                    </option>
                    <option value="image_5_1">Type-1</option>
                    <option value="image_5_2">Type-2</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <a
                  onClick={() =>
                    window.open(
                      "/assets_ebook/images/5.2.png",
                      "_blank",
                      "width=800,height=600"
                    )
                  }
                >
                  <img
                    src="/assets_ebook/images/5.2.png"
                    alt="photo1"
                    style={{ height: "100px", maxWidth: "100%" }}
                  />
                </a>
              </div>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Heading</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Heading"
                    name="image_heading"
                    value={inputFields.image_heading}
                    onChange={(e) => handleInputChange(e, "image_heading")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Sub Heading
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Heading"
                    name="image_subheading"
                    value={inputFields.image_subheading}
                    onChange={(e) => handleInputChange(e, "image_subheading")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Sub Heading 2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Heading"
                    name="image_subheading_2"
                    value={inputFields.image_subheading_2}
                    onChange={(e) => handleInputChange(e, "image_subheading_2")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-1</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_1"
                    value={inputFields.image_text_1}
                    onChange={(e) => handleInputChange(e, "image_text_1")}
                  />
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_1"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_1}
                    onChange={(e) => handleInputChange(e, "image_desc_1")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-2</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_2"
                    value={inputFields.image_text_2}
                    onChange={(e) => handleInputChange(e, "image_text_2")}
                  />
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_2"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_2}
                    onChange={(e) => handleInputChange(e, "image_desc_2")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-3</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_3"
                    value={inputFields.image_text_3}
                    onChange={(e) => handleInputChange(e, "image_text_3")}
                  />
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_3"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_1}
                    onChange={(e) => handleInputChange(e, "image_desc_3")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-4</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_4"
                    value={inputFields.image_text_4}
                    onChange={(e) => handleInputChange(e, "image_text_4")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_4"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_4}
                    onChange={(e) => handleInputChange(e, "image_desc_4")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-5</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_5"
                    value={inputFields.image_text_5}
                    onChange={(e) => handleInputChange(e, "image_text_5")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_5"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_5}
                    onChange={(e) => handleInputChange(e, "image_desc_5")}
                  ></textarea>
                </div>
              </div>
            </>
          );
        }
      };

      // IMAGE -4
      setAdditionalField(
        <>
          <div className="col-lg-4 mb-3"></div>
          <div className="col-lg-4 mb-3"></div>
          {/* Image Type */}
          <div className="col-lg-4 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">Image Type</label>
              <select
                className="form-control"
                name="image_type"
                id="image_type"
                onChange={handleImage5TypeChange}
              >
                <option value="" selected disabled readOnly>
                  --select--
                </option>
                <option value="image_5_1">Type-1</option>
                <option value="image_5_2">Type-2</option>
              </select>
            </div>
          </div>
        </>
      );
    } else if (selectedElementId === "9") {
      // on changing the image type show the respective inputs
      const handleImage6TypeChange = (event) => {
        const selectedValue = event.target.value;
        handleInputChange(event, "image_type");
        if (selectedValue === "image_6_1") {
          setAdditionalField(
            <>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3"></div>
              {/* Image Type */}
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Image Type
                  </label>
                  <select
                    className="form-control"
                    name="image_type"
                    id="image_type"
                    onChange={handleImage6TypeChange}
                  >
                    <option value="" selected disabled readOnly>
                      --select--
                    </option>
                    <option value="image_6_1">Type-1</option>
                    <option value="image_6_2">Type-2</option>
                    <option value="image_6_3">Type-3</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <a
                  onClick={() =>
                    window.open(
                      "/assets_ebook/images/6.1.png",
                      "_blank",
                      "width=800,height=600"
                    )
                  }
                >
                  <img
                    src="/assets_ebook/images/6.1.png"
                    alt="photo1"
                    style={{ height: "100px", maxWidth: "100%" }}
                  />
                </a>
              </div>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Heading</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Heading"
                    name="image_heading"
                    value={inputFields.image_heading}
                    onChange={(e) => handleInputChange(e, "image_heading")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Sub Heading
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Heading"
                    name="image_subheading"
                    value={inputFields.image_subheading}
                    onChange={(e) => handleInputChange(e, "image_subheading")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Heading 2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Heading"
                    name="image_heading_2"
                    value={inputFields.image_heading_2}
                    onChange={(e) => handleInputChange(e, "image_heading_2")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-1</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_1"
                    value={inputFields.image_text_1}
                    onChange={(e) => handleInputChange(e, "image_text_1")}
                  />
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_1"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_1}
                    onChange={(e) => handleInputChange(e, "image_desc_1")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-2</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_2"
                    value={inputFields.image_text_2}
                    onChange={(e) => handleInputChange(e, "image_text_2")}
                  />
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_2"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_2}
                    onChange={(e) => handleInputChange(e, "image_desc_2")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-3</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_3"
                    value={inputFields.image_text_3}
                    onChange={(e) => handleInputChange(e, "image_text_3")}
                  />
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_3"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_1}
                    onChange={(e) => handleInputChange(e, "image_desc_3")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-4</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_4"
                    value={inputFields.image_text_4}
                    onChange={(e) => handleInputChange(e, "image_text_4")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_4"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_4}
                    onChange={(e) => handleInputChange(e, "image_desc_4")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-5</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_5"
                    value={inputFields.image_text_5}
                    onChange={(e) => handleInputChange(e, "image_text_5")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_5"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_5}
                    onChange={(e) => handleInputChange(e, "image_desc_5")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-6</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_6"
                    value={inputFields.image_text_6}
                    onChange={(e) => handleInputChange(e, "image_text_6")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_6"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_6}
                    onChange={(e) => handleInputChange(e, "image_desc_6")}
                  ></textarea>
                </div>
              </div>
            </>
          );
        } else if (selectedValue === "image_6_2") {
          setAdditionalField(
            <>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3"></div>
              {/* Image Type */}
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Image Type
                  </label>
                  <select
                    className="form-control"
                    name="image_type"
                    id="image_type"
                    onChange={handleImage6TypeChange}
                  >
                    <option value="" selected disabled readOnly>
                      --select--
                    </option>
                    <option value="image_6_1">Type-1</option>
                    <option value="image_6_2">Type-2</option>
                    <option value="image_6_3">Type-3</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <a
                  onClick={() =>
                    window.open(
                      "/assets_ebook/images/6.2.png",
                      "_blank",
                      "width=800,height=600"
                    )
                  }
                >
                  <img
                    src="/assets_ebook/images/6.2.png"
                    alt="photo1"
                    style={{ height: "100px", maxWidth: "100%" }}
                  />
                </a>
              </div>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Sub Heading
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Heading"
                    name="image_subheading"
                    value={inputFields.image_subheading}
                    onChange={(e) => handleInputChange(e, "image_subheading")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Heading</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Heading"
                    name="image_heading"
                    value={inputFields.image_heading}
                    onChange={(e) => handleInputChange(e, "image_heading")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Sub Heading 2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Heading"
                    name="image_subheading_2"
                    value={inputFields.image_subheading_2}
                    onChange={(e) => handleInputChange(e, "image_subheading_2")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-1</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_1"
                    value={inputFields.image_text_1}
                    onChange={(e) => handleInputChange(e, "image_text_1")}
                  />
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_1"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_1}
                    onChange={(e) => handleInputChange(e, "image_desc_1")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-2</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_2"
                    value={inputFields.image_text_2}
                    onChange={(e) => handleInputChange(e, "image_text_2")}
                  />
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_2"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_2}
                    onChange={(e) => handleInputChange(e, "image_desc_2")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-3</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_3"
                    value={inputFields.image_text_3}
                    onChange={(e) => handleInputChange(e, "image_text_3")}
                  />
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_3"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_1}
                    onChange={(e) => handleInputChange(e, "image_desc_3")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-4</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_4"
                    value={inputFields.image_text_4}
                    onChange={(e) => handleInputChange(e, "image_text_4")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_4"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_4}
                    onChange={(e) => handleInputChange(e, "image_desc_4")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-5</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_5"
                    value={inputFields.image_text_5}
                    onChange={(e) => handleInputChange(e, "image_text_5")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_5"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_5}
                    onChange={(e) => handleInputChange(e, "image_desc_5")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-6</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_6"
                    value={inputFields.image_text_6}
                    onChange={(e) => handleInputChange(e, "image_text_6")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_6"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_6}
                    onChange={(e) => handleInputChange(e, "image_desc_6")}
                  ></textarea>
                </div>
              </div>
            </>
          );
        } else if (selectedValue === "image_6_3") {
          setAdditionalField(
            <>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3"></div>
              {/* Image Type */}
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Image Type
                  </label>
                  <select
                    className="form-control"
                    name="image_type"
                    id="image_type"
                    onChange={handleImage6TypeChange}
                  >
                    <option value="" selected disabled readOnly>
                      --select--
                    </option>
                    <option value="image_6_1">Type-1</option>
                    <option value="image_6_2">Type-2</option>
                    <option value="image_6_3">Type-3</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <a
                  onClick={() =>
                    window.open(
                      "/assets_ebook/images/6.2.png",
                      "_blank",
                      "width=800,height=600"
                    )
                  }
                >
                  <img
                    src="/assets_ebook/images/6.2.png"
                    alt="photo1"
                    style={{ height: "100px", maxWidth: "100%" }}
                  />
                </a>
              </div>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Heading </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Heading"
                    name="image_heading"
                    value={inputFields.image_heading}
                    onChange={(e) => handleInputChange(e, "image_heading")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Heading 2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Heading"
                    name="image_heading_2"
                    value={inputFields.image_heading_2}
                    onChange={(e) => handleInputChange(e, "image_heading_2")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-1</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_1"
                    value={inputFields.image_text_1}
                    onChange={(e) => handleInputChange(e, "image_text_1")}
                  />
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_1"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_1}
                    onChange={(e) => handleInputChange(e, "image_desc_1")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-2</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_2"
                    value={inputFields.image_text_2}
                    onChange={(e) => handleInputChange(e, "image_text_2")}
                  />
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_2"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_2}
                    onChange={(e) => handleInputChange(e, "image_desc_2")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-3</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_3"
                    value={inputFields.image_text_3}
                    onChange={(e) => handleInputChange(e, "image_text_3")}
                  />
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_3"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_1}
                    onChange={(e) => handleInputChange(e, "image_desc_3")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-4</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_4"
                    value={inputFields.image_text_4}
                    onChange={(e) => handleInputChange(e, "image_text_4")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_4"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_4}
                    onChange={(e) => handleInputChange(e, "image_desc_4")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-5</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_5"
                    value={inputFields.image_text_5}
                    onChange={(e) => handleInputChange(e, "image_text_5")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_5"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_5}
                    onChange={(e) => handleInputChange(e, "image_desc_5")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-6</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_6"
                    value={inputFields.image_text_6}
                    onChange={(e) => handleInputChange(e, "image_text_6")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_6"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_6}
                    onChange={(e) => handleInputChange(e, "image_desc_6")}
                  ></textarea>
                </div>
              </div>
            </>
          );
        }
      };

      // IMAGE -4
      setAdditionalField(
        <>
          <div className="col-lg-4 mb-3"></div>
          <div className="col-lg-4 mb-3"></div>
          {/* Image Type */}
          <div className="col-lg-4 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">Image Type</label>
              <select
                className="form-control"
                name="image_type"
                id="image_type"
                onChange={handleImage6TypeChange}
              >
                <option value="" selected disabled readOnly>
                  --select--
                </option>
                <option value="image_6_1">Type-1</option>
                <option value="image_6_2">Type-2</option>
                <option value="image_6_3">Type-3</option>
              </select>
            </div>
          </div>
        </>
      );
    } else if (selectedElementId === "10") {
      // on changing the image type show the respective inputs
      const handleImage7TypeChange = (event) => {
        const selectedValue = event.target.value;
        handleInputChange(event, "image_type");
        if (selectedValue === "image_7_1") {
          setAdditionalField(
            <>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3"></div>
              {/* Image Type */}
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Image Type
                  </label>
                  <select
                    className="form-control"
                    name="image_type"
                    id="image_type"
                    onChange={handleImage7TypeChange}
                  >
                    <option value="" selected disabled readOnly>
                      --select--
                    </option>
                    <option value="image_7_1">Type-1</option>
                    <option value="image_7_2">Type-2</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <a
                  onClick={() =>
                    window.open(
                      "/assets_ebook/images/7.1.png",
                      "_blank",
                      "width=800,height=600"
                    )
                  }
                >
                  <img
                    src="/assets_ebook/images/7.1.png"
                    alt="photo1"
                    style={{ height: "100px", maxWidth: "100%" }}
                  />
                </a>
              </div>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Heading</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Heading"
                    name="image_heading"
                    value={inputFields.image_heading}
                    onChange={(e) => handleInputChange(e, "image_heading")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-1</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_1"
                    value={inputFields.image_text_1}
                    onChange={(e) => handleInputChange(e, "image_text_1")}
                  />
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_1"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_1}
                    onChange={(e) => handleInputChange(e, "image_desc_1")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-2</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_2"
                    value={inputFields.image_text_2}
                    onChange={(e) => handleInputChange(e, "image_text_2")}
                  />
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_2"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_2}
                    onChange={(e) => handleInputChange(e, "image_desc_2")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-3</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_3"
                    value={inputFields.image_text_3}
                    onChange={(e) => handleInputChange(e, "image_text_3")}
                  />
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_3"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_1}
                    onChange={(e) => handleInputChange(e, "image_desc_3")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-4</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_4"
                    value={inputFields.image_text_4}
                    onChange={(e) => handleInputChange(e, "image_text_4")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_4"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_4}
                    onChange={(e) => handleInputChange(e, "image_desc_4")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-5</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_5"
                    value={inputFields.image_text_5}
                    onChange={(e) => handleInputChange(e, "image_text_5")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_5"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_5}
                    onChange={(e) => handleInputChange(e, "image_desc_5")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-6</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_6"
                    value={inputFields.image_text_6}
                    onChange={(e) => handleInputChange(e, "image_text_6")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_6"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_6}
                    onChange={(e) => handleInputChange(e, "image_desc_6")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-7</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_7"
                    value={inputFields.image_text_7}
                    onChange={(e) => handleInputChange(e, "image_text_7")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_7"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_7}
                    onChange={(e) => handleInputChange(e, "image_desc_7")}
                  ></textarea>
                </div>
              </div>
            </>
          );
        } else if (selectedValue === "image_7_2") {
          setAdditionalField(
            <>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3"></div>
              {/* Image Type */}
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Image Type
                  </label>
                  <select
                    className="form-control"
                    name="image_type"
                    id="image_type"
                    onChange={handleImage7TypeChange}
                  >
                    <option value="" selected disabled readOnly>
                      --select--
                    </option>
                    <option value="image_7_1">Type-1</option>
                    <option value="image_7_2">Type-2</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <a
                  onClick={() =>
                    window.open(
                      "/assets_ebook/images/7.2.png",
                      "_blank",
                      "width=800,height=600"
                    )
                  }
                >
                  <img
                    src="/assets_ebook/images/7.2.png"
                    alt="photo1"
                    style={{ height: "100px", maxWidth: "100%" }}
                  />
                </a>
              </div>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Heading </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Heading"
                    name="image_heading"
                    value={inputFields.image_heading}
                    onChange={(e) => handleInputChange(e, "image_heading")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-1</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_1"
                    value={inputFields.image_text_1}
                    onChange={(e) => handleInputChange(e, "image_text_1")}
                  />
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_1"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_1}
                    onChange={(e) => handleInputChange(e, "image_desc_1")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-2</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_2"
                    value={inputFields.image_text_2}
                    onChange={(e) => handleInputChange(e, "image_text_2")}
                  />
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_2"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_2}
                    onChange={(e) => handleInputChange(e, "image_desc_2")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-3</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_3"
                    value={inputFields.image_text_3}
                    onChange={(e) => handleInputChange(e, "image_text_3")}
                  />
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_3"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_1}
                    onChange={(e) => handleInputChange(e, "image_desc_3")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-4</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_4"
                    value={inputFields.image_text_4}
                    onChange={(e) => handleInputChange(e, "image_text_4")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_4"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_4}
                    onChange={(e) => handleInputChange(e, "image_desc_4")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-5</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_5"
                    value={inputFields.image_text_5}
                    onChange={(e) => handleInputChange(e, "image_text_5")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_5"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_5}
                    onChange={(e) => handleInputChange(e, "image_desc_5")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-6</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_6"
                    value={inputFields.image_text_6}
                    onChange={(e) => handleInputChange(e, "image_text_6")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_6"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_6}
                    onChange={(e) => handleInputChange(e, "image_desc_6")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-7</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_7"
                    value={inputFields.image_text_7}
                    onChange={(e) => handleInputChange(e, "image_text_7")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_7"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_7}
                    onChange={(e) => handleInputChange(e, "image_desc_7")}
                  ></textarea>
                </div>
              </div>
            </>
          );
        }
      };

      // IMAGE -7
      setAdditionalField(
        <>
          <div className="col-lg-4 mb-3"></div>
          <div className="col-lg-4 mb-3"></div>
          {/* Image Type */}
          <div className="col-lg-4 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">Image Type</label>
              <select
                className="form-control"
                name="image_type"
                id="image_type"
                onChange={handleImage7TypeChange}
              >
                <option value="" selected disabled readOnly>
                  --select--
                </option>
                <option value="image_7_1">Type-1</option>
                <option value="image_7_2">Type-2</option>
              </select>
            </div>
          </div>
        </>
      );
    } else if (selectedElementId === "11") {
      // on changing the image type show the respective inputs
      const handleImage8TypeChange = (event) => {
        const selectedValue = event.target.value;
        handleInputChange(event, "image_type");
        if (selectedValue === "image_8_1") {
          setAdditionalField(
            <>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3"></div>
              {/* Image Type */}
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Image Type
                  </label>
                  <select
                    className="form-control"
                    name="image_type"
                    id="image_type"
                    onChange={handleImage8TypeChange}
                  >
                    <option value="" selected disabled readOnly>
                      --select--
                    </option>
                    <option value="image_8_1">Type-1</option>
                    <option value="image_8_2">Type-2</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <a
                  onClick={() =>
                    window.open(
                      "/assets_ebook/images/8.1.png",
                      "_blank",
                      "width=800,height=600"
                    )
                  }
                >
                  <img
                    src="/assets_ebook/images/8.1.png"
                    alt="photo1"
                    style={{ height: "100px", maxWidth: "100%" }}
                  />
                </a>
              </div>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Heading</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Heading"
                    name="image_heading"
                    value={inputFields.image_heading}
                    onChange={(e) => handleInputChange(e, "image_heading")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Heading 2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Heading"
                    name="image_heading_2"
                    value={inputFields.image_heading_2}
                    onChange={(e) => handleInputChange(e, "image_heading_2")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-1</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_1"
                    value={inputFields.image_text_1}
                    onChange={(e) => handleInputChange(e, "image_text_1")}
                  />
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_1"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_1}
                    onChange={(e) => handleInputChange(e, "image_desc_1")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-2</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_2"
                    value={inputFields.image_text_2}
                    onChange={(e) => handleInputChange(e, "image_text_2")}
                  />
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_2"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_2}
                    onChange={(e) => handleInputChange(e, "image_desc_2")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-3</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_3"
                    value={inputFields.image_text_3}
                    onChange={(e) => handleInputChange(e, "image_text_3")}
                  />
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_3"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_1}
                    onChange={(e) => handleInputChange(e, "image_desc_3")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-4</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_4"
                    value={inputFields.image_text_4}
                    onChange={(e) => handleInputChange(e, "image_text_4")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_4"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_4}
                    onChange={(e) => handleInputChange(e, "image_desc_4")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-5</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_5"
                    value={inputFields.image_text_5}
                    onChange={(e) => handleInputChange(e, "image_text_5")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_5"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_5}
                    onChange={(e) => handleInputChange(e, "image_desc_5")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-6</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_6"
                    value={inputFields.image_text_6}
                    onChange={(e) => handleInputChange(e, "image_text_6")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_6"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_6}
                    onChange={(e) => handleInputChange(e, "image_desc_6")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-7</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_7"
                    value={inputFields.image_text_7}
                    onChange={(e) => handleInputChange(e, "image_text_7")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_7"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_7}
                    onChange={(e) => handleInputChange(e, "image_desc_7")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-8</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_8"
                    value={inputFields.image_text_8}
                    onChange={(e) => handleInputChange(e, "image_text_8")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_8"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_8}
                    onChange={(e) => handleInputChange(e, "image_desc_8")}
                  ></textarea>
                </div>
              </div>
            </>
          );
        } else if (selectedValue === "image_8_2") {
          setAdditionalField(
            <>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3"></div>
              {/* Image Type */}
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Image Type
                  </label>
                  <select
                    className="form-control"
                    name="image_type"
                    id="image_type"
                    onChange={handleImage8TypeChange}
                  >
                    <option value="" selected disabled readOnly>
                      --select--
                    </option>
                    <option value="image_8_1">Type-1</option>
                    <option value="image_8_2">Type-2</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <a
                  onClick={() =>
                    window.open(
                      "/assets_ebook/images/8.2.png",
                      "_blank",
                      "width=800,height=600"
                    )
                  }
                >
                  <img
                    src="/assets_ebook/images/8.2.png"
                    alt="photo1"
                    style={{ height: "100px", maxWidth: "100%" }}
                  />
                </a>
              </div>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Heading </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Heading"
                    name="image_heading"
                    value={inputFields.image_heading}
                    onChange={(e) => handleInputChange(e, "image_heading")}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3"></div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-1</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_1"
                    value={inputFields.image_text_1}
                    onChange={(e) => handleInputChange(e, "image_text_1")}
                  />
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_1"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_1}
                    onChange={(e) => handleInputChange(e, "image_desc_1")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-2</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_2"
                    value={inputFields.image_text_2}
                    onChange={(e) => handleInputChange(e, "image_text_2")}
                  />
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_2"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_2}
                    onChange={(e) => handleInputChange(e, "image_desc_2")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-3</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_3"
                    value={inputFields.image_text_3}
                    onChange={(e) => handleInputChange(e, "image_text_3")}
                  />
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_3"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_1}
                    onChange={(e) => handleInputChange(e, "image_desc_3")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-4</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_4"
                    value={inputFields.image_text_4}
                    onChange={(e) => handleInputChange(e, "image_text_4")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_4"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_4}
                    onChange={(e) => handleInputChange(e, "image_desc_4")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-5</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_5"
                    value={inputFields.image_text_5}
                    onChange={(e) => handleInputChange(e, "image_text_5")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_5"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_5}
                    onChange={(e) => handleInputChange(e, "image_desc_5")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-6</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_6"
                    value={inputFields.image_text_6}
                    onChange={(e) => handleInputChange(e, "image_text_6")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_6"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_6}
                    onChange={(e) => handleInputChange(e, "image_desc_6")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-7</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_7"
                    value={inputFields.image_text_7}
                    onChange={(e) => handleInputChange(e, "image_text_7")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_7"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_7}
                    onChange={(e) => handleInputChange(e, "image_desc_7")}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">Text-8</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Text"
                    name="image_text_8"
                    value={inputFields.image_text_8}
                    onChange={(e) => handleInputChange(e, "image_text_8")}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="form-group">
                  <label className="mont-font fw-600 font-xsss">
                    Description
                  </label>
                  <textarea
                    name="image_desc_8"
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="Enter Description..."
                    spellCheck="false"
                    value={inputFields.image_desc_8}
                    onChange={(e) => handleInputChange(e, "image_desc_8")}
                  ></textarea>
                </div>
              </div>
            </>
          );
        }
      };

      // IMAGE -8
      setAdditionalField(
        <>
          <div className="col-lg-4 mb-3"></div>
          <div className="col-lg-4 mb-3"></div>
          {/* Image Type */}
          <div className="col-lg-4 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">Image Type</label>
              <select
                className="form-control"
                name="image_type"
                id="image_type"
                onChange={handleImage8TypeChange}
              >
                <option value="" selected disabled readOnly>
                  --select--
                </option>
                <option value="image_8_1">Type-1</option>
                <option value="image_8_2">Type-2</option>
              </select>
            </div>
          </div>
        </>
      );
    } else if (selectedElementId === "13") {
      // on changing the image type show the respective inputs
      const handleImage10TypeChange = (event) => {
        const selectedValue = event.target.value;
        handleInputChange(event, "image_type");
        let imageUrl;
        if (selectedValue === "image_10_1") {
          imageUrl = "/assets_ebook/images/10.1.png";
        } else if (selectedValue === "image_10_2") {
          imageUrl = "/assets_ebook/images/10.2.png";
        } else {
          imageUrl = "/assets_ebook/images/10.3.png";
        }
        setAdditionalField(
          <>
            <div className="col-lg-4 mb-3"></div>
            <div className="col-lg-4 mb-3"></div>
            {/* Image Type */}
            <div className="col-lg-4 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Image Type</label>
                <select
                  className="form-control"
                  name="image_type"
                  id="image_type"
                  onChange={handleImage10TypeChange}
                >
                  <option value="" selected disabled readOnly>
                    --select--
                  </option>
                  <option value="image_10_1">Type-1</option>
                  <option value="image_10_2">Type-2</option>
                  <option value="image_10_3">Type-3</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 mb-3">
              <a
                onClick={() =>
                  window.open(imageUrl, "_blank", "width=800,height=600")
                }
              >
                <img
                  src={imageUrl}
                  alt="photo1"
                  style={{ height: "100px", maxWidth: "100%" }}
                />
              </a>
            </div>
            <div className="col-lg-4 mb-3"></div>
            <div className="col-lg-4 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Heading</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Heading"
                  name="image_heading"
                  value={inputFields.image_heading}
                  onChange={(e) => handleInputChange(e, "image_heading")}
                />
              </div>
            </div>
            <div className="col-lg-4 mb-3"></div>
            <div className="col-lg-4 mb-3"></div>
            <div className="col-lg-4 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Text-1</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Text"
                  name="image_text_1"
                  value={inputFields.image_text_1}
                  onChange={(e) => handleInputChange(e, "image_text_1")}
                />
              </div>
            </div>

            <div className="col-lg-8 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Description
                </label>
                <textarea
                  name="image_desc_1"
                  className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                  rows="5"
                  placeholder="Enter Description..."
                  spellCheck="false"
                  value={inputFields.image_desc_1}
                  onChange={(e) => handleInputChange(e, "image_desc_1")}
                ></textarea>
              </div>
            </div>
            <div className="col-lg-4 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Text-2</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Text"
                  name="image_text_2"
                  value={inputFields.image_text_2}
                  onChange={(e) => handleInputChange(e, "image_text_2")}
                />
              </div>
            </div>

            <div className="col-lg-8 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Description
                </label>
                <textarea
                  name="image_desc_2"
                  className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                  rows="5"
                  placeholder="Enter Description..."
                  spellCheck="false"
                  value={inputFields.image_desc_2}
                  onChange={(e) => handleInputChange(e, "image_desc_2")}
                ></textarea>
              </div>
            </div>
            <div className="col-lg-4 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Text-3</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Text"
                  name="image_text_3"
                  value={inputFields.image_text_3}
                  onChange={(e) => handleInputChange(e, "image_text_3")}
                />
              </div>
            </div>

            <div className="col-lg-8 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Description
                </label>
                <textarea
                  name="image_desc_3"
                  className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                  rows="5"
                  placeholder="Enter Description..."
                  spellCheck="false"
                  value={inputFields.image_desc_1}
                  onChange={(e) => handleInputChange(e, "image_desc_3")}
                ></textarea>
              </div>
            </div>
            <div className="col-lg-4 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Text-4</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Text"
                  name="image_text_4"
                  value={inputFields.image_text_4}
                  onChange={(e) => handleInputChange(e, "image_text_4")}
                />
              </div>
            </div>
            <div className="col-lg-8 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Description
                </label>
                <textarea
                  name="image_desc_4"
                  className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                  rows="5"
                  placeholder="Enter Description..."
                  spellCheck="false"
                  value={inputFields.image_desc_4}
                  onChange={(e) => handleInputChange(e, "image_desc_4")}
                ></textarea>
              </div>
            </div>
            <div className="col-lg-4 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Text-5</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Text"
                  name="image_text_5"
                  value={inputFields.image_text_5}
                  onChange={(e) => handleInputChange(e, "image_text_5")}
                />
              </div>
            </div>
            <div className="col-lg-8 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Description
                </label>
                <textarea
                  name="image_desc_5"
                  className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                  rows="5"
                  placeholder="Enter Description..."
                  spellCheck="false"
                  value={inputFields.image_desc_5}
                  onChange={(e) => handleInputChange(e, "image_desc_5")}
                ></textarea>
              </div>
            </div>
            <div className="col-lg-4 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Text-6</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Text"
                  name="image_text_6"
                  value={inputFields.image_text_6}
                  onChange={(e) => handleInputChange(e, "image_text_6")}
                />
              </div>
            </div>
            <div className="col-lg-8 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Description
                </label>
                <textarea
                  name="image_desc_6"
                  className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                  rows="5"
                  placeholder="Enter Description..."
                  spellCheck="false"
                  value={inputFields.image_desc_6}
                  onChange={(e) => handleInputChange(e, "image_desc_6")}
                ></textarea>
              </div>
            </div>
            <div className="col-lg-4 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Text-7</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Text"
                  name="image_text_7"
                  value={inputFields.image_text_7}
                  onChange={(e) => handleInputChange(e, "image_text_7")}
                />
              </div>
            </div>
            <div className="col-lg-8 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Description
                </label>
                <textarea
                  name="image_desc_7"
                  className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                  rows="5"
                  placeholder="Enter Description..."
                  spellCheck="false"
                  value={inputFields.image_desc_7}
                  onChange={(e) => handleInputChange(e, "image_desc_7")}
                ></textarea>
              </div>
            </div>
            <div className="col-lg-4 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Text-8</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Text"
                  name="image_text_8"
                  value={inputFields.image_text_8}
                  onChange={(e) => handleInputChange(e, "image_text_8")}
                />
              </div>
            </div>
            <div className="col-lg-8 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Description
                </label>
                <textarea
                  name="image_desc_8"
                  className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                  rows="5"
                  placeholder="Enter Description..."
                  spellCheck="false"
                  value={inputFields.image_desc_8}
                  onChange={(e) => handleInputChange(e, "image_desc_8")}
                ></textarea>
              </div>
            </div>
            <div className="col-lg-4 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Text-9</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Text"
                  name="image_text_9"
                  value={inputFields.image_text_9}
                  onChange={(e) => handleInputChange(e, "image_text_9")}
                />
              </div>
            </div>
            <div className="col-lg-8 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Description
                </label>
                <textarea
                  name="image_desc_9"
                  className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                  rows="5"
                  placeholder="Enter Description..."
                  spellCheck="false"
                  value={inputFields.image_desc_9}
                  onChange={(e) => handleInputChange(e, "image_desc_9")}
                ></textarea>
              </div>
            </div>
            <div className="col-lg-4 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Text-10</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Text"
                  name="image_text_10"
                  value={inputFields.image_text_10}
                  onChange={(e) => handleInputChange(e, "image_text_10")}
                />
              </div>
            </div>
            <div className="col-lg-8 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">
                  Description
                </label>
                <textarea
                  name="image_desc_10"
                  className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                  rows="5"
                  placeholder="Enter Description..."
                  spellCheck="false"
                  value={inputFields.image_desc_10}
                  onChange={(e) => handleInputChange(e, "image_desc_10")}
                ></textarea>
              </div>
            </div>
          </>
        );
      };

      // IMAGE -8
      setAdditionalField(
        <>
          <div className="col-lg-4 mb-3"></div>
          <div className="col-lg-4 mb-3"></div>
          {/* Image Type */}
          <div className="col-lg-4 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">Image Type</label>
              <select
                className="form-control"
                name="image_type"
                id="image_type"
                onChange={handleImage10TypeChange}
              >
                <option value="" selected disabled readOnly>
                  --select--
                </option>
                <option value="image_10_1">Type-1</option>
                <option value="image_10_2">Type-2</option>
                <option value="image_10_3">Type-3</option>
              </select>
            </div>
          </div>
        </>
      );
    } else if (selectedElementId === "14") {
      // List
      const handleCountChange = (event) => {
        const count = parseInt(event.target.value, 10);

        // Generate an array of length 'count' to iterate over
        const inputArray = Array.from({ length: count }, (_, index) => index);

        // Render additional input fields
        setAdditionalField(
          <>
            <div className="col-lg-4 mb-3">
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
                  <option value="Bullet">Bullet</option>
                  <option value="Check">Check</option>
                  <option value="Arrow">Arrow</option>
                  <option value="Star">Star</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 mb-3">
              <div className="form-group">
                <label className="mont-font fw-600 font-xsss">Heading</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Heading"
                  name="list_heading"
                  onChange={(e) => handleInputChange(e, "list_heading")}
                />
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
          <div className="col-lg-4 mb-3">
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
                <option value="Bullet">Bullet</option>
                <option value="Check">Check</option>
                <option value="Arrow">Arrow</option>
                <option value="Star">Star</option>
              </select>
            </div>
          </div>
          <div className="col-lg-4 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">Heading</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Heading"
                name="list_heading"
                onChange={(e) => handleInputChange(e, "list_heading")}
              />
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
    } else if (selectedElementId === "15") {
      // Paragraph
      setAdditionalField(
        <>
          <div className="col-lg-12 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">Content</label>
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
    } else if (selectedElementId === "17") {
      // table
      setAdditionalField(<></>);
    } else if (selectedElementId === "18") {
      // Gif file

      setAdditionalField(
        <>
          <div className="col-lg-4 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">Gif File</label>
              <input
                type="file"
                className="form-control"
                name="gif_file"
                onChange={(e) => handleImageChange(e, "gif_file")}
              />
            </div>
          </div>
        </>
      );
    } else if (selectedElementId === "19") {
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
                  No of Examples
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
                    <label className="mont-font fw-600 font-xsss">
                      Text for Example button(optional)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter data"
                      name={`example_text_${index}`}
                      onChange={(e) =>
                        handleInputArrayChange(e, "example_text", index)
                      }
                    />
                  </div>
                </div>
                <div className="col-lg-4 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Description for Example button
                    </label>
                    <textarea
                      className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                      rows="5"
                      placeholder="Enter Description..."
                      spellCheck="false"
                      onChange={(e) =>
                        handleInputArrayChange(e, "example_description", index)
                      }
                    />
                  </div>
                </div>
                <div className="col-lg-4 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Description for practice
                    </label>
                    <textarea
                      className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                      rows="5"
                      placeholder="Enter Description..."
                      spellCheck="false"
                      onChange={(e) =>
                        handleInputArrayChange(e, "practice_description", index)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </>
        );
      };
      //
      setAdditionalField(
        <>
          <div className="col-lg-6 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                No of Examples
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
          <div className="col-lg-6 mb-3" id="example_count_div"></div>
        </>
      );
    } else if (selectedElementId === "20") {
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
                  No of Examples
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
                    <label className="mont-font fw-600 font-xsss">
                      GIF file
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      placeholder="Enter data"
                      onChange={(e) =>
                        handleFileArrayChange(e, "example_gif", index)
                      }
                    />
                  </div>
                </div>

                <div className="col-lg-6 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Description for practice
                    </label>
                    <textarea
                      className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                      rows="5"
                      placeholder="Enter Description..."
                      spellCheck="false"
                      onChange={(e) =>
                        handleInputArrayChange(e, "practice_description", index)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </>
        );
      };
      //
      setAdditionalField(
        <>
          <div className="col-lg-6 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                No of Examples
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
          <div className="col-lg-6 mb-3" id="example_count_div"></div>
        </>
      );
    } else if (selectedElementId === "21") {
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
                  No of Examples
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
                    <label className="mont-font fw-600 font-xsss">
                      Text on the image
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter data"
                      onChange={(e) =>
                        handleInputArrayChange(e, "example_image_text", index)
                      }
                    />
                  </div>
                </div>

                <div className="col-lg-4 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Description for programming example
                    </label>
                    <textarea
                      className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                      rows="5"
                      placeholder="Enter Description..."
                      spellCheck="false"
                      onChange={(e) =>
                        handleInputArrayChange(e, "example_description", index)
                      }
                    />
                  </div>
                </div>
                <div className="col-lg-4 mb-3">
                  <div className="form-group">
                    <label className="mont-font fw-600 font-xsss">
                      Description for practice
                    </label>
                    <textarea
                      className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                      rows="5"
                      placeholder="Enter Description..."
                      spellCheck="false"
                      onChange={(e) =>
                        handleInputArrayChange(e, "practice_description", index)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </>
        );
      };
      //
      setAdditionalField(
        <>
          <div className="col-lg-6 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                No of Examples
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
          <div className="col-lg-6 mb-3" id="example_count_div"></div>
        </>
      );
    } else if (selectedElementId === "22") {
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
                  No of Buttons
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
                    <label className="mont-font fw-600 font-xsss">
                      Content for button
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter data"
                      onChange={(e) =>
                        handleInputArrayChange(e, "button_text", index)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </>
        );
      };
      //
      setAdditionalField(
        <>
          <div className="col-lg-6 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                No of Buttons
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
          <div className="col-lg-6 mb-3" id="example_count_div"></div>
        </>
      );
    } else if (selectedElementId === "23") {
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
                  No of Text Box
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
                    <label className="mont-font fw-600 font-xsss">
                      Content for Text Box
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter data"
                      onChange={(e) =>
                        handleInputArrayChange(e, "button_text", index)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </>
        );
      };
      //
      setAdditionalField(
        <>
          <div className="col-lg-6 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">
                No of Text Box
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
          <div className="col-lg-6 mb-3" id="example_count_div"></div>
        </>
      );
    } else if (selectedElementId === "24") {
      setAdditionalField(
        <>
          <div className="col-lg-6 mb-3">
            <div className="form-group">
              <label className="mont-font fw-600 font-xsss">Button Type</label>
              <select
                className="form-control"
                name="list_type"
                id="list_type"
                onChange={(e) => handleInputChange(e, "single_button_type")}
              >
                <option value="" selected disabled readOnly>
                  --select--
                </option>
                <option value="1">Practice</option>
                <option value="2">Click To View Output</option>
              </select>
            </div>
          </div>
        </>
      );
    } else {
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
    formData.append("section_id", section_id);
    formData.append("element_id", selectedElement);

    e.preventDefault();

    try {
      const response = await fetch(baseUrl + "api/add_element", {
        method: "POST",
        // headers: {
        //     'Content-Type': 'application/json',
        // },
        // body: JSON.stringify({
        //     section_id,
        //     element_id: selectedElement,
        //     ...inputFields,
        // }),
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
                              Ebook Title
                            </label>
                            <br />
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Ebook Title"
                              value={
                                ebookSection.ebook && ebookSection.ebook.title
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
                                ebookSection.ebook_module &&
                                ebookSection.ebook_module.module_title
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
                              value={ebookSection && ebookSection.section_title}
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
                              {elements.map((element) => (
                                <option key={element.id} value={element.id}>
                                  {element.element_name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {additionalField}
                      </div>
                      <div className="col-lg-12">
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

export default AddElements;
