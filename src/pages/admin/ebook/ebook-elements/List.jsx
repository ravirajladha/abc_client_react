import React from 'react'

function List({element}) {
    const listPoints = element.list_points.split(',');
    return (
        <>
<div>
            <h6 id="lists-link" className="pt-50 doc-sub-title">
                {element.list_heading} <a href="#lists-link"><i className="fas fa-hashtag"></i></a>
            </h6>
            <div className="doc-info">
                {element.list_type === 'Bullet' && (
                    <ul className="list-unstyled list-icon list-bullet list-primary mb-25">
                        {listPoints.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                )}

                {element.list_type === 'Check' && (
                    <ul className="list-unstyled list-icon list-check list-success mb-25">
                        {listPoints.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                )}

                {element.list_type === 'Arrow' && (
                    <ul className="list-unstyled list-icon list-arrow list-info mb-25">
                        {listPoints.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                )}

                {element.list_type === 'Star' && (
                    <ul className="list-unstyled list-icon list-star list-warning">
                        {listPoints.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
        </>
    )
}

export default List
