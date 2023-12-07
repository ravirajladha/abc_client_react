import React ,{useContext} from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { AuthContext } from "../../../lib/AuthContext.js"

export const VideoPlayer = (props) => {
 
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { options, onReady, onPlayerChange  } = props;
  const notes = [
    { timestamp: 10, note: 'Note at 10 seconds' },
    { timestamp: 30, note: 'Note at 30 seconds' },
    { timestamp: 50, note: 'Note at 50 seconds' },
    // Add more notes as needed
  ];
  React.useEffect(() => {

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
      });

      // createMarkers(player, notes);

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);



  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);



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

