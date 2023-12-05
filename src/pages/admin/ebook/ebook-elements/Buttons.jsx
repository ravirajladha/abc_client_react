import React from 'react'

function Buttons({element}) {
    const buttonTexts = element.button_text.split('#@#');
    const columnCount = buttonTexts.length;
    return (
        <>
        <div className="doc-info">
            <div className="row text-center justify-content-center">
                {columnCount === 1 ? (
                    <div className="col-lg-6">
                        <div
                            style={{
                                backgroundImage: "url('/assets_ebook/images/BOTTON.jpg')",
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'contain',
                                height: '4em',
                                width: '100%',
                                borderLeft: '0',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {buttonTexts[0]}
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="d-flex justify-content-evenly">
                            {buttonTexts.slice(0, Math.ceil(columnCount / 2)).map((item, key) => (
                                <div
                                    key={key}
                                    style={{
                                        background: "url('/assets_ebook/images/BOTTON.jpg') no-repeat center center",
                                        backgroundSize: 'contain',
                                        height: '4em',
                                        width: '100%',
                                        borderLeft: '0',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        margin: '0px 10px',
                                    }}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                        <div className="d-flex justify-content-evenly mt-2">
                            {buttonTexts.slice(Math.ceil(columnCount / 2)).map((item, key) => (
                                <div
                                    key={key}
                                    style={{
                                        background: "url('/assets_ebook/images/BOTTON.jpg') no-repeat center center",
                                        backgroundSize: 'contain',
                                        height: '4em',
                                        width: '100%',
                                        borderLeft: '0',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        margin: '0px 10px',
                                    }}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
        </>
    )
}

export default Buttons
