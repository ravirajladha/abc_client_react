import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import BackButton from "../../components/navigation/BackButton";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
import Loader from "../../components/common/Loader";
import NoContent from "../../components/common/NoContent";

function AllChapters() {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { subject_id } = useParams();
  const goBack = () => {
    navigate(-1); // Use navigate(-1) to go back
  };

  const [chapters, setChapters] = useState([]);
  const [classId, setClassId] = useState(null);
  const [loading, setLoading] = useState(true);

  function getChapters(subject_id) {
    fetch(`${baseUrl}api/get_chapters/${subject_id}`)
      .then((response) => response.json())
      .then((data) => {
        console.warn("chapters", data);
        setChapters(data);
        setLoading(false);
      });
  }

  function getUniqueClassFromSubject(subject_id) {
    fetch(`${baseUrl}api/getUniqueClassFromSubject/${subject_id}`)
      .then((response) => response.json())
      .then((data) => {
        console.warn("chapters", data);
        setClassId(data.class_id);
        console.log("class", data.class_id);
      });
  }

  useEffect(() => {
    if (subject_id) {
      getUniqueClassFromSubject(subject_id);
      getChapters(subject_id);
    }
  }, [subject_id]);
  return (
    <>
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
                <Link
                  to={`/all_subjects/create_chapters/${classId}/${subject_id}`}
                  className="p-2 px-3 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current"
                >
                  ADD CHAPTERS
                </Link>
                <BackButton />
              </div>
            </div>
            {loading ? (
              <Loader />
            ) : chapters && chapters.length > 0 ? (
              chapters.map((chapter, index) => (
                <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                  <div className="card mb-4 shadow-xss rounded-lg border-0 p-4 text-center">
                    <Link
                      to={`/subject/${subject_id}/chapter/${chapter.id}/edit`}
                      className="position-absolute right-0 mr-4 top-0 mt-2"
                    >
                      <i className="ti-pencil-alt text-grey-500 font-xsss"></i>
                    </Link>
                    <h4 className="fw-700 font-xs mt-4">
                      {chapter.chapter_name}
                    </h4>
                    {/* You can add additional chapter details here */}
                    {/* <div className="card-body"> */}
                    {/* Other contents like description, number of videos, etc. */}
                    {/* </div> */}
                    <div className="card-footer bg-transparent border-top-0">
                    <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-success d-inline-block text-success mb-1 mr-1">
                        Video Count
                      </span>
                      <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-info d-inline-block text-info mb-1">
                        {chapter.video_count}
                      </span>
                    </div>
                    <div className="card-footer bg-transparent border-top-0">
                    
                      <Link
                        to={`/all_classes/all_subjects/all_chapters/all_videos/${chapter.id}`}
                        className="p-2 d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current"
                      >
                        View Contents
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <NoContent contentName="chapters"/>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AllChapters;
