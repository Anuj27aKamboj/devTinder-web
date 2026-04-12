import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeFromFeed } from "../utils/feedSlice";
import { FeedUserCard } from "./userCardVariant";
import UserCardSkeleton from "./UserCardSkeleton";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong";
      console.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  // ✅ ACTION HANDLERS
  const handleInterested = async (user) => {
    dispatch(removeFromFeed(user._id));
    try {
      await axios.post(
        BASE_URL + "/request/send/interested/" + user._id,
        {},
        { withCredentials: true },
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleIgnore = async (user) => {
    dispatch(removeFromFeed(user._id));
    try {
      await axios.post(
        BASE_URL + "/request/send/ignored/" + user._id,
        {},
        { withCredentials: true },
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <UserCardSkeleton />
      </div>
    );
  }


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
        enable3D={false}
      />
    </div>
  );
};

export default Feed;
