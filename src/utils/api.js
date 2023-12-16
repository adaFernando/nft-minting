import axios from 'axios';


// Create an instance of axios
const api = axios.create({
  baseURL: 'http://146.190.70.132:5000/api',
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
