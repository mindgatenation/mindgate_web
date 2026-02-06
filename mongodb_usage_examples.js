// MongoDB/Mongoose Usage Examples for Conversations and Messages

const { User, Conversation, Message } = require('./mongoose_models');

// Example 1: Create a new user
async function createUser(userData) {
  try {
    const user = new User({
      username: userData.username,
      email: userData.email,
      passwordHash: userData.passwordHash, // Should be hashed
      firstName: userData.firstName,
      lastName: userData.lastName
    });
    
    await user.save();
    console.log('User created:', user._id);
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Example 2: Create a direct conversation between two users
async function createDirectConversation(userId1, userId2) {
  try {
    const conversation = new Conversation({
      type: 'direct',
      participants: [
        { userId: userId1 },
        { userId: userId2 }
      ]
    });
    
    await conversation.save();
    console.log('Direct conversation created:', conversation._id);
    return conversation;
  } catch (error) {
    console.error('Error creating conversation:', error);
    throw error;
  }
}

// Example 3: Create a group conversation
async function createGroupConversation(adminUserId, participantUserIds, groupName) {
  try {
    const participants = [
      { userId: adminUserId }, // Admin is also a participant
      ...participantUserIds.map(id => ({ userId: id }))
    ];
    
    const conversation = new Conversation({
      name: groupName,
      type: 'group',
      participants: participants
    });
    
    await conversation.save();
    console.log('Group conversation created:', conversation._id);
    return conversation;
  } catch (error) {
    console.error('Error creating group conversation:', error);
    throw error;
  }
}

// Example 4: Send a message in a conversation
async function sendMessage(conversationId, senderId, content, messageType = 'text') {
  try {
    const message = new Message({
      conversationId: conversationId,
      senderId: senderId,
      content: content,
      messageType: messageType
    });
    
    await message.save();
    
    // Update the conversation's last message
    await Conversation.findByIdAndUpdate(
      conversationId,
      {
        lastMessage: {
          messageId: message._id,
          content: content,
          timestamp: message.createdAt,
          senderId: senderId
        },
        updatedAt: new Date()
      },
      { new: true }
    );
    
    console.log('Message sent:', message._id);
    return message;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

// Example 5: Get all conversations for a user
async function getUserConversations(userId) {
  try {
    const conversations = await Conversation.find({
      'participants.userId': userId,
      isActive: true
    })
    .populate('participants.userId', 'username firstName lastName profilePicture')
    .sort({ updatedAt: -1 });
    
    return conversations;
  } catch (error) {
    console.error('Error getting user conversations:', error);
    throw error;
  }
}

// Example 6: Get messages in a conversation
async function getConversationMessages(conversationId, limit = 50, skip = 0) {
  try {
    const messages = await Message.find({ conversationId: conversationId })
      .populate('senderId', 'username firstName lastName profilePicture')
      .sort({ createdAt: 1 })
      .limit(limit)
      .skip(skip);
    
    return messages;
  } catch (error) {
    console.error('Error getting conversation messages:', error);
    throw error;
  }
}

// Example 7: Mark a message as read by a user
async function markMessageAsRead(messageId, userId) {
  try {
    const result = await Message.findOneAndUpdate(
      { 
        _id: messageId,
        'isRead.userId': { $ne: userId } // Only add if not already read
      },
      {
        $push: {
          isRead: {
            userId: userId,
            readAt: new Date()
          }
        }
      },
      { new: true }
    );
    
    return result;
  } catch (error) {
    console.error('Error marking message as read:', error);
    throw error;
  }
}

// Example 8: Get unread message count for a user in a conversation
async function getUnreadMessageCount(conversationId, userId) {
  try {
    const unreadCount = await Message.countDocuments({
      conversationId: conversationId,
      'isRead.userId': { $ne: userId }
    });
    
    return unreadCount;
  } catch (error) {
    console.error('Error getting unread count:', error);
    throw error;
  }
}

// Example 9: Add a user to a group conversation
async function addUserToConversation(conversationId, userId) {
  try {
    const result = await Conversation.findByIdAndUpdate(
      conversationId,
      {
        $addToSet: { // $addToSet prevents duplicates
          participants: {
            userId: userId,
            joinedAt: new Date()
          }
        }
      },
      { new: true }
    );
    
    return result;
  } catch (error) {
    console.error('Error adding user to conversation:', error);
    throw error;
  }
}

// Example 10: Remove a user from a conversation
async function removeUserFromConversation(conversationId, userId) {
  try {
    const result = await Conversation.updateOne(
      { _id: conversationId },
      {
        $set: {
          'participants.$[elem].leftAt': new Date(),
          'participants.$[elem].isRemoved': true
        }
      },
      {
        arrayFilters: [{ 'elem.userId': userId }]
      }
    );
    
    return result;
  } catch (error) {
    console.error('Error removing user from conversation:', error);
    throw error;
  }
}

// Example usage function
async function exampleUsage() {
  try {
    // Create users
    const user1 = await createUser({
      username: 'alice',
      email: 'alice@example.com',
      passwordHash: '$2b$10$hashed_password_here',
      firstName: 'Alice',
      lastName: 'Johnson'
    });
    
    const user2 = await createUser({
      username: 'bob',
      email: 'bob@example.com',
      passwordHash: '$2b$10$hashed_password_here',
      firstName: 'Bob',
      lastName: 'Smith'
    });
    
    // Create a direct conversation
    const conversation = await createDirectConversation(user1._id, user2._id);
    
    // Send messages
    const message1 = await sendMessage(
      conversation._id,
      user1._id,
      'Hello Bob! How are you?'
    );
    
    const message2 = await sendMessage(
      conversation._id,
      user2._id,
      'Hi Alice! I\'m doing great, thanks for asking.'
    );
    
    // Get user's conversations
    const userConversations = await getUserConversations(user1._id);
    console.log('User has', userConversations.length, 'conversations');
    
    // Get messages in the conversation
    const messages = await getConversationMessages(conversation._id);
    console.log('Conversation has', messages.length, 'messages');
    
    // Mark a message as read
    await markMessageAsRead(message1._id, user2._id);
    
    // Get unread count
    const unreadCount = await getUnreadMessageCount(conversation._id, user2._id);
    console.log('User has', unreadCount, 'unread messages in this conversation');
    
  } catch (error) {
    console.error('Example usage failed:', error);
  }
}

module.exports = {
  createUser,
  createDirectConversation,
  createGroupConversation,
  sendMessage,
  getUserConversations,
  getConversationMessages,
  markMessageAsRead,
  getUnreadMessageCount,
  addUserToConversation,
  removeUserFromConversation,
  exampleUsage
};