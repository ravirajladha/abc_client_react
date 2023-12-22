import React, { useRef, useState, useEffect } from "react";
import SearchResults from "../../../components/common/SearchResults.jsx";

function QnaTab({ userId, isTeacherAvailable, subjectId, receiverId }) {
  const baseUrl = process.env.REACT_APP_BASE_URL;

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
  const chatInputRef = useRef(null);

  const [chat, setChat] = useState([]);
  // const [newMessage, setNewMessage] = useState("");
  const [qnaValue, setQnaValue] = useState("");
  const [allQnas, setAllQnas] = useState([]);
  const [qnaId, setQnaId] = useState("");
  const fetchMessages = async () => {
    try {
      const response = await fetch(
        baseUrl + "api/get-messages/" + userId + "/" + subjectId,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (!response) {
        throw new Error("Failed to fetch messages");
      }
      const data = await response.json();
      setChat(data);
      //   scrollActiveTabToBottom();
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async (e) => {
    console.log(qnaId);
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("sender_id", userId);
      formData.append("receiver_id", receiverId);
      formData.append("message", qnaValue);
      formData.append("subject_id", subjectId);
      formData.append("qna_id", qnaId);

      const response = await fetch(baseUrl + "api/send-message", {
        method: "POST",
        body: formData,
      });
      if (!response) {
        throw new Error("Failed to send message");
      }
      // setNewMessage("");
      setQnaValue("");
      chatInputRef.current.focus();

      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };



  // search qna
  function search(name) {
    setQnaValue(name);
    if (name.trim() === "") {
      // If the search input is empty or only contains spaces, clear the results
      setAllQnas([]);
    } else {
      let result = fetch(baseUrl + "api/search_school_questions/" + name).then(
        function (result) {
          result.json().then(function (jsonbody) {
            // console.warn(jsonbody);
            setAllQnas(jsonbody);
          });
        }
      );
    }
  }
  function handleResultClick(selectedValue, selectedId) {
    setQnaValue(selectedValue);
    setQnaId(selectedId);
    // setNewMessage(selectedValue);
    setAllQnas([]);
  }

  function shouldShowInput() {
   
    const mergedMessages = chat.merged_messages;

    // Check if chat and merged_messages exist and if merged_messages is not empty
    if (chat && mergedMessages && mergedMessages.length > 0) {
      const lastMessage = Object.values(mergedMessages).pop();

      // Check if lastMessage is defined and if it's from the user and hasn't been replied to
      return (
        lastMessage &&
        lastMessage.sender_id !== userId 
      );
    }
    // Default to false if there is no chat or merged_messages
    return true;
  }
  useEffect(() => {
    console.log("New Message after update:", qnaValue);
  }, [qnaValue]);

  useEffect(() => {
    fetchMessages();
    // const intervalId = setInterval(fetchMessages, 5000);
    // return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <div
        className="messages-content chat-wrapper scroll-bar p-3"
        style={{ height: 400 }}
      >
        {chat && chat.merged_messages ? (
          Object.values(chat.merged_messages).map((message, index) =>
            message.sender_id === userId ? (
              <div className="message-item outgoing-message" key={index}>
                <div className="message-user">
                  <figure className="avatar">
                    <img src="/assets/images/user_profile.jpg" alt="avater" />
                  </figure>
                  <div>
                    <h5>You</h5>
                    <div className="time">
                      {message.created_at &&
                        formatTimeFromTimestamp(message.created_at)}
                      <i className="ti-double-check text-info"></i>
                    </div>
                  </div>
                </div>
                <div className="message-wrap">{message.message}</div>
              </div>
            ) : (
              <div className="message-item" key={index}>
                <div className="message-user">
                  <figure className="avatar">
                    <img src="/assets/images/user.png" alt="avater" />
                  </figure>
                  <div>
                    <h5 className="font-xssss mt-2">Teacher</h5>
                    <div className="time">
                      {message.created_at &&
                        formatTimeFromTimestamp(message.created_at)}
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
        {isTeacherAvailable ? (
          <>
            {shouldShowInput() ? (
              <form
                className="chat-form position-absolute bottom-0 w-100 left-0 bg-white z-index-1 p-3 shadow-xs theme-dark-bg"
                onSubmit={sendMessage}
              >
                <button className="bg-grey float-left">
                  <i className="ti-microphone text-white" disabled></i>
                </button>
                <div className="form-group">
                  <input
                    type="text"
                    ref={chatInputRef}
                    placeholder={qnaValue ? "" : "Start typing.."}
                    onChange={(e) => search(e.target.value)}
                    value={qnaValue}
                    className="text-grey-500"
                    style={{color:"#000"}}
                  />
                </div>
                <button type="submit" className="bg-current">
                  <i className="ti-arrow-right text-white"></i>
                </button>
              </form>
            ) : (
              <div className="text-center position-absolute bottom-0 w-100 left-0 bg-white z-index-1 p-3 shadow-xs theme-dark-bg">
                <span>Waiting for response...</span>
              </div>
            )}
          </>
        ) : (
          <div className="text-center p-3">
            <span>Chat unavailable. No teacher assigned.</span>
          </div>
        )}
      </div>
      <div style={{ width: "100%" }}>
        {allQnas && allQnas.length > 0 && (
          <SearchResults results={allQnas} onResultClick={handleResultClick} />
        )}
      </div>
    </>
  );
}

export default QnaTab;
