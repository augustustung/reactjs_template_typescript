import Axios from 'axios';
import { message } from 'antd';

const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 120000,
});

axios.interceptors.request.use(
  function (config: any) {
    //if token is passed in server side
    if (config && config.token) {
      //modify header here to include token
      Object.assign(config.headers, {
        Authorization: `Bearer ${config.token}`,
      });
    } else {
      const userData = localStorage.getItem("user_data") || "{}"
      const token = JSON.parse(userData).token;
      if (token) {
        Object.assign(config.headers, { Authorization: `Bearer ${token}` });
      }
    }
    return config;
  },
  function (error: any) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response: any) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error: any) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    const {statusCode,message: data} = (error && error.response && error.response.data) || { statusCode: 401, message: "Unauthorized"};
    if (statusCode === 401) {
      message.warn(data || "Unauthorized");
      setTimeout(()=>{
        window.localStorage.removeItem("user_data");
        window.location.href = `/`;
      },1000);
    }
    else if ((statusCode === 401 && data === 'Unauthorized') || (statusCode === 403 && data === 'InvalidToken')){
        window.localStorage.removeItem("user_data");
        message.warn(data || "Unauthorized");
        window.location.href = `/`;
      }
    else if(statusCode === 505){
        message.warn(data || "Unauthorized");
        window.localStorage.removeItem("user_data");
        window.location.href = `/`;
      }
    return Promise.reject(error);
  }
);

type TToken = string | undefined;

const API = {
  get: (endpoint: string, params = {}) =>
    axios.get(endpoint, { params }),
  post: (
    endpoint: string,
    data: any = {},
    token?: TToken,
    config?: any
  ) => axios.post(endpoint, data, { token, ...config })
};

export default API;
