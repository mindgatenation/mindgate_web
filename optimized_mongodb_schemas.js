// Optimized MongoDB Schemas for MindGate Platform

// SCHEMA 1: AI Chat (Professional/Psychologist Conversations)
// Purpose: One-on-one conversations with AI or human professionals
// Optimized for: Privacy, session tracking, and conversation history

const mongoose = require('mongoose');

// === AI CHAT SCHEMA ===
// Simplified for professional conversations

// User Schema (Enhanced for user types)
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: ['user', 'professional'], // user = regular user, professional = therapist/listener
    default: 'user'
  },
  professionalType: {
    type: String,
    enum: ['therapist', 'listener', null], // Only for professionals
    default: null
  },
  firstName: String,
  lastName: String,
  profilePicture: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// AI Conversation Schema (Minimal)
const aiConversationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  professionalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sessionId: {
    type: String, // For tracking session continuity
    required: true
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  endedAt: {
    type: Date,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

// AI Message Schema (Lightweight)
const aiMessageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AIConversation',
    required: true
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  messageType: {
    type: String,
    enum: ['text', 'image', 'audio'],
    default: 'text'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// === COMMUNITY/STREAM CHAT SCHEMA ===
// Purpose: Real-time community discussions and live stream chats
// Optimized for: High performance, minimal overhead, automatic cleanup

// Stream Session Schema
const streamSessionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  hostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  endedAt: {
    type: Date,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  maxParticipants: {
    type: Number,
    default: 1000
  }
});

// Community Message Schema (Ultra-lightweight)
const communityMessageSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
    maxlength: 500 // Limit for performance
  },
  timestamp: {
    type: Date,
    default: Date.now,
    expires: 86400 // Auto-delete after 24 hours (TTL index)
  }
});

// Create models
const User = mongoose.model('User', userSchema);
const AIConversation = mongoose.model('AIConversation', aiConversationSchema);
const AIMessage = mongoose.model('AIMessage', aiMessageSchema);
const StreamSession = mongoose.model('StreamSession', streamSessionSchema);
const CommunityMessage = mongoose.model('CommunityMessage', communityMessageSchema);

// TTL Index for automatic cleanup of community messages
CommunityMessage.collection.createIndex(
  { "timestamp": 1 },
  { expireAfterSeconds: 86400 } // 24 hours
);

module.exports = {
  User,
  AIConversation,
  AIMessage,
  StreamSession,
  CommunityMessage
};