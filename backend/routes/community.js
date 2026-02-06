const express = require('express');
const { StreamSession, CommunityMessage, User } = require('../models');

const router = express.Router();

// Create new stream session
router.post('/session', authenticateToken, async (req, res) => {
  try {
    const { title, maxParticipants = 1000 } = req.body;
    const hostId = req.user.userId;

    // Generate unique session ID
    const sessionId = `stream_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create stream session
    const session = new StreamSession({
      title,
      hostId,
      sessionId,
      maxParticipants
    });

    await session.save();

    res.status(201).json({
      message: 'Stream session created successfully',
      session: {
        id: session._id,
        sessionId: session.sessionId,
        title: session.title,
        hostId: session.hostId,
        startedAt: session.startedAt,
        maxParticipants: session.maxParticipants,
        isActive: session.isActive
      }
    });
  } catch (error) {
    console.error('Create session error:', error);
    res.status(500).json({ error: 'Failed to create stream session' });
  }
});

// Join stream session
router.post('/join/:sessionId', authenticateToken, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user.userId;

    // Verify session exists and is active
    const session = await StreamSession.findOne({
      sessionId: sessionId,
      isActive: true
    });

    if (!session) {
      return res.status(404).json({ error: 'Active session not found' });
    }

    // Check participant limit
    const participantCount = await CommunityMessage.countDocuments({ sessionId });
    if (participantCount >= session.maxParticipants) {
      return res.status(400).json({ error: 'Session is at maximum capacity' });
    }

    res.json({
      message: 'Successfully joined session',
      session: {
        id: session._id,
        sessionId: session.sessionId,
        title: session.title,
        startedAt: session.startedAt,
        isActive: session.isActive
      }
    });
  } catch (error) {
    console.error('Join session error:', error);
    res.status(500).json({ error: 'Failed to join session' });
  }
});

// Send community message
router.post('/message', authenticateToken, async (req, res) => {
  try {
    const { sessionId, content } = req.body;
    const userId = req.user.userId;

    // Verify session exists and is active
    const session = await StreamSession.findOne({
      sessionId: sessionId,
      isActive: true
    });

    if (!session) {
      return res.status(404).json({ error: 'Active session not found' });
    }

    // Get user info for username
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create message (content automatically limited to 500 chars by schema)
    const message = new CommunityMessage({
      sessionId,
      userId,
      username: user.username,
      content
    });

    await message.save();

    res.status(201).json({
      message: 'Message sent successfully',
      messageData: {
        id: message._id,
        sessionId: message.sessionId,
        userId: message.userId,
        username: message.username,
        content: message.content,
        timestamp: message.timestamp
      }
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Get recent community messages
router.get('/messages/:sessionId', authenticateToken, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { limit = 100 } = req.query;

    // Verify session exists
    const session = await StreamSession.findOne({ sessionId });
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Get recent messages
    const messages = await CommunityMessage.find({ sessionId })
      .sort({ timestamp: -1 })
      .limit(parseInt(limit))
      .select('userId username content timestamp');

    // Reverse to show oldest first
    const orderedMessages = messages.reverse();

    res.json({
      session: {
        id: session._id,
        sessionId: session.sessionId,
        title: session.title,
        startedAt: session.startedAt,
        isActive: session.isActive,
        endedAt: session.endedAt
      },
      messages: orderedMessages.map(msg => ({
        id: msg._id,
        userId: msg.userId,
        username: msg.username,
        content: msg.content,
        timestamp: msg.timestamp
      }))
    });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// End stream session
router.post('/end/:sessionId', authenticateToken, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user.userId;

    // Verify session exists and user is host
    const session = await StreamSession.findOne({
      sessionId: sessionId,
      hostId: userId
    });

    if (!session) {
      return res.status(404).json({ error: 'Session not found or you are not the host' });
    }

    // End session
    session.isActive = false;
    session.endedAt = new Date();
    await session.save();

    res.json({
      message: 'Stream session ended successfully',
      session: {
        id: session._id,
        sessionId: session.sessionId,
        title: session.title,
        isActive: session.isActive,
        endedAt: session.endedAt
      }
    });
  } catch (error) {
    console.error('End session error:', error);
    res.status(500).json({ error: 'Failed to end stream session' });
  }
});

// Get active stream sessions
router.get('/active-sessions', authenticateToken, async (req, res) => {
  try {
    const sessions = await StreamSession.find({ isActive: true })
      .sort({ startedAt: -1 })
      .populate('hostId', 'username firstName lastName');

    res.json(sessions.map(session => ({
      id: session._id,
      sessionId: session.sessionId,
      title: session.title,
      host: {
        id: session.hostId._id,
        username: session.hostId.username,
        firstName: session.hostId.firstName,
        lastName: session.hostId.lastName
      },
      startedAt: session.startedAt,
      maxParticipants: session.maxParticipants,
      isActive: session.isActive
    })));
  } catch (error) {
    console.error('Get active sessions error:', error);
    res.status(500).json({ error: 'Failed to fetch active sessions' });
  }
});

// Get session info
router.get('/session/:sessionId', authenticateToken, async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await StreamSession.findOne({ sessionId })
      .populate('hostId', 'username firstName lastName');

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.json({
      session: {
        id: session._id,
        sessionId: session.sessionId,
        title: session.title,
        host: {
          id: session.hostId._id,
          username: session.hostId.username,
          firstName: session.hostId.firstName,
          lastName: session.hostId.lastName
        },
        startedAt: session.startedAt,
        endedAt: session.endedAt,
        isActive: session.isActive,
        maxParticipants: session.maxParticipants
      }
    });
  } catch (error) {
    console.error('Get session info error:', error);
    res.status(500).json({ error: 'Failed to fetch session info' });
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