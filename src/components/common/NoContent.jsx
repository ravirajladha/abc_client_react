import React from "react";

function NoContent({contentName = "Data"}) {
  return (
    <div className="col-lg-4 position-absolute top-50 start-50 translate-middle">
      <div className="card shadow-xss p-4 w-100 text-center">
        <h2 className="fw-400 font-lg d-block">No {contentName} available.</h2>
      </div>
    </div>
  );
}

export default NoContent;
