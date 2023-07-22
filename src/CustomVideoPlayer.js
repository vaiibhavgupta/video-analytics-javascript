import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";

export default function VideoPlayer() {
  const playerRef = useRef(null);

  const [watchDuration, setWatchDuration] = useState(0);

  const [speedChangeTimestamps, setSpeedChangeTimestamps] = useState([
    { timestamp: 0, speed: 1 },
  ]);

  const [pauseTimestamps, setPauseTimestamps] = useState([]);

  const [skippedTimestamps, setSkippedTimestamps] = useState([]);

  const handleProgress = (progress) => {
    const currentTime = progress.playedSeconds;
    if (
      currentTime - watchDuration >
      1.1 * speedChangeTimestamps.slice(-1)[0].speed
    ) {
      setSkippedTimestamps((prevTimestamps) => [
        ...prevTimestamps,
        { start: watchDuration, end: currentTime },
      ]);
    }

    setWatchDuration(currentTime);
  };

  const handlePlaybackRateChange = (newPlaybackRate) => {
    setSpeedChangeTimestamps((prevTimestamps) => [
      ...prevTimestamps,
      { timestamp: watchDuration, speed: newPlaybackRate },
    ]);
  };

  const handlePlay = () => {
    const currentTime = playerRef.current.getCurrentTime();
    if (
      currentTime > 1 &&
      currentTime > watchDuration &&
      currentTime - watchDuration < 1
    ) {
      if (skippedTimestamps.length > 0) {
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
      <div className="flex justify-center">
        <ReactPlayer
          ref={playerRef}
          url="https://www.youtube.com/watch?v=RpaxxN8jTHo"
          controls
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
                {index + 1}. From {timestamp.start.toFixed(2)} to{" "}
                {timestamp.end.toFixed(2)}
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
                {index + 1}. Set at {timestamp.speed}x at{" "}
                {timestamp.timestamp.toFixed(2)} seconds
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
        <br />
        <hr />
        <br />
      </div>
    </div>
  );
}
