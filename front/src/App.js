import classNames from "classnames";
import { useCallback, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useQuery } from "react-query";
import { isServerConnected } from "./api/connected";
import "./App.css";
import Board from "./components/Board";
import PlayButton from "./components/PlayButton";

function App() {
  const [fadeOut, setFadeOut] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const { isLoading, error, data: connected } = useQuery("connected", () =>
    isServerConnected()
  );

  const handleStartGame = useCallback(() => {
    setFadeOut(true);
    setTimeout(() => setGameStarted(true), 500);
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
          <Board />
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className={classNames("subsection", { "upper-fadeout": fadeOut })}>
        <h1 className="title">Tic Tac Toe</h1>
      </div>
      <div className={classNames("subsection", { "lower-fadeout": fadeOut })}>
        <PlayButton onClick={handleStartGame}>Play</PlayButton>
      </div>
    </div>
  );
}

export default App;
