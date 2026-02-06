# MindGate Backend API

This is the backend API for the MindGate mental health support platform, built with Node.js, Express, and MongoDB.

## Features

- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **AI Chat System**: One-on-one conversations with therapists/listeners
- **Community Chat**: Real-time group messaging with automatic cleanup
- **Real-time Messaging**: WebSocket support via Socket.IO
- **Optimized MongoDB Schemas**: Separate schemas for different chat types

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Socket.IO** - Real-time communication
- **JWT** - Authentication
- **Bcrypt.js** - Password hashing

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Set up MongoDB
Make sure MongoDB is running on your system:
```bash
# On Windows
mongod

# On macOS/Linux
sudo systemctl start mongod
```

### 3. Configure Environment Variables
Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/mindgate
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 4. Start the Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `GET /api/auth/professionals` - Get all professionals

### AI Chat
- `POST /api/ai-chat/session` - Create new AI chat session
- `POST /api/ai-chat/message` - Send message in AI chat
- `GET /api/ai-chat/history/:conversationId` - Get chat history
- `POST /api/ai-chat/end/:conversationId` - End chat session
- `GET /api/ai-chat/sessions` - Get user's chat sessions

### Community Chat
- `POST /api/community/session` - Create new stream session
- `POST /api/community/join/:sessionId` - Join stream session
- `POST /api/community/message` - Send community message
- `GET /api/community/messages/:sessionId` - Get recent messages
- `POST /api/community/end/:sessionId` - End stream session
- `GET /api/community/active-sessions` - Get active sessions
- `GET /api/community/session/:sessionId` - Get session info

### Health Check
- `GET /api/health` - Check if API is running

## Database Schema

### Users Collection
Stores user information with type differentiation:
- Regular users (`userType: 'user'`)
- Professionals (`userType: 'professional'` with `professionalType: 'therapist'` or `'listener'`)

### AI Conversations Collection
Simple 1:1 conversation tracking between user and professional.

### AI Messages Collection
Lightweight message storage for therapy conversations.

### Stream Sessions Collection
Tracks live streaming sessions.

### Community Messages Collection
Ultra-lightweight messages with 24-hour TTL auto-cleanup.

## Real-time Features

The backend uses Socket.IO for real-time messaging:

### AI Chat Events
- `join-ai-chat` - Join an AI chat room
- `send-ai-message` - Send message in AI chat
- `ai-message-received` - Receive AI message

### Community Chat Events
- `join-community-chat` - Join a community chat room
- `send-community-message` - Send community message
- `community-message-received` - Receive community message

## Frontend Integration

The `src/services/api.js` file provides a complete JavaScript client for interacting with the API. Example usage:

```javascript
import api from './services/api';

// Register user
const userData = {
  username: 'johndoe',
  email: 'john@example.com',
  password: 'password123',
  firstName: 'John',
  lastName: 'Doe'
};
const result = await api.register(userData);

// Login
const loginResult = await api.login('john@example.com', 'password123');

// Create AI chat session
const session = await api.createAIChatSession(professionalId);

// Send message
const message = await api.sendAIMessage(conversationId, 'Hello!');
```

## Development Notes

- The backend is designed for horizontal scaling
- MongoDB indexes are optimized for chat performance
- Community messages auto-delete after 24 hours
- JWT tokens expire after 24 hours
- Proper error handling and validation throughout

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- CORS protection
- Rate limiting (can be added)
- Secure session management