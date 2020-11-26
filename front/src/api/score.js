import axios from "axios";

export const getScore = () => {
  return axios
    .get("/score")
    .then(({ data }) => data)
    .catch(() => {
      throw new Error("Cannot connect to server...");
    });
};

export const resetScore = () => {
  return axios
    .post("/score/reset")
    .then(({ data }) => data)
    .catch(() => {
      throw new Error("Cannot connect to server...");
    });
};
