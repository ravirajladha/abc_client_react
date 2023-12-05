import React from 'react'

function ExamplePractice({ element }) {
    const exampleText = element.example_text.split(',');
    const exampleDescriptions = element.example_description.split(',');
    const practiceDescriptions = element.practice_description.split(',');
    const columnCount = practiceDescriptions.length;
    const columnSize = 12 / columnCount;
    return (
        <>
            <div className="doc-info">
                <div className="row text-center">
                    {columnCount === 1 ? (
                        <>
                            <div className="col-lg-6">
                                <a href="#x" className="btn btn-primary pill">
                                    PROGRAMMING EXAMPLE
                                </a>
                            </div>
                            <div className="col-lg-6">
                                <a href="#x" className="btn btn-primary pill mt-2">
                                    PRACTICE
                                </a>
                            </div>
                        </>
                    ) : (
                        <>
                            {practiceDescriptions.map((item, index) => (
                                <div key={index} className={`col-lg-${columnSize}`}>
                                    <a href="#x" className="btn btn-secondary pill text-black">
                                        <p>{exampleText[index]}</p>PROGRAMMING EXAMPLE
                                    </a>
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

export default ExamplePractice
