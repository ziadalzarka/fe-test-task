import React from "react";

export const Screens = {
  Main: "main",
  Game: "game",
  Scoreboard: "scoreboard",
};

export const ScreensContext = React.createContext({
  previous: Screens.Main,
  screen: Screens.Main,
  setScreen: () => {},
});
