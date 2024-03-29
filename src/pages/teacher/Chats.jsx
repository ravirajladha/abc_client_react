import React, { useState, useEffect, useRef } from "react";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useContext } from "react";
import { AuthContext } from "../../lib/AuthContext.js";
import BackButton from "../../components/navigation/BackButton.jsx";
function Chats() {
  const chatInputRef = useRef(null);

  const myStyles = {
    marginBottom: "90px",
    height: "calc(100vh - 240px)",
  };
  function formatTimeFromTimestamp(timestamp) {
    const date = new Date(timestamp);

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const amPm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12 || 12;

    const formattedTime = `${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${amPm}`;
    return formattedTime;
  }
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedStudentName, setSelectedStudentName] = useState(null);
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
  }, []);

  const getChatStudents = (e) => {
    const auth_id = user.user.id;

    let result = fetch(baseUrl + "api/get_chat_students/" + auth_id).then(
      function (result) {
        result.json().then(function (jsonbody) {
          //console.warn(jsonbody);
          setStudents(jsonbody);
        });
      }
    );
  };

  const getMessagesForStudent = (studentId) => {
    if (!user) return;
    fetch(baseUrl + `api/get_messages_for_student/${user.user.id}/${studentId}`)
      .then((result) => result.json())
      .then((jsonbody) => {
        //console.warn(jsonbody);
        setMessages(jsonbody);
      })
      .catch((error) => {
        console.error("Error fetching messages for student:", error);
      });
  };
  const handleStudentClick = (studentId,studentName) => {
    setSelectedStudent(studentId);
    setSelectedStudentName(studentName);
    getMessagesForStudent(studentId);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!user) return; // Guard against no user
    const lastMessage = Object.values(messages).pop();
    const qnaId = lastMessage.qna_id ;
    console.log(selectedStudent);
    // Perform your logic for sending the message
    const receiverId = selectedStudent; // Replace with the actual receiver ID
    const formData = new FormData();
    formData.append("receiver_id", receiverId);
    formData.append("sender_id", user.user.id);
    formData.append("message", messageInput);
    formData.append("qna_id", qnaId);

    fetch(baseUrl + "api/send_message", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success
        // console.log('Message sent successfully', data);
        // Optionally, you can update the messages state here
        // toast.success(data.msg);
        handleStudentClick(receiverId,selectedStudentName);
      })
      .catch((error) => {
        // Handle error
        console.error("Error sending message:", error);
      });

    // Clear the message input after submission
    setMessageInput("");
    chatInputRef.current.focus();
  };

  //   if the question is already answered it will hide the input field
  function shouldShowInput() {
    if (messages && messages.length > 0) {
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
      <div className="middle-sidebar-bottom theme-dark-bg">
        <div className="middle-sidebar-left">
          <ToastContainer autoClose={3000} />

          <div className="row">
            <div className="card-body px-4 w-100 border-0 d-flex rounded-lg justify-content-between">
              <div className="">
                <h2 className="fw-400 font-lg d-block">
                  <b> QnA</b>{" "}
                </h2>
              </div>
              <div className="float-right">
                <BackButton />
              </div>
            </div>
            <div className="col-lg-6 col-xl-4 col-md-6 chat-left scroll-bar border-right-light pl-4 pr-4">
              <div className="section full mt-2 mb-2 pl-3">
                <ul className="list-group list-group-flush">
                  {students && students.length > 0
                    ? students.map((student, index) => (
                        <React.Fragment key={index}>
                          <li
                            className="bg-transparent list-group-item no-icon pl-0 shadow-md"
                            onClick={() => handleStudentClick(student.id,student.name)}
                          >
                            <figure className="avatar float-left mb-0 mr-3">
                              <img
                                src="/assets/images/user_profile.jpg"
                                alt="image"
                                className="w45"
                                style={{ height: '35px' }}
                              />
                            </figure>
                            <h3 className="fw-700 mb-0 mt-2">
                              <a className="font-xsss text-grey-900 text-dark d-block">
                                {student.name}
                              </a>
                            </h3>{" "}
                            <p></p>
                            {shouldShowInput() ? (
                              <div>
                                <span className="d-block">
                                {" "}
                                </span>{" "}
                                <span className="badge badge-primary text-white badge-pill mr-2 mb-2">
                                  1
                                </span>
                              </div>
                            ) : (
                              ""
                            )}
                            {/* this number should be shown if the question is not answered -- pending */}
                          </li>
                        </React.Fragment>
                      ))
                    : <div className="text-center">
                      <h4 className="font-xs text-dark d-block">No Qnas available</h4>
                      </div>
                    }
                </ul>
              </div>
            </div>
            {messages && messages.length > 0 && (
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
                                    src="/assets/images/teacher.jpg"
                                    alt="avater"
                                    style={{ height: '35px' }}
                                  />
                                </figure>
                                <div>
                                  <h5>You</h5>
                                  <div className="time">
                                    {message.created_at &&
                                      formatTimeFromTimestamp(
                                        message.created_at
                                      )}
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
                                    src="/assets/images/user_profile.jpg"
                                    alt="avater"
                                    style={{ height: '35px' }}
                                  />
                                </figure>
                                <div>
                                  <h5 className="font-xssss mt-2">{selectedStudentName}</h5>
                                  <div className="time">
                                    {message.created_at &&
                                      formatTimeFromTimestamp(
                                        message.created_at
                                      )}
                                  </div>
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
                      {/* <button className="bg-grey float-left">
                          <i className="ti-microphone text-white"></i>
                        </button> */}
                      <div className="form-group">
                        <input
                          name="message"
                          type="text"
                          ref={chatInputRef}
                          placeholder="Start typing.."
                          value={messageInput}
                          onChange={handleInputChange}
                          style={{ color: "#000" }}
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Chats;
