const express = require('express');
const { AIConversation, AIMessage, User } = require('../models');

const router = express.Router();

// Create new AI chat session
router.post('/session', authenticateToken, async (req, res) => {
  try {
    const { professionalId } = req.body;
    const userId = req.user.userId;

    // Verify professional exists
    const professional = await User.findOne({ 
      _id: professionalId,
      userType: 'professional',
      professionalType: { $in: ['therapist', 'listener'] }
    });

    if (!professional) {
      return res.status(404).json({ error: 'Professional not found' });
    }

    // Generate unique session ID
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create conversation
    const conversation = new AIConversation({
      userId,
      professionalId,
      sessionId
    });

    await conversation.save();

    res.status(201).json({
      message: 'AI chat session created successfully',
      conversation: {
        id: conversation._id,
        sessionId: conversation.sessionId,
        userId: conversation.userId,
        professionalId: conversation.professionalId,
        startedAt: conversation.startedAt
      }
    });
  } catch (error) {
    console.error('Create session error:', error);
    res.status(500).json({ error: 'Failed to create chat session' });
  }
});

// Send message in AI chat
router.post('/message', authenticateToken, async (req, res) => {
  try {
    const { conversationId, content, messageType = 'text' } = req.body;
    const senderId = req.user.userId;

    // Verify conversation exists and user has access
    const conversation = await AIConversation.findOne({
      _id: conversationId,
      $or: [
        { userId: senderId },
        { professionalId: senderId }
      ]
    });

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found or access denied' });
    }

    if (!conversation.isActive) {
      return res.status(400).json({ error: 'Conversation is no longer active' });
    }

    // Create message
    const message = new AIMessage({
      conversationId,
      senderId,
      content,
      messageType
    });

    await message.save();

    res.status(201).json({
      message: 'Message sent successfully',
      messageData: {
        id: message._id,
        conversationId: message.conversationId,
        senderId: message.senderId,
        content: message.content,
        messageType: message.messageType,
        timestamp: message.timestamp
      }
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Get chat history
router.get('/history/:conversationId', authenticateToken, async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user.userId;

    // Verify conversation access
    const conversation = await AIConversation.findOne({
      _id: conversationId,
      $or: [
        { userId: userId },
        { professionalId: userId }
      ]
    });

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found or access denied' });
    }

    // Get messages
    const messages = await AIMessage.find({ conversationId })
      .sort({ timestamp: 1 })
      .populate('senderId', 'username firstName lastName userType professionalType');

    res.json({
      conversation: {
        id: conversation._id,
        sessionId: conversation.sessionId,
        startedAt: conversation.startedAt,
        endedAt: conversation.endedAt,
        isActive: conversation.isActive
      },
      messages: messages.map(msg => ({
        id: msg._id,
        sender: {
          id: msg.senderId._id,
          username: msg.senderId.username,
          firstName: msg.senderId.firstName,
          lastName: msg.senderId.lastName,
          userType: msg.senderId.userType,
          professionalType: msg.senderId.professionalType
        },
        content: msg.content,
        messageType: msg.messageType,
        timestamp: msg.timestamp
      }))
    });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});

// End AI chat session
router.post('/end/:conversationId', authenticateToken, async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user.userId;

    // Verify conversation access
    const conversation = await AIConversation.findOne({
      _id: conversationId,
      $or: [
        { userId: userId },
        { professionalId: userId }
      ]
    });

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found or access denied' });
    }

    // End conversation
    conversation.isActive = false;
    conversation.endedAt = new Date();
    await conversation.save();

    res.json({
      message: 'Chat session ended successfully',
      conversation: {
        id: conversation._id,
        sessionId: conversation.sessionId,
        isActive: conversation.isActive,
        endedAt: conversation.endedAt
      }
    });
  } catch (error) {
    console.error('End session error:', error);
    res.status(500).json({ error: 'Failed to end chat session' });
  }
});

// Get user's AI chat sessions
router.get('/sessions', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const conversations = await AIConversation.find({
      $or: [
        { userId: userId },
        { professionalId: userId }
      ]
    })
    .sort({ startedAt: -1 })
    .populate('userId', 'username firstName lastName')
    .populate('professionalId', 'username firstName lastName professionalType');

    res.json(conversations.map(conv => ({
      id: conv._id,
      sessionId: conv.sessionId,
      user: {
        id: conv.userId._id,
        username: conv.userId.username,
        firstName: conv.userId.firstName,
        lastName: conv.userId.lastName
      },
      professional: {
        id: conv.professionalId._id,
        username: conv.professionalId.username,
        firstName: conv.professionalId.firstName,
        lastName: conv.professionalId.lastName,
        professionalType: conv.professionalId.professionalType
      },
      startedAt: conv.startedAt,
      endedAt: conv.endedAt,
      isActive: conv.isActive
    })));
  } catch (error) {
    console.error('Get sessions error:', error);
    res.status(500).json({ error: 'Failed to fetch chat sessions' });
  }
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

module.exports = router;