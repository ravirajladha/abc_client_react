import React, { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../../lib/AuthContext.js";
import { Link } from "react-router-dom";
import BackButton from "../../components/navigation/BackButton";
import Loader from "../../components/common/Loader.jsx";
import NoContent from "../../components/common/NoContent.jsx";

function About() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const embedUrl1 = "https://www.youtube.com/watch?v=QLpy9pNZsrU";
  const embedUrl2 = "https://www.youtube.com/watch?v=ZQA4EPphnb0";
  const embedUrl3 = "https://www.youtube.com/watch?v=1bbFtobb2QQ";
  return (
    <>
      <div className="middle-sidebar-bottom">
        <div className="middle-sidebar-left">
          <div className="row">
            <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
              <div>
                <h2 className="fw-400 font-lg d-block">
                  <b> Agasthya Vidyanikethan</b>
                </h2>
              </div>
              <div className="float-right">
                <BackButton />
              </div>
            </div>
            <div className="col-lg-6 mx-auto">
              <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                <video width="100%" height="auto" controls>
                <source src={`${process.env.PUBLIC_URL}/assets/images/about.mp4`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
          <div className="row">
            <h2 className="fw-400 font-xs d-block text-center mt-5" style={{textDecoration:"underline"}}>
              <b> Agasthyotsava 2023</b>
            </h2>
            <div className="col-lg-4 mx-auto">
              <div className="card-body p-lg-5 p-4 w-100 border-0 ">
              <iframe width="360" height="215" src="https://www.youtube.com/embed/QLpy9pNZsrU?si=DMRUOhiaNznGXbMw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen className="mx-auto"></iframe>
              </div>
            </div>
            <div className="col-lg-4 mx-auto">
              <div className="card-body p-lg-5 p-4 w-100 border-0 ">
              <iframe width="360" height="215" src="https://www.youtube.com/embed/ZQA4EPphnb0?si=VOvCAhvr7LOi8vNJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen className="mx-auto"></iframe>
              </div>
            </div>
            <div className="col-lg-4 mx-auto">
              <div className="card-body p-lg-5 p-4 w-100 border-0 ">
              <iframe width="360" height="215" src="https://www.youtube.com/embed/1bbFtobb2QQ?si=18F5kltjPLcaA4nF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen className="mx-auto"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
