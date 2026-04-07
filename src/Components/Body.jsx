import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;

    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response?.status === 401) {
        return navigate("/login");
      }
      navigate("/error");
    }
  };

  useEffect(() => {
    const hasToken = document.cookie.includes("token");

    if (!hasToken) return;
    fetchUser();
  }, []);

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
