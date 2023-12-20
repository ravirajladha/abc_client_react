import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
import BackButton from "../../components/navigation/BackButton";
import DynamicLink from "../../components/navigation/DynamicLink";
import Loader from "../../components/common/Loader.jsx";
import NoContent from "../../components/common/NoContent.jsx";

function AllVideos() {
  const navigate = useNavigate();
  const { chapter_id } = useParams();
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [classId, setClassId] = useState(null); // State variable for class_id
  const [subjectId, setSubjectId] = useState(null); // State variable for subject_id
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    if (chapter_id) {
      getVideos(chapter_id);
      getUniqueClassAndSubjectFromChapter(chapter_id); // Fetch class and subject when component mounts
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
  function getUniqueClassAndSubjectFromChapter(chapterId) {
    fetch(`${baseUrl}api/getUniqueClassAndSubjectFromChapter/${chapterId}`)
      .then((response) => response.json())
      .then((data) => {
        setClassId(data.class_id); // Set the class_id from the fetched data
        setSubjectId(data.subject_id); // Set the subject_id from the fetched data
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching class and subject:", error);
        setIsLoading(false);
      });
  }

  function generateId(sectionTitle) {
    if (sectionTitle) {
      const title = sectionTitle.replace(/[^a-zA-Z0-9\s]/g, "");
      const sectionId = title.toLowerCase().replace(/\s+/g, "-");
      return sectionId;
    }
  }

  console.log(videos);

  return (
    <>
      <div className="middle-sidebar-bottom theme-dark-bg">
        <div className="middle-sidebar-left">
          <div className="row">
            <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
              <div>
                <h2 className="fw-400 font-lg d-block">
                  All <b> Contents</b>{" "}
                </h2>
              </div>
              <div className="float-right">
                {/* <Link
          to={`/all_subjects/${classId}/${subjectId}/${chapter_id}/create_videos`} // Updated path with classId and subjectId
          className="px-3 py-1  d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current mx-1"
        >
                      ADD CONTENTS
                    </Link> */}

                <DynamicLink
                  pathTemplate="/all_classes/all_subjects/:classId/:subjectId/:chapterId/create_videos"
                  params={{ classId, subjectId, chapterId: chapter_id }} // Make sure the key matches the placeholder in the pathTemplate
                  label="ADD CONTENTS"
                />

                <BackButton />
                {/* <Link
                      to={"/all_subjects/create_subject"}
                      className="p-2  d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current mx-1"
                    >
                      GO BACK
                    </Link> */}
              </div>
            </div>

            {isLoading ? (
              <Loader />
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
                    {/* <a href="#" className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto"> */}
                    <video width="100%" height="auto" controls>
                      <source
                        src={baseUrl + video.video_file}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                    {/* </a> */}
                    <h4 className="fw-700 font-xs mt-4">{video.video_name}</h4>
                    <div className="row">
                      <div className="col">
                        <Link
                          to={
                            video.ebook_id
                              ? `/ebooks/preview_ebook/${video.ebook_id}`
                              : `#`
                          }
                          className={`px-3 py-1 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss bg-current mx-2`}
                          disabled
                        >
                          Ebook
                        </Link>
                        <Link
                          to={
                            +video.assessment_id
                              ? `/assessments/assessment_details/${video.assessment_id}`
                              : "#"
                          }
                          className={`px-3 py-1 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss ${
                            !video.assessment_id ? "bg-gray" : "bg-current"
                          }`}
                          disabled={!video.assessment_id}
                          target="_blank"
                        >
                          Assessments
                        </Link>

                        {video.ebook_sections &&
                          (Array.isArray(video.ebook_sections)
                            ? video.ebook_sections.map((section, index) => (
                                <div
                                  key={index}
                                  className="border-size-sm rounded-sm px-1 mx-1 d-inline-block"
                                >
                                  <Link
                                    className="px-3 py-1 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss bg-current"
                                    to={`/ebooks/preview_ebook/${
                                      video.ebook_id
                                    }#${generateId(section.section_title)}`}
                                  >
                                    Ebook {index + 1}
                                  </Link>
                                </div>
                              ))
                            : JSON.parse(video.ebook_sections).map(
                                (section, index) => (
                                  <div
                                    key={index}
                                    className="border-size-sm rounded-sm px-1 mx-1 d-inline-block"
                                  >
                                    <Link
                                      className="px-3 py-1 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss bg-current"
                                      to={`/ebooks/preview_ebook/${
                                        video.ebook_id
                                      }#${generateId(section.section_title)}`}
                                    >
                                      Ebook {index + 1}
                                    </Link>
                                  </div>
                                )
                              ))}
                      </div>
                    </div>

                    {/* You can add additional chapter details here */}
                    <div className="card-body">
                      {/* Other contents like description, number of videos, etc. */}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <NoContent contentName="videos"/>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AllVideos;
