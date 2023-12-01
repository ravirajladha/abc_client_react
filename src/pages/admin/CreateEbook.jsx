import React, { useState, useEffect } from 'react';
import AppHeader from '../../components/includes/AppHeader';
import AppFooter from '../../components/includes/AppFooter';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateEbook() {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [moduleTitles, setModuleTitles] = useState([""]); // Array to store video names
    const [moduleDescriptions, setModuleDescriptions] = useState([""]);

    const addModule = () => {
        setModuleTitles([...moduleTitles, ""]);
        setModuleDescriptions([...moduleDescriptions, ""]);
    };

    const deleteModule = (index) => {
        const updatedModuleTitles = [...moduleTitles];
        const updatedModuleDescriptions = [...moduleDescriptions];
        updatedModuleTitles.splice(index, 1);
        setModuleTitles(updatedModuleTitles);
        updatedModuleDescriptions.splice(index, 1);
        setModuleDescriptions(updatedModuleDescriptions);
    };

    const createEbook = (e) => {

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', image);
        formData.append('moduleTitles', JSON.stringify(moduleTitles));
        formData.append('moduleDescriptions', JSON.stringify(moduleDescriptions));
        e.preventDefault();

        fetch(baseUrl + "api/create_ebook", {
            method: 'POST',
            body: formData
        })
            .then((res) => res.json())
            .then((resp) => {
                setTitle("");
                setImage("");
                setDescription("");
                setModuleTitles([""]);
                setModuleDescriptions([""]);
                toast.success(resp.msg);
            })
            .catch((err) => {
                toast.error('Could not submit Ebook: ' + err.message);
            });
    }
    return (
        <>
            <div className="main-wrapper">

                <div className="main-content menu-active">
                    <AppHeader />

                    <div className="middle-sidebar-bottom theme-dark-bg">
                        <div className="middle-sidebar-left">
                            <div className="row">
                                <div className="card w-100 border-0 bg-white shadow-lg p-0 mb-4">
                                    <div className="card-body p-4 w-100 border-0 d-flex rounded-lg justify-content-between">
                                        <h2 className="fw-400 font-lg d-block">Create <b> Ebook</b> </h2>
                                    </div>
                                    <ToastContainer autoClose={3000} />
                                    <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                                        <form encType="multipart/form-data" onSubmit={createEbook}>

                                            <div className="row mb-6">
                                                <div className="col-lg-6">
                                                    <div className="">
                                                        <label className="mont-font fw-600 font-xsss">Ebook title</label><br />
                                                        <input type="text" className="form-control" placeholder="Enter Ebook title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="">
                                                        <label className="mont-font fw-600 font-xsss">Ebook Image</label><br />
                                                        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="form-control" required />
                                                    </div>
                                                </div>

                                                <div className="col-lg-12">
                                                    <div className="">
                                                        <label className="mont-font fw-600 font-xsss">Decription</label><br />
                                                        <textarea rows="4" cols="70" className="form-control" placeholder="Enter Description.." value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 my-4">
                                                    <h2 className="fw-400 font-xs d-block">Add <b> Modules</b> </h2>
                                                </div>
                                                <div className="col-lg-12">
                                                    {moduleTitles.map((title, index) => (
                                                        <div className="row" key={index}>
                                                            <div className="col-lg-4">
                                                                <label className="mont-font fw-600 font-xsss">Module Title</label><br />

                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter Module Title"
                                                                    value={title}
                                                                    onChange={(e) => {
                                                                        const updatedModuleTitles = [...moduleTitles];
                                                                        updatedModuleTitles[index] = e.target.value;
                                                                        setModuleTitles(updatedModuleTitles);
                                                                    }}
                                                                    required
                                                                />

                                                            </div>
                                                            <div className="col-lg-6">
                                                                <label className="mont-font fw-600 font-xsss">Module Descriptions</label><br />
                                                                <input type="text" className="form-control"
                                                                    placeholder="Enter Module Descriptions"
                                                                    onChange={(e) => {
                                                                        const updatedModuleDescriptions = [...moduleDescriptions];
                                                                        updatedModuleDescriptions[index] = e.target.value;
                                                                        setModuleDescriptions(updatedModuleDescriptions);
                                                                    }}
                                                                    required />
                                                            </div>
                                                            <div className="col-lg-2">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-danger ml-2 mt-5"
                                                                    onClick={() => deleteModule(index)}
                                                                >
                                                                    <i class="feather-minus"></i>
                                                                </button>
                                                            </div>
                                                        </div>

                                                    ))}
                                                    <button
                                                        type="button"
                                                        className="btn bg-current mt-2 text-white"
                                                        onClick={addModule}
                                                    >
                                                        Add Module
                                                    </button>
                                                </div>


                                            </div>
                                            <div className="col-lg-12">
                                                <button type="submit" className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0 float-right">Submit</button>
                                            </div>

                                        </form>

                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                <AppFooter />
            </div>
        </>
    )
}

export default CreateEbook
