# GPTVerse
A full-stack ChatGPT replica built from scratch using the MERN stack and OpenAI API.
The application allows users to enter prompts and receive AI-generated responses in a real-time conversational interface.

## Features
- Interactive chat interface similar to ChatGPT
- Real-time AI responses using OpenAI API
- Maintains conversation flow and chat history
- Graceful handling of API errors and rate limits
- Clean and responsive UI

## Tech Stack
- Frontend: React, JavaScript, HTML, CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- AI Integration: OpenAI API

## How It Works
- User enters a prompt in the React frontend
- Prompt is sent to the backend via REST API
- Backend communicates with OpenAI API
- AI-generated response is returned and displayed in the UI

## What I Learned
- Full-stack application development using MERN
- API integration and secure server-side handling
- React state management using Hooks and Context API
- Error handling and asynchronous data flow

## Setup & Run Locally
```bash
# Clone the repository
git clone https://github.com/abhayraj08/GPTVerse.git

# Install backend dependencies
cd backend
touch .env
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Start backend server
node server.js

# Start frontend server
npm run dev
```

## Environment Variables
Add this in .env file
```env
OPENAI_API_KEY=your_api_key_here
DB_URL=your_atlas_database_link
```