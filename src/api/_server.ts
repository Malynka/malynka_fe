import axios from "axios";

const server = axios.create({
  baseURL: 'http://localhost:3119',
  responseType: 'json'
});

export default server;