import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { saveUserToSessionStorage, getUserFromSessionStorage } from './util/SessionStorage'

function Login() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const usenavigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    if (validate()) {
      let inputobj = {
        "email": email,
        "password": password
      };

      fetch(baseUrl + "api/login", {
        method: 'POST',
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(inputobj)
      }).then((res) => {
        return res.json();
      }).then((resp) => {
        // console.log(resp)
        // if (Object.keys(resp).length === 1) {
        //     toast.error(resp.msg);
        // } else {
        //         toast.success('Success');
        //         saveUserToSessionStorage(resp);
        //         const user = getUserFromSessionStorage();
        //         console.log(user);
        //         if(user.user.type === 'admin'){
        //           console.log(122); 
        //           usenavigate('/schools');
        //         }else{
        //           usenavigate('/home')
        //         }
        // }
        toast.success('Success');
        saveUserToSessionStorage(resp);
        const user = getUserFromSessionStorage();
        console.log(user);
        if (user.user.type === 'admin') {
          // console.log(122);
          usenavigate('/admin');
        }else if(user.user.type === 'teacher'){
          usenavigate('/teacher');
        }else if(user.user.type === 'sub_admin'){
          usenavigate('/school');
        } else if(user.user.type === 'parent'){
          usenavigate('/parent');
        } else {
          usenavigate('/home')
        }
      }).catch((err) => {
        toast.error('Login Failed due to :' + err.message);
      });
    }
  }
  const validate = () => {
    let result = true;
    if (email === '' || email === null) {
      result = false;
      toast.warning('Please Enter Eamil/userid');
    }
    if (password === '' || password === null) {
      result = false;
      toast.warning('Please Enter Password');
    }
    return result;
  }
  return (
    <>
      <div className="main-wrap">
        <div className="row">
          <div
            className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
            style={{
              backgroundImage: `url("https://img.freepik.com/free-photo/handsome-young-indian-student-man-holding-notebooks-while-standing-street_231208-2771.jpg?w=740&t=st=1680715615~exp=1680716215~hmac=45298129d97bba1e98a1ea8c5192b03a14d4ee345a47bffe6f190f0763be3cb2")`,
            }}
          ></div>

          <div className="col-xl-7 vh-lg-100 align-items-center d-flex bg-white rounded-lg overflow-hidden">
            <div className="card shadow-none border-0 ml-auto mr-auto login-card">
              <div className="card-body rounded-0 text-left">
                <img
                  src="assets/images/abc_logo.png"
                  alt="logo"
                  className="" width={100}
                /><br />
                <h2 className="fw-700 display1-size display2-md-size mb-3">
                  Login into <br />
                  your account
                </h2>
                <form onSubmit={login}>
                  <ToastContainer autoClose={3000} />
                  <div className="form-group icon-input mb-3">
                    <i className="font-sm ti-email text-grey-500 pr-0"></i>
                    <input
                      type="text"
                      className="style2-input pl-5 form-control text-grey-900 font-xssss fw-600"
                      placeholder="Email Address"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group icon-input mb-1">
                    <input
                      type="Password"
                      className="style2-input pl-5 form-control text-grey-900 font-xssss ls-3"
                      placeholder="Password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                    <i className="font-sm ti-lock text-grey-500 pr-0"></i>
                  </div>
                  <div className="form-check text-left mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input mt-2"
                      id="exampleCheck1"
                    />
                    <label
                      className="form-check-label font-xssss text-grey-500"
                      htmlFor="exampleCheck1"
                    >
                      Remember me
                    </label>
                    <a
                      href="/forgot"
                      className="fw-600 font-xssss text-grey-700 mt-1 float-right"
                    >
                      Forgot your Password?
                    </a>
                  </div>
                  <button type="submit" className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 ">Login</button>
                </form>

                <div className="col-sm-12 p-0 text-left">

                  <h6 className="text-grey-500 font-xssss fw-500 mt-0 mb-0 lh-32">
                    Dont have account{' '}
                    <a href="/register" className="fw-700 ml-1">
                      Register
                    </a>
                  </h6>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default Login;
