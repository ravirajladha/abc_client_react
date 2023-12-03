import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';


function Image_4_2({ element }) {
    const [modal1Open, setModal1Open] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);
    const [modal3Open, setModal3Open] = useState(false);
    const [modal4Open, setModal4Open] = useState(false);

    const closeModal1 = () => setModal1Open(false);
    const closeModal2 = () => setModal2Open(false);
    const closeModal3 = () => setModal3Open(false);
    const closeModal4 = () => setModal4Open(false);

    return (
        <>

            <div className="img-preview-4_2">
                <img src="/assets_ebook/images/4.2.png" alt="preview" className="introduction-img" />

                <div className="box0">
                    <p className="p0">{element.image_heading}</p>
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

                <div className="box4" onClick={() => setModal4Open(true)}>
                    <p className="p4">{element.image_text_4}</p>
                </div>

                {/* Modal 4 Option-1-1 */}
                <Modal show={modal1Open} onHide={closeModal1} centered>
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

                {/* Modal 4 Option-1-2 */}
                <Modal show={modal2Open} onHide={closeModal2} centered>
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

                {/* Modal 4 Option-1-3 */}
                <Modal show={modal3Open} onHide={closeModal3} centered>
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

                {/* Modal 4 Option-1-4 */}
                <Modal show={modal4Open} onHide={closeModal4} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{element.image_text_4}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{element.image_desc_4}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal4}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
            <div className="spacer">&nbsp;</div>
        </>
    )
}

export default Image_4_2
