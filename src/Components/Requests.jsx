import { useEffect, useState } from "react";
import { RequestUserCard } from "../components/userCardVariant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";
import UserCardSkeleton from "./UserCardSkeleton";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      const formattedData = res.data.data.map((req) => ({
        ...req.fromUserId,
        requestId: req._id,
      }));
      dispatch(addRequests(formattedData));
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong";
      console.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  const reviewRequest = async (status, requestId) => {
    dispatch(removeRequest(requestId));
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true },
      );
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong";
      console.error(errorMsg);
    }
  };

  if (loading) {
    return (
      <div>
        <h2 className="text-4xl font-extrabold text-center">Requests</h2>

        <div className="bg-base-100 flex flex-wrap justify-center gap-6 p-6">
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
      <h2 className="text-4xl font-extrabold text-center">Requests</h2>
      <div className="bg-base-100 flex flex-wrap justify-center gap-6 p-6">
        {requests?.length > 0 ? (
          requests.map((user) => (
            <RequestUserCard
              key={user.requestId}
              user={user}
              buttons={[
                {
                  label: "reject pr",
                  color: "text-warning",
                  onClick: (user) => reviewRequest("rejected", user.requestId),
                },
                {
                  label: "merge pr",
                  color: "text-success",
                  onClick: (user) => reviewRequest("accepted", user.requestId),
                },
              ]}
              enable3D={false}
            />
          ))
        ) : (
          <h1 className="text-center mt-10">No pending requests</h1>
        )}
      </div>
    </div>
  );
};

export default Requests;
