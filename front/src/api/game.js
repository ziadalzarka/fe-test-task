import axios from "axios";

export const getGame = () => {
  return axios
    .get("/game")
    .then(({ data }) => data)
    .catch(() => {
      throw new Error("Cannot connect to server...");
    });
};

export const makeMove = ({ row, col }) => {
  const index = row * 3 + col + 1;

  return axios
    .post("/game/move", { index })
    .then(({ data }) => data)
    .catch(() => {
      throw new Error("Cannot connect to server...");
    });
};

export const playAgain = () => {
  return axios
    .get("/game/next")
    .then(({ data }) => data)
    .catch(() => {
      throw new Error("Cannot connect to server...");
    });
};

export const resetGame = () => {
  return axios
    .post("/game/reset")
    .then(({ data }) => data)
    .catch(() => {
      throw new Error("Cannot connect to server...");
    });
};

export const calculateWinner = (winner) => {
  if (winner === "ai") {
    return "You lose!";
  }
  if (winner === "player") {
    return "You win!";
  }
  return "Tie!";
};
