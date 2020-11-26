import React, { useEffect, useMemo } from "react";
import { useMutation, useQuery } from "react-query";
import { resetScore } from "../api/score";
import { ImSpinner2 } from "react-icons/im";
import Board from "../components/Board";
import Scores from "../components/Scores";
import "./Game.css";
import GameEnded from "./GameEnded";
import { playAgain } from "./../api/game";

export default function Game() {
  const { data: board } = useQuery("game");

  const end = useMemo(() => board?.result.end, [board]);

  const [resetAll, { isLoading, error, isSuccess }] = useMutation(() =>
    playAgain().then(() => resetScore())
  );

  useEffect(() => {
    resetAll();
  }, [resetAll]);

  if (error) {
    return <p className="error">{error.message}</p>;
  }

  if (isLoading || !isSuccess) {
    return <ImSpinner2 className="spin" fontSize="2em" />;
  }

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
