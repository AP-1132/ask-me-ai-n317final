# AskMe AI

## Project Summary

**AskMe AI**, a simple and conversational web app that acts as a personal knowledge assistant. The idea is to give users a clean, friendly space where they can ask questions and get quick, helpful answers without digging through search results or complicated interfaces. **AskMe AI** takes inspiration from modern AI chat tools but focuses on being lightweight, easy to use, and centered around a smooth chatting experience. Users will be able to start new conversations, revisit past chats, and explore different topics in a way that feels natural and intuitive. Built with Next.js, the app will highlight dynamic routing, component-based design, and smart state management, all wrapped in a polished, responsive UI. The goal is to be an assistant that feels approachable, practical, and genuinely useful for everyday questions and curiosity.

## Key Features

Users will be able to start new chat sessions, each of which will be accessible through dynamic routing (e.g., `/chat/[sessionId]`). Within the chat view, users can type and send messages, see their input displayed in chat bubbles, and receive responses from the AI in real time. The interface will scroll automatically, include a loading indicator while the AI generates a response, and handle situations like failed API calls by showing a clear error message with an option to retry. Visually, the application will feature a sidebar displaying past conversations, a clean main chat area, and a fixed input bar at the bottom of the screen.

## Design Choices

_TBD_

## Team Members & Responsibilities

- **Eyanla** - Frontend/UI

  - Designs and implements the user interface, including layout, styling, and responsiveness to ensure a polished and user-friendly experience.

- **Charley** - App Logic Developer

  - Focuses on organizing the building blocks of the app, keeping track of messages and chat history, and making sure the interface updates seamlessly as users interact.

- **Alonso** - Routing & Backend Integrator

  - Implements Next.js dynamic routing for individual chat sessions and manages navigation within the app.

- **Yonni** - API Integrator
  - Manages communication with the AI backend, including sending requests, receiving responses, and handling errors like failed API calls.

## Running Project Locally

### 1. Install Dependencies

After downloading the project to your device, run the following commmand in the project terminal:

```
npm install
```

### 2. Run Development Server

To start the development server, run the following command:

```
npm run dev
```

## Additional Libraries or Dependencies Used

- `ai` - Vercel AI SDK, bridges Next.js frontend and AI backend.

- `@google/generative-ai` - The official client library that connects the application to Google's Gemini models, enabling sending of prompts and receiving AI-generated responses.

- `lucide-react` - Provides a set of clean, consistent icons designed specifically for React
