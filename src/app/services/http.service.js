import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";

const http = axios.create({
  baseURL: configFile.isFirebase
    ? configFile.firebaseEndpoint
    : configFile.apiEndpoint
});

http.interceptors.request.use(
  (config) => {
    if (configFile.isFirebase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const transformData = (data) => {
  return data && !data._id
    ? Object.keys(data).map((key) => ({
      ...data[key]
    }))
    : data;
};

http.interceptors.response.use(
  (res) => {
    if (configFile.isFirebase) {
      res.data = { content: transformData(res.data) };
    }
    return res;
  },
  (error) => {
    const expectedErrors =
      error.response &&
      (error.response.status >= 400) & (error.response.status < 500);

    if (!expectedErrors) {
      console.log(error);
      toast.error("Something went wrong.");
      toast.error("Try again lager.");
    }
    return Promise.reject(error);
  }
);

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete
};

export default httpService;
