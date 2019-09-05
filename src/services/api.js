import axios from 'axios';

const api = axios.create({
  baseURL: 'https://estudos-backend.herokuapp.com'
});

export default api;