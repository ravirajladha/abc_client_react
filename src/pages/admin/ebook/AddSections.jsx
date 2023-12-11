import React, { useState, useEffect } from 'react';
import AppHeader from '../../../components/includes/AppHeader';
import AppFooter from '../../../components/includes/AppFooter';
import { useParams } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackButton from '../../../components/navigation/BackButton';


function AddSections() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const { module_id } = useParams();

    const [sectionTitles, setSectionTitles] = useState([""]); // Array to store video names

    const addSection = () => {
        setSectionTitles([...sectionTitles, ""]);
    };

    const deleteSection = (index) => {
        const updatedSectionTitles = [...sectionTitles];
        updatedSectionTitles.splice(index, 1);
        setSectionTitles(updatedSectionTitles);
    };
    useEffect(() => {
        getEbookModule();
    }, [])

    const [ebookModule, setEbookModule] = useState([]);
    function getEbookModule() {
        let result = fetch(baseUrl + 'api/get_module_by_id/'+module_id).then(function (result) {
            result.json().then(function (jsonbody) {
                //console.warn(jsonbody);
                setEbookModule(jsonbody);
            })
        });
    }
    const addSections = (e) => {

        const formData = new FormData();
        formData.append('ebook_id', ebookModule.ebook.id);
        formData.append('module_id', ebookModule.id);
        formData.append('section_titles', JSON.stringify(sectionTitles));
        e.preventDefault();

        fetch(baseUrl + "api/add_section", {
            method: 'POST',
            body: formData
        })
            .then((res) => res.json())
            .then((resp) => {
                setSectionTitles([""]);
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
                                        <h2 className="fw-400 font-lg d-block">Add <b> Sections</b> </h2>
                                        <div className="float-right">
                                            <BackButton/>
                                        </div>
                                    </div>
                                    <ToastContainer autoClose={3000} />
                                    <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                                        <form encType="multipart/form-data" onSubmit={addSections}>

                                            <div className="row mb-6">
                                                <div className="col-lg-6">
                                                    <div className="">
                                                        <label className="mont-font fw-600 font-xsss">Ebook title</label><br />
                                                        <input type="text" className="form-control" placeholder="Enter Ebook title" value={ebookModule.ebook && ebookModule.ebook.title} readOnly/>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="">
                                                        <label className="mont-font fw-600 font-xsss">Module title</label><br />
                                                        <input type="text" className="form-control" placeholder="Enter Ebook title" value={ebookModule && ebookModule.module_title} readOnly/>
                                                    </div>
                                                </div>
                                               
                                                <div className="col-lg-12 my-4">
                                                    <h2 className="fw-400 font-xs d-block">Add <b> Sections</b> </h2>
                                                </div>
                                                <div className="col-lg-12">
                                                    {sectionTitles.map((title, index) => (
                                                        <div className="row" key={index}>
                                                            <div className="col-lg-4">
                                                                <label className="mont-font fw-600 font-xsss">Section Title</label><br />

                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter Section Title"
                                                                    value={title}
                                                                    onChange={(e) => {
                                                                        const updatedSectionTitles = [...sectionTitles];
                                                                        updatedSectionTitles[index] = e.target.value;
                                                                        setSectionTitles(updatedSectionTitles);
                                                                    }}
                                                                    required
                                                                />

                                                            </div>
                                                            
                                                            <div className="col-lg-2">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-danger ml-2 mt-5"
                                                                    onClick={() => deleteSection(index)}
                                                                    style={{
                                                                        backgroundColor: "red",
                                                                        color: "white",
                                                                      }}
                                                                >
                                                                    <i class="feather-minus"></i>
                                                                </button>
                                                            </div>
                                                        </div>

                                                    ))}
                                                    <button
                                                        type="button"
                                                        className="btn bg-current mt-2 text-white"
                                                        onClick={addSection}
                                                    >
                                                        Add Section
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

export default AddSections
