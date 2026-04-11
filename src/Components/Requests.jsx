import { useEffect } from "react";
import { RequestUserCard } from "../components/userCardVariant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

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
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  const reviewRequest = async (status, requestId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true },
      );
      console.log(res.data);
      dispatch(removeRequest(requestId));
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong";
      console.error(errorMsg);
    }
  };

  return (
    <>
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
              />
            ))
          ) : (
            <h1 className="text-center mt-10">No pending requests</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Requests;
