import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { useEffect, useState } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data.user));
    } catch (err) {
      if (err.response?.status === 401) {
        return;
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const hasToken = document.cookie.includes("token");
    if (!hasToken) {
      setLoading(false);
      return;
    }

    fetchUser();
  }, []);

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

      <main className="grow pt-20 relative my-10 items-center">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Body;
