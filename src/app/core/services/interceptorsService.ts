import axios, { InternalAxiosRequestConfig } from 'axios';
import store from 'app/store';
import environment from 'environments';

axios.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    const authorization = store.getState().system.member.authorization; // 取得登入授權資料
    if (authorization) {
      config.headers.Authorization = `${environment.backend.headers.authorization.prefix} ${authorization.token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);