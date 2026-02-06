const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const aiChatRoutes = require('./routes/aiChat');
const communityRoutes = require('./routes/community');

// Import MongoDB models
const { User, AIConversation, AIMessage, StreamSession, CommunityMessage } = require('./models');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your React app URL
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mindgate')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai-chat', aiChatRoutes);
app.use('/api/community', communityRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'MindGate backend is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Socket.io for real-time messaging
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join AI chat room
  socket.on('join-ai-chat', (conversationId) => {
    socket.join(`ai-${conversationId}`);
    console.log(`User joined AI chat room: ai-${conversationId}`);
  });

  // Join community chat room
  socket.on('join-community-chat', (sessionId) => {
    socket.join(`community-${sessionId}`);
    console.log(`User joined community chat room: community-${sessionId}`);
  });

  // Handle AI messages
  socket.on('send-ai-message', async (data) => {
    try {
      const { conversationId, senderId, content, messageType = 'text' } = data;
      
      const message = new AIMessage({
        conversationId,
        senderId,
        content,
        messageType
      });
      
      await message.save();
      
      // Broadcast to room
      io.to(`ai-${conversationId}`).emit('ai-message-received', {
        messageId: message._id,
        conversationId,
        senderId,
        content,
        messageType,
        timestamp: message.timestamp
      });
    } catch (error) {
      console.error('Error sending AI message:', error);
      socket.emit('message-error', { error: 'Failed to send message' });
    }
  });

  // Handle community messages
  socket.on('send-community-message', async (data) => {
    try {
      const { sessionId, userId, username, content } = data;
      
      const message = new CommunityMessage({
        sessionId,
        userId,
        username,
        content
      });
      
      await message.save();
      
      // Broadcast to room (excluding sender)
      socket.to(`community-${sessionId}`).emit('community-message-received', {
        messageId: message._id,
        sessionId,
        userId,
        username,
        content,
        timestamp: message.timestamp
      });
    } catch (error) {
      console.error('Error sending community message:', error);
      socket.emit('message-error', { error: 'Failed to send message' });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});