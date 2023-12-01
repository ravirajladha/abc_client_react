import React from 'react'

function Paragraph({element}) {
    return (
        <>
            <pre className="custom-pre">
                {element.paragraph}
            </pre>
            <div className="spacer">&nbsp;</div>
        </>
    )
}

export default Paragraph
