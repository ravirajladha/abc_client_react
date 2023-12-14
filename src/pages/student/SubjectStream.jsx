import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../lib/AuthContext.js";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "../../css/custom.css";
import VideoPlayer from "./subject-stream-components/VideoPlayer.jsx";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Tabs, Tab, Accordion } from "react-bootstrap";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
import StudentSidebar from "../../components/includes/StudentSidebar";
import { Modal } from "react-bootstrap";
import NoteTab from "./subject-stream-components/NoteTab.jsx";
import QnaTab from "./subject-stream-components/QnaTab.jsx";

function SubjectStream() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  let { subjectId } = useParams();
  const user = useContext(AuthContext).user;
  const [receiverId, setReceiverId] = useState();
  const chatContentRef = useRef(null);
  const noteContentRef = useRef(null);
  const [activeTab, setActiveTab] = useState("course"); //set course as the default active tab
  const [notes, setNotes] = useState([]);
  const noteInputRef = useRef(null);
  const [videoPlayer, setVideoPlayer] = useState(null);
  const [assessments, setAssessments] = useState([]);
  const [isTeacherAvailable, setIsTeacherAvailable] = useState(false);
  const [mainVideoTitle, setMainVideoTitle] = useState("");
  const [mainVideoDescription, setMainVideoDescription] = useState("");
  const [allSubjectData, setAllSubjectData] = useState([]);
  // video player
  const [activeVideoId, setActiveVideoId] = useState("");
  const [matchVideo, setMatchVideo] = useState({});
  const playerRef = React.useRef(null);
  const [videoJsOptions, setVideoJsOptions] = useState({
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [],
  });
  const userId = user.user.id;

  const scrollActiveTabToBottom = () => {
    // chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    // noteContentRef.current.scrollTop = noteContentRef.current.scrollHeight;
  };

  const videos = document.querySelectorAll(".video");
  // const main_video_title = document.querySelector('.title');

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    // You can handle player events here, for example:
    // player.on('waiting', () => {
    //     videojs.log('player is waiting');
    // });

    // player.on('dispose', () => {
    //     videojs.log('player will dispose');
    // });
  };

  useEffect(() => {
    // Fetch assessments when the component mounts
    fetch(baseUrl + "api/get_assessments_for_videos")
      .then((response) => response.json())
      .then((data) => {
        setAssessments(data);
      })
      .catch((error) => {
        console.error("Error fetching assessments:", error);
      });
  }, []);
  const [elabs, setElabs] = useState([]);

  useEffect(() => {
    // Fetch elabs when the component mounts
    fetch(baseUrl + "api/get_elab_for_videos")
      .then((response) => response.json())
      .then((data) => {
        setElabs(data);
      })
      .catch((error) => {
        console.error("Error fetching elab:", error);
      });
  }, []);

  function subjectDetails() {
    fetch(baseUrl + "api/subject_stream/" + userId + "/" + subjectId, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setAllSubjectData(resp);
        const teacherAssigned =
          resp.teacher && resp.teacher.user && resp.teacher.user.id;
        setIsTeacherAvailable(teacherAssigned);

        if (teacherAssigned) {
          setReceiverId(resp.teacher.user.id);
        } else {
          setReceiverId(null);
        }
        // console.log(allSubjectData.subject.subject_name);
        if (resp && resp.video_details) {
          console.log(resp.video_details);
          setActiveVideoId(resp && resp.video_details.id);
          setMainVideoTitle(resp && resp.video_details.video_name);
          setMainVideoDescription(resp && resp.video_details.description);
          const defaultSources = [
            {
              src: baseUrl + resp.video_details.video_file,
              type: "video/mp4",
            },
          ];
          setVideoJsOptions((prevOptions) => ({
            ...prevOptions,
            sources: defaultSources,
          }));
        }
      });
  }

  const handleVideoClick = (videoId, videoFile, videoName, description) => {
    videos.forEach((video) => {
      if (videoId == video.dataset.id) {
        // console.log(videoId);
        video.classList.add("active");
        video.querySelector("i").classList.remove("feather-play-circle");
        video.querySelector("i").classList.add("feather-pause-circle");
      } else {
        video.classList.remove("active");
        video.querySelector("i").classList.remove("feather-pause-circle");
        video.querySelector("i").classList.add("feather-play-circle");
      }
    });

    const newSources = [
      {
        src: baseUrl + videoFile,
        type: "video/mp4",
      },
    ];

    setVideoJsOptions((prevOptions) => ({
      ...prevOptions,
      sources: newSources,
    }));

    setActiveVideoId(videoId);
    setMatchVideo({
      id: videoId,
      video_file: videoFile,
      video_name: videoName,
      description: description,
    });
  };

  useEffect(() => {
    // scrolldown in the chat and notes tab when component is loaded
    if (activeTab === "chat" || activeTab === "notes") {
      scrollActiveTabToBottom();
    }

    //fetch Subject Details
    subjectDetails();

    //fetch Notes on load
    // fetchNotes();

    //fetch chat messages in each interval
    // fetchMessages();
  }, []);

  useEffect(() => {
    // Initialize Video.js options
    setVideoJsOptions((prevOptions) => ({
      ...prevOptions,
      sources: [
        {
          src: baseUrl + matchVideo.video_file,
          type: "video/mp4",
        },
      ],
    }));
    setMainVideoTitle(matchVideo.video_name);
    setMainVideoDescription(matchVideo.description);
  }, [matchVideo]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const handlePlayerChange = (player) => {
    setVideoPlayer(player); // Store the player instance in your component state
  };

  if (!user) {
    // Handle the case when there is no user. You might want to redirect
    // to a login page or return null or some placeholder content.
    console.log("No user found. User might be logged out.");
    return <div>User is not logged in</div>;
  }

  function generateId(sectionTitle) {
    if (sectionTitle) {
      const title = sectionTitle.replace(/[^a-zA-Z0-9\s]/g, "");
      const sectionId = title.toLowerCase().replace(/\s+/g, "-");
      return sectionId;
    }
  }

  // Function to fetch the latest assessment result for a user
  async function fetchLatestAssessmentResult(userId) {
    const apiUrl = `${baseUrl}/api/assessment_results/${userId}/latest`; // Replace with your actual API endpoint

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch data from the server: ${response.status} ${response.statusText}`
        );
      }

      const result = await response.json();
      return result; // Assuming the API returns the latest assessment result as JSON
    } catch (error) {
      console.error("Error fetching assessment result:", error);
      throw error; // You can handle errors as needed in your application
    }
  }

  return (
    <>
      <div className="main-wrapper">
        <div className="main-content menu-active">
          <AppHeader />
          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="middle-sidebar-left">
              <div className="row">
                <div className="col-xl-8 col-xxl-9 col-lg-8">
                  <VideoPlayer
                    options={videoJsOptions}
                    onReady={handlePlayerReady}
                    onPlayerChange={handlePlayerChange}
                    videoId={activeVideoId}
                    subjectId={subjectId}
                  />
                </div>

                <div className="col-xl-4 col-xxl-3 col-lg-4 pe-0 ps-0">
                  <div className="card w-100 d-block chat-body p-0 border-0 shadow-xss rounded-3 mb-3 position-relative">
                    <Tabs
                      defaultActiveKey="course"
                      id="uncontrolled-tab-example"
                      onSelect={(key) => setActiveTab(key)}
                      className="mb-3 list-inline-center d-flex text-center border-0"
                    >
                      {/* <Tab eventKey="course" title="COURSE" className="list-inline-item"> */}
                      <Tab
                        eventKey="course"
                        title={
                          allSubjectData.subject && allSubjectData.subject
                            ? allSubjectData.subject.subject_name
                            : ""
                        }
                        className="list-inline-item "
                      >
                        {/* <div className="messages-content chat-wrapper scroll-bar p-3"
                                                    style={{ height: 400 }}> */}
                        {/* <h1>tab1</h1> */}
                        <div
                          className="video-playlist shadow-xss"
                          style={{ height: 400 }}
                        >
                          {/* {allSubjectData && allSubjectData.videos ? (
                            <p className="text-dark fw-300 font-xss">
                              {allSubjectData && allSubjectData.videos.length}{" "}
                              &nbsp; Videos
                            </p>
                          ) : (
                            ""
                          )} */}
                          <div className="videos scroll-bar">
                            <Accordion
                              defaultActiveKey="0"
                              className="accordion mb-0 accordion-course"
                            >
                              {allSubjectData &&
                                allSubjectData.chapters &&
                                allSubjectData.chapters.map(
                                  (chapter, index) => {
                                    // Check if there are videos for this chapter
                                    const chapterVideos =
                                      allSubjectData.videos.filter(
                                        (video) =>
                                          video.chapter_id === chapter.id
                                      );
                                    const hasVideos = chapterVideos.length > 0;

                                    return hasVideos ? (
                                      <Accordion.Item
                                        eventKey={index}
                                        className="accordion-item border-0 mb-0 shadow-xss rounded-sm bg-white"
                                      >
                                        <Accordion.Header>
                                          {chapter.chapter_name}
                                        </Accordion.Header>
                                        <Accordion.Body className="py-0">
                                          {allSubjectData.videos &&
                                            allSubjectData.videos.map(
                                              (video, videoIndex) => {
                                                if (
                                                  video.chapter_id ===
                                                  chapter.id
                                                ) {
                                                  // Check if there's an assessment, ebook, and elab for this video
                                                  const hasAssessment = true;
                                                  // assessments.some(
                                                  //   (assessment) =>
                                                  //     assessment.video_id ===
                                                  //     video.id
                                                  // );
                                                  const hasEBook = null; //when the ebook will come
                                                  // const hasELab = elabs.some(
                                                  //   (elab) =>
                                                  //     elab.video_id == video.id
                                                  // );

                                                  return (
                                                    <div
                                                      className="card-body d-flex p-1 video"
                                                      data-id={video.id}
                                                      key={video.id}
                                                      onClick={() =>
                                                        handleVideoClick(
                                                          video.id,
                                                          video.video_file,
                                                          video.video_name,
                                                          video.description
                                                        )
                                                      }
                                                    >
                                                      <i className="feather-play-circle mr-3 font-lg"></i>
                                                      <div className="d-flex flex-column">
                                                        <div>
                                                          <span className="bg-current btn-round-xs rounded-lg font-xssss text-white fw-600">
                                                            {videoIndex + 1}
                                                          </span>
                                                          <span className="font-xssss fw-500 text-grey-500 ml-2">
                                                            {video.video_name}
                                                          </span>
                                                        </div>
                                                        <div className="d-flex justify-content-between">
                                                          {video.assessment_id && (
                                                            <div
                                                              className="border-size-sm rounded-sm px-1 mx-1"
                                                              style={{
                                                                border:
                                                                  "1px solid #000",
                                                              }}
                                                            >
                                                              <Link
                                                                className="font-xssss"
                                                                to={`/subject_stream/take_assessments/${video.assessment_id}`}
                                                              >
                                                                Assessments
                                                              </Link>
                                                            </div>
                                                          )}
                                                          {hasEBook && (
                                                            <div
                                                              className="border-size-sm rounded-sm px-1 mx-1"
                                                              style={{
                                                                border:
                                                                  "1px solid #000",
                                                              }}
                                                            >
                                                              <Link
                                                                className="font-xssss"
                                                                to={`/subject_stream/ebook/${video.id}`}
                                                              >
                                                                EBook
                                                              </Link>
                                                            </div>
                                                          )}
                                                          {video.lab_link && (
                                                            <div
                                                              className="border-size-sm rounded-sm px-1 mx-1"
                                                              style={{
                                                                border:
                                                                  "1px solid #000",
                                                              }}
                                                            >
                                                              <Link
                                                                className="font-xssss"
                                                                to={`/editor/2/${subjectId}/${video.id}/${video.lab_link}`}
                                                              >
                                                                ELab
                                                              </Link>
                                                            </div>
                                                          )}
                                                          {video.ebook_sections &&
                                                            video.ebook_sections.map(
                                                              (
                                                                section,
                                                                index
                                                              ) => (
                                                                <div
                                                                  key={index}
                                                                  className="border-size-sm rounded-sm px-1 mx-1"
                                                                  style={{
                                                                    border:
                                                                      "1px solid #000",
                                                                  }}
                                                                >
                                                                  <Link
                                                                    className="font-xssss"
                                                                    to={`/ebooks/preview_ebook/${
                                                                      video.ebook_id
                                                                    }#${generateId(
                                                                      section.section_title
                                                                    )}`}
                                                                  >
                                                                    Ebook{" "}
                                                                    {index + 1}
                                                                  </Link>
                                                                </div>
                                                              )
                                                            )}
                                                        </div>
                                                      </div>
                                                    </div>
                                                  );
                                                } else {
                                                  return null;
                                                }
                                              }
                                            )}
                                        </Accordion.Body>
                                      </Accordion.Item>
                                    ) : null; // Or instead of null, render something to indicate no videos are available
                                  }
                                )}
                            </Accordion>
                          </div>
                        </div>

                        {/* </div> */}
                      </Tab>
                      <Tab
                        eventKey="chat"
                        title="QNA"
                        className="list-inline-item"
                      >
                        <QnaTab
                          userId={userId}
                          isTeacherAvailable={isTeacherAvailable}
                          subjectId={subjectId}
                          receiverId={receiverId}
                        />
                      </Tab>

                      <Tab
                        eventKey="notes"
                        title="NOTES"
                        className="list-inline-item"
                      >
                        <NoteTab
                          userId={userId}
                          videoPlayer={videoPlayer}
                          activeVideoId={activeVideoId}
                        />
                      </Tab>
                    </Tabs>
                  </div>
                </div>

                <div className="col-xl-12 col-xxl-12">
                  <div className="card d-block border-0 rounded-lg overflow-hidden dark-bg-transparent bg-transparent mt-4 pb-4">
                    <div className="row">
                      <div className="col-8">
                        {/* {allSubjectData && allSubjectData.video_details ? (
                                                        <h2 className="fw-700 font-md d-block lh-4 mb-2 title">
                                                    {allSubjectData && allSubjectData.video_details.video_name }</h2>
                                                    )
                                                    
                                                : ""} */}
                        <h2 className="fw-700 font-md d-block lh-4 mb-2 title">
                          {mainVideoTitle}
                        </h2>
                      </div>
                      <div className="col-4 ">
                        <h5 className="btn-round ml-3 mb-2 d-inline-block float-right rounded-lg bg-danger p-2 text-white">
                          Live Doubt Clearing
                        </h5>

                        <div
                          className="dropdown-menu dropdown-menu-right p-3 border-0 shadow-xss"
                          aria-labelledby="dropdownMenu2"
                        ></div>
                      </div>
                    </div>

                    <span className="font-xssss fw-700 text-grey-900 d-inline-block ml-0 text-dark">
                      Teacher name
                    </span>
                  </div>
                </div>
                <div className="col-xl-12 col-xxl-12 col-lg-12">
                  <div className="card d-block border-0 rounded-lg overflow-hidden p-4 shadow-xss mt-4">
                    <h2 className="fw-700 font-sm mb-3 mt-1 pl-1 mb-3">
                      Description
                    </h2>
                    <p className="font-xssss fw-500 lh-28 text-grey-600 mb-0 pl-2">
                      {mainVideoDescription}
                    </p>
                  </div>

                  <div className="card d-block border-0 rounded-lg overflow-hidden p-4 shadow-xss mt-4">
                    <h2 className="fw-700 font-sm mb-3 mt-1 pl-1 mb-3">
                      Previous Assesment Score
                    </h2>
                    <p className="font-xssss fw-500 lh-28 text-grey-600 mb-0 pl-2">
                      1
                    </p>
                  </div>

                  {/* <div className="card d-block border-0 rounded-lg overflow-hidden p-4 shadow-xss mt-4 mb-5">
                    <h2 className="fw-700 font-sm mb-3 mt-1 pl-1 mb-3">
                      Instructor
                    </h2>
                    <div className="row">
                      <div className="col-sm-4 col-lg-4">
                        <div>
                          <img
                            src="/assets/images/manjunath.jpeg"
                            alt="Author Images"
                            width={300}
                          />
                        </div>
                      </div>
                      <div className="col-sm-8 col-lg-8">
                        <div className="author-content">
                          <h3 className="title">Manjunath Aradhya</h3>
                          <span className="subtitle">Senior Instructor</span>
                          <p className="font-xssss fw-500 lh-28 text-grey-600 mb-0 pl-2">
                            A passionate Tech-Guru, a revered author of numerous
                            hot-selling Computer Science books, a renowned
                            Educationist, and a celebrated Technocrat. A former
                            Business-Associate at Wipro Technologies and
                            organically connected to the academia all through my
                            24+ years of Journey in Tech-skilling, I have been
                            impact-fully instrumental in personally transforming
                            60000+ On-campus & Off-campus Tech-graduates to
                            successful IT-Professionals.
                          </p>
                          <p className="font-xssss fw-500 lh-28 text-grey-600 mb-0 pl-2">
                            After creating more than a dozen courses on
                            Microsoft Access databases and programming in VBA,
                            many students have contacted me with discussions on
                            specific problems and scenarios. From these
                            discussions,
                          </p>
                          <ul className="social-share">
                            <li>
                              <a href="#">
                                <i className="icon-facebook"></i>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="icon-twitter"></i>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="icon-linkedin2"></i>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="icon-youtube"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
                <div className="col-xl-12 col-xxl-12 col-lg-12">
                  <div className="card d-block border-0 rounded-lg overflow-hidden p-4 shadow-xss mt-4 bg-lightblue">
                    {allSubjectData && allSubjectData.test ? (
                      allSubjectData.test_result &&
                      allSubjectData.test_result.score_percentage >= 50 ? (
                        <a href="">
                          <h2 className="fw-700 font-sm mt-1 pl-1">
                            View certificate.{" "}
                            <i className="ti-arrow-right font-sm text-dark float-right"></i>
                          </h2>
                        </a>
                      ) : (
                        <Link
                          to={
                            "/subject_stream/take_test/" +
                            subjectId +
                            "/" +
                            allSubjectData.test.id
                          }
                        >
                          <h2 className="fw-700 font-sm mt-1 pl-1">
                            Take test to get certified.{" "}
                            <i className="ti-arrow-right font-sm text-dark float-right"></i>
                          </h2>
                        </Link>
                      )
                    ) : (
                      <a href="#">
                        <h2 className="fw-700 font-sm mt-1 pl-1">
                          Test coming soon!.{" "}
                          <i className="ti-arrow-right font-sm text-dark float-right"></i>
                        </h2>
                      </a>
                    )}
                  </div>
                </div>
                <div className="col-lg-12 pt-2 mt-2">
                  <h2 className="fw-400 font-lg d-block">
                    Mini <b>Projects</b>{" "}
                    <a href="#" className="float-right">
                      <i className="feather-edit text-grey-500 font-xs"></i>
                    </a>
                  </h2>
                  {/* <div className="owl-carousel category-card owl-theme overflow-hidden overflow-visible-xl nav-none"> */}
                  <Carousel
                    responsive={responsive}
                    autoPlay={false}
                    infinite={true}
                    className="owl-carousel category-card owl-theme"
                  >
                    {allSubjectData &&
                    allSubjectData.mini_projects &&
                    allSubjectData.mini_projects.length > 0 ? (
                      allSubjectData &&
                      allSubjectData.mini_projects.map((mini_project, id) => (
                        <div className="item" key={id}>
                          <div className="card w200 d-block border-0 shadow-xss rounded-lg overflow-hidden mb-4">
                            <div className="card-image w-100 ">
                              <img
                                src={baseUrl + mini_project.project_image}
                                alt="image"
                                className="w-100"
                                style={{ height: 100 }}
                              />
                            </div>
                            <div className="card-body d-block w-100 pl-4 pr-4 pb-4 text-center">
                              <div className="clearfix"></div>
                              <h4 className="fw-700 font-xsss mt-3 mb-1">
                                <a
                                  href="#"
                                  className="text-dark text-grey-900"
                                ></a>
                                {mini_project.project_name}
                              </h4>
                              <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-2">
                                {mini_project.description}
                              </p>
                              <Link
                                to={
                                  "/subject_stream/view_project/" +
                                  mini_project.id
                                }
                                className="text-dark text-grey-900"
                              >
                                <span className="live-tag mt-2 mb-3 bg-danger p-2 z-index-1 rounded-lg text-white font-xsssss text-uppersace fw-700 ls-3">
                                  Start
                                </span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>No Mini Projects Available</div>
                    )}
                  </Carousel>
                </div>
                <div className="col-lg-12 pt-2 mt-2">
                  <h2 className="fw-400 font-lg d-block">
                    My <b>Assesments</b>{" "}
                    <a href="#" className="float-right">
                      <i className="feather-edit text-grey-500 font-xs"></i>
                    </a>
                  </h2>
                  <Carousel
                    responsive={responsive}
                    autoPlay={false}
                    infinite={true}
                    className="owl-carousel category-card owl-theme"
                  >
                    {allSubjectData &&
                    allSubjectData.assesments_given &&
                    allSubjectData.assesments_given.length > 0 ? (
                      allSubjectData &&
                      allSubjectData.assesments_given.map((assesment, id) => (
                        <div className="item" key={id}>
                          <div className="card w200 d-block border-0 shadow-xss rounded-lg overflow-hidden mb-4">
                            <div className="card-body d-block w-100 pl-4 pr-4 pb-4 text-center">
                              <div className="clearfix"></div>
                              <h4 className="fw-700 font-xsss mt-3 mb-1">
                                <a
                                  href="/view_assesment_results/{{$assesments_given->id}}"
                                  className="text-dark text-grey-900"
                                >
                                  {assesment.video_name}
                                </a>
                              </h4>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>No Assesments Available</div>
                    )}
                  </Carousel>
                </div>
              </div>
            </div>
            <StudentSidebar />
          </div>
        </div>

        <AppFooter />
      </div>
    </>
  );
}

export default SubjectStream;
