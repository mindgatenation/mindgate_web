// MongoDB Schema for Conversations and Messages

// Users Collection
db.users.insertMany([
  {
    _id: ObjectId(),
    username: "johndoe",
    email: "john@example.com",
    passwordHash: "$2b$10$...",
    firstName: "John",
    lastName: "Doe",
    createdAt: ISODate(),
    updatedAt: ISODate(),
    isActive: true,
    profilePicture: "https://example.com/images/profile.jpg",
    lastSeen: ISODate()
  }
]);

// Conversations Collection
db.conversations.insertMany([
  {
    _id: ObjectId(),
    name: "Team Discussion", // Optional name for group conversations
    type: "direct", // "direct" or "group"
    participants: [
      {
        userId: ObjectId("..."), // Reference to user ID
        joinedAt: ISODate(),
        leftAt: null, // When user leaves group conversation
        isRemoved: false
      }
    ],
    createdAt: ISODate(),
    updatedAt: ISODate(),
    isActive: true,
    lastMessage: {
      messageId: ObjectId("..."),
      content: "See you tomorrow!",
      timestamp: ISODate(),
      senderId: ObjectId("...")
    }
  }
]);

// Messages Collection
db.messages.insertMany([
  {
    _id: ObjectId(),
    conversationId: ObjectId("..."), // Reference to conversation
    senderId: ObjectId("..."), // Reference to sender user
    content: "Hello, how are you?",
    messageType: "text", // "text", "image", "file", "audio", "video"
    fileUrl: "https://example.com/files/message-image.jpg", // Optional for media
    fileName: "image.jpg", // Optional for media
    fileSize: 102400, // Optional for media
    replyTo: ObjectId("..."), // Optional - message ID this message replies to
    isRead: [
      {
        userId: ObjectId("..."), // User who read the message
        readAt: ISODate() // When they read it
      }
    ],
    createdAt: ISODate(),
    updatedAt: ISODate()
  }
]);

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "username": 1 }, { unique: true });

db.conversations.createIndex({ "participants.userId": 1 });
db.conversations.createIndex({ "updatedAt": -1 });

db.messages.createIndex({ "conversationId": 1, "createdAt": 1 });
db.messages.createIndex({ "senderId": 1 });
db.messages.createIndex({ "createdAt": -1 });