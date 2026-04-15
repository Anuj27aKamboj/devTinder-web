import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants.js";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      const endpoint = isSignUp ? "/signup" : "/login";

      const payload = isSignUp
        ? { firstName, lastName, emailId, password }
        : { emailId, password };

      const res = await axios.post(BASE_URL + endpoint, payload, {
        withCredentials: true,
      });

      dispatch(addUser(res.data.user));
      isSignUp ? navigate("/profile") : navigate("/feed");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong";
      setError(errorMsg);
    }
  };

  return (
    <div className="hero bg-base-100 min-h-2/3 flex justify-center">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl text-neutral-300 w-64 font-bold">
            {isSignUp ? "Sign Up" : "Login"} now!
          </h1>
          <p className="py-4 my-4">
            <label className="flex cursor-pointer gap-2">
              <span className="label-text mx-auto">Login</span>
              <input
                type="checkbox"
                className="toggle rounded-box"
                onChange={() => {
                  setIsSignUp((prev) => !prev);
                  setError("");
                }}
              />
              <span className="label-text mx-auto">Sign Up</span>
            </label>
          </p>
        </div>
        <div className="card bg-base-300 w-full max-w-sm rounded-box shrink-0 shadow-2xl border-2 border-lime-600">
          <div className="card-body">
            <fieldset className="fieldset">
              {isSignUp && (
                <>
                  <label className="label">First Name</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />

                  <label className="label">Last Name</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </>
              )}
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
              {error && (
                <div className="badge badge-soft badge-error my-2 text-center rounded-box h-16 py-4">
                  {error}
                </div>
              )}

              <button
                className="btn bg-lime-600 mx-auto rounded-box text-base-300 w-24 mt-4"
                onClick={handleAuth}
              >
                {isSignUp ? "Sign Up" : "Login"}
              </button>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
