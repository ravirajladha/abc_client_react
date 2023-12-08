import React, { useRef, useState, useEffect } from "react";

function QnaTab({
  userId,
  isTeacherAvailable,
  subjectId,
  receiverId,
}) {
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
  const [newMessage, setNewMessage] = useState("");

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
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("sender_id", userId);
      formData.append("receiver_id", receiverId);
      formData.append("message", newMessage);

      const response = await fetch(baseUrl + "api/send-message", {
        method: "POST",
        body: formData,
      });
      if (!response) {
        throw new Error("Failed to send message");
      }
      setNewMessage("");
      chatInputRef.current.focus();

      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  useEffect(() => {
    console.log("New Message after update:", newMessage);
  }, [newMessage]);

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
                    <img src="/assets/images/user.png" alt="avater" />
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
             <form
             className="chat-form position-absolute bottom-0 w-100 left-0 bg-white z-index-1 p-3 shadow-xs theme-dark-bg"
             onSubmit={sendMessage}
           >
             <button className="bg-grey float-left">
               <i
                 className="ti-microphone text-white"
                 disabled
               ></i>
             </button>
             <div className="form-group">
               <input
                 type="text"
                 ref={chatInputRef}
                 // placeholder="start typing"
                 placeholder={newMessage ? "" : "Start typing.."}
                 value={newMessage}
                 onChange={(e) => setNewMessage(e.target.value)}
                 onClick={() => setNewMessage("")}
                 className="text-grey-500"
               />
             </div>
             <button type="submit" className="bg-current">
               <i className="ti-arrow-right text-white"></i>
             </button>
           </form>
        ) : (
          <div className="text-center p-3">
            <span>Chat unavailable. No teacher assigned.</span>
          </div>
        )}
      </div>
    </>
  );
}

export default QnaTab;
