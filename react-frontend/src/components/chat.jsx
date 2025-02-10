import React, { useState, useRef, useEffect } from 'react';

export default function Chat() {
    const [message, setMessage] = useState('');
    const [user, setUser] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const ws = useRef(null);
    const chatTextareaRef = useRef(null);

    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:8080'); //change to your server IP
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
            sendMessage();
        }
    }

    useEffect(() => {
        if (chatTextareaRef.current) {
            chatTextareaRef.current.scrollTop = chatTextareaRef.current.scrollHeight;
        }
    }, [chatHistory]);

    return (
        <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
            <h2>WebSocket Chat</h2>
            <input type="text" placeholder='Username' value={user} onChange={e => setUser(e.target.value)} />
            <textarea
                ref={chatTextareaRef}
                rows="10" cols="50" value={chatHistory.join('\n')} readOnly></textarea><br />
            <input

                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Type a message..."
                onKeyDown={handleKeyDown}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

