import { useState } from "react";

const ChatGPTRequest = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleRequest = async () => {
    if (!input) {
      console.error("Input is missing");
      setResponse("Please provide an input.");
      return;
    }

    try {
      // Send the request to your backend server instead of OpenAI directly
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),  // Send the user's input to backend
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("API Error:", errorData);
        setResponse(`Error: ${errorData.error}`);
        return;
      }

      const data = await res.json();
      setResponse(data.choices[0].message.content);  // Set response from the backend
    } catch (error) {
      console.error("Error:", error);
      setResponse("Failed to fetch response.");
    }
  };

  return (
    <div>
      <h2>ChatGPT React API Example</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={handleRequest} disabled>Send</button>
      <p>Response: {response}</p>
    </div>
  );
};

export default ChatGPTRequest;
