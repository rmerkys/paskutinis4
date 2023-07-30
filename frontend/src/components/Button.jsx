import React from "react";

export default function Button({ icon, text }) {
  return (
    <button>
      <span>
        <img src={icon} alt="icon" />
      </span>
      {text}
    </button>
  );
}
