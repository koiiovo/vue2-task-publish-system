import axios from 'axios';

const apiClient = axios.create({
  // baseURL: 'http://8.138.156.16:8080', // 替换为你的后端地址
  baseURL: process.env.VUE_APP_BASE_API, // 使用环境变量来设置 baseURL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
