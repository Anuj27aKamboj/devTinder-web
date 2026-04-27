<div align="center">

# 🔥 DevTinder — Frontend

### A developer-focused networking platform. Swipe, connect, and chat with engineers who share your stack.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-3.26.43.77-lime?style=for-the-badge)](http://3.26.43.77)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Redux](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?style=for-the-badge&logo=redux)](https://redux-toolkit.js.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment & Configuration](#-environment--configuration)
- [Key Implementation Details](#-key-implementation-details)
- [API Integration](#-api-integration)
- [Backend Repository](#-backend-repository)
- [Screenshots](#-screenshots)
- [Future Improvements](#-future-improvements)

---

## 🧭 Overview

DevTinder is a full-stack MERN networking application built for developers. It brings a Tinder-like experience to the tech world — browse developer profiles, send connection requests, manage your network, and chat in real-time with your connections.

This repository contains the **React frontend**, built with Vite, styled with Tailwind CSS + DaisyUI, and powered by Redux Toolkit for global state management. Authentication is handled via secure HTTP-only cookies issued by the backend, with Socket.io enabling real-time chat between connected developers.

---

## 🌐 Live Demo

> **[http://3.26.43.77](http://3.26.43.77)**

The app is deployed on an AWS EC2 instance with Nginx serving the frontend build and proxying API + WebSocket traffic to a Node.js backend on port 7777.

---

## ✨ Features

### 🔐 Authentication
- Signup and Login with form validation
- Sessions managed via secure **HTTP-only JWT cookies** — no localStorage exposure
- Persistent login across page refreshes — session restored via `/profile/view` on app mount
- Automatic redirect to login on token expiry

### 👤 Profile Management
- View and edit your developer profile
- Update your name, bio, age, gender, profile photo, and tech skills
- Secure password change flow

### 🃏 Developer Feed
- Browse a curated feed of developer profiles
- Smart filtering — profiles you've already interacted with (connected, ignored, pending) are excluded
- Swipe-style Interested / Ignored actions

### 🤝 Connections & Requests
- View all pending incoming connection requests
- Accept or reject requests
- View your full list of accepted connections
- Navigate directly to chat from a connection

### 💬 Real-Time Chat
- One-on-one chat with accepted connections powered by **Socket.io**
- Messages persisted to MongoDB on the backend
- Last 10 messages loaded on chat open via REST API
- Real-time message delivery without page refresh
- Server-side JWT authentication on every WebSocket handshake — userId is never trusted from the client
- Secure room isolation using SHA-256 hashed room IDs per user pair

### 🛡️ Protected Routing
- All routes except `/login` are protected via a `ProtectedRoute` component
- Global loading state in Redux prevents premature redirects during session restoration on refresh

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Build Tool | Vite 6 |
| State Management | Redux Toolkit 2 |
| Routing | React Router DOM v7 |
| HTTP Client | Axios |
| Real-Time | Socket.io Client |
| Styling | Tailwind CSS v4 + DaisyUI v5 |
| Icons | DaisyUI component icons |

---

## 📂 Project Structure

```
devTinder-web/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Body.jsx          # App shell — session restore, loading gate
│   │   ├── Navbar.jsx        # Top navigation bar
│   │   ├── Footer.jsx        # Footer
│   │   ├── Login.jsx         # Login + Signup form
│   │   ├── Feed.jsx          # Developer feed with swipe actions
│   │   ├── Profile.jsx       # View & edit profile
│   │   ├── Connections.jsx   # Accepted connections list
│   │   ├── Requests.jsx      # Incoming connection requests
│   │   ├── Chat.jsx          # Real-time chat window
│   │   ├── UserCard.jsx      # Developer profile card
│   │   ├── EditProfile.jsx   # Profile edit form
│   │   ├── ProtectedRoute.jsx# Auth guard for private routes
│   │   └── Error.jsx         # Error boundary page
│   ├── utils/
│   │   ├── appStore.js       # Redux store configuration
│   │   ├── userSlice.js      # User state slice
│   │   ├── feedSlice.js      # Feed state slice
│   │   ├── connectionSlice.js# Connections state slice
│   │   ├── requestSlice.js   # Requests state slice
│   │   ├── loadingSlice.js   # Global loading state slice
│   │   ├── socket.js         # Socket.io connection factory
│   │   ├── fetchChat.js      # Chat history fetch utility
│   │   └── constants.js      # BASE_URL and other constants
│   ├── App.jsx               # Route definitions
│   └── main.jsx              # React entry point
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9
- Backend server running (see [Backend Repository](#-backend-repository))

### Installation

```bash
# Clone the repository
git clone https://github.com/Anuj27aKamboj/devTinder-web.git
cd devTinder-web

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
# Output is in the dist/ folder
```

---

## ⚙️ Environment & Configuration

The `BASE_URL` in `src/utils/constants.js` automatically switches between local and production:

```js
export const BASE_URL = location.hostname === "localhost"
  ? "http://localhost:7777"
  : "/api";
```

In production, Nginx proxies all `/api/` requests to the backend on port 7777, and Socket.io connections use the path `/api/socket.io`.

No `.env` file is required for the frontend.

---

## 🔍 Key Implementation Details

### Session Persistence on Refresh
`Body.jsx` calls `GET /profile/view` on every mount. Since the JWT is stored in an `httpOnly` cookie (invisible to JavaScript), the server is the only source of truth for session validity. A global `loading` Redux state prevents `ProtectedRoute` from redirecting until the session check completes.

```
App mounts → Body calls /profile/view → loading=true in Redux
ProtectedRoute sees loading=true → renders spinner, waits
/profile/view returns 200 → user dispatched to Redux, loading=false
ProtectedRoute re-renders → user exists → renders page ✓
```

### Secure WebSocket Authentication
Socket.io connections authenticate on handshake by reading the `httpOnly` JWT cookie server-side. The `userId` is never sent from the client — it is always derived from the verified token on the server, preventing any client-side spoofing.

### Protected Route Guard
```jsx
const ProtectedRoute = ({ children }) => {
  const user = useSelector((store) => store.user);
  const isLoading = useSelector((store) => store.loading);

  if (isLoading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" />;
  return children;
};
```

---

## 🔌 API Integration

All API calls use `axios` with `withCredentials: true` so the browser includes the JWT cookie on every request.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/login` | Authenticate user |
| `POST` | `/signup` | Register new user |
| `POST` | `/logout` | Clear session cookie |
| `GET` | `/profile/view` | Get logged-in user (session restore) |
| `PATCH` | `/profile/edit` | Update profile details |
| `PATCH` | `/profile/password` | Change password |
| `GET` | `/feed` | Get developer feed |
| `POST` | `/request/send/:status/:toUserId` | Send interested/ignored request |
| `POST` | `/request/review/:status/:requestId` | Accept/reject incoming request |
| `GET` | `/user/requests/received` | Get pending requests |
| `GET` | `/user/connections` | Get all connections |
| `GET` | `/chat/:targetUserId` | Load chat history |

### Socket.io Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `joinChat` | Client → Server | Join a private chat room |
| `sendMessage` | Client → Server | Send a message |
| `messageReceived` | Server → Client | Receive a new message |
| `errorMessage` | Server → Client | Handle socket errors |

---

## 🔗 Backend Repository

The backend (Node.js + Express + MongoDB) is maintained in a separate repository:

> **[https://github.com/Anuj27aKamboj/devTinder](https://github.com/Anuj27aKamboj/devTinder)**

It handles authentication, profile management, connection logic, chat persistence, and Socket.io server setup.

---

## 🖼 Screenshots

> _Coming soon — UI screenshots of Feed, Chat, Profile, and Connections pages._

---

## 🔮 Future Improvements

- **Real-time notifications** — notify users of new connection requests and messages
- **Message status indicators** — delivered and read receipts in chat
- **Infinite scroll** — paginated feed instead of batch loading
- **GitHub integration** — fetch and display repositories on developer profiles
- **Advanced filtering** — filter feed by skills, experience level, or location
- **Premium membership** — Razorpay integration for exclusive features
- **TypeScript migration** — full type safety across components and utilities
- **PWA support** — installable app with offline capability

---

<div align="center">

Built with ❤️ by [Anuj Kamboj](https://github.com/Anuj27aKamboj)

</div>