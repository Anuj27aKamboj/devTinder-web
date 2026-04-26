import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

let socket;

export const createSocketConnection = () => {
  if (!socket) {
    socket =
      location.hostname === "localhost"
        ? io(BASE_URL)
        : io("/", { path: "/api/socket.io" });
  }
  return socket;
};