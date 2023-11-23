import React, { useState, useEffect, useRef } from 'react';
import Appfooter from '../../components/Appfooter';
import Navheader from '../../components/Navheader';
import Appheader from '../../components/Appheader';
import Profile from '../../components/Profile';
import Myclass from '../../components/Myclass';
import Subscribe from '../../components/Subscribe';
import "../../css/custom.css"

import { Tabs, Tab, Accordion } from 'react-bootstrap';



import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import VideoPlayer from './VideoPlayer';
import { Link, useParams } from 'react-router-dom';

function SubjectStream() {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    let { subjectId } = useParams();
    const userString = sessionStorage.getItem("rexkod_user");
    const user = JSON.parse(userString);
    const userId = user.user.id


    const chatContentRef = useRef(null);
    const noteContentRef = useRef(null);
    const [activeTab, setActiveTab] = useState("course");  //set course as the default active tab

    useEffect(() => {

        // to scrolldown in the chat and notes tab when component is loaded
        if (activeTab === "chat" || activeTab === "notes") {
            chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
            noteContentRef.current.scrollTop = noteContentRef.current.scrollHeight;
        }

    }, []);


    // video player
    const [activeVideoId, setActiveVideoId] = useState({});
    const [matchVideo, setMatchVideo] = useState({});
    const playerRef = React.useRef(null);
    const [videoJsOptions, setVideoJsOptions] = useState({
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [],
    });


    const videos = document.querySelectorAll('.video');
    // const main_video_title = document.querySelector('.title');
    const [mainVideoTitle, setMainVideoTitle] = useState('');

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


    const [allSubjectData, setAllSubjectData] = useState([]);
    function subjectDetails() {
        fetch(baseUrl + "api/subject_stream/" + userId + "/" + subjectId, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
        }).then((res) => {
            return res.json();
        }).then((resp) => {
            setAllSubjectData(resp);
            // console.log(allSubjectData.subject.subject_name);
            // console.log(resp.mini_projects);
            if(resp && resp.video_details){
                setActiveVideoId(resp && resp.video_details.id);
                setMainVideoTitle(resp && resp.video_details.video_name)
                const defaultSources = [
                    {
                        src: baseUrl + resp.video_details.video_file,
                        type: 'video/mp4',
                    },
                ];
                setVideoJsOptions((prevOptions) => ({
                    ...prevOptions,
                    sources: defaultSources,
                }));
            }
            

            
        });
    }
    useEffect(() => {
        subjectDetails();
    }, []);


    const handleVideoClick = (videoId, videoFile, videoName) => {
        videos.forEach((video) => {
            if(videoId == video.dataset.id){
                console.log(videoId);
                video.classList.add('active');
                video.querySelector('i').classList.remove('feather-play-circle');
                video.querySelector('i').classList.add('feather-pause-circle');
            }else{
                video.classList.remove('active');
                video.querySelector('i').classList.remove('feather-pause-circle');
                video.querySelector('i').classList.add('feather-play-circle');
            }
        });

        const newSources = [
            {
                src: baseUrl + videoFile,
                type: 'video/mp4',
            },
        ];

        setVideoJsOptions((prevOptions) => ({
            ...prevOptions,
            sources: newSources,
        }));

        setActiveVideoId(videoId);
        setMatchVideo({ id: videoId, video_file: videoFile, video_name: videoName });
    };

    useEffect(() => {
        // Initialize Video.js options
        setVideoJsOptions((prevOptions) => ({
            ...prevOptions,
            sources: [
                {
                    src: baseUrl + matchVideo.video_file,
                    type: 'video/mp4',
                },
            ],
        }));
        setMainVideoTitle(matchVideo.video_name)
    }, [matchVideo]);



    return (
        <>
            <div className="main-wrapper">
                <Navheader />

                <div className="main-content menu-active">
                    <Appheader />

                    <div className="middle-sidebar-bottom theme-dark-bg">
                        <div className="middle-sidebar-left">
                            <div className="row">
                                <div className="col-xl-8 col-xxl-9 col-lg-8">
                                    <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
                                </div>

                                <div className="col-xl-4 col-xxl-3 col-lg-4 pe-0 ps-0">
                                    <div className="card w-100 d-block chat-body p-0 border-0 shadow-xss rounded-3 mb-3 position-relative">
                                        <Tabs
                                            defaultActiveKey="course"
                                            id="uncontrolled-tab-example"
                                            onSelect={(key) => setActiveTab(key)}
                                            className="mb-3 list-inline-center d-block text-center border-0"
                                        >
                                            {/* <Tab eventKey="course" title="COURSE" className="list-inline-item"> */}
                                            <Tab eventKey="course" title={allSubjectData.subject && allSubjectData.subject ?  allSubjectData.subject.subject_name : ""} className="list-inline-item ">
                                                {/* <div className="messages-content chat-wrapper scroll-bar p-3"
                                                    style={{ height: 400 }}> */}
                                                {/* <h1>tab1</h1> */}
                                                <div className="video-playlist shadow-xss"
                                                    style={{ height: 400 }}>

                                                    {allSubjectData && allSubjectData.videos ? (
                                                        <p className="text-dark fw-300 font-xss">
                                                            {allSubjectData && allSubjectData.videos.length} &nbsp; Videos</p>
                                                    )
                                                        :
                                                        ""
                                                    }
                                                    <div className="videos scroll-bar" >
                                                       
                                                        <Accordion
                                                            defaultActiveKey="0"
                                                            className="accordian mb-0 accordian-course"
                                                        >

                                                            {allSubjectData && allSubjectData.chapters ? (
                                                                allSubjectData && allSubjectData.chapters.map((chapter, index) => (
                                                                    <Accordion.Item
                                                                        eventKey={index}
                                                                        className="accordion-item border-0 mb-0 shadow-xss rounded-sm bg-white"
                                                                    >
                                                                        <Accordion.Header>
                                                                            {chapter.chapter_name}
                                                                        </Accordion.Header>
                                                                        <Accordion.Body className='py-0'>
                                                                            {allSubjectData.videos && allSubjectData.videos.map((video, videoIndex) => (
                                                                                video.chapter_id === chapter.id ?
                                                                                    <div className="card-body d-flex p-1 video" data-id={video.id} key={videoIndex} onClick={() => handleVideoClick(video.id, video.video_file, video.video_name)}>
                                                                                        <i className='feather-play-circle mr-3 font-lg'></i>
                                                                                        <div className="d-flex flex-column">
                                                                                            <div>
                                                                                                <span className="bg-current btn-round-xs rounded-lg font-xssss text-white fw-600">
                                                                                                    {videoIndex +1}
                                                                                                </span>
                                                                                                <span className="font-xssss fw-500 text-grey-500 ml-2">
                                                                                                    {video.video_name}
                                                                                                </span>
                                                                                            </div>
                                                                                            <div className="d-flex justify-content-between">
                                                                                                <div className='border-size-sm rounded-sm px-1 mx-1' style={{ border: '1px solid #000' }}><Link className="font-xssss" to={"/subject_stream/take_assessments/"+ video.id}>Assesments</Link></div>
                                                                                                <div className='border-size-sm rounded-sm px-1 mx-1' style={{ border: '1px solid #000' }}><Link className="font-xssss" to={"/subject_stream/ebook"} >EBook</Link></div>
                                                                                                <div className='border-size-sm rounded-sm px-1 mx-1' style={{ border: '1px solid #000' }}><Link className="font-xssss" to={"/subject_stream/elab/"+video.id} >ELab</Link></div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    :
                                                                                    ""
                                                                            ))}

                                                                        </Accordion.Body>
                                                                    </Accordion.Item>
                                                                ))
                                                            )
                                                                :

                                                                <Accordion.Item
                                                                    eventKey="0"
                                                                    className="accordion-item border-0 mb-0 shadow-xss rounded-sm bg-white"
                                                                >

                                                                </Accordion.Item>
                                                            }
                                                        </Accordion>
                                                    </div>
                                                </div>

                                                {/* </div> */}
                                            </Tab>
                                            <Tab eventKey="chat" title="CHAT" className="list-inline-item " >

                                                <div className="messages-content chat-wrapper scroll-bar p-3"
                                                    style={{ height: 400 }}
                                                    ref={chatContentRef}>
                                                    {allSubjectData && allSubjectData.merged_messages ? (
                                                        Object.values(allSubjectData.merged_messages).map((message, index) => (
                                                            message.sender_id === userId ? (
                                                                <div className="message-item outgoing-message" key={index}>
                                                                    <div className="message-user">
                                                                        <figure className="avatar">
                                                                            <img src="/assets/images/user.png" alt="avater" />
                                                                        </figure>
                                                                        <div>
                                                                            <h5>You</h5>
                                                                            <div className="time">
                                                                                01:35 PM
                                                                                <i className="ti-double-check text-info"></i>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="message-wrap">
                                                                        {message.message}
                                                                    </div>
                                                                </div>

                                                            )
                                                                :
                                                                (
                                                                    <div className="message-item">
                                                                        <div className="message-user">
                                                                            <figure className="avatar">
                                                                                <img src="/assets/images/user.png" alt="avater" />
                                                                            </figure>
                                                                            <div>
                                                                                <h5 className="font-xssss mt-2">Teacher</h5>
                                                                                <div className="time">01:35 PM</div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="message-wrap shadow-none">
                                                                            {message.message}
                                                                        </div>
                                                                    </div>
                                                                )

                                                        ))
                                                    )


                                                        :
                                                        <div className="message-item">

                                                        </div>

                                                    }

                                                </div>
                                                <form className="chat-form position-absolute bottom-0 w-100 left-0 bg-white z-index-1 p-3 shadow-xs theme-dark-bg ">
                                                    <button className="bg-grey float-left">
                                                        <i className="ti-microphone text-white"></i>
                                                    </button>
                                                    <div className="form-group">
                                                        <input type="text" placeholder="Start typing.." />
                                                    </div>
                                                    <button className="bg-current">
                                                        <i className="ti-arrow-right text-white"></i>
                                                    </button>
                                                </form>
                                            </Tab>
                                            <Tab eventKey="notes" title="NOTES" className="list-inline-item">
                                                <div className="messages-content chat-wrapper scroll-bar p-3"
                                                    style={{ height: 400 }}
                                                    ref={noteContentRef}>
                                                    {allSubjectData && allSubjectData.mini_projects ? (
                                                        allSubjectData && allSubjectData.notes.map((note, index) => (
                                                            <div className="message-item outgoing-message" key={index}>
                                                                <div className="message-wrap">{note.note}</div>
                                                                <div className="message-user">
                                                                    <div>
                                                                        <div className="time"><i
                                                                            className="ti-double-check text-info"></i></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    )
                                                        :

                                                        <div className="message-item">

                                                        </div>


                                                    }


                                                </div>
                                                <form className="chat-form position-absolute bottom-0 w-100 left-0 bg-white z-index-1 p-3 shadow-xs theme-dark-bg ">
                                                    <button className="bg-grey float-left">
                                                        <i className="ti-microphone text-white"></i>
                                                    </button>
                                                    <div className="form-group">
                                                        <input type="text" placeholder="Start typing.." />
                                                    </div>
                                                    <button className="bg-current">
                                                        <i className="ti-arrow-right text-white"></i>
                                                    </button>
                                                </form>
                                            </Tab>


                                        </Tabs>


                                    </div>
                                </div>

                                <div className="col-xl-12 col-xxl-12">
                                    <div
                                        className="card d-block border-0 rounded-lg overflow-hidden dark-bg-transparent bg-transparent mt-4 pb-4">
                                        <div className="row">
                                            <div className="col-8">

                                                {/* {allSubjectData && allSubjectData.video_details ? (
                                                        <h2 className="fw-700 font-md d-block lh-4 mb-2 title">
                                                    {allSubjectData && allSubjectData.video_details.video_name }</h2>
                                                    )
                                                    
                                                : ""} */}
                                                <h2 className="fw-700 font-md d-block lh-4 mb-2 title">
                                                    {mainVideoTitle}</h2>
                                            </div>
                                            <div className="col-4 save-div">
                                                <a href="#"
                                                    className="btn-round-md ml-3 mb-2 d-inline-block float-right rounded-lg bg-danger"><i
                                                        className="feather-bookmark font-sm text-white"></i></a>
                                                <a href="#"
                                                    className="btn-round-md ml-0 d-inline-block float-right rounded-lg bg-greylight"
                                                    id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="false">
                                                    <i className="feather-share-2 font-sm text-grey-700"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right p-3 border-0 shadow-xss"
                                                    aria-labelledby="dropdownMenu2">
                                                    <ul className="d-flex align-items-center mt-0 float-left">
                                                        <li className="mr-2">
                                                            <h4 className="fw-600 font-xss text-grey-900  mt-2 mr-3">Share: </h4>
                                                        </li>
                                                        <li className="mr-2"><a href="#"
                                                            className="btn-round-md bg-facebook"><i
                                                                className="font-xs ti-facebook text-white"></i></a></li>
                                                        <li className="mr-2"><a href="#"
                                                            className="btn-round-md bg-twiiter"><i
                                                                className="font-xs ti-twitter-alt text-white"></i></a></li>
                                                        <li className="mr-2"><a href="#"
                                                            className="btn-round-md bg-linkedin"><i
                                                                className="font-xs ti-linkedin text-white"></i></a></li>
                                                        <li className="mr-2"><a href="#"
                                                            className="btn-round-md bg-instagram"><i
                                                                className="font-xs ti-instagram text-white"></i></a></li>
                                                        <li className="mr-2"><a href="#"
                                                            className="btn-round-md bg-pinterest"><i
                                                                className="font-xs ti-pinterest text-white"></i></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <span className="font-xssss fw-700 text-grey-900 d-inline-block ml-0 text-dark">Teacher name</span>
                                    </div>
                                </div>
                                <div className="col-xl-12 col-xxl-12 col-lg-12">
                                    <div className="card d-block border-0 rounded-lg overflow-hidden p-4 shadow-xss mt-4 bg-lightblue" >
                                        {allSubjectData && allSubjectData.test ? (
                                            allSubjectData.test_result && allSubjectData.test_result.score_percentage >= 50 ? (
                                                <a href="">
                                                    <h2 className="fw-700 font-sm mt-1 pl-1">View certificate. <i className="ti-arrow-right font-sm text-dark float-right"></i></h2>
                                                </a>
                                            ) : (
                                                <Link to={"/subject_stream/take_test/"+subjectId + "/" + allSubjectData.test.id}>
                                                    <h2 className="fw-700 font-sm mt-1 pl-1">Take test to get certified. <i className="ti-arrow-right font-sm text-dark float-right"></i></h2>
                                                </Link>
                                            )
                                        ) : (
                                            <a href="#">
                                                <h2 className="fw-700 font-sm mt-1 pl-1">Test coming soon!. <i className="ti-arrow-right font-sm text-dark float-right"></i></h2>
                                            </a>
                                        )}


                                    </div>
                                </div>
                                <div className="col-lg-12 pt-2 mt-2">
                                    <h2 className="fw-400 font-lg d-block">Mini <b>Projetcs</b> <a href="#"
                                        className="float-right"><i className="feather-edit text-grey-500 font-xs"></i></a></h2>
                                    <div
                                        className="owl-carousel category-card owl-theme overflow-hidden overflow-visible-xl nav-none">
                                        {
                                            allSubjectData && allSubjectData.mini_projects ? (
                                                allSubjectData && allSubjectData.mini_projects.map((mini_project, id) => (
                                                    <div className="item" key={id}>
                                                        <div
                                                            className="card w200 d-block border-0 shadow-xss rounded-lg overflow-hidden mb-4">

                                                            <div className="card-image w-100 ">
                                                                <img src={baseUrl + mini_project.project_image} alt="image"
                                                                    className="w-100" style={{ height: 100 }} />
                                                            </div>
                                                            <div className="card-body d-block w-100 pl-4 pr-4 pb-4 text-center">

                                                                <div className="clearfix"></div>
                                                                <h4 className="fw-700 font-xsss mt-3 mb-1"><a href="#"
                                                                    className="text-dark text-grey-900">
                                                                </a>{mini_project.project_name}</h4>
                                                                <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-2">
                                                                    {mini_project.description}</p>
                                                                <Link to={"/subject_stream/view_project/"+ mini_project.id }
                                                                    className="text-dark text-grey-900">
                                                                    <span
                                                                        className="live-tag mt-2 mb-3 bg-danger p-2 z-index-1 rounded-lg text-white font-xsssss text-uppersace fw-700 ls-3">Start</span></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            )
                                                :
                                                <div>No Mini Projects Available</div>
                                        }




                                    </div>
                                </div>
                                <div className="col-lg-12 pt-2 mt-2">
                                    <h2 className="fw-400 font-lg d-block">MY <b>Assesments</b> <a href="#"
                                        className="float-right"><i className="feather-edit text-grey-500 font-xs"></i></a></h2>
                                    <div
                                        className="owl-carousel category-card owl-theme overflow-hidden overflow-visible-xl nav-none">
                                        {
                                            allSubjectData && allSubjectData.assesments_given ? (
                                                allSubjectData && allSubjectData.assesments_given.map((assesment, id) => (
                                                    <div className="item" key={id}>
                                                        <div
                                                            className="card w200 d-block border-0 shadow-xss rounded-lg overflow-hidden mb-4">
                                                            <div className="card-body d-block w-100 pl-4 pr-4 pb-4 text-center">
                                                                <div className="clearfix"></div>
                                                                <h4 className="fw-700 font-xsss mt-3 mb-1"><a href="/view_assesment_results/{{$assesments_given->id}}"
                                                                    className="text-dark text-grey-900">{assesment.video_name}
                                                                </a></h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            )
                                                :
                                                <div>No Assesments Available</div>
                                        }

                                    </div>
                                </div>
                                <div className="col-xl-12 col-xxl-12 col-lg-12">


                                    <div className="card d-block border-0 rounded-lg overflow-hidden p-4 shadow-xss mt-4">
                                        <h2 className="fw-700 font-sm mb-3 mt-1 pl-1 mb-3">Description</h2>
                                        <p className="font-xssss fw-500 lh-28 text-grey-600 mb-0 pl-2">
                                            description
                                        </p>
                                    </div>

                                    <div className="card d-block border-0 rounded-lg overflow-hidden p-4 shadow-xss mt-4 mb-5">
                                        <h2 className="fw-700 font-sm mb-3 mt-1 pl-1 mb-3">Instructor</h2>
                                        <div className="row">
                                            <div className="col-sm-4 col-lg-4">
                                                <div>
                                                    <img src="/assets/images/manjunath.jpeg"
                                                        alt="Author Images" width={300} />

                                                </div>
                                            </div>
                                            <div className="col-sm-8 col-lg-8">
                                                <div className="author-content">
                                                    <h3 className="title">Manjunath Aradhya</h3>
                                                    <span className="subtitle">Senior Instructor</span>
                                                    <p className="font-xssss fw-500 lh-28 text-grey-600 mb-0 pl-2">A passionate
                                                        Tech-Guru, a revered author of numerous hot-selling Computer Science
                                                        books, a renowned Educationist, and a celebrated Technocrat. A former
                                                        Business-Associate at Wipro Technologies and organically connected to
                                                        the academia all through my 24+ years of Journey in Tech-skilling, I
                                                        have been impact-fully instrumental in personally transforming 60000+
                                                        On-campus & Off-campus Tech-graduates to successful IT-Professionals.
                                                    </p>
                                                    <p className="font-xssss fw-500 lh-28 text-grey-600 mb-0 pl-2">After creating
                                                        more than a dozen courses on Microsoft Access databases and programming
                                                        in VBA, many students have contacted me with discussions on specific
                                                        problems and scenarios. From these discussions,</p>
                                                    <ul className="social-share">
                                                        <li><a href="#"><i className="icon-facebook"></i></a></li>
                                                        <li><a href="#"><i className="icon-twitter"></i></a></li>
                                                        <li><a href="#"><i className="icon-linkedin2"></i></a></li>
                                                        <li><a href="#"><i className="icon-youtube"></i></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="middle-sidebar-right scroll-bar">
                            <div className="middle-sidebar-right-content">
                                <Profile />
                                <Myclass />
                                <Subscribe />
                            </div>
                        </div>
                    </div>
                </div>

                <Appfooter />
            </div>
        </>
    );
}


export default SubjectStream;
