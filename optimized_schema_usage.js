// Usage Examples for Optimized MongoDB Schemas

const { User, AIConversation, AIMessage, StreamSession, CommunityMessage } = require('./optimized_mongodb_schemas');

// === AI CHAT EXAMPLES ===

// Create a regular user
async function createRegularUser(userData) {
  const user = new User({
    username: userData.username,
    email: userData.email,
    passwordHash: userData.passwordHash,
    userType: 'user',
    firstName: userData.firstName,
    lastName: userData.lastName
  });
  
  await user.save();
  return user;
}

// Create a professional (therapist or listener)
async function createProfessional(professionalData) {
  const professional = new User({
    username: professionalData.username,
    email: professionalData.email,
    passwordHash: professionalData.passwordHash,
    userType: 'professional',
    professionalType: professionalData.professionalType, // 'therapist' or 'listener'
    firstName: professionalData.firstName,
    lastName: professionalData.lastName
  });
  
  await professional.save();
  return professional;
}

// Start an AI/Professional chat session
async function startAIChatSession(userId, professionalId) {
  // Generate unique session ID
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const conversation = new AIConversation({
    userId: userId,
    professionalId: professionalId,
    sessionId: sessionId
  });
  
  await conversation.save();
  return conversation;
}

// Send a message in AI chat
async function sendAIMessage(conversationId, senderId, content, messageType = 'text') {
  const message = new AIMessage({
    conversationId: conversationId,
    senderId: senderId,
    content: content,
    messageType: messageType
  });
  
  await message.save();
  return message;
}

// Get chat history for a session
async function getAIChatHistory(conversationId, limit = 50) {
  return await AIMessage.find({ conversationId: conversationId })
    .sort({ timestamp: 1 })
    .limit(limit);
}

// End AI chat session
async function endAIChatSession(conversationId) {
  return await AIConversation.findByIdAndUpdate(
    conversationId,
    { 
      isActive: false,
      endedAt: new Date()
    },
    { new: true }
  );
}

// === COMMUNITY/STREAM CHAT EXAMPLES ===

// Create a stream session
async function createStreamSession(hostId, title) {
  const sessionId = `stream_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const session = new StreamSession({
    title: title,
    hostId: hostId,
    sessionId: sessionId
  });
  
  await session.save();
  return session;
}

// Send a community message (ultra-fast)
async function sendCommunityMessage(sessionId, userId, username, content) {
  const message = new CommunityMessage({
    sessionId: sessionId,
    userId: userId,
    username: username,
    content: content
  });
  
  await message.save();
  return message;
}

// Get recent community messages (real-time)
async function getRecentCommunityMessages(sessionId, limit = 100) {
  return await CommunityMessage.find({ sessionId: sessionId })
    .sort({ timestamp: -1 }) // Newest first
    .limit(limit);
}

// End stream session (messages auto-delete after 24 hours)
async function endStreamSession(sessionId) {
  return await StreamSession.findByIdAndUpdate(
    { sessionId: sessionId },
    { 
      isActive: false,
      endedAt: new Date()
    },
    { new: true }
  );
}

// === QUERY EXAMPLES ===

// Get all active professionals
async function getActiveProfessionals() {
  return await User.find({ 
    userType: 'professional',
    professionalType: { $in: ['therapist', 'listener'] }
  });
}

// Get user's AI chat history
async function getUserAIChatHistory(userId) {
  const conversations = await AIConversation.find({ userId: userId })
    .populate('professionalId', 'username firstName lastName professionalType')
    .sort({ startedAt: -1 });
  
  return conversations;
}

// Get active stream sessions
async function getActiveStreams() {
  return await StreamSession.find({ isActive: true })
    .populate('hostId', 'username')
    .sort({ startedAt: -1 });
}

// Example usage flow:
async function exampleUsage() {
  try {
    // 1. Create users
    const regularUser = await createRegularUser({
      username: 'john_doe',
      email: 'john@example.com',
      passwordHash: 'hashed_password',
      firstName: 'John',
      lastName: 'Doe'
    });
    
    const therapist = await createProfessional({
      username: 'dr_smith',
      email: 'dr.smith@mindgate.com',
      passwordHash: 'hashed_password',
      professionalType: 'therapist',
      firstName: 'Dr.',
      lastName: 'Smith'
    });
    
    // 2. Start AI chat session
    const aiConversation = await startAIChatSession(regularUser._id, therapist._id);
    
    // 3. Send messages
    await sendAIMessage(aiConversation._id, regularUser._id, "Hello, I need help");
    await sendAIMessage(aiConversation._id, therapist._id, "I'm here to help. Tell me more about what you're experiencing.");
    
    // 4. Create a stream session
    const streamSession = await createStreamSession(therapist._id, "Mental Health Support Group");
    
    // 5. Send community messages
    await sendCommunityMessage(streamSession.sessionId, regularUser._id, 'john_doe', 'Thanks for this session!');
    
    // 6. Get recent community messages
    const recentMessages = await getRecentCommunityMessages(streamSession.sessionId);
    
    console.log('AI Chat created:', aiConversation.sessionId);
    console.log('Stream session created:', streamSession.sessionId);
    console.log('Recent community messages:', recentMessages.length);
    
  } catch (error) {
    console.error('Error in example usage:', error);
  }
}

module.exports = {
  createRegularUser,
  createProfessional,
  startAIChatSession,
  sendAIMessage,
  getAIChatHistory,
  endAIChatSession,
  createStreamSession,
  sendCommunityMessage,
  getRecentCommunityMessages,
  endStreamSession,
  getActiveProfessionals,
  getUserAIChatHistory,
  getActiveStreams,
  exampleUsage
};