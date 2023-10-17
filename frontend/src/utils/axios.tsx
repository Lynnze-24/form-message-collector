import axios from 'axios';

const Axios = axios.create({
  baseURL: 'https://fmc-cehz.onrender.com/api', //'http://localhost:4000/api'
  timeout: 10000,
});

Axios.defaults.headers.post['Content-Type'] = 'application/json';

export default Axios;
