import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Body from "./components/Body.jsx";
import Login from "./components/Login.jsx";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";
import Feed from "./components/Feed.jsx";
import Profile from "./components/Profile.jsx";
import Error from "./components/Error.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Connections from "./components/Connections.jsx";
import Requests from "./components/Requests.jsx";
import Chat from "./components/Chat.jsx";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            
            {/* Default */}
            <Route index element={<Navigate to="/login" />} />

            {/* Public */}
            <Route path="login" element={<Login />} />

            {/* Private */}
            <Route
              path="feed"
              element={
                <ProtectedRoute>
                  <Feed />
                </ProtectedRoute>
              }
            />

            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="connections"
              element={
                <ProtectedRoute>
                  <Connections />
                </ProtectedRoute>
              }
            />

            <Route
              path="requests"
              element={
                <ProtectedRoute>
                  <Requests />
                </ProtectedRoute>
              }
            />

            <Route
              path="chat/:targetUserId"
              element={
                <ProtectedRoute>
                  <Chat/>
                </ProtectedRoute>
              }
            />

            <Route path="error" element={<Error />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;