import React, { useMemo } from "react";
import { useQuery } from "react-query";
import Board from "../components/Board";
import Scores from "../components/Scores";
import { getGame } from "./../api/game";
import "./Game.css";
import GameEnded from "./GameEnded";

export default function Game() {
  const { data: board } = useQuery("game", () => getGame());

  const end = useMemo(() => board?.result.end, [board]);

  if (end) {
    return <GameEnded />;
  }

  return (
    <>
      <Scores />
      <Board />
    </>
  );
}
