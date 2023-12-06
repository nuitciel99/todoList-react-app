import axios from 'axios';
import { API_BASE_URL } from "../api-config";

export function call(api, method, request) {
  const url = API_BASE_URL + api;
  const headers = {
    'Content-Type': 'application/json',
  };

  const config = {
    method: method,
    url: url,
    headers: headers,
    data: request, // Request body for methods other than GET
  };

  return axios(config)
    .then(response => response.data)
    .catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return Promise.reject(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        return Promise.reject('No response received from the server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        return Promise.reject('Error setting up the request.');
      }
    });
}
