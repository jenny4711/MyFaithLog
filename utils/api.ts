import axios from 'axios';

// const LOCAL_BACKEND='http://localhost:5000'
const LOCAL_BACKEND = 'https://bibleapi-fr2x.onrender.com';

const api = axios.create({
  baseURL: `${LOCAL_BACKEND}/nb`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Update the token before each request
// api.interceptors.request.use(
//   console.log("interceptor"),
// );

// Log and handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errData = error.response ? error.response.data : error;
    console.log('RESPONSE ERROR', errData);
    return Promise.reject(errData);
  }
);

export default api;
