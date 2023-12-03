import React from 'react'

function Heading({element}) {
    return (
        <>
            <div className="d-flex justify-content-center align-items-center">
                <h6 id={`${element.heading}-link`} className={`p-20 doc-sub-title rounded-xs ${element.heading_type === 1 ? 'bg-grey' : 'bg-danger'}`}>
                    {element.heading}
                </h6>
                <div className="spacer">&nbsp;</div>
            </div>
        </>
    )
}

export default Heading
