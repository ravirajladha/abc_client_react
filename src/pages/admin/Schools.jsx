import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import AppHeader from '../../components/includes/AppHeader';
import AppFooter from '../../components/includes/AppFooter';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Schools() {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    // New state for the form and modal visibility
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });
    useEffect(() => {
        getSchools();
    }, [])

    const [schools, setSchools] = useState([]);
    function getSchools() {
        let result = fetch(baseUrl + 'api/get_schools').then(function (result) {
            result.json().then(function (jsonbody) {
                console.warn(jsonbody);
                setSchools(jsonbody);
            })
        });
    }


    
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { ...form };
        console.log('Sending data to the server:', userData);
    
        try {
            const response = await axios.post(`${baseUrl}api/add_school`, userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            toast.success('School added successfully');
            setShowModal(false);
            // getSchools();
        } catch (error) {
            toast.error('Failed to add school');
            console.error('Error adding school:', error.response || error);
        }
    };
    


    return (
        <>
        <ToastContainer />
            {/* ... rest of your component */}
           

            {/* Modal for adding a school */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add School</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={form.name} onChange={handleFormChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={form.email} onChange={handleFormChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="tel" name="phone" value={form.phone} onChange={handleFormChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={form.password} onChange={handleFormChange} required />
                        </Form.Group>
                        <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                        <Button variant="primary" type="submit">Save Changes</Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <div className="main-wrapper">

                <div className="main-content menu-active">
                    <AppHeader />

                    <div className="middle-sidebar-bottom theme-dark-bg">
                        <div className="middle-sidebar-left">
                            <div className="row">
                                <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                                    <div>
                                        <h2 className="fw-400 font-lg d-block">All <b> Schools</b> </h2>
                                    </div>
                                    <div className="float-right">
                                    <Button onClick={handleShowModal} className="p-2  d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current">Add School</Button>

                                        
                                    </div>
                                </div>
                                {
                                    schools ? (
                                        schools && schools.map((school, index) => (
                                            <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                                                <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                                                    <a href="#" className="position-absolute right-0 mr-4 top-0 mt-3"><i className="ti-more text-grey-500 font-xs"></i></a>

                                                    <h4 className="fw-700 font-xs mt-4">{school.school_name}</h4>
                                                </div>
                                            </div>
                                        ))
                                    )
                                        :
                                        ""
                                }
                            </div>


                        </div>
                    </div>
                </div>
                <AppFooter />
            </div>
        </>
    );
}


export default Schools;
