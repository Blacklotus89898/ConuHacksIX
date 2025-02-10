  import { useEffect, useRef, useState } from 'react';
  import Peer from 'peerjs';

  // working one
  function VideoChat() {
    // States to manage peer ID, remote peer ID input, and references for video elements
    const [peerId, setPeerId] = useState('');
    const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
    const remoteVideoRef = useRef(null);
    const currentUserVideoRef = useRef(null);
    const peerInstance = useRef(null);

    useEffect(() => {
      // Initialize PeerJS
      const peer = new Peer();

      // On Peer connection open, set the peer ID
      peer.on('open', (id) => {
        setPeerId(id);
      });

      // Handling incoming calls
      peer.on('call', (call) => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then((mediaStream) => {
            // Display the current user's video
            currentUserVideoRef.current.srcObject = mediaStream;
            currentUserVideoRef.current.play();
            // Answer the call with user's media stream
            call.answer(mediaStream);
            // On receiving remote stream, display it
            call.on('stream', (remoteStream) => {
              remoteVideoRef.current.srcObject = remoteStream;
              remoteVideoRef.current.play();
            });
          })
          .catch((err) => {
            console.error('Failed to get media: ', err);
          });
      });

      // Store the peer instance for later use
      peerInstance.current = peer;

      // Cleanup function to destroy the peer instance when component unmounts
      return () => {
        peer.destroy();
      };
    }, []);

    // Function to initiate a call to a remote peer
    const call = (remotePeerId) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          // Display the current user's video
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.play();

          // Make a call to the remote peer with the media stream
          const call = peerInstance.current.call(remotePeerId, mediaStream);

          // On receiving remote stream, display it
          call.on('stream', (remoteStream) => {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          });
        })
        .catch((err) => {
          console.error('Failed to get media: ', err);
        });
    };

    return (
      <div className="VideoChat">
        <h1>Current user ID is: {peerId}</h1>
        <input 
          type="text" 
          value={remotePeerIdValue} 
          onChange={(e) => setRemotePeerIdValue(e.target.value)} 
          placeholder="Enter Remote Peer ID"
        />
        <button onClick={() => call(remotePeerIdValue)} disabled={!remotePeerIdValue}>
          Call
        </button>
        <div>
          <h2>Your Video</h2>
          <video ref={currentUserVideoRef} autoPlay playsInline style={{ width: "300px", border: "1px solid black" }} />
        </div>
        <div>
          <h2>Remote Video</h2>
          <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "300px", border: "1px solid black" }} />
        </div>
      </div>
    );
  }

  export default VideoChat;
