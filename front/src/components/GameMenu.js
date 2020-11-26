import React, { useState, useCallback, useContext } from "react";
import classNames from "classnames";
import Button from "./Button";
import "./GameMenu.css";
import { ScreensContext } from "../ScreensContext";
import { Screens } from "./../ScreensContext";

export default function GameMenu({
  title,
  action,
  onAction,
  children,
  scoreboard,
}) {
  const [fadeOut, setFadeOut] = useState(false);

  const handleAction = useCallback(() => {
    setFadeOut(true);
    if (onAction) {
      setTimeout(() => onAction(), 500);
    }
  }, [onAction]);

  const screensContext = useContext(ScreensContext);

  const handleScoreboard = useCallback(() => {
    setFadeOut(true);
    setTimeout(() => {
      screensContext.setScreen(Screens.Scoreboard);
    }, 500);
  }, [screensContext]);

  return (
    <>
      <div className={classNames("subsection", { "upper-fadeout": fadeOut })}>
        <h1 className="title">{title}</h1>
        {children}
      </div>
      <div className={classNames("subsection", { "lower-fadeout": fadeOut })}>
        <Button onClick={handleAction}>{action}</Button>
        {scoreboard && <Button onClick={handleScoreboard}>Scoreboard</Button>}
      </div>
    </>
  );
}
