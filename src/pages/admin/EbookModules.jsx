import React, { useState, useEffect } from 'react';
import AppHeader from '../../components/includes/AppHeader';
import AppFooter from '../../components/includes/AppFooter';
import { Link, useParams } from 'react-router-dom';
import { Accordion } from "react-bootstrap";
import "../../css/custom.css";

function EbookModules() {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const { ebook_id } = useParams();

    useEffect(() => {
        getEbookModules();
    }, [])

    const [ebookModules, setEbookModules] = useState([]);
    function getEbookModules() {
        let result = fetch(baseUrl + 'api/get_ebook_modules/' + ebook_id).then(function (result) {
            result.json().then(function (jsonbody) {
                console.warn(jsonbody);
                setEbookModules(jsonbody.ebook_modules);
            })
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
                                <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                                    <div>
                                        <h2 className="fw-400 font-lg d-block">Ebook <b> Modules</b> </h2>
                                    </div>

                                </div>

                                <div className="col-lg-12">
                                    
                                    <Accordion
                                        defaultActiveKey="0"
                                        className="accordian mb-0 accordian-course"
                                    >
                                        {ebookModules ? (
                                            ebookModules &&
                                            ebookModules.map(
                                                (module, index) => (
                                                    <Accordion.Item
                                                        key={index}
                                                        eventKey={index}
                                                        className="accordion-item border-0 mb-0 shadow-xss rounded-sm bg-white"
                                                    >
                                                        <Accordion.Header>
                                                            {module.module_title}
                                                            <Link to={"/ebooks/add_sections/"+module.id} className="p-2 text-white fw-700 rounded-lg text-center font-xsssss bg-current float-right ml-5"><i className="feather-edit"></i></Link>
                                                            
                                                        </Accordion.Header>
                                                        <Accordion.Body className="py-0">
                                                            {
                                                                module.ebook_sections ? (
                                                                    module.ebook_sections.map((section, i) => (
                                                                        <div key={i}>
                                                                            <div className="d-flex justify-content-between" >
                                                                                <h5 className="font-xss fw-500 text-dark-500 ml-2">{section.section_title}</h5>
                                                                                <Link to={"/ebooks/add_elements/"+section.id} className="p-2 text-white fw-700 rounded-lg text-center font-xsssss bg-current float-right mr-3"><i className="feather-edit"></i></Link>
                                                                            </div>
                                                                            <hr className='mb-2'/>
                                                                        </div>
                                                                    ))
                                                                )
                                                                    :
                                                                    <h2 className="fw-400 font-lg d-block">Loading ... </h2>

                                                            }

                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                )
                                            )
                                        ) : (
                                            <Accordion.Item
                                                eventKey="0"
                                                className="accordion-item border-0 mb-0 shadow-xss rounded-sm bg-white"
                                            ></Accordion.Item>
                                        )}
                                    </Accordion>
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

export default EbookModules
