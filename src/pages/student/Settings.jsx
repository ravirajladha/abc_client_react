import React, { useState, useEffect } from 'react';
import Appfooter from '../../components/Appfooter';
import Navheader from '../../components/Navheader';
import Appheader from '../../components/Appheader';
import Profile from '../../components/Profile';
import Myclass from '../../components/Myclass';
import Subscribe from '../../components/Subscribe';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Settings() {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const userString = sessionStorage.getItem("rexkod_user");
    const user = JSON.parse(userString);
    const userId = user.user.id;

    const [parentCode, setParentCode] = useState("");
    
    const connectParent = (e) => {
        let inputobj = {
            "parentCode": parentCode,
            "userId": userId
        };

        e.preventDefault();

        if (validate()) {
            fetch(baseUrl + "api/connect_parent", {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(inputobj)
            }).then((res) => {
                return res.json();
            }).then((resp) => {
                console.log(resp.parent);
                setParentData(resp.parent);
                toast.success(resp.msg);
            }).catch((err) => {
                toast.error('Could not submit Form :' + err.message);
            });
        }
    }
    const validate = () => {
        let result = true;

        if (parentCode === '' || parentCode === null) {
            result = false;
            toast.warning('Please Enter Parent Code');
        }

        return result;
    }

    const [parentData, setParentData] = useState(null);
// const getParent = () =>{
    if(user.user.parent_id){
        fetch(baseUrl + "api/get_parent/"+user.user.parent_id, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            // body: JSON.stringify(inputobj)
        }).then((res) => {
            return res.json();
        }).then((resp) => {
            console.log(resp);
            // parentData = resp
            setParentData(resp);
        }).catch((err) => {
            toast.error('Could not submit Form :' + err.message);
        });
    }
// }
    // useEffect(() => {
    //     getParent();
    // }, [])
    return (
        <>
            <div className="main-wrapper">

                <div className="main-content menu-active">
                    <Appheader />

                    <div className="middle-sidebar-bottom theme-dark-bg bg-lightblue">
                        <div className="middle-sidebar-left">
                            <div className="row">
                            <ToastContainer autoClose={3000} />
                                <div className="col-lg-6">
                                    <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                        <div className="card-body p-4 w-100 border-0 rounded-lg">
                                            <h2 className="fw-300 font-400 d-block">Update <b> Password</b> </h2>
                                            <form >
                                                <div className="row">

                                                    <div className="col-lg-12">
                                                        <div className="form-group">
                                                            <label className="mont-font fw-600 font-xsss">Name</label>
                                                            <input type="text" className="form-control" placeholder="Enter Name" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="form-group">
                                                            <label className="mont-font fw-600 font-xsss">Email</label>
                                                            <input type="text" className="form-control" placeholder="Enter Email" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="form-group">
                                                            <label className="mont-font fw-600 font-xsss">Password</label>
                                                            <input type="password" className="form-control" placeholder="Enter Password" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <button type="submit" className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0">Submit</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">

                                        <div className="card-body p-lg-5 p-4 w-100 border-0">
                                            <h2 className="fw-400 font-lg d-block">Connect <b> Parent</b> </h2>
                                            {
                                                parentData ?
                                                <div>
                                                <h3>Parent Name:{parentData.name}</h3>
                                                <h3>Parent Code:{parentData.parent_code}</h3>
                                                </div>
                                                :
                                                <form onSubmit={connectParent}>
                                                <div className="row">

                                                    <div className="col-lg-12">
                                                        <div className="form-group">
                                                            <label className="mont-font fw-600 font-xsss">Unique Parent Code</label>
                                                            <input type="text" className="form-control" placeholder="Enter Unique Parent id"
                                                            value={parentCode}
                                                            onChange={e => setParentCode(e.target.value)}
                                                             />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <button type="submit" className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0">Submit</button>
                                                    </div>

                                                </div>
                                            </form>
                                            }
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="middle-sidebar-right scroll-bar">
                            <div className="middle-sidebar-right-content">
                                <Profile />
                                <Myclass />
                                <Subscribe />
                            </div>
                        </div>
                    </div>
                </div>

                <Appfooter />
            </div>
        </>
    )
}

export default Settings
