import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function Image_3_2({ element }) {
    const [modal1Open, setModal1Open] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);
    const [modal3Open, setModal3Open] = useState(false);

    const closeModal1 = () => setModal1Open(false);
    const closeModal2 = () => setModal2Open(false);
    const closeModal3 = () => setModal3Open(false);
    return (
        <>
            <div className="img-preview-3_2">
                <img src="/assets_ebook/images/3.2.png" alt="preview" className="introduction-img" />

                <div className="box0">
                    <p className="p0">{element.image_subheading}</p>
                </div>

                <div className="box0_1">
                    <p className="p0_1">{element.image_heading}</p>
                </div>

                <div className="box1" onClick={() => setModal1Open(true)}>
                    <p className="p1">{element.image_subtext_1}</p>
                </div>
                <div className="box1_1" onClick={() => setModal1Open(true)}>
                    <p className="p1_1">{element.image_text_1}</p>
                </div>

                <div className="box2" onClick={() => setModal2Open(true)}>
                    <p className="p2">{element.image_subtext_2}</p>
                </div>
                <div className="box2_1" onClick={() => setModal2Open(true)}>
                    <p className="p2_1">{element.image_text_2}</p>
                </div>

                <div className="box3" onClick={() => setModal3Open(true)}>
                    <p className="p3">{element.image_subtext_3}</p>
                </div>
                <div className="box3_1" onClick={() => setModal3Open(true)}>
                    <p className="p3_1">{element.image_text_3}</p>
                </div>

                 {/* Modal 3 Option-2-1 */}
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

            {/* Modal 3 Option-2-2 */}
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

            {/* Modal 3 Option-2-3 */}
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

            </div>
            <div className="spacer">&nbsp;</div>
        </>
    )
}

export default Image_3_2
