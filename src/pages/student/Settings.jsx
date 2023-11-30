import React, { useState, useEffect } from 'react';
import AppFooter from '../../components/includes/AppFooter';
import AppHeader from '../../components/includes/AppHeader';
import StudentSidebar from '../../components/includes/StudentSidebar';
import BackButton from '../../components/navigation/BackButton';


import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { AuthContext } from "../../lib/AuthContext.js"
function Settings() {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const user = useContext(AuthContext).user;


    const [parentCode, setParentCode] = useState("");
    const [formData, setFormData] = useState({
        // Initialize with empty strings to handle the case when user is null
        name: '',
        email: '',
        password: ''
    });
    const connectParent = (e) => {
        let inputobj = {
            "parentCode": parentCode,
            "userId": userId
        };

        e.preventDefault();

        if (validateParent()) {
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

    const validateParent = () => {
        let result = true;

        if (parentCode === '' || parentCode === null) {
            result = false;
            toast.warning('Please Enter Parent Code');
        }

        return result;
    }

    const [parentData, setParentData] = useState(null);
    // Call hooks at the top level
    useEffect(() => {
        if (user) {
            // Update formData state when user is available
            setFormData({
                name: user.user.name,
                email: user.user.email,
                password: ''
            });
            // Load parent data if a parent_id exists
            if (user.user.parent_id) {
                getParent(user.user.parent_id);
            }
        }
    }, [user]); // Depend on user

    const getParent = () => {
        if (user.user.parent_id) {
            fetch(baseUrl + "api/get_parent/" + user.user.parent_id, {
                method: 'GET',
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json"
                },
                // body: JSON.stringify(inputobj)
            }).then((res) => {
                return res.json();
            }).then((resp) => {
                // console.log(resp);
                // parentData = resp
                setParentData(resp);
            }).catch((err) => {
                toast.error('Could not submit Form :' + err.message);
            });
        }
    }



    const handleUserInputChange = (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
        });

        fetch(baseUrl + "api/update_student", {
            method: "POST",
            body: formDataToSend,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("User updated successfully", data);
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error updating student:", error);
            });
    };

    const formSubmit = (e) => {
        e.preventDefault();

        console.log(formData);
    };


    if (!user) {
        // Handle the case when there is no user. You might want to redirect
        // to a login page or return null or some placeholder content.
        console.log("No user found. User might be logged out.");
        return <div>User is not logged in</div>;
    }
    const userId = user.user.id;
    return (
        <>
            <div className="main-wrapper">

                <div className="main-content menu-active">
                    <AppHeader />

                    <div className="middle-sidebar-bottom theme-dark-bg bg-lightblue">
                        <div className="middle-sidebar-left">
                            <div className="row">
                                <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                                    <div>
                                        <h2 className="fw-400 font-lg d-block">  <b> Settings</b> </h2>
                                    </div>
                                    <div className="float-right">
                                        <BackButton />
                                    </div>
                                </div>
                                <ToastContainer autoClose={3000} />
                                <div className="col-lg-6">
                                    <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                        <div className="card-body p-4 w-100 border-0 rounded-lg">
                                            <h2 className="fw-300 font-400 d-block">Update <b> Password</b> </h2>
                                            <form
                                                onSubmit={formSubmit}
                                                method="post"
                                                encType="multipart/form-data">
                                                <div className="row">

                                                    <div className="col-lg-12">
                                                        <div className="form-group">
                                                            <label className="mont-font fw-600 font-xsss">Name</label>
                                                            <input type="text" className="form-control" placeholder="Enter Name"
                                                                name="name"
                                                                value={formData.name}
                                                                onChange={handleUserInputChange}
                                                                required />
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
                        <StudentSidebar />
                    </div>
                </div>

                <AppFooter />
            </div>
        </>
    )
}

export default Settings
