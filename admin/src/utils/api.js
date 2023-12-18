import axios from 'axios';

import { host } from '../config'
// Create an instance of axios
const api = axios.create({
  baseURL: `${host}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});
/*
  NOTE: intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
*/

export default api;
