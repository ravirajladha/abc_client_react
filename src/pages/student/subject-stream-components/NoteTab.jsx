import React, { useRef, useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { toast, ToastContainer } from "react-toastify";

function NoteTab({ userId, videoPlayer, activeVideoId }) {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const noteContentRef = useRef(null);
    // format timestamp
    const formatNoteTimestamp = (timestamp) => {
        const minutes = Math.floor(timestamp / 60);
        const seconds = Math.floor(timestamp % 60);
        return `${minutes}:${seconds}`;
    };
    const [notes, setNotes] = useState([]);

    const [noteTimestamp, setNoteTimestamp] = useState('0:00');
    const [newNote, setNewNote] = useState("");
    const [markersCreated, setMarkersCreated] = useState(false);
    // save note modal
    const [modal1Open, setModal1Open] = useState(false);
    const closeModal1 = () => setModal1Open(false);

    // capture the current time of the video player on clicking on the add note button
    const handleAddNoteClick = () => {
        const currentTime = videoPlayer ? videoPlayer.currentTime() : 0;
        // console.log(currentTime);
        setNoteTimestamp(currentTime);
        setModal1Open(true);

    };

    // change the video timestamp on clicking on the note
    const handleNoteClick = (noteTimestamp) => {
        if (videoPlayer) {
            videoPlayer.currentTime(noteTimestamp);
        }
    };

    const fetchNotes = async () => {
        try {
            const response = await fetch(
                baseUrl + "api/get-notes/" + userId + "/" + activeVideoId,
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
            setNotes(data);
 

        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };


    const storeNotes = async (e) => {
        e.preventDefault();
        try {
            if (!newNote.trim()) {
                // Show toaster message for empty note
                toast.error("Please enter a note before saving.");
                return
            }else{
                const formData = new FormData();
                formData.append("student_id", userId);
                formData.append("video_id", activeVideoId);
                formData.append("note", newNote);
                formData.append("timestamp", noteTimestamp);
    
                const response = await fetch(baseUrl + "api/store-notes", {
                    method: "POST",
                    body: formData,
                });
                if (!response) {
                    throw new Error("Failed to store notes");
                }
                setModal1Open(false);
                setNewNote("");
                fetchNotes();
                setMarkersCreated(false);
                createMarkers(videoPlayer, notes);
            }
            
        } catch (error) {
            console.error("Error storing notes:", error);
        }
    };
    
    const createMarkers = (player, notes) => {
        // console.warn(activeVideoId);
        // console.log(player);
            // Additional setup if needed
            if (markersCreated) {
                return;
            }
            const total = player.duration();
            const progressControl = player.controlBar.progressControl.children_[0].el_;
            clearMarkers(progressControl);
            // console.log(player);
            // console.warn(total);
            // console.log(notes);
            // Ensure notes.notes is an array before using forEach
        if (Array.isArray(notes.notes)) {
            notes.notes.forEach((note) => {
                // console.log(note);
                const left = (note.timestamp / total) * 100 + '%';
                const time = note.timestamp;

                const markerElement = document.createElement('div');
                markerElement.className = 'vjs-marker';
                markerElement.style = `left:${left}`;
                markerElement.setAttribute('data-time', time);
                markerElement.innerHTML = `<span>${note.note}</span>`;

                markerElement.addEventListener('click', () => {
                    player.currentTime(time);
                });

                progressControl.appendChild(markerElement);
            });
            setMarkersCreated(true); 
        }
    };
    const clearMarkers = (progressControl) => {
        const existingMarkers = progressControl.getElementsByClassName('vjs-marker');
        Array.from(existingMarkers).forEach((marker) => {
          marker.remove();
        });
      };

    


// useEffect to execute code after setNotes has completed
useEffect(() => {
    // Check if videoPlayer and notes are defined
    if (videoPlayer && notes) {
        if (videoPlayer.isReady_) {
            createMarkers(videoPlayer, notes);
        } else {
            // If not ready, wait for the 'ready' event
            videoPlayer.ready(() => {
                createMarkers(videoPlayer, notes);
            });
        }
    }
}, [notes, videoPlayer]);

    useEffect(()=>{
        fetchNotes();
        return () => {
            setMarkersCreated(false);
        };
    },[activeVideoId]);
 
  
    return (
        <>

            <div
                className="messages-content chat-wrapper scroll-bar p-3"
                style={{ height: 400 }}
                ref={noteContentRef}
            >
                {notes && notes.notes ? (
                    notes &&
                    notes.notes.map((note, index) => (
                        <div
                            className="message-item outgoing-message"
                            key={index}
                        >
                            <div className="message-user">
                                <div>
                                    <div className="time">
                                        {formatNoteTimestamp(note.timestamp)}
                                    </div>
                                </div>
                            </div>
                            <div className="message-wrap" onClick={() => handleNoteClick(note.timestamp)}>{note.note}</div>

                        </div>
                    ))
                ) : (
                    <div className="message-item"></div>
                )}
            </div>

            <div className="text-center">
                <button type="button" className=" mb-2 header-btn bg-current fw-500 text-white font-xsss p-2 lh-32 w100 text-center d-inline-block rounded-xl " onClick={handleAddNoteClick}>Add Note</button>
            </div>
            <Modal show={modal1Open} onHide={closeModal1} >
                <Modal.Header closeButton >
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <ToastContainer autoClose={3000} />

                    <div className="header-btn bg-dark fw-500 text-white font-xsss p-1 lh-32 w100 text-center d-inline-block rounded-xl mb-3" id="time">
                        {formatNoteTimestamp(noteTimestamp)}
                    </div>
                    <div className="form-group icon-input mb-3">
                        <i className="font-sm ti-email text-grey-500 pr-0"></i>
                        <input type="text" name="note" className="style2-input pl-5 form-control text-grey-900 font-xsss fw-600" placeholder="Enter Note.."
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            required   />

                    </div>
                    <div className="form-group mb-1"><button type="submit" className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 " onClick={storeNotes}>Save</button></div>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>

        </>
    )
}

export default NoteTab
