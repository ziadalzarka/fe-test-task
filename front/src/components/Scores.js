import React from "react";
import "./Scores.css";

export default function Scores({ player, ai }) {
  return (
    <>
      <p>You: {player}</p>
      <p>AI: {ai}</p>
    </>
  );
}
