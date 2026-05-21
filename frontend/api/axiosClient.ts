import axios from "axios";

interface AuthParams {
  isLoggedIn: boolean;
  token: string | null;
}
const PORT = "5000";

export const axiosClient = axios.create({
  baseURL: `http://localhost:${PORT}/api`,
  withCredentials: true,
});

export const setAuthorizationHeader = ({ isLoggedIn, token }: AuthParams) => {
  if (isLoggedIn) {
    const authorizationHeaderValue = `Bearer ${token}`;
    axiosClient.defaults.headers["Authorization"] = authorizationHeaderValue;
    console.log(axiosClient.defaults.headers["Authorization"]);
  } else {
    delete axiosClient.defaults.headers["Authorization"];
  }
};
