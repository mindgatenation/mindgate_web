# MongoDB Schema Documentation: Conversations and Messages

## Overview
This document describes the MongoDB schema for a messaging system supporting both direct messages and group conversations. The schema is designed to be flexible, scalable, and efficient for real-time messaging applications.

## Collections

### 1. Users Collection (`users`)

Stores user account information.

#### Fields:
- `_id` (ObjectId): Unique identifier for each user
- `username` (String): Unique username for the user
- `email` (String): Unique email address for the user
- `passwordHash` (String): Hashed password (never store plain text passwords)
- `firstName` (String): User's first name
- `lastName` (String): User's last name
- `profilePicture` (String): URL to user's profile picture
- `lastSeen` (Date): Last time user was online
- `isActive` (Boolean): Whether the account is active
- `createdAt` (Date): Account creation timestamp
- `updatedAt` (Date): Last update timestamp

#### Sample Document:
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  username: "johndoe",
  email: "john@example.com",
  passwordHash: "$2b$10$...",
  firstName: "John",
  lastName: "Doe",
  profilePicture: "https://example.com/images/profile.jpg",
  lastSeen: ISODate("2023-06-15T10:30:00Z"),
  isActive: true,
  createdAt: ISODate("2023-01-15T08:00:00Z"),
  updatedAt: ISODate("2023-06-15T10:30:00Z")
}
```

#### Indexes:
- `{ email: 1 }` (unique)
- `{ username: 1 }` (unique)

---

### 2. Conversations Collection (`conversations`)

Stores conversation metadata and participant information.

#### Fields:
- `_id` (ObjectId): Unique identifier for each conversation
- `name` (String): Optional name for group conversations
- `type` (String): Type of conversation ("direct" or "group")
- `participants` (Array): Array of participant objects
  - `userId` (ObjectId): Reference to user ID
  - `joinedAt` (Date): When user joined the conversation
  - `leftAt` (Date): When user left (null if still active)
  - `isRemoved` (Boolean): Whether user was removed
- `lastMessage` (Object): Information about the last message
  - `messageId` (ObjectId): Reference to the last message
  - `content` (String): Content of the last message
  - `timestamp` (Date): Timestamp of the last message
  - `senderId` (ObjectId): Who sent the last message
- `isActive` (Boolean): Whether the conversation is active
- `createdAt` (Date): Conversation creation timestamp
- `updatedAt` (Date): Last update timestamp

#### Sample Document:
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439012"),
  name: "Project Team",
  type: "group",
  participants: [
    {
      userId: ObjectId("507f1f77bcf86cd799439011"),
      joinedAt: ISODate("2023-01-15T08:00:00Z"),
      leftAt: null,
      isRemoved: false
    },
    {
      userId: ObjectId("507f1f77bcf86cd799439013"),
      joinedAt: ISODate("2023-01-15T08:00:00Z"),
      leftAt: null,
      isRemoved: false
    }
  ],
  lastMessage: {
    messageId: ObjectId("507f1f77bcf86cd799439014"),
    content: "Meeting scheduled for tomorrow",
    timestamp: ISODate("2023-06-15T10:25:00Z"),
    senderId: ObjectId("507f1f77bcf86cd799439011")
  },
  isActive: true,
  createdAt: ISODate("2023-01-15T08:00:00Z"),
  updatedAt: ISODate("2023-06-15T10:25:00Z")
}
```

#### Indexes:
- `{ "participants.userId": 1 }`
- `{ updatedAt: -1 }` (descending for sorting by recent)

---

### 3. Messages Collection (`messages`)

Stores individual message documents.

#### Fields:
- `_id` (ObjectId): Unique identifier for each message
- `conversationId` (ObjectId): Reference to the conversation
- `senderId` (ObjectId): Reference to the sending user
- `content` (String): The actual message content
- `messageType` (String): Type of message ("text", "image", "file", "audio", "video")
- `fileUrl` (String): URL for media files (optional)
- `fileName` (String): Original filename (optional)
- `fileSize` (Number): File size in bytes (optional)
- `replyTo` (ObjectId): Reference to message being replied to (optional)
- `isRead` (Array): Array of read receipts
  - `userId` (ObjectId): User who read the message
  - `readAt` (Date): When they read it
- `createdAt` (Date): Message creation timestamp
- `updatedAt` (Date): Last update timestamp

#### Sample Document:
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439014"),
  conversationId: ObjectId("507f1f77bcf86cd799439012"),
  senderId: ObjectId("507f1f77bcf86cd799439011"),
  content: "Meeting scheduled for tomorrow at 10 AM",
  messageType: "text",
  replyTo: null,
  isRead: [
    {
      userId: ObjectId("507f1f77bcf86cd799439013"),
      readAt: ISODate("2023-06-15T10:26:00Z")
    }
  ],
  createdAt: ISODate("2023-06-15T10:25:00Z"),
  updatedAt: ISODate("2023-06-15T10:25:00Z")
}
```

#### Indexes:
- `{ conversationId: 1, createdAt: 1 }` (compound index for chronological message retrieval)
- `{ senderId: 1 }`
- `{ createdAt: -1 }` (descending for sorting by newest)

## Relationships

### One-to-Many Relationships:
- One conversation can have many messages
- One user can send many messages
- One user can participate in many conversations

### Many-to-Many Relationships:
- Users and conversations (through participants array in conversations collection)

## Query Examples

### Get all conversations for a user:
```javascript
db.conversations.find({
  "participants.userId": ObjectId("user_id_here"),
  isActive: true
}).sort({ updatedAt: -1 });
```

### Get messages in a conversation:
```javascript
db.messages.find({
  conversationId: ObjectId("conversation_id_here")
}).sort({ createdAt: 1 });
```

### Mark a message as read:
```javascript
db.messages.updateOne(
  { _id: ObjectId("message_id_here") },
  {
    $push: {
      isRead: {
        userId: ObjectId("user_id_here"),
        readAt: ISODate()
      }
    }
  }
);
```

### Get unread message count for a user in a conversation:
```javascript
db.messages.countDocuments({
  conversationId: ObjectId("conversation_id_here"),
  "isRead.userId": { $ne: ObjectId("user_id_here") }
});
```

## Performance Considerations

1. **Indexes**: Proper indexing ensures fast queries for common operations
2. **Embedding vs Referencing**: Participants are embedded in conversations for faster retrieval
3. **Message Pagination**: Use createdAt index for efficient pagination of messages
4. **TTL Indexes**: Consider TTL indexes for auto-deleting old messages if needed

## Security Considerations

1. Never expose raw ObjectIds in client-facing APIs without proper validation
2. Always validate user permissions before allowing access to conversations/messages
3. Store password hashes securely using bcrypt or similar
4. Sanitize message content to prevent XSS attacks