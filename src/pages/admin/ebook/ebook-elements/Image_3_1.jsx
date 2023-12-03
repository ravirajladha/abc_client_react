// import React from 'react'

// function Image_3_1({ element }) {
//     return (
//         <>
//             <div className="img-preview-3_1">
//                 <img src="/assets_ebook/images/3.1.png" alt="preview" className="introduction-img" />

//                 <div className="box0">
//                     <p className="p0">{element.image_heading}</p>
//                 </div>

//                 <div className="box0_1">
//                     <p className="p0_1">{element.image_subheading}</p>
//                 </div>

//                 <div className="box1" data-bs-toggle="modal" data-bs-target={`#imgModal_3_1_1${element.id}`}>
//                     <p className="p1">{element.image_text_1}</p>
//                 </div>

//                 <div className="box2" data-bs-toggle="modal" data-bs-target={`#imgModal_3_1_2${element.id}`}>
//                     <p className="p2">{element.image_text_2}</p>
//                 </div>

//                 <div className="box3" data-bs-toggle="modal" data-bs-target={`#imgModal_3_1_3${element.id}`}>
//                     <p className="p3">{element.image_text_3}</p>
//                 </div>

//                 {/* Modal 3 Option-1-1 */}
//                 <div className="modal modal-3_1_1 fade" id={`imgModal_3_1_1${element.id}`} tabIndex="-1" aria-labelledby="imgModal_3_1Label" aria-hidden="true">
//                     <div className="modal-dialog modal-dialog-scrollable">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title" id="imgModal_3_1Label" style={{ display: 'inline' }}>{element.image_text_1}</h5>
//                                 <button type="button" className="btn-close light" data-bs-dismiss="modal" aria-label="Close"></button>
//                             </div>
//                             <div className="modal-body">
//                                 {element.image_desc_1}
//                             </div>
//                             <div className="modal-footer">
//                                 {/* Add your footer content here if needed */}
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Modal 3 Option-1-2 */}
//                 <div className="modal modal-3_1_2 fade" id={`imgModal_3_1_2${element.id}`} tabIndex="-1" aria-labelledby="imgModal_3_1Label" aria-hidden="true">
//                     <div className="modal-dialog modal-dialog-scrollable">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title" id="imgModal_3_1Label" style={{ display: 'inline' }}>{element.image_text_2}</h5>
//                                 <button type="button" className="btn-close light" data-bs-dismiss="modal" aria-label="Close"></button>
//                             </div>
//                             <div className="modal-body">
//                                 {element.image_desc_2}
//                             </div>
//                             <div className="modal-footer">
//                                 {/* Add your footer content here if needed */}
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Modal 3 Option-1-3 */}
//                 <div className="modal modal-3_1_3 fade" id={`imgModal_3_1_3${element.id}`} tabIndex="-1" aria-labelledby="imgModal_3_1Label" aria-hidden="true">
//                     <div className="modal-dialog modal-dialog-scrollable">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title" id="imgModal_3_1Label" style={{ display: 'inline' }}>{element.image_text_3}</h5>
//                                 <button type="button" className="btn-close light" data-bs-dismiss="modal" aria-label="Close"></button>
//                             </div>
//                             <div className="modal-body">
//                                 {element.image_desc_3}
//                             </div>
//                             <div className="modal-footer">
//                                 {/* Add your footer content here if needed */}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="spacer">&nbsp;</div>
//         </>
//     )
// }

// export default Image_3_1
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function Image_3_1({ element }) {
    const [modal1Open, setModal1Open] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);
    const [modal3Open, setModal3Open] = useState(false);

    const closeModal1 = () => setModal1Open(false);
    const closeModal2 = () => setModal2Open(false);
    const closeModal3 = () => setModal3Open(false);

    return (
        <>
            <div className="img-preview-3_1">
                <img src="/assets_ebook/images/3.1.png" alt="preview" className="introduction-img" />
                <div className="box0">
                    <p className="p0">{element.image_heading}</p>
                </div>

                <div className="box0_1">
                    <p className="p0_1">{element.image_subheading}</p>
                </div>
                <div className="box1" onClick={() => setModal1Open(true)}>
                    <p className="p1">{element.image_text_1}</p>
                </div>

                <div className="box2" onClick={() => setModal2Open(true)}>
                    <p className="p2">{element.image_text_2}</p>
                </div>

                <div className="box3" onClick={() => setModal3Open(true)}>
                    <p className="p3">{element.image_text_3}</p>
                </div>
                {/* ... your existing JSX code ... */}
            </div>

            {/* Modal 3 Option-1-1 */}
            <Modal show={modal1Open} onHide={closeModal1}>
                <Modal.Header closeButton>
                    <Modal.Title>{element.image_text_1}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{element.image_desc_1}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal1}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal 3 Option-1-2 */}
            <Modal show={modal2Open} onHide={closeModal2}>
                <Modal.Header closeButton>
                    <Modal.Title>{element.image_text_2}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{element.image_desc_2}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal2}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal 3 Option-1-3 */}
            <Modal show={modal3Open} onHide={closeModal3}>
                <Modal.Header closeButton>
                    <Modal.Title>{element.image_text_3}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{element.image_desc_3}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal3}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="spacer">&nbsp;</div>
        </>
    );
}

export default Image_3_1;
