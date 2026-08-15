const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.get("/", (req, res) => {
  res.json({
    message: "AI Chatbot server is running",
  });
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    console.log("User:", message);

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: message,
    });

    const reply = response.text;

    console.log("AI:", reply);

    res.json({
      reply: reply,
    });

  } catch (error) {
    console.error("Gemini Error:", error);

    res.status(500).json({
      error: "Failed to get AI response",
      details: error.message,
    });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`AI server running at http://localhost:${PORT}`);
});