import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice.js";
import { ConnectionUserCard } from "../utils/userCardVariant.js";
import UserCardSkeleton from "./UserCardSkeleton.jsx";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong";
      console.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (loading) {
    return (
      <div>
        <h2 className="text-4xl font-extrabold text-center">Connections</h2>

        <div className="bg-base-100 flex justify-center gap-6 p-6 flex-wrap">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <UserCardSkeleton key={i} />
            ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-4xl font-extrabold text-center">Connections</h2>
      <div className="bg-base-100 flex flex-wrap justify-center gap-6 p-6 text-center">
        {connections && connections.length > 0 ? (
          connections.map((user) => (
            <ConnectionUserCard key={user._id} user={user} enable3D={true} />
          ))
        ) : (
          <h1 className="text-center mt-10">No connections yet</h1>
        )}
      </div>
    </div>
  );
};

export default Connections;
