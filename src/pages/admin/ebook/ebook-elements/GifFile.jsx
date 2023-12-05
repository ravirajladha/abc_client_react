import React from 'react'

function GifFile({ element }) {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    return (
        <>
            <div class="doc-info">
                <img src= {baseUrl + element.image} class="img-thumbnail rounded-20" alt="Responsive image" />
            </div>
        </>
    )
}

export default GifFile
