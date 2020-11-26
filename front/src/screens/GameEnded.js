import React, { useCallback, useMemo } from "react";
import { ImSpinner2 } from "react-icons/im";
import { queryCache, useQuery } from "react-query";
import GameMenu from "../components/GameMenu";
import { calculateWinner, playAgain } from "./../api/game";
import "./Game.css";
import Scores from "./../components/Scores";

export default function GameEnded() {
  const { data: board, error, isLoading, isSuccess } = useQuery("game");

  const winner = useMemo(() => {
    if (board) {
      return calculateWinner(board.result.winner);
    }
    return null;
  }, [board]);

  const handlePlayAgain = useCallback(async () => {
    const data = await playAgain();
    queryCache.setQueryData("game", () => data);
  }, []);

  if (error) {
    return <p className="error">{error.message}</p>;
  }

  if (isLoading || !isSuccess) {
    return <ImSpinner2 className="spin" fontSize="2em" />;
  }

  return (
    <>
      <GameMenu
        title={winner}
        action="Play Again"
        onAction={handlePlayAgain}
        scoreboard
      >
        <Scores />
      </GameMenu>
    </>
  );
}
