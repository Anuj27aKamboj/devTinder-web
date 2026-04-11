import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { FeedUserCard } from "./userCardVariant";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Something went wrong";
      console.error(errorMsg);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  // ✅ ACTION HANDLERS
  const handleInterested = async (user) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/interested/" + user._id,
        {},
        { withCredentials: true }
      );

      // remove user from feed (optimistic UI)
      dispatch(addFeed(feed.filter((u) => u._id !== user._id)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleIgnore = async (user) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/ignored/" + user._id,
        {},
        { withCredentials: true }
      );

      dispatch(addFeed(feed.filter((u) => u._id !== user._id)));
    } catch (err) {
      console.error(err);
    }
  };

  if (!feed || feed.length === 0) {
    return <h1 className="text-center mt-10">No more users</h1>;
  }

  return (
    <div className="text-center bg-base-100 my-10">
      {/* Show only one card at a time (Tinder-style) */}
      <FeedUserCard
        user={feed[0]}
        buttons={[
          {
            label: "rm -rf",
            color: "text-warning",
            onClick: handleIgnore,
          },
          {
            label: "npm install friend",
            color: "text-success",
            onClick: handleInterested,
          },
        ]}
      />
    </div>
  );
};

export default Feed;