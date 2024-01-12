import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
import BackButton from "../../components/navigation/BackButton";
import Loader from "../../components/common/Loader";
import NoContent from "../../components/common/NoContent.jsx";

function AllSubjects() {
  const { class_id } = useParams();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [isLoading, setIsLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);

  function getSubjects(class_id) {
    let result = fetch(
      baseUrl + "api/admin/get_subjects_and_video_count_by_class/" + class_id
    ).then(function (result) {
      result.json().then(function (jsonbody) {
        //console.warn(jsonbody);
        setSubjects(jsonbody);
        setIsLoading(false);
      });
    });
  }

  useEffect(() => {
    if (class_id) {
      getSubjects(class_id);
    }
  }, [class_id]);

  return (
    <>
      {/* <div className="main-wrapper">
        <div className="main-content menu-active">
          <AppHeader /> */}

      <div className="middle-sidebar-bottom theme-dark-bg">
        <div className="middle-sidebar-left">
          <div className="row">
            <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
              <div>
                <h2 className="fw-400 font-lg d-block">
                  All <b>Subjects</b>
                </h2>
              </div>
              <div className="float-right">
                <Link
                  to={`/all_subjects/create_subject/${class_id}`}
                  className="p-2 px-3 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current mr-3"
                >
                  ADD SUBJECT
                </Link>
                <BackButton />
              </div>
            </div>
            {isLoading ? (
              <Loader />
            ) : subjects && subjects.length > 0 ? (
              subjects.map((subject, index) => (
                <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                  <div className="card mb-4 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                    <Link
                      to={`/class/${class_id}/subject/${subject.subject_id}/edit`}
                      className="position-absolute right-0 mr-4 top-0 mt-2"
                    >
                      <i className="ti-pencil-alt text-grey-500 font-xsss"></i>
                    </Link>
                    <Link
                      to={`/subject/${subject.subject_id}`}
                      className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto"
                    >
                      <img
                        src={baseUrl + subject.subject_image}
                        alt="subject"
                        className="p-1 font-xsssss"
                      />
                    </Link>
                    <h4 className="fw-700 font-xs mt-4">
                      {subject.subject_name}
                    </h4>
                    <div className="card-footer bg-transparent border-top-0">
                      <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-success d-inline-block text-success mb-1 mr-1">
                        Chapter Count
                      </span>
                      <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-info d-inline-block text-info mb-1">
                        {subject.chapter_count}
                      </span>
                    </div>
                    <div className="card-footer bg-transparent border-top-0 d-flex align-items-center justify-content-center gap-2">
                      <Link
                        to={`/all_classes/all_subjects/all_chapters/${subject.subject_id}`}
                        className="px-1 py-2 d-inline-block text-white fw-700 lh-30 rounded-lg w100 text-center font-xsssss ls-3 bg-current"
                      >
                        Chapters
                      </Link>
                      <Link
                        to={`/all_classes/results/${subject.subject_id}`}
                        className="px-1 py-2 d-inline-block text-white fw-700 lh-30 rounded-lg w100 text-center font-xsssss ls-3 bg-current"
                      >
                        Results
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <NoContent contentName="subjects" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AllSubjects;
