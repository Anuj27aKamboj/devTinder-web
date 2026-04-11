import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { ConnectionUserCard } from "./userCardVariant";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong";
      console.error(errorMsg);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  return (
    <div> 
      <h2 className="text-4xl font-extrabold text-center">Connections</h2>
      <div className="bg-base-100 text-center justify-center flex gap-6 p-6 mx-auto">
        {(connections && connections.length > 0)? (
          connections.map((user) => (
            <ConnectionUserCard key={user._id} user={user} />
          ))
        ) : (
          <h1 className="text-center mt-10">No connections yet</h1>
        )}
      </div>
    </div>
  );
};

export default Connections;
