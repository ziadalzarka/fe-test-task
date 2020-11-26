import { useCallback, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { queryCache, ReactQueryCacheProvider, useQuery } from "react-query";
import { isServerConnected } from "./api/connected";
import "./App.css";
import GameMenu from "./components/GameMenu";
import Game from "./screens/Game";

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const { isLoading, error, data: connected } = useQuery("connected", () =>
    isServerConnected()
  );

  const handleStartGame = useCallback(() => {
    setGameStarted(true);
  }, [setGameStarted]);

  if (error) {
    return (
      <div className="container">
        <p className="error">{error.message}</p>
      </div>
    );
  }

  if (isLoading || !connected) {
    return (
      <div className="container">
        <ImSpinner2 className="spin" fontSize="2em" />
      </div>
    );
  }

  if (gameStarted) {
    return (
      <div className="container">
        <div className="game-fadein">
          <Game />
        </div>
      </div>
    );
  }

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <div className="container">
        <GameMenu
          title="Tic Tac Toe"
          action="Play"
          onAction={handleStartGame}
        />
      </div>
    </ReactQueryCacheProvider>
  );
}

export default App;
