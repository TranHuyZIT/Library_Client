import axios from "axios";
import jwt_decode from "jwt-decode";
const refreshtoken = async () => {
  try {
    const res = await axios.post("/v1/auth/refreshtoken", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createAxios = (user) => {
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      const date = new Date();
      const decodedToken = jwt_decode(user?.accessToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshtoken();
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
        };
        config.headers["token"] = `Bearer ${data.accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return newInstance;
};
