import React from 'react'

function ExampleVideoPractice({element}) {
  const baseUrl = process.env.REACT_APP_BASE_URL;

    const exampleDescriptions = element.example_description.split(',');
    const practiceDescriptions = element.practice_description.split(',');
    const columnCount = practiceDescriptions.length;
    return (
        <>
            <div className="doc-info">
        <div className="row text-center justify-content-center">
          {columnCount === 1 ? (
            <>
              <div className="col-lg-6">
                <img src={baseUrl + exampleDescriptions[0]} className="img-thumbnail rounded-20" alt="Responsive image" />
              </div>
              <div className="col-lg-6">
                <a href="#x" className="btn btn-primary pill mt-2">
                  PRACTICE
                </a>
              </div>
            </>
          ) : (
            <>
              {exampleDescriptions.map((item, index) => (
                <div key={index} className="col-lg-2 col-lg-offset-1">
                  <img src={baseUrl + exampleDescriptions[0]} className="img-thumbnail rounded-20" alt="Responsive image" />
                  <a href="#x" className="btn btn-secondary pill text-black mt-2">
                    PRACTICE
                  </a>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
        </>
    )
}

export default ExampleVideoPractice
