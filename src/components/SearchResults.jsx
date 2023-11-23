
import React from 'react'
import "../css/custom.css"

function SearchResults({ results, onResultClick }) {
    const handleClick = (question,id) =>{
        onResultClick(question,id);
        results ="";
    }
    return (
        <div className="row">
            <div className="col-lg-5">
                <div className="result scroll-bar card w-100 border-0 bg-white shadow-xs p-0">
                    {
                    results.map((result, id) => {
                        return <p key={id} onClick={() => handleClick(result.question, result.id)}>{result.question} </p>;
                    })
                        }
                </div>
            </div>
        </div>
    )
}

export default SearchResults
