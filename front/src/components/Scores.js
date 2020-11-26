import React from "react";
import { useQuery } from "react-query";
import { getScore } from "./../api/score";
import "./Scores.css";

export default function Scores() {
  const { error, data } = useQuery("scores", () => getScore());

  if (error) {
    return null;
  }

  return (
    <div className="scores">
      <p className="score">You: {data?.result.player}</p>
      <p className="score">AI: {data?.result.ai}</p>
    </div>
  );
}
