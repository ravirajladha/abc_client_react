import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";

function AllVideos() {
  const navigate = useNavigate();
  const { chapter_id } = useParams();
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const goBack = () => {
    navigate(-1); // Use navigate(-1) to go back
  };
  useEffect(() => {
    if (chapter_id) {
      getVideos(chapter_id);
    }
  }, [chapter_id]);

  function getVideos(chapterId) {
    setIsLoading(true);
    fetch(`${baseUrl}api/get_videos/${chapterId}`)
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
        setIsLoading(false);
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
                      All <b> Videos</b>{" "}
                    </h2>
                  </div>
                  <div className="float-right">
                    <button
                      onClick={goBack}
                      className="p-2  d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current mx-1"
                    >
                      Back
                    </button>
                    {/* <Link
                      to={"/all_subjects/create_subject"}
                      className="p-2  d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current mx-1"
                    >
                      GO BACK
                    </Link> */}
                  </div>
                </div>

                {isLoading ? (
                  <h2 className="fw-400 font-lg d-block text-center">Loading videos...</h2>
                  ) : videos.length > 0 ? (
                  videos.map((video, index) => (
                    <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                      <div className="card mb-4 shadow-xss rounded-lg border-0 p-4 text-center">
                        <Link
                          to=""
                          className="position-absolute right-0 mr-4 top-0 mt-3"
                        >
                          <i className="ti-more text-grey-500 font-xs"></i>
                        </Link>
                        {/* <a
                          href="#"
                          className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto"
                        > */}
                        <video width="100%" height="auto" controls>
                          <source
                            src={baseUrl + video.video_file}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                        {/* </a> */}
                        <h4 className="fw-700 font-xs mt-4">
                          {video.video_name}
                        </h4>
                        {/* You can add additional chapter details here */}
                        <div className="card-body">
                          {/* Other contents like description, number of videos, etc. */}
                        </div>
                     
                      </div>
                    </div>
                  ))
                  ) : (
                    // If data is loaded and there are no videos, display a message saying so
                    <h2 className="fw-400 font-lg d-block text-center">No videos</h2>
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

export default AllVideos;
