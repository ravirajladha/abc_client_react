import React from 'react'

function Image({element}) {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    return (
        <>
            <div className="doc-info">
                <img src={baseUrl + element.image} className="img-fluid" alt="Responsive image" />
            </div>
            <div className="spacer">&nbsp;</div>
        </>
    )
}

export default Image
