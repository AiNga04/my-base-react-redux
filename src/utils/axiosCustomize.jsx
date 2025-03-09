import axios from "axios";
import NProgress from "nprogress";
import { store } from "../redux/store";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3,
  easing: "ease",
  color: "#29d",
  thick: true,
  transition: "opacity 0.3s ease",
  trailColor: "#fff",
  spinner: true,
  spinnerPosition: "top-right",
  show: true,
  duration: 2000,
});

const instance = axios.create({
  baseURL: "http://localhost:8081",
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    NProgress.start();
    const state = store.getState();
    const token = state.user.account.access_token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    NProgress.done();
    return response && response.data ? response.data : response;
  },
  function (error) {
    console.log(`Instance ${error}`);

    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default instance;
