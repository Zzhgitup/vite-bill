import { BASE_URL, TIMEOUT } from "./config";
import { useNavigate } from "react-router-dom";
import HYrequest from "./request";
const Hyrequire = new HYrequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptor: {
    requestSuccessFn(config) {
      config.headers!.Authorization = localStorage.getItem("billtoken");
      return config;
    },
    responseSuccessFn(res) {
      const res2: any = res;
      if (res2.code == 401) {
        window.location.replace("/login");
      }
      return res;
    },
  },
});
const Hyrequire2 = new HYrequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptor: {
    requestSuccessFn(config) {
      console.log("InternalAxiosRequestConfig拦截器");
      return config;
    },
    requestFailFn: (err) => {
      return err;
    },
    responseSuccessFn: (res) => {
      return res;
    },
    responseFailFn(err) {
      return err;
    },
  },
});

export { Hyrequire, Hyrequire2 };
