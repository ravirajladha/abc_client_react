import React, { useState, useEffect } from "react";

function Timer({ initialDuration, onComplete }) {
  const [seconds, setSeconds] = useState(initialDuration);

  useEffect(() => {
    let interval;

    if (seconds !== null && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      onComplete();
    }

    return () => clearInterval(interval);
  }, [seconds, onComplete]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  return (
    <div>
      <h5>Test Ends in</h5>
      <p className="fs-4">{formatTime(seconds)}</p>
    </div>
  );
}

export default Timer;
