// server.js
const express = require("express");
const { OpenAI } = require("openai");
require('dotenv').config(); // This loads the .env file
const cors = require("cors");


const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Store your key securely using environment variables
});

app.post("/api/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or "gpt-4" if you have access
      messages: [{ role: "user", content: prompt }],
    });

    res.json(completion);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch from OpenAI" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
