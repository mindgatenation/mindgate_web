# MindGate - Mental Health Support Platform

MindGate is a comprehensive mental health support platform that connects users with trained listeners, therapists, and support groups through secure conversations.

## Features

- User authentication and profiles
- Direct messaging with trained listeners
- Group therapy sessions
- Secure, private conversations
- Rich media messaging (text, images, audio, video)
- Real-time messaging capabilities
- Read receipts and message tracking

## Database Schema (Optimized)

The platform uses two separate MongoDB schemas optimized for different use cases:

### 1. AI Chat Schema (Professional Conversations)
**Purpose**: One-on-one conversations with therapists/listeners
**Collections**:
- `users` - User accounts with userType flags (user/professional)
- `aiconversations` - Simple session tracking between user and professional
- `aimessages` - Lightweight message storage for therapy sessions

**Key Features**:
- Minimal overhead for private 1:1 conversations
- Session tracking for continuity
- Optimized for storing therapeutic conversation history
- Simple user-professional relationship

### 2. Community/Stream Schema (Real-time Chat)
**Purpose**: High-performance group chats for streams and communities
**Collections**:
- `streamsessions` - Live session tracking
- `communitymessages` - Ultra-lightweight messages with auto-cleanup

**Key Features**:
- Ultra-minimal message structure (4 fields only)
- TTL index for automatic 24-hour cleanup
- Denormalized username for instant display
- Optimized for real-time performance

## Database Schema Files

- `optimized_mongodb_schemas.js` - Two optimized schemas (AI Chat + Community Chat)
- `optimized_schema_usage.js` - Practical usage examples for both schemas
- `SCHEMA_COMPARISON.md` - Why the optimized approach works better
- `database_schema.sql` - Original MongoDB schema (reference only)
- `mongodb_schema_documentation.md` - Original detailed documentation (reference only)

## Technical Implementation

This React application is built with Vite and includes:

- Modern React with hooks
- Routing with React Router
- Responsive design with Tailwind CSS
- Secure authentication flows
- Video calling capabilities
- Splash screen and loading states

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
