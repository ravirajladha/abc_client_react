import React, { useState, useEffect } from 'react';
import AppHeader from '../../../components/includes/AppHeader';
import AppFooter from '../../../components/includes/AppFooter';
import { Link } from 'react-router-dom';

function Ebooks() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    useEffect(() => {
        getEbooks();
    }, [])

    const [ebooks, setEbooks] = useState([]);
    function getEbooks() {
        let result = fetch(baseUrl + 'api/get_ebooks').then(function (result) {
            result.json().then(function (jsonbody) {
                console.warn(jsonbody);
                setEbooks(jsonbody.ebooks);
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
                                        <h2 className="fw-400 font-lg d-block">All <b> Ebooks</b> </h2>
                                    </div>
                                    <div className="float-right">
                                        <Link to={'/ebooks/create_ebook'} className="p-2  d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current mx-1">CREATE EBOOK</Link>

                                    </div>
                                </div>
                                {
                                    ebooks ? (
                                        ebooks && ebooks.map((ebook, index) => (
                                            <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                                                <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                                                    <a href="#" className="position-absolute right-0 mr-4 top-0 mt-3"><i className="ti-more text-grey-500 font-xs"></i></a>
                                                    <a href="#" className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto">
                                                        <img src={baseUrl + ebook.image} alt="icon" className="p-1" style={{ width: 50, height: 50 }} />
                                                    </a>
                                                    <h4 className="fw-700 font-xs mt-4">{ebook.title}</h4>

                                                    <div className="text-center">
                                                        <Link to={"/ebooks/preview_ebook/"+ebook.id}
                                                            className="p-2 mt-4 d-inline-block text-white fw-700 lh-30 rounded-lg w100 text-center font-xsssss ls-3 bg-current mx-1">VIEW</Link>
                                                        <Link to={"/ebooks/ebook_modules/"+ebook.id}
                                                            className="p-2 mt-4 d-inline-block text-white fw-700 lh-30 rounded-lg w100 text-center font-xsssss ls-3 bg-current mx-1">EDIT</Link>
                                                    </div>

                                                </div>
                                            </div>
                                        ))
                                    )
                                        :
                                        <h2 className="fw-400 font-lg d-block">Loading ... </h2>

                                }

                            </div>

                        </div>
                    </div>
                </div>
                <AppFooter />
            </div>
        </>
    )
}

export default Ebooks
