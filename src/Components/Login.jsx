import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("donald@trump.com");
  const [password, setPassword] = useState("Donald@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
      console.log(res.data.user);
      dispatch(addUser(res.data.user));
      return navigate("/feed");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <img
        alt="devTinder logo"
        className="btn border-0 w-48 mx-5 px-1 py-6 relative top-0 left-0 z-10"
        src="/devTinder logo.png"
      />
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl text-neutral-300 w-64 font-bold">
              Login now!
            </h1>
            <p className="py-6"></p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm rounded-2xl shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  value={emailId}
                  onChange={(e) => setEmailId(e.currentTarget.value)}
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
                <div>
                  {/* <a className="link link-hover">Forgot password?</a> */}
                </div>
                <button
                  className="btn bg-lime-600 mx-auto rounded-xl text-base-300 w-24 mt-4"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
