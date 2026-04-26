import axios from "axios";
import { BASE_URL } from "./constants";

const fetchChat = async (targetUserId) => {
  try {
    const res = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
      withCredentials: true,
    });

    const chatMessages =
      res?.data?.chat?.messages?.map((msg) => {
        const { senderId, text, createdAt, status } = msg;

        return {
          senderId: senderId?._id,
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          photoURL: senderId?.photoURL,
          text,
          createdAt,
          status,
        };
      }) || [];

    return chatMessages;
  } catch (err) {
    console.error("Failed to fetch chat:", err);
    return [];
  }
};

export default fetchChat;