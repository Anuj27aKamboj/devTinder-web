import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import { BASE_URL } from "../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { setLoading } from "../utils/loadingSlice.js";
import axios from "axios";
import { useEffect, useCallback } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.loading);
  const navigate = useNavigate();

  // Issue 3 fix — memoized with useCallback, stable reference across renders
  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data.user));
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login"); // Issue 2 fix — explicit redirect on expired/invalid token
        return;
      }
      console.error(err);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;