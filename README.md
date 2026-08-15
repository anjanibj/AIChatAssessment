# AI Assistant Chat Application

An AI-powered chat application built using React Native, Expo, Node.js, Express, and Google Gemini API.

## Features

- AI-powered chat
- Send messages and receive AI responses
- Clear chat
- Loading indicator
- Error handling
- Simple and user-friendly interface

## Technologies Used

- React Native
- Expo
- TypeScript
- Node.js
- Express.js
- Google Gemini API
- Git and GitHub

## How It Works

1. User enters a message.
2. The React Native frontend sends the message to the backend.
3. Node.js and Express receive the message.
4. The backend sends the message to Google Gemini.
5. Gemini generates the AI response.
6. The response is displayed in the chat interface.

## Project Structure

```text
AIChatAssessment/
├── server/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── src/
│   └── app/
│       ├── _layout.tsx
│       ├── explore.tsx
│       └── index.tsx
├── assets/
├── package.json
├── package-lock.json
├── .gitignore
└── README.md