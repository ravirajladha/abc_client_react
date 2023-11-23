import React,{Component} from 'react';

    function Subscribe() {
        return (
            <div className="card overflow-hidden subscribe-widget p-3 mb-3 rounded-xxl border-0">
                <div className="card-body d-block text-left">
                    <h1 className="text-grey-800 font-xl fw-900 mb-4 lh-3">Sign up for our newsletter</h1>
                    <form action="#" className="mt-3">
                        <div className="form-group icon-input">
                            <i className="ti-email text-grey-500 font-sm"></i>
                            <input type="text" className="form-control mb-2 bg-greylight border-0 style1-input pl-5" placeholder="Enail address" />
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="blankCheckbox" defaultValue="option1" />
                            <label className="text-grey-500 font-xssss" htmlFor="blankCheckbox">By checking this box, you confirm that you have read and are agreeing to our terms of use regarding.</label>
                        </div>
                    </form>
                    <ul className="d-flex align-items-center justify-content-between mt-3">
                        <li><a href="/" className="btn-round-md bg-facebook"><i className="font-xs ti-facebook text-white"></i></a></li>
                        <li><a href="/" className="btn-round-md bg-twiiter"><i className="font-xs ti-twitter-alt text-white"></i></a></li>
                        <li><a href="/" className="btn-round-md bg-linkedin"><i className="font-xs ti-linkedin text-white"></i></a></li>
                        <li><a href="/" className="btn-round-md bg-instagram"><i className="font-xs ti-instagram text-white"></i></a></li>
                        <li><a href="/" className="btn-round-md bg-pinterest"><i className="font-xs ti-pinterest text-white"></i></a></li>
                    </ul>
                </div>
            </div>
        );
    }


export default Subscribe;