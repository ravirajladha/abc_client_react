import React, { useState, useEffect } from "react";
import { AuthContext } from "../../lib/AuthContext.js";
import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import BackButton from "../../components/navigation/BackButton";
import Loader from "../../components/common/Loader.jsx";
import NoContent from "../../components/common/NoContent.jsx";

function AllChaptersAssessment() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { subject_id } = useParams();
  const user = useContext(AuthContext).user;

  useEffect(() => {
    if (subject_id) {
      getUniqueClassFromSubject(subject_id);
      getChapters(subject_id);
    }
  }, [subject_id]);

  const [chapters, setChapters] = useState([]);
  const [classId, setClassId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function getChapters(subject_id) {
    fetch(`${baseUrl}api/get_chapters/${subject_id}`)
      .then((response) => response.json())
      .then((data) => {
        console.warn("chapters", data);
        setChapters(data);
        setIsLoading(false);
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
                <BackButton />
              </div>
            </div>
            {isLoading ? (
              <Loader />
            ) : chapters && chapters.length > 0 ? (
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
                        to={
                          user.user.type === "admin"
                            ? `/assessments/results/all_assessment_result_video_wise/${chapter.id}`
                            : user.user.type === "sub_admin"
                            ? `/school/results/all_assessment_result_video_wise/${chapter.id}`
                            : `/teachers/all_classes/all_assessment_result_video_wise/${chapter.id}`
                        }
                        className="p-2 mt-4 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current"
                      >
                        View Assessment
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <NoContent contentName="chapters" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AllChaptersAssessment;
