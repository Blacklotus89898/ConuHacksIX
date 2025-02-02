import React, { useState, useRef } from "react";

const ScreenShare = () => {
  const [isSharing, setIsSharing] = useState(false);
  const videoRef = useRef(null);
  const [error, setError] = useState(null);

  const startScreenShare = async () => {
    try {
      // Request screen sharing
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: "always", // You can also set 'never' to hide the cursor
        },
      });

      // Set the video element source to the shared screen stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsSharing(true);
      }

      // Stop sharing when user stops the stream
      stream.getTracks().forEach(track => {
        track.onended = () => {
          setIsSharing(false);
        };
      });
    } catch (err) {
      setError("Error accessing screen sharing: " + err.message);
    }
  };

  const stopScreenShare = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsSharing(false);
    }
  };

  return (
    <div>
      <h2>Screen Sharing Example</h2>

      {/* Displaying Error if any */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <button onClick={startScreenShare} disabled={isSharing}>
          Start Screen Share
        </button>
        <button onClick={stopScreenShare} disabled={!isSharing}>
          Stop Screen Share
        </button>
      </div>

      {/* Displaying the screen share */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "100%", height: "auto", border: "1px solid #ddd" }}
      ></video>
    </div>
  );
};

export default ScreenShare;
