# AI Assistant Chat Application

An AI-powered chat application built using React Native, Expo, Node.js, Express, and Google Gemini API.

## Features

- AI-powered chat
- Send messages and receive AI responses
- Clear chat functionality
- Loading indicator while AI is responding
- Error handling
- Simple and user-friendly chat interface
- Web support using Expo

## Technologies Used

- React Native
- Expo
- TypeScript
- Node.js
- Express.js
- CORS
- dotenv
- Google Gemini API
- Visual Studio Code
- Git
- GitHub
- npm

## How the Project Works

1. The user enters a message in the chat interface.
2. The React Native / Expo frontend sends the message to the backend.
3. The Node.js and Express backend receives the message.
4. The backend sends the message to the Google Gemini API.
5. Gemini generates an AI response.
6. The backend sends the response back to the frontend.
7. The AI response is displayed in the chat interface.

## Project Structure

```text
AIChatAssessment/
│
├── server/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── src/
│   └── app/
│       ├── _layout.tsx
│       └── index.tsx
│
├── assets/
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## How to Run the Project in VS Code

### 1. Open the Project

Open the `AIChatAssessment` folder in Visual Studio Code.

### 2. Install Frontend Dependencies

Open the VS Code terminal:

```bash
npm install
```

### 3. Configure Gemini API

Create the following file:

```text
server/.env
```

Add your Gemini API key:

```env
GEMINI_API_KEY=your_api_key_here
```

**Do not upload the `.env` file to GitHub.**

### 4. Run the Backend

Open **Terminal 1** in VS Code.

From the project root:

```bash
cd server
node server.js
```

The backend will run at:

```text
http://localhost:3001
```

Keep this terminal running.

### 5. Run the Expo Frontend

Open a **new Terminal 2** in VS Code.

If the terminal is inside the `server` folder:

```bash
cd ..
```

Then run:

```bash
npx expo start --web
```

Expo will display the web URL in the terminal.

For example:

```text
http://localhost:8081
```

If port `8081` is already being used, Expo may use another port, such as:

```text
http://localhost:8083
```

Open the displayed URL in the browser.

## Required Terminals

### Terminal 1 - Backend

```bash
cd server
node server.js
```

### Terminal 2 - Expo Frontend

```bash
cd ..
npx expo start --web
```

Both terminals must remain running while using the application.

## API Endpoint

### POST /chat

The frontend sends the user's message to:

```text
http://localhost:3001/chat
```

### Example Request

```json
{
  "message": "What is DSA?"
}
```

### Example Response

```json
{
  "reply": "DSA stands for Data Structures and Algorithms..."
}
```

## Application Flow

```text
User
  ↓
React Native / Expo
  ↓
Node.js + Express
  ↓
Google Gemini API
  ↓
AI Response
  ↓
Chat Interface
```

## Security

The Gemini API key is stored in:

```text
server/.env
```

The `.env` file is excluded using `.gitignore`.

**Never commit or share your API key publicly.**

## GitHub Repository

[AIChatAssessment](https://github.com/anjanibj/AIChatAssessment)

## Author

**Anjani B J**

BE - Computer Science and Engineering (Data Science)