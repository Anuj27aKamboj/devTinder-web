# DevTinder Web – The Frontend 💻🌐

The official web client for **DevTinder**, a social networking platform for developers. This repository houses the React-based Single Page Application (SPA) that provides a seamless, "swipe-and-match" experience for engineers looking to collaborate.

## 🏗 Architecture Overview

The frontend is built as a **Single Page Application (SPA)** using React. It follows a **unidirectional data flow** managed by Redux Toolkit to ensure the UI stays in sync with the server state.

### Key Architectural Pillars:

  * **Component-Based UI**: Modular and reusable components (Navbar, Footer, UserCard) for maintainability.
  * **State Management**: Centralized store using **Redux Toolkit** to handle user sessions, the discovery feed, and connection requests.
  * **Layout Pattern**: A centralized `Body` wrapper that manages global layouts (Navbar/Footer) while using `react-router-dom` for dynamic page injection.
  * **Client-Side Routing**: Smooth transitions between the Feed, Profile, and Login pages without page reloads.

-----

## 🔄 Request Flow (Client-Side)

1.  **Initialization**: On app load, a request is sent to `/profile/view`.
2.  **Auth Check**: If the server returns a valid user (via HTTP-only cookie), the user is added to the **Redux Store**.
3.  **Feed Fetching**: The `Feed` component dispatches an action to fetch potential matches.
4.  **Interaction**: User swipes "Right" (Interested) → API call triggers → On success, the local Redux state is updated to remove that card from the feed immediately for zero-latency UX.

-----

## 🛠 Tech Stack

  * **Core**: React 18
  * **State Management**: Redux Toolkit (RTK)
  * **Routing**: React Router Dom v6
  * **Styling**: Tailwind CSS
  * **UI Library**: DaisyUI (Tailwind-based components)
  * **HTTP Client**: Axios (with `withCredentials: true` for cookie handling)
  * **Icons**: Lucide-React / Heroicons

-----

## 📂 Folder Structure

```text
src/
├── components/         # Reusable UI components
│   ├── Body.jsx        # Layout Wrapper
│   ├── Feed.jsx        # Main Swipe Area
│   ├── UserCard.jsx    # Individual Dev Profile Card
│   ├── Login.jsx       # Auth Forms
│   └── Navbar.jsx      # Navigation & Profile Dropdown
├── utils/              # Logic & Configuration
│   ├── appStore.js     # Redux Store Configuration
│   ├── userSlice.js    # Auth State Management
│   ├── feedSlice.js    # Discovery Feed State
│   ├── requestSlice.js # Pending Requests State
│   └── constants.js    # API Endpoints & Config
├── App.jsx             # Main Routing Configuration
└── main.jsx            # Entry point
```

-----

## ✨ Features

  * **Responsive Feed**: A clean, card-based interface to discover developers.
  * **Dynamic Auth UI**: Navbar changes based on login state (shows "Login" vs "User Profile").
  * **Real-time Updates**: Redux-powered state ensures that when you accept a request, the count updates instantly across the app.
  * **Protected Routes**: Logic to redirect unauthenticated users away from the feed and profile pages.
  * **Form Validation**: Client-side checks for login and profile editing.

-----

## 🚀 Installation & Setup

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/Anuj27aKamboj/devTinder-web.git
    cd devTinder-web
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env` file in the root directory:

    ```env
    VITE_BASE_URL=http://localhost:3000
    ```

4.  **Run Development Server**:

    ```bash
    npm run dev
    ```

5.  **Build for Production**:

    ```bash
    npm run build
    ```

-----

## 🔮 Future Improvements

  * **Dark Mode Toggle**: Adding a theme switcher using DaisyUI themes.
  * **Shimmer UI**: Implement skeleton loaders for a better experience during API calls.
  * **Toasts/Notifications**: Integrate `react-hot-toast` for success/error feedback on swipes.
  * **PWA Support**: Making the platform installable on mobile devices.
  * **Infinite Scroll**: Implementing a paginated feed for better performance with large datasets.

-----

## 🤝 Contribution

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

-----

### 👨‍💻 Developed By

**Anuj Kamboj** – [GitHub](https://www.google.com/search?q=https://github.com/Anuj27aKamboj)
