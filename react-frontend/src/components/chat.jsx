import React, { useState, useRef, useEffect } from 'react';

export default function Chat() {
    const [message, setMessage] = useState('');
    const [user, setUser] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const ws = useRef(null);
    const chatTextareaRef = useRef(null);

    useEffect(() => {
        ws.current = new WebSocket('ws://192.168.0.101:8080'); // Change to your server IP
        ws.current.onmessage = event => {
            const reader = new FileReader();
            reader.onload = () => {
                const message = reader.result;
                setChatHistory(prevHistory => [...prevHistory, `${message}`]);
            };
            reader.readAsText(event.data);
        };

        return () => {
            ws.current.close();
        };
    }, []);

    const sendMessage = () => {
        if (ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(user + ": " + message);
            setChatHistory(prevHistory => [...prevHistory, `${user}: ${message}`]);
            setMessage('');
        }
    };

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    }

    useEffect(() => {
        if (chatTextareaRef.current) {
            chatTextareaRef.current.scrollTop = chatTextareaRef.current.scrollHeight;
        }
    }, [chatHistory]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f0f0f0',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
        }}>
            <h2>WebSocket Chat</h2>
            <input
                type="text"
                placeholder="Username"
                value={user}
                onChange={e => setUser(e.target.value)}
                style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    backgroundColor: 'white', // Change the background color to white
                    color: 'lightblue' // Change the text color to light blue
                }}
            />
            <textarea
                ref={chatTextareaRef}
                rows="10"
                cols="50"
                value={chatHistory.join('\n')}
                readOnly
                style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    resize: 'none',
                    backgroundColor: 'white', // Change the background color to white
                    color: 'lightblue' // Change the text color to light blue
                }}
            ></textarea>
            <br />
            <input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Type a message..."
                onKeyDown={handleKeyDown}
                style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    backgroundColor: 'white', // Change the background color to white
                    color: 'lightblue' // Change the text color to light blue
                }}
            />
            <button
                onClick={sendMessage}
                style={{
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
            >
                Send
            </button>
        </div>
    );
}
