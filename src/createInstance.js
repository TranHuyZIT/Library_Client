import axios from "axios";
import jwt_decode from "jwt-decode";
import { refreshTokenSuccess } from "./store/slices/authReducer";
const API = "http://localhost:5000";
// const API = "https://giahui-library.herokuapp.com";

export const createAxios = (user) => {
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      const date = new Date();
      const decodedToken = jwt_decode(user?.accessToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        // const data = await refreshtoken(user.refreshtoken);
        const refreshToken = localStorage.getItem("refreshToken");

        const res = await axios.post(`${API}/v1/auth/refreshtoken`, {
          refreshToken,
        });
        const data = res.data;
        config.headers["token"] = `Bearer ${data.accessToken}`;
        // dispatch(refreshTokenSuccess(data.refreshToken));
        localStorage.setItem("refreshToken", data.refreshToken);
        return config;
      }
      config.headers["token"] = `Bearer ${user.accessToken}`;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return newInstance;
};
