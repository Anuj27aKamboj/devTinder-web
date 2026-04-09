import React from "react";
import { DEFAULT_AVATAR } from "../utils/constants";

const UserCard = ({ user, showButtons = true, imageClass }) => {
  if (!user) return null;

  const { firstName, lastName, photoURL, age, gender, about, skills } = user;
  return (
    <div className="hover-3d mx-auto my-10">
      {/* content */}
      <figure className="w-92 rounded-2xl bg-base-300 text-neutral-200">
        <img
          src={photoURL || DEFAULT_AVATAR}
          alt="Users Image"
          className={imageClass || "shadow-lg"}
        />
        <div className="card-body px-0 text-left">
          <div className="px-6">
            <h2 className="card-title">
              {firstName + " " + lastName}
            </h2>
            {age && gender && (
              <div className="py-2 my-2 opacity-70 border-0 rounded-lg">
                {age}, {gender}
              </div>
            )}
            {about && (
              <div className="py-2 my-2 opacity-70 border-0 rounded-lg overflow-hidden">
                {about}
              </div>
            )}
            {skills && skills.length !== 0 && (
              <div className="py-2 my-2 opacity-70 border-0 rounded-lg overflow-hidden">
                {skills}
              </div>
            )}
          </div>

          {/* {!showButtons && (
            <div className="card-actions px-0 flex flex-row justify-center items-center gap-4 w-full *:w-auto">
              <button className="mockup-code mx-1 rounded-xl w-auto!">
                <pre data-prefix="$" className="text-info text-xs">
                  <code>commit changes;</code>
                </pre>
              </button>
            </div>
          )} */}

          {showButtons && (
            <div className="card-actions px-0 flex flex-row justify-center items-center gap-4 w-full *:w-auto">
              <button className="mockup-code mx-1 rounded-xl w-auto!">
                <pre data-prefix="$" className="text-warning text-xs">
                  <code>rm -rf</code>
                </pre>
              </button>

              <button className="mockup-code mx-1 rounded-xl w-auto!">
                <pre data-prefix="$" className="text-success text-xs">
                  <code>npm install friend</code>
                </pre>
              </button>
            </div>
          )}
        </div>
      </figure>
      {/* 8 empty divs needed for the 3D effect */}
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default UserCard;
