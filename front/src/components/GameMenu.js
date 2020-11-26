import React, { useState, useCallback } from "react";
import classNames from "classnames";
import PlayButton from "./PlayButton";
import "./GameMenu.css";

export default function GameMenu({ title, action, onAction, children }) {
  const [fadeOut, setFadeOut] = useState(false);

  const handleAction = useCallback(() => {
    setFadeOut(true);
    if (onAction) {
      setTimeout(() => onAction(), 500);
    }
  }, [onAction]);

  return (
    <>
      <div className={classNames("subsection", { "upper-fadeout": fadeOut })}>
        <h1 className="title">{title}</h1>
        {children}
      </div>
      <div className={classNames("subsection", { "lower-fadeout": fadeOut })}>
        <PlayButton onClick={handleAction}>{action}</PlayButton>
      </div>
    </>
  );
}
