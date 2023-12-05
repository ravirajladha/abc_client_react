import React from 'react'

function ExampleImagePractice({element}) {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const exampleImageText = element.example_image_text.split(',');
    const exampleDescriptions = element.example_description.split(',');
    const practiceDescriptions = element.practice_description.split(',');
    const columnCount = practiceDescriptions.length;
    return (
        <>
        <div className="doc-info">
            <div className="row text-center justify-content-center">
                {columnCount === 1 ? (
                    <>
                       
                    </>
                ) : (
                    <>
                        {exampleDescriptions.map((item, index) => (
                            <div key={index} className="col-lg-2">
                                <div className="bg-grey mb-2 rounded d-flex align-items-center justify-content-center" style={{ width: '100%', height: '100px' }}>
                                    {exampleImageText[index]}
                                </div>
                                <a href="#x" className="btn btn-secondary pill text-black" style={{ maxWidth: '100%', padding: '0', whiteSpace: 'normal' }}>
                                    PROGRAMMING EXAMPLE
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

export default ExampleImagePractice
