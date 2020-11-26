import hdate from "human-date";
import React, { useCallback, useContext, useMemo } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useQuery } from "react-query";
import { calculateWinner } from "../api/game";
import Button from "../components/Button";
import { ScreensContext } from "../ScreensContext";
import { getScore } from "./../api/score";
import "./Scoreboard.css";

export default function Scoreboard() {
  const { error, data, isLoading, isSuccess } = useQuery("scores", () =>
    getScore()
  );

  const list = useMemo(
    () =>
      data?.result.list.map((item) => ({
        ...item,
        text: calculateWinner(item.winner),
        time: hdate.relativeTime(new Date(item.ts)),
      })),
    [data]
  );

  const screensContext = useContext(ScreensContext);

  const handleGoBack = useCallback(() => {
    screensContext.setScreen(screensContext.previous);
  }, [screensContext]);

  if (error) {
    return <p className="error">Cannot load scorebaord</p>;
  }

  if (isLoading || !isSuccess) {
    return <ImSpinner2 className="spin" fontSize="2em" />;
  }

  return (
    <>
      <div className="score-list">
        {list?.map((item) => (
          <div key={item.ts} className="score-item">
            <p className="score-holder">{item.text}</p>
            <p className="score-time">{item.time}</p>
          </div>
        ))}
        <Button onClick={handleGoBack}>Back</Button>
      </div>
    </>
  );
}
