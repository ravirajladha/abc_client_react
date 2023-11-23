import React, { useState, useEffect } from 'react'
import Appheader from '../../components/adminComponents/Appheader';
import Appfooter from '../../components/adminComponents/Appfooter';
import Dropdown from '../../components/inputs/Dropdown';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateSubject() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    useEffect(() => {
        getClasses();
    }, [])

    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [subject, setSubject] = useState("");
    const [image, setImage] = useState("");


    function getClasses() {
        let result = fetch(baseUrl + 'api/get_classes').then(function (result) {
            result.json().then(function (jsonbody) {
                console.warn(jsonbody);
                setClasses(jsonbody);
            })
        });
    }
    const handleClassChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedClass(selectedValue);
    };
    const createSubject = (e) => {

        const formData = new FormData();
        formData.append('class', selectedClass);
        formData.append('subject', subject);
        formData.append('image', image);
        e.preventDefault();

        fetch(baseUrl + "api/create_subject", {
            method: 'POST',
            body: formData
        }).then((res) => {
            return res.json();
        }).then((resp) => {
            setSelectedClass("");
            setSubject("");
            setImage("");
            toast.success(resp.msg);

        }).catch((err) => {
            toast.error('Could not submit question :' + err.message);
        });
    }
    return (
        <>
            <div className="main-wrapper">
                <div className="main-content menu-active">
                    <Appheader />
                    <div className="middle-sidebar-bottom theme-dark-bg">
                        <div className="middle-sidebar-left">
                            <div className="row">
                            <ToastContainer autoClose={3000} />

                                <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                    <h2 className="fw-400 font-lg d-block ml-2">Create <b> Subject</b> </h2>
                                    <div className="card-body p-lg-5 px-4 w-100 border-0 ">
                                        <form encType="multipart/form-data" onSubmit={createSubject}>
                                            <div className="row mb-6">
                                                <div className="col-lg-4">
                                                    <label className="mont-font fw-600 font-xsss">Select Class</label><br />
                                                    <Dropdown
                                                        options={classes}
                                                        column_name='class'
                                                        value={selectedClass}
                                                        onChange={handleClassChange} />
                                                </div>
                                                <div className="col-lg-4">
                                                    <label className="mont-font fw-600 font-xsss">Subject Name</label><br />
                                                    <input type="text" className="form-control" placeholder="Enter Subject Name" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="">
                                                        <label className="mont-font fw-600 font-xsss">Project Image</label><br />
                                                        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="form-control" required />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <button type="submit" className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0 float-right mt-2">Submit</button>
                                                </div>
                                            </div>
                                        </form>

                                    </div>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>
                <Appfooter />
            </div>
        </>
    )
}

export default CreateSubject
