import React, { useEffect } from "react";
import "./Board.css";
import classNames from "classnames";
import Scores from "./Scores";
import { useMutation } from "react-query";
import { resetScore } from "../api/score";
import { ImSpinner2 } from "react-icons/im";

export function Cell({ left, right, top, bottom, onClick }) {
  return (
    <div
      className={classNames("cell", {
        "border-top": top,
        "border-bottom": bottom,
        "border-left": left,
        "border-right": right,
      })}
      onClick={onClick}
    />
  );
}

export default function Board() {
  const [resetGame, { isLoading, error, data, isSuccess }] = useMutation(() =>
    resetScore()
  );

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  if (error) {
    return (
      <div className="container">
        <p className="error">{error.message}</p>
      </div>
    );
  }

  if (isLoading || !isSuccess) {
    return (
      <div className="container">
        <ImSpinner2 className="spin" fontSize="2em" />
      </div>
    );
  }

  return (
    <>
      <div>
        <Scores player={data.result.player} ai={data.result.ai} />
      </div>
      <div>
        <div className="row">
          <Cell bottom></Cell>
          <Cell bottom left right></Cell>
          <Cell bottom></Cell>
        </div>

        <div className="row">
          <Cell></Cell>
          <Cell left right></Cell>
          <Cell></Cell>
        </div>

        <div className="row">
          <Cell top></Cell>
          <Cell top left right></Cell>
          <Cell top></Cell>
        </div>
      </div>
    </>
  );
}
