import React,{Component} from 'react';
import { Link  } from 'react-router-dom';

    function Appfooter() {
        return (
            <div className="app-footer border-0 shadow-lg">
                <Link to="/default" className="nav-content-bttn nav-center"><i className="feather-home"></i></Link>
                <Link to="/default-follower" className="nav-content-bttn"><i className="feather-package"></i></Link>
                <Link to="/default-live-stream" className="nav-content-bttn" data-tab="chats"><i className="feather-layout"></i></Link>            
                <Link to="/" className="nav-content-bttn sidebar-layer"><i className="feather-layers"></i></Link>
                <Link to="/default-settings" className="nav-content-bttn"><img src="assets/images/female-profile.png" alt="user" className="w30 shadow-xss" /></Link>
            </div>
        );
    }


export default Appfooter;