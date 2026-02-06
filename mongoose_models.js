// Mongoose Models for Conversations and Messages

const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    trim: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 50
  },
  profilePicture: {
    type: String,
    default: null
  },
  lastSeen: {
    type: Date,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Indexes for User
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

const User = mongoose.model('User', userSchema);

// Message Subdocument Schema
const messageSubdocumentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  readAt: {
    type: Date,
    default: Date.now
  }
}, {
  _id: false // Disable _id for subdocuments
});

// Message Schema
const messageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
    index: true
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  content: {
    type: String,
    required: true,
    maxlength: 10000 // Limit message length
  },
  messageType: {
    type: String,
    enum: ['text', 'image', 'file', 'audio', 'video'],
    default: 'text'
  },
  fileUrl: {
    type: String,
    default: null
  },
  fileName: {
    type: String,
    default: null
  },
  fileSize: {
    type: Number,
    default: null
  },
  replyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
    default: null
  },
  isRead: [messageSubdocumentSchema] // Array of read receipts
}, {
  timestamps: true
});

// Indexes for Message
messageSchema.index({ conversationId: 1, createdAt: 1 });
messageSchema.index({ senderId: 1 });
messageSchema.index({ createdAt: -1 }); // For sorting by newest

const Message = mongoose.model('Message', messageSchema);

// Participant Subdocument Schema
const participantSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  joinedAt: {
    type: Date,
    default: Date.now
  },
  leftAt: {
    type: Date,
    default: null
  },
  isRemoved: {
    type: Boolean,
    default: false
  }
}, {
  _id: false
});

// Last Message Schema (embedded)
const lastMessageSchema = new mongoose.Schema({
  messageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },
  content: {
    type: String
  },
  timestamp: {
    type: Date
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  _id: false
});

// Conversation Schema
const conversationSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: 100,
    default: null
  },
  type: {
    type: String,
    enum: ['direct', 'group'],
    default: 'direct',
    required: true
  },
  participants: [participantSchema],
  lastMessage: lastMessageSchema,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for Conversation
conversationSchema.index({ 'participants.userId': 1 });
conversationSchema.index({ updatedAt: -1 }); // For sorting by most recent

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = {
  User,
  Conversation,
  Message
};