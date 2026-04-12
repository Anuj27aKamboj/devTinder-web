# DevTinder Web (Frontend)

## 🚀 Overview
DevTinder is a full-stack developer networking platform where users can create profiles, explore other developers, and manage their account.

👉 **Backend Repo:** https://github.com/Anuj27aKamboj/devTinder

---

## 🧠 Architecture Overview

```text
[ React Frontend ]  --->  [ Node.js / Express API ]  --->  [ MongoDB ]
        |                          |
        |                          └── Authentication (JWT)
        |
        └── Redux Store (Global State)
```

- Frontend handles UI, state, and API calls
- Backend handles business logic, authentication, and data validation
- MongoDB stores user profiles and application data

---

## 🔄 Request Flow (Example: /feed)

```text
1. User opens feed page
2. React triggers API call → GET /feed
3. Request hits Express route
4. Middleware validates JWT
5. Controller fetches users from MongoDB
6. Data is filtered/transformed
7. Response sent to frontend
8. Redux store updates UI
```

---

## 🛠️ Tech Stack
- React.js
- Redux Toolkit
- Tailwind CSS
- DaisyUI
- Axios
- React Router

---

## ✨ Features
- User authentication (login/signup)
- View developer feed
- Profile creation and updates
- Responsive UI using Tailwind + DaisyUI
- Centralized state management using Redux Toolkit

---

## 📂 Folder Structure (Frontend)

```text
src/
 ├── components/      # Reusable UI components
 ├── pages/           # Route-level components
 ├── utils/           # API calls, constants, helpers
 ├── store/           # Redux store & slices
 ├── hooks/           # Custom hooks
 └── App.jsx          # Main app entry
```

---

## ⚙️ Installation & Setup
```bash
git clone https://github.com/Anuj27aKamboj/devTinder-web
cd devTinder-web
npm install
npm run dev
```

---

## 🌐 Environment Variables
```
VITE_BASE_URL=your_backend_url
```

---

## 📌 Future Improvements
- Real-time chat feature
- Notifications system
- Advanced matching algorithm