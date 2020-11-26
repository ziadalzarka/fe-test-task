import React from "react";
import "./PlayButton.css";

export default function PlayButton({ onClick }) {
  return (
    <button className="play" onClick={onClick}>
      Play
    </button>
  );
}
