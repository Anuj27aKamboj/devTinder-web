import React, { useRef } from "react";
import { DEFAULT_AVATAR } from "../utils/constants";

const UserCard = ({ user, imageClass, buttons = [] }) => {
  const cardRef = useRef(null);

  if (!user) return null;

  const { firstName, lastName, photoURL, age, gender, about, skills } = user;

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateX = ((y - midY) / midY) * 8; // vertical tilt
    const rotateY = ((x - midX) / midX) * -8; // horizontal tilt

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div className="flex justify-center my-10 perspective-[1000px]">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-96 transition-transform duration-200 ease-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Card */}
        <div className="rounded-2xl h-full bg-base-300 text-neutral-200 shadow-2xl overflow-hidden">
          {/* Image */}
          <img
            src={photoURL || DEFAULT_AVATAR}
            alt="User"
            className={imageClass || "w-full h-64 object-cover"}
          />

          <div className="mx-5">
            {/* Content */}
            <div className="p-4 text-left">
              <h2 className="text-xl font-bold">
                {firstName} {lastName}
              </h2>

              {(age || gender) && (
                <div className="flex gap-1 opacity-70 py-1 text-sm">
                  {age && <span>{age}</span>}
                  {age && gender && <span>,</span>}
                  {gender && <span>{gender}</span>}
                </div>
              )}

              {about && (
                <p className="py-2 opacity-70 text-sm leading-relaxed">
                  {about}
                </p>
              )}

              {skills?.length > 0 && (
                <p className="py-2 opacity-70 text-sm">{skills.join(", ")}</p>
              )}
            </div>

            {/* Buttons */}
            {buttons.length > 0 && (
              <div className="flex justify-center gap-3 pb-4">
                {buttons.map((btn, index) => (
                  <button
                    key={index}
                    onClick={() => btn.onClick(user)}
                    className="mockup-code px-3 py-1 rounded-lg cursor-pointer"
                  >
                    <pre data-prefix="$" className={`${btn.color} text-xs`}>
                      <code>{btn.label}</code>
                    </pre>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
