import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
import { useParams, Link, useNavigate } from "react-router-dom";

function AllChapters() {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { subject_id } = useParams();
  const goBack = () => {
    navigate(-1); // Use navigate(-1) to go back
  };
  useEffect(() => {
    if (subject_id) {
      getChapters(subject_id);
    }
  }, [subject_id]); // Only re-run the effect if subject_id changes

  const [chapters, setChapters] = useState([]);

  function getChapters(subject_id) {
    fetch(`${baseUrl}api/get_chapters/${subject_id}`)
      .then((response) => response.json())
      .then((data) => {
        console.warn(data);
        setChapters(data);
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
                    <h2 className="fw-400 font-lg d-block">
                      All <b> Chapters</b>{" "}
                    </h2>
                  </div>
                  <div className="float-right">
                    <button
                      onClick={goBack}
                      className="p-2  d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current mx-1"
                    >
                      Back
                    </button>
                  </div>
                </div>
                {chapters && chapters.length > 0 ? (
                  chapters.map((chapter, index) => (
                    <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                      <div className="card mb-4 shadow-xss rounded-lg border-0 p-4 text-center">
                        <h4 className="fw-700 font-xs mt-4">
                          {chapter.chapter_name}
                        </h4>
                        {/* You can add additional chapter details here */}
                        <div className="card-body">
                          {/* Other contents like description, number of videos, etc. */}
                        </div>
                        <div className="card-footer bg-transparent border-top-0">
                          <Link
                            to={`/all_videos/${chapter.id}`}
                            className="p-2 mt-4  d-inline-block text-white fw-700 lh-30 rounded-lg w100 text-center font-xsssss ls-3 bg-current"
                          >
                            View Videos
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <h2 className="fw-400 font-lg d-block text-center">
                    Loading chapters...
                  </h2>
                )}
              </div>
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    </>
  );
}

export default AllChapters;
