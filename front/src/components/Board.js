import classNames from "classnames";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./Board.css";
import { queryCache, useMutation, useQuery } from "react-query";
import { getGame, makeMove } from "../api/game";
import { ImSpinner2 } from "react-icons/im";

export function Cell({
  left,
  right,
  top,
  bottom,
  col,
  row,
  board: { board, player },
}) {
  const value = useMemo(() => board[row][col], [board, row, col]);

  const mark = useMemo(() => (value === "X" || value === "O") && value, [
    value,
  ]);

  const [placeholder, setPlaceholder] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (!mark) {
      setPlaceholder(true);
    }
  }, [mark]);

  const handleMouseLeave = useCallback(() => {
    if (placeholder) {
      setPlaceholder(false);
    }
  }, [placeholder]);

  const [selectCell, { isLoading }] = useMutation(() => makeMove({ row, col }));

  const handleClick = useCallback(() => {
    if (!mark) {
      selectCell().then((data) => {
        queryCache.setQueryData("game", () => data);
      });
    }
  }, [mark, selectCell]);

  return (
    <div
      className={classNames("cell", {
        "border-top": top,
        "border-bottom": bottom,
        "border-left": left,
        "border-right": right,
        placeholder: (placeholder || isLoading) && !mark,
      })}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {(placeholder || isLoading) && !mark && player}
      {mark}
    </div>
  );
}

export default function Board() {
  const { error, data, isLoading, isSuccess } = useQuery("game");

  const board = useMemo(() => data?.result, [data]);

  if (error) {
    return (
      <div>
        <p className="error">Disconnected!</p>
      </div>
    );
  }

  if (isLoading || !isSuccess) {
    return <ImSpinner2 className="spin" fontSize="2em" />;
  }

  return (
    <>
      <div>
        <div className="row">
          <Cell bottom col={0} row={0} board={board}></Cell>
          <Cell bottom left right col={0} row={1} board={board}></Cell>
          <Cell bottom col={0} row={2} board={board}></Cell>
        </div>

        <div className="row">
          <Cell col={1} row={0} board={board}></Cell>
          <Cell left right col={1} row={1} board={board}></Cell>
          <Cell col={1} row={2} board={board}></Cell>
        </div>

        <div className="row">
          <Cell top col={2} row={0} board={board}></Cell>
          <Cell top left right col={2} row={1} board={board}></Cell>
          <Cell top col={2} row={2} board={board}></Cell>
        </div>
      </div>
    </>
  );
}
