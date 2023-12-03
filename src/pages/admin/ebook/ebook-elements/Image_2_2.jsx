import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function Image_2_2({ element }) {
    const [modal1Open, setModal1Open] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);

    const closeModal1 = () => setModal1Open(false);
    const closeModal2 = () => setModal2Open(false);
    return (
        <>
            <div className="img-preview-2_2">
                <img src="/assets_ebook/images/2.2.png" alt="preview" className="introduction-img" />

                <div className="box0">
                    <p className="p0">Vs</p>
                </div>

                <div className="box1" onClick={() => setModal1Open(true)}>
                    <p className="p1">{element.image_text_1}</p>
                </div>

                <div className="box2" onClick={() => setModal2Open(true)}>
                    <p className="p2">{element.image_text_2}</p>
                </div>

                 {/* Modal 2 Option-1 */}
                 <Modal show={modal1Open} onHide={closeModal1} style={{ position: 'fixed', top: 0, left: 0, transform: 'translate(0, 0)' }}>
                    <Modal.Header closeButton>
                        <Modal.Title>{element.image_text_1}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{element.image_desc_1}</Modal.Body>
                    {/* <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal1}>
                            Close
                        </Button>
                    </Modal.Footer> */}
                </Modal>

                {/* Modal 2 Option-2 */}
                <Modal show={modal2Open} onHide={closeModal2}>
                    <Modal.Header closeButton>
                        <Modal.Title>{element.image_text_2}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{element.image_desc_2}</Modal.Body>
                    {/* <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal2}>
                            Close
                        </Button>
                    </Modal.Footer> */}
                </Modal>
            </div>
            <div className="spacer">&nbsp;</div>
        </>
    )
}

export default Image_2_2
