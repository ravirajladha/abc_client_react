import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function Image_7_2({element}) {
    const modalHeader1 = {
        backgroundColor: '#ffc709',
        padding: '0.8rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ffff',
        
      };
    const modalHeader2 = {
        backgroundColor: '#f26722',
        padding: '0.8rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ffff',
        
      };
    const modalHeader3 = {
        backgroundColor: '#ed1d7d',
        padding: '0.8rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ffff',
      };
    const modalHeader4 = {
        backgroundColor: '#7e559e',
        padding: '0.8rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ffff',
        
      };
    const modalHeader5 = {
        backgroundColor: '#3d7cbf',
        padding: '0.8rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ffff',
        
      };
    const modalHeader6 = {
        backgroundColor: '#7e559e',
        padding: '0.8rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ffff',
        
      };
    const modalHeader7 = {
        backgroundColor: '#7e559e',
        padding: '0.8rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ffff',
        
      };
    const [modal1Open, setModal1Open] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);
    const [modal3Open, setModal3Open] = useState(false);
    const [modal4Open, setModal4Open] = useState(false);
    const [modal5Open, setModal5Open] = useState(false);
    const [modal6Open, setModal6Open] = useState(false);
    const [modal7Open, setModal7Open] = useState(false);

    const closeModal1 = () => setModal1Open(false);
    const closeModal2 = () => setModal2Open(false);
    const closeModal3 = () => setModal3Open(false);
    const closeModal4 = () => setModal4Open(false);
    const closeModal5 = () => setModal5Open(false);
    const closeModal6 = () => setModal6Open(false);
    const closeModal7 = () => setModal7Open(false);
    return (
        <>
           <div className="img-preview-7_2">
            <img src={`/assets_ebook/images/7.2.png`} alt="preview" className="introduction-img" />

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

                <div className="box5" onClick={() => setModal5Open(true)}>
                    <p className="p5">{element.image_text_5}</p>
                </div>

                <div className="box6" onClick={() => setModal6Open(true)}>
                    <p className="p6">{element.image_text_6}</p>
                </div>

                <div className="box7" onClick={() => setModal7Open(true)}>
                    <p className="p7">{element.image_text_7}</p>
                </div>

            {/* Modal 6_1_1 */}
            <Modal show={modal1Open} onHide={closeModal1} centered>
                    <Modal.Header closeButton style={modalHeader1}>
                        <Modal.Title>{element.image_text_1}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{element.image_desc_1}</Modal.Body>
                    <Modal.Footer>
                       
                    </Modal.Footer>
                </Modal>

                {/* Modal 6_1_2 */}
                <Modal show={modal2Open} onHide={closeModal2} centered>
                    <Modal.Header closeButton style={modalHeader2}>
                        <Modal.Title>{element.image_text_2}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{element.image_desc_2}</Modal.Body>
                    <Modal.Footer>
                        
                    </Modal.Footer>
                </Modal>

                {/* Modal 6_1_3 */}
                <Modal show={modal3Open} onHide={closeModal3} centered>
                    <Modal.Header closeButton style={modalHeader3}>
                        <Modal.Title>{element.image_text_3}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{element.image_desc_3}</Modal.Body>
                    <Modal.Footer>
                       
                    </Modal.Footer>
                </Modal>

                {/* Modal 6_1_4 */}
                <Modal show={modal4Open} onHide={closeModal4} centered>
                    <Modal.Header closeButton style={modalHeader4}>
                        <Modal.Title>{element.image_text_4}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{element.image_desc_4}</Modal.Body>
                    <Modal.Footer>
                       
                    </Modal.Footer>
                </Modal>

                {/* Modal 6_1_5 */}
                <Modal show={modal5Open} onHide={closeModal5} centered>
                    <Modal.Header closeButton style={modalHeader5}>
                        <Modal.Title>{element.image_text_5}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{element.image_desc_5}</Modal.Body>
                    <Modal.Footer>
                        
                    </Modal.Footer>
                </Modal>
                {/* Modal 6_1_6 */}
                <Modal show={modal6Open} onHide={closeModal6} centered>
                    <Modal.Header closeButton style={modalHeader6}>
                        <Modal.Title>{element.image_text_6}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{element.image_desc_6}</Modal.Body>
                    <Modal.Footer>
                        
                    </Modal.Footer>
                </Modal>
                {/* Modal 6_1_6 */}
                <Modal show={modal7Open} onHide={closeModal7} centered>
                    <Modal.Header closeButton style={modalHeader7}> 
                        <Modal.Title>{element.image_text_7}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{element.image_desc_7}</Modal.Body>
                    <Modal.Footer>
                      
                    </Modal.Footer>
                </Modal>

        </div>
        <div className="spacer">&nbsp;</div>
        </>
    )
}

export default Image_7_2
