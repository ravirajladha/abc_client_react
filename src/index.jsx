import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";

import "./App.css";
import "./main.scss";
import { adminRoutes } from './routes/adminRoutes.js';
import { teacherRoutes } from './routes/teacherRoutes.js';
import {  schoolRoutes} from './routes/schoolRoutes.js';
import { studentRoutes } from './routes/studentRoutes.js';
import { parentRoutes } from './routes/parentRoutes.js';
// Common Layout
import Login from "./pages/common/Login.jsx";
import Register from "./pages/common/Register.jsx";
import Notfound from "./pages/common/Notfound.jsx";
import MainLayout from "./MainLayout.jsx";

import { HashRouter, Route, Routes } from "react-router-dom";
import * as serviceWorker from "./serviceWorker.js";
import AuthProvider from "./lib/AuthContext.js";
class Root extends Component {
  render() {
   
      return (
        <HashRouter basename={"/"}>
          <AuthProvider>
            <MainLayout>
              <Routes>
                <Route exact path={`${process.env.PUBLIC_URL}/register`} element={<Register />} />
                <Route path="*" element={<Notfound />} />
                <Route exact path={`${process.env.PUBLIC_URL}/`} element={<Login />} />
                {adminRoutes}
                {studentRoutes}
                {schoolRoutes}
                {teacherRoutes}
                {parentRoutes}
              </Routes>
            </MainLayout>
          </AuthProvider>
        </HashRouter>
      );
    }
  }

ReactDOM.render(<Root />, document.getElementById("root"));
serviceWorker.register();
