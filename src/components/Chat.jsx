import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import fetchChat from "../utils/fetchChat";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef(null);

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  useEffect(() => {
    if (!targetUserId) return;

    const loadChat = async () => {
      const data = await fetchChat(targetUserId);
      setMessages(data);
    };

    loadChat();
  }, [targetUserId]);

  useEffect(() => {
    if (!userId) return;

    const s = createSocketConnection();
    socketRef.current = s; // ✅ no re-render

    s.on("connect", () => {
      s.emit("joinChat", {
        firstName: user.firstName,
        userId,
        targetUserId,
      });
    });

    s.on("messageReceived", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    s.on("errorMessage", (err) => {
      console.error("Socket error:", err.message);
    });

    return () => {
      s.off("messageReceived");
      s.off("errorMessage");
      s.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = socketRef.current;

    if (!socket || !newMessage.trim()) return;

    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  const otherUser = messages.find((m) => m.senderId !== userId);

  return (
    <div className="flex justify-center items-center h-[calc(100vh-140px)]">
      <div className="w-full max-w-2xl h-full bg-base-300 shadow-2xl rounded-box flex flex-col overflow-hidden">
        <div className="p-4 flex items-center text-center">
          <h2 className="text-lg font-bold">
            Chat with {otherUser?.firstName || "User"}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => {
            const isSender = userId === msg.senderId;

            return (
              <div
                key={index}
                className={`chat ${isSender ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-image avatar">
                  <div className="w-10 mask mask-squircle">
                    <img
                      src={
                        isSender
                          ? user?.photoURL
                          : msg?.photoURL || "/default-avatar.png"
                      }
                      alt="avatar"
                    />
                  </div>
                </div>

                <div className="chat-header text-sm mx-2">
                  {`${msg.firstName || ""} ${msg.lastName || ""}`}
                  <time className="ml-2 text-xs">
                    {msg.createdAt
                      ? new Date(msg.createdAt).toLocaleTimeString()
                      : ""}
                  </time>
                </div>

                <div className="chat-bubble bg-neutral-600 text-base-300 mx-2">
                  {msg.text}
                </div>

                {isSender && (
                  <div className="chat-footer text-xs opacity-60">
                    {msg.status || "sent"}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="p-3 flex gap-2">
          <input
            type="text"
            className="input input-bordered flex-1"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="btn bg-lime-600" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
