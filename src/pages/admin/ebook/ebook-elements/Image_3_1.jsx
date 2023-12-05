
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function Image_3_1({ element }) {
    const modalHeader1 = {
        backgroundColor: '#f26667',
        padding: '0.8rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ffff',
        
      };
    const modalHeader2 = {
        backgroundColor: '#faa945',
        padding: '0.8rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ffff',
        
      };
    const modalHeader3 = {
        backgroundColor: '#185b86',
        padding: '0.8rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ffff',
        
      };
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
                <Modal.Header closeButton style={modalHeader1}>
                    <Modal.Title>{element.image_text_1}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{element.image_desc_1}</Modal.Body>
                <Modal.Footer>
                    
                </Modal.Footer>
            </Modal>

            {/* Modal 3 Option-1-2 */}
            <Modal show={modal2Open} onHide={closeModal2}>
                <Modal.Header closeButton style={modalHeader2}>
                    <Modal.Title>{element.image_text_2}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{element.image_desc_2}</Modal.Body>
                <Modal.Footer>
                    
                </Modal.Footer>
            </Modal>

            {/* Modal 3 Option-1-3 */}
            <Modal show={modal3Open} onHide={closeModal3}>
                <Modal.Header closeButton style={modalHeader3}>
                    <Modal.Title>{element.image_text_3}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{element.image_desc_3}</Modal.Body>
                <Modal.Footer>
                    
                </Modal.Footer>
            </Modal>

            <div className="spacer">&nbsp;</div>
        </>
    );
}

export default Image_3_1;
