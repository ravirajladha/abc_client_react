import React, { useState, useEffect, useRef } from "react";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
import Dropdown from "../../components/inputs/Dropdown";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getUserFromLocalStorage } from "../util/SessionStorage";
import { useContext } from "react";
import { AuthContext } from "../../lib/AuthContext.js";
import BackButton from "../../components/navigation/BackButton.jsx";
function Chats() {
  const chatInputRef = useRef(null);

  const myStyles = {
    marginBottom: "90px",
    height: "calc(100vh - 240px)",
  };

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [messages, setMessages] = useState([]);

  const [messageInput, setMessageInput] = useState("");
  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  const user = useContext(AuthContext).user;


  const auth_id = user.user.id;

    useEffect(() => {
        if (user) {
            getChatStudents();
        }
    }, [user]); // Add user as a dependency


    const getChatStudents = (e) => {
        const auth_id = user.user.id;

        let result = fetch(baseUrl + 'api/get_chat_students/' + auth_id).then(function (result) {
            result.json().then(function (jsonbody) {
                //console.warn(jsonbody);
                setStudents(jsonbody);
            })
        });
    }

    const getMessagesForStudent = (studentId) => {
        if (!user) return;
        fetch(baseUrl + `api/get_messages_for_student/${user.user.id}/${studentId}`)
            .then((result) => result.json())
            .then((jsonbody) => {
                //console.warn(jsonbody);
                setMessages(jsonbody);
            })
            .catch((error) => {
                console.error('Error fetching messages for student:', error);
            });
    };
    const handleStudentClick = (studentId) => {
        setSelectedStudent(studentId);
        getMessagesForStudent(studentId);
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (!user) return; // Guard against no user

        console.log(selectedStudent);
        // Perform your logic for sending the message
        const receiverId = selectedStudent; // Replace with the actual receiver ID
        const formData = new FormData();
        formData.append('receiver_id', receiverId);
        formData.append('sender_id', user.user.id);
        formData.append('message', messageInput);

        fetch(baseUrl + 'api/send_message', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle success
                // console.log('Message sent successfully', data);
                // Optionally, you can update the messages state here
                toast.success(data.msg);
                handleStudentClick(receiverId)
            })
            .catch((error) => {
                // Handle error
                console.error('Error sending message:', error);
            });

        // Clear the message input after submission
        setMessageInput('');
      chatInputRef.current.focus();

    };

    

    let result = fetch(baseUrl + "api/get_chat_students/" + auth_id).then(
      function (result) {
        result.json().then(function (jsonbody) {
          console.warn(jsonbody);
          setStudents(jsonbody);
        });
      }
    );

 





//   if the question is already answered it will hide the input field
  function shouldShowInput() {
    if (messages &&  messages.length > 0) {
      const lastMessage = Object.values(messages).pop();

      // Check if lastMessage is defined and if it's from the user and has been replied
      return lastMessage && lastMessage.sender_id !== auth_id;
    }
    // Default to true if there is no chat or messages
    return true;
  }

  if (!user) {
    console.log("No user found. User might be logged out.");
    // Handle the redirect to login or return placeholder content here
    return <div>User is not logged in</div>;
  }
  return (
    <>
      <div className="main-wrapper">
        <div className="main-content menu-active">
          <AppHeader />
          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="middle-sidebar-left">
              <ToastContainer autoClose={3000} />

              <div className="row">
                <div className="card-body p-lg-5 px-4 w-100 border-0 d-flex rounded-lg justify-content-between">
                  <div className="">
                    <h2 className="fw-400 font-lg d-block">
                      Test <b> Questions</b>{" "}
                    </h2>
                  </div>
                  <div className="float-right">
                    <BackButton />
                  </div>
                </div>
                <div className="col-lg-6 col-xl-4 col-md-6 chat-left scroll-bar border-right-light pl-4 pr-4">
                  <form action="#" className="mt-0 pl-3 pt-3">
                    <div className="search-form">
                      <i className="ti-search font-xs"></i>
                      <input
                        type="text"
                        className="form-control text-grey-500 mb-0 bg-greylight border-0"
                        placeholder="Search here."
                      />
                    </div>
                  </form>
                  <div className="section full mt-2 mb-2 pl-3">
                    <ul className="list-group list-group-flush">
                      {students && students
                        ? students.map((student, index) => (
                            <React.Fragment key={index}>
                              <li
                                className="bg-transparent list-group-item no-icon pl-0"
                                onClick={() => handleStudentClick(student.id)}
                              >
                                <figure className="avatar float-left mb-0 mr-3">
                                  <img
                                    src="https://via.placeholder.com/60x60.png"
                                    alt="image"
                                    className="w45"
                                  />
                                </figure>
                                <h3 className="fw-700 mb-0 mt-1">
                                  <a className="font-xsss text-grey-900 text-dark d-block">
                                    {student.name}
                                  </a>
                                </h3>{" "}
                                <span className="d-block">
                                  What's up, how are you?
                                </span>{" "}
                                <span className="badge badge-primary text-white badge-pill">
                                  2 
                                </span>
                                {/* this number should be shown if the question is not answered -- pending */}
                              </li>
                            </React.Fragment>
                          ))
                        : ""}
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6 col-xl-8 col-md-6 pl-0 d-none d-lg-block d-md-block">
                  <div
                    className="chat-wrapper pt-0 w-100 position-relative scroll-bar"
                    style={myStyles}
                  >
                    <div className="chat-body p-3 ">
                      <div className="messages-content pb-5">
                        {messages ? (
                          Object.values(messages).map((message, index) =>
                            message.sender_id === auth_id ? (
                              <div
                                className="message-item outgoing-message"
                                key={index}
                              >
                                <div className="message-user">
                                  <figure className="avatar">
                                    <img
                                      src="/assets/images/user.png"
                                      alt="avater"
                                    />
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
                            ) : (
                              <div className="message-item">
                                <div className="message-user">
                                  <figure className="avatar">
                                    <img
                                      src="/assets/images/user.png"
                                      alt="avater"
                                    />
                                  </figure>
                                  <div>
                                    <h5 className="font-xssss mt-2">Student</h5>
                                    <div className="time">01:35 PM</div>
                                  </div>
                                </div>
                                <div className="message-wrap shadow-none">
                                  {message.message}
                                </div>
                              </div>
                            )
                          )
                        ) : (
                          <div className="message-item"></div>
                        )}
                        <div className="clearfix"></div>
                      </div>
                    </div>
                  </div>
                  {shouldShowInput() ? (
                    <div className="chat-bottom dark-bg p-3 shadow-xss">
                      <form onSubmit={sendMessage} className="chat-form">
                        <button className="bg-grey float-left">
                          <i className="ti-microphone text-white"></i>
                        </button>
                        <div className="form-group">
                          <input
                            name="message"
                            type="text"
                            ref={chatInputRef}
                            placeholder="Start typing.."
                            value={messageInput}
                            onChange={handleInputChange}
                          />
                        </div>
                        <button type="submit" className="bg-current">
                          <i className="ti-arrow-right text-white"></i>
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div className="text-center p-3">
                      <span>Previous question is already answered.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    </>
  );
}

export default Chats;
