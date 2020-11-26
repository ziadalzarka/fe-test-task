import { useCallback, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import {
  queryCache,
  ReactQueryCacheProvider,
  useQuery,
  useMutation,
} from "react-query";
import { isServerConnected } from "./api/connected";
import "./App.css";
import GameMenu from "./components/GameMenu";
import Game from "./screens/Game";
import Scoreboard from "./screens/Scoreboard";
import { ScreensContext, Screens } from "./ScreensContext";
import { playAgain } from "./api/game";
import { resetScore } from "./api/score";

function App() {
  const [screen, setScreen] = useState(Screens.Main);
  const [previous, setPrevious] = useState(Screens.Main);

  const handleSetScreen = useCallback(
    (nav) => {
      setPrevious(screen);
      setScreen(nav);
    },
    [screen]
  );

  const { isLoading, error, data: connected } = useQuery("connected", () =>
    isServerConnected()
  );

  const [
    resetAll,
    { isLoading: isGameLoading, error: gameError },
  ] = useMutation(() => playAgain().then(() => resetScore()));

  const handleStartGame = useCallback(async () => {
    await resetAll();
    setScreen(Screens.Game);
  }, [resetAll]);

  if (error || gameError) {
    return (
      <div className="container">
        <p className="error">{error ? error.message : gameError.message}</p>
      </div>
    );
  }

  if (isLoading || !connected || isGameLoading) {
    return (
      <div className="container">
        <ImSpinner2 className="spin" fontSize="2em" />
      </div>
    );
  }

  return (
    <ScreensContext.Provider
      value={{ screen, previous, setScreen: handleSetScreen }}
    >
      <ReactQueryCacheProvider queryCache={queryCache}>
        <div className="container">
          {screen === Screens.Main && (
            <GameMenu
              title="Tic Tac Toe"
              action="Play"
              onAction={handleStartGame}
            />
          )}

          {screen === Screens.Game && (
            <div className="game-fadein">
              <Game />
            </div>
          )}

          {screen === Screens.Scoreboard && (
            <div className="game-fadein">
              <Scoreboard />
            </div>
          )}
        </div>
      </ReactQueryCacheProvider>
    </ScreensContext.Provider>
  );
}

export default App;
