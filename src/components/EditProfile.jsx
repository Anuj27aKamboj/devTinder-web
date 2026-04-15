import React, { useState, useEffect } from "react";
import { ProfileUserCard } from "../utils/userCardVariant.js";
import { BASE_URL } from "../utils/constants.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.js";

const EditProfile = ({ loggedInUser }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [age, setAge] = useState("");
  const [skills, setSkills] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");

  const [error, setError] = useState("");
  const [savedUpdates, setSavedUpdates] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  // ✅ Sync state with loggedInUser
  useEffect(() => {
    if (!loggedInUser) return;

    setFirstName(loggedInUser.firstName || "");
    setLastName(loggedInUser.lastName || "");
    setPhotoURL(loggedInUser.photoURL || "");
    setAge(loggedInUser.age || "");
    setSkills(
      Array.isArray(loggedInUser.skills)
        ? loggedInUser.skills.join(", ")
        : loggedInUser.skills || "",
    );
    setGender(loggedInUser.gender || "");
    setAbout(loggedInUser.about || "");
  }, [loggedInUser]);

  const saveChanges = async () => {
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoURL,
          age: age ? Number(age) : null,
          gender,
          about,
          skills: skills ? skills.split(",").map((s) => s.trim()) : [],
        },
        {
          withCredentials: true,
        },
      );

      dispatch(addUser(res.data.user));

      setSavedUpdates(true);
      setTimeout(() => setSavedUpdates(false), 3000);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || err.message || "Something went wrong";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ Toast */}
      {savedUpdates && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success">
            <svg
              className="size-[1em]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                fill="currentColor"
                strokeLinejoin="miter"
                strokeLinecap="butt"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="square"
                  strokeMiterlimit="10"
                  strokeWidth="2"
                ></circle>
                <polyline
                  points="7 13 10 16 17 8"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="square"
                  strokeMiterlimit="10"
                  strokeWidth="2"
                ></polyline>
              </g>
            </svg>
            <span>Commit successful</span>
          </div>
        </div>
      )}

      {/* ✅ Live Preview */}
      <ProfileUserCard
        user={{
          firstName,
          lastName,
          photoURL,
          age,
          gender,
          about,
          skills: skills ? skills.split(",").map((s) => s.trim()) : [],
        }}
        enable3D={true}
      />

      <div className="mt-10 min-h-screen mx-20 text-neutral-100">
        <div className="hero-content justify-between flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl lg:text-6xl w-64 font-bold">
              Update Profile
            </h1>
          </div>

          <div className="card bg-base-200 border-2 border-lime-600 w-full max-w-lg mx-10 rounded-box shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                {/* First Name */}
                <label className="label font-bold">First Name</label>
                <input
                  type="text"
                  className="input bg-lime-600 w-full"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />

                {/* Last Name */}
                <label className="label font-bold">Last Name</label>
                <input
                  type="text"
                  className="input bg-lime-600 w-full"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />

                {/* Photo */}
                <label className="label font-bold">Profile Photo URL</label>
                <input
                  type="text"
                  className="input bg-lime-600 w-full"
                  placeholder="Profile Photo"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                />

                {/* Age */}
                <label className="label font-bold">Age</label>
                <input
                  type="number"
                  className="input bg-lime-600 w-full"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />

                {/* Gender */}
                <label className="label font-bold">Gender</label>
                <select
                  className="select input bg-lime-600 w-full"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Others</option>
                </select>

                {/* About */}
                <label className="label font-bold">About</label>
                <input
                  type="text"
                  className="input bg-lime-600 w-full"
                  placeholder="About"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />

                {/* Skills */}
                <label className="label font-bold">
                  Skills (comma separated)
                </label>
                <input
                  type="text"
                  className="input bg-lime-600 w-full"
                  placeholder="React, Node, MongoDB"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />

                {/* Error */}
                {error && (
                  <div className="badge badge-error my-3 p-3 w-full text-center">
                    {error}
                  </div>
                )}

                {/* Button */}
                <button
                  className="mockup-code mx-auto rounded-box w-44 cursor-pointer mt-6 disabled:opacity-50"
                  onClick={saveChanges}
                  disabled={loading}
                >
                  <pre data-prefix="$" className="text-success text-xs">
                    <code>{loading ? "saving..." : "commit changes"}</code>
                  </pre>
                </button>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
