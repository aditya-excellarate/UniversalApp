import axios from 'axios';
const Axios = props => {
  const api = axios.create({
    baseURL: 'http://10.0.2.2:9000/',
    // baseURL: 'http://localhost:9000/',
    // timeout: 1000,
    headers: {
      'X-Custom-Header': 'foobar',
      'Content-Type': 'multipart/form-data',
      ...props?.header,
    },
  });
  // Add a request interceptor
  api.interceptors.request.use(
    config => {
      // Do something before request is sent
      return config;
    },
    error => {
      // Do something with request error
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  api.interceptors.response.use(
    response => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      console.log('@@@@@ response', response?.data);
      return response?.data;
    },
    error => {
      console.log('@@@@@@@ error', error);
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error?.response);
    },
  );
  return api;
};
export default Axios;
