import React from 'react'

function SingleButton({element}) {
    return (
        <>
        <div>
            {element.single_button_type === 1 && (
                <div className="text-center">
                    <a href="#x" className="btn btn-primary pill mt-2">
                        PRACTICE
                    </a>
                </div>
            )}

            {element.single_button_type === 2 && (
                <div className="text-center">
                    <a href="#x" className="btn btn-primary pill mt-2">
                        CLICK TO VIEW OUTPUT
                    </a>
                </div>
            )}

            <div className="spacer">&nbsp;</div>
        </div>
        </>
    )
}

export default SingleButton
