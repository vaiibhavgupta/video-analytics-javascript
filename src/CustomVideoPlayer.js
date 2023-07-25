import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";

export default function VideoPlayer() {
  const divRef = useRef(null);
  const [isDivInFocus, setIsDivInFocus] = useState(null);

  const playerRef = useRef(null);
  const [watchDuration, setWatchDuration] = useState(0);
  // const [skippedDuration, setskippedDuration] = useState(0);
  const [pauseTimestamps, setPauseTimestamps] = useState([]);
  const [skippedTimestamps, setSkippedTimestamps] = useState([]);
  const [speedChangeTimestamps, setSpeedChangeTimestamps] = useState([{ timestamp: 0, speed: 1 }]);

  // play video if visible in view port
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 1, // Fully visible in the viewport
    });

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, []);

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsDivInFocus(true);
      } else {
        setIsDivInFocus(false);
      }
    });
  };

  // update watch duration
  const handleProgress = (progress) => {
    const currentTime = progress.playedSeconds;
    if (Math.abs(currentTime - watchDuration) > 1.1 * speedChangeTimestamps.slice(-1)[0].speed) {
      setSkippedTimestamps((prevTimestamps) => [...prevTimestamps, { start: watchDuration, end: currentTime }]);
    }
    setWatchDuration(currentTime);
  };

  // update timestamps when playback speed is changed
  const handlePlaybackRateChange = (newPlaybackRate) => {
    setSpeedChangeTimestamps((prevTimestamps) => [
      ...prevTimestamps,
      { timestamp: watchDuration, speed: newPlaybackRate },
    ]);
  };

  // update pause timestamps
  const handlePlay = () => {
    const currentTime = playerRef.current.getCurrentTime();
    if (currentTime > 1 && currentTime > watchDuration && currentTime - watchDuration < 1) {
      if (skippedTimestamps.length > 0) {
        // this if else loop prevents registration of a pause within a second of a skip.
        // checking if length of skippedTimestamps > 0 to apply the logic.
        // if length = 0, then register a pause as there are no skips yet.
        if (currentTime - skippedTimestamps.slice(-1)[0].end > 1) {
          pauseTimestamps.push(currentTime);
          setPauseTimestamps(pauseTimestamps);
        }
      } else {
        pauseTimestamps.push(currentTime);
      }
    }
  };

  return (
    <div>
      <div ref={divRef} className="flex justify-center">
        <ReactPlayer
          ref={playerRef}
          // url="https://www.youtube.com/watch?v=RpaxxN8jTHo"
          url="https://www.youtube.com/watch?v=EiYm20F9WXU"
          controls
          playing={isDivInFocus}
          onProgress={handleProgress}
          onPlaybackRateChange={handlePlaybackRateChange}
          onPlay={handlePlay}
        />
      </div>
      <br />
      <div>
        <p>Watch Duration: {watchDuration.toFixed(2)} seconds</p>
        <br />
        <hr />
        <br />
        <div>
          <h4>Skipped Timestamps (in seconds):</h4>
          <ul>
            {skippedTimestamps.map((timestamp, index) => (
              <li key={index}>
                {index + 1}. From {timestamp.start.toFixed(2)} to {timestamp.end.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
        <br />
        <hr />
        <br />
        <div>
          <h4>Modifications to Playback Speed:</h4>
          <ul>
            {speedChangeTimestamps.map((timestamp, index) => (
              <li key={index}>
                {index + 1}. Set at {timestamp.speed}x at {timestamp.timestamp.toFixed(2)} seconds
              </li>
            ))}
          </ul>
        </div>
        <br />
        <hr />
        <br />
        <div>
          <h4>Pause Timestamps:</h4>
          <ul>
            {pauseTimestamps.map((timestamp, index) => (
              <li key={index}>
                {index + 1}. {timestamp.toFixed(2)} seconds
              </li>
            ))}
          </ul>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
