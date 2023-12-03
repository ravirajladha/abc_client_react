import React, { useState } from "react";

function FormPageTwo() {
  // State to keep track of academic sections
  const [sections, setSections] = useState([{ id: 0 }]);

  // Function to add a new section
  const addSection = () => {
    setSections([...sections, { id: sections.length }]);
  };

  // Function to delete a section
  const deleteSection = (sectionId) => {
    setSections(sections.filter((section) => section.id !== sectionId));
  };

  // Function to render each section
  const renderSection = (section) => {
    return (
      <tr key={section.id} className="row">
        <td className="col-lg-12 mb-3">
          <button
            type="button"
            className="btn btn-default btn-add bg-current text-white font-xsss float-right"
            onClick={() => deleteSection(section.id)}
          >
            Delete
          </button>
        </td>
        <td className="col-lg-4 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Academic Name</label>
            <input type="text" name="academic_name" className="form-control" />
          </div>
        </td>
        <td className="col-lg-4 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Class</label>
            <input type="text" name="class" className="form-control" />
          </div>
        </td>
        <td className="col-lg-4 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">% or cgpa</label>
            <input type="text" name="cgpa" className="form-control" />
          </div>
        </td>
        <td className="col-lg-6 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">Start Date</label>
            <input type="date" name="start_date" className="form-control" />
          </div>
        </td>
        <td className="col-lg-6 mb-3">
          <div className="form-group">
            <label className="mont-font fw-600 font-xsss">End Date</label>
            <input type="date" name="end_date" className="form-control" />
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="container">
      <div className="mb-3 pb-0">
        <h2 className="fw-400 font-lg d-block">
          <b>Previous Academic Information</b>
          <button
            type="button"
            className="btn btn-default btn-add bg-current text-white font-xsss float-right"
            onClick={addSection}
          >
            Add
          </button>
        </h2>
      </div>
      <div className="pb-0">
        <form encType="multipart/form-data">
          <table id="myTable">
            <tbody>{sections.map(renderSection)}</tbody>
          </table>
          <div className="col-lg-12 text-right">
            <button
              type="submit"
              name="academic_submit"
              value="1"
              className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormPageTwo;
