import React ,{useState, useContext, useEffect, useRef} from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { AuthContext } from "../../../lib/AuthContext.js"

export const VideoPlayer = (props) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
 
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { options, onReady, onPlayerChange, videoId, subjectId, lastTimestamp  } = props;

  const [lastVideoId, setLastVideoId] = useState(0);
  
// Flag to check if the component is unmounting
const isUnmounting = useRef(false);
  useEffect(() => {

    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
      const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-big-play-centered');
      videoElement.classList.add('vjs-layout-medium');
      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
        onPlayerChange && onPlayerChange(player); // Pass the player instance to the parent
        player.currentTime(lastTimestamp);
      });

      
      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);

    }

    const player = playerRef.current;
// Listen for the 'ended' event
player.on('ended', () => {
  // Save timestamp when the video ends
  const currentTime = player.currentTime();
  saveTimestamp(lastVideoId, currentTime)
    .then(() => {
      // Optionally, you can do something after saving the timestamp
      console.log("Timestamp saved on video end");
    })
    .catch((error) => {
      console.error("Error saving timestamp:", error);
    });
});

  }, [options, videoRef]);


  

// Save timestamp when component unmounts or options change
useEffect(() => {
  // if (playerRef.current && options.sources && options.sources.length > 0 && isUnmounting.current) {
  //   console.log("component unmount");
  //   const currentTime = playerRef.current.currentTime();
  //   saveTimestamp(currentTime);
  // }

  if (playerRef.current && videoId && videoId !== '0') {
    const currentTime = playerRef.current.currentTime();

    // Save timestamp using the previous state of lastVideoId
    saveTimestamp(lastVideoId, currentTime)
      .then(() => {
        // Update lastVideoId with the new videoId
        setLastVideoId(videoId);
      })
      .catch((error) => {
        console.error("Error saving timestamp:", error);
      });
  }
}, [options, videoId]);

// Dispose the Video.js player when the functional component unmounts
useEffect(() => {
  const player = playerRef.current;


  return () => {
    if (player && !player.isDisposed()) {
      // Set the isUnmounting flag to true before unmounting
      isUnmounting.current = true;

      const currentTime = playerRef.current.currentTime();
      saveTimestamp(lastVideoId,currentTime);
      player.dispose();
      playerRef.current = null;
    }
  };
}, [playerRef]);

const saveTimestamp = async (videoId,currentTime) => {
  try {
    // console.log(videoId);
    if(videoId == 0){
      return
    }
    const formData = new FormData();
    formData.append("student_id", user_id);
    formData.append("video_id", videoId);
    formData.append("subject_id", subjectId);
    formData.append("timestamp", currentTime);

    const response = await fetch(baseUrl + "api/save_video_timestamp", {
      method: "POST",
      body: formData,
    });
    if (!response) {
      throw new Error("Failed to send message");
    }

  } catch (error) {
    console.error("Error sending message:", error);
  }
};

  const  user = useContext(AuthContext).user;
  if (!user) {
      // Handle the case when there is no user. You might want to redirect
      // to a login page or return null or some placeholder content.
      console.log("No user found. User might be logged out.");
      return <div>User is not logged in</div>;
    }
  const user_id = user.user.id;

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
      <i className="watermark" >{"userId"+user_id}</i>
      <img className="watermark_image"
        src="https://jonnasuresh.files.wordpress.com/2013/03/vtu-logo.png"
        alt="" style={{ opacity: 50, width: 50 }} />
    </div>

  );
}

export default VideoPlayer;

