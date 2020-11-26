import axios from "axios";

export const isServerConnected = () => {
  return axios
    .get("/")
    .then(({ data }) => {
      return data.ok;
    })
    .catch(() => {
      throw new Error("Cannot connect to server...");
    });
};
