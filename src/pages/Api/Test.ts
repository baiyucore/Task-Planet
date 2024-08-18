import axios from "axios"


const testapi={
async  test(page:number){
  const response = await apiClient.post("https://irhidbbf7c.bja.sealos.run/test2",{
    page:page,
  });
  return response.data;
},
}
export {testapi}


// 创建 Axios 实例
const apiClient = axios.create({
  baseURL: '', // 你的 API 基础 URL
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',//默认请求体格式为 JSON
    // 其他公共请求头
  }
});

// 添加请求拦截器 它的作用是检查本地存储中是否有认证 token，并将这个 token 自动添加到请求头中，以便进行认证。
//token 是一种用于身份验证和授权的安全机制，它可以标识用户或系统并授予访问权限。
apiClient.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('token'); // 从 localStorage 获取 token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 添加授权头
    }
    return config;
  },
  error => Promise.reject(error)
);

// 添加响应拦截器
apiClient.interceptors.response.use(
  response => response,
  error => {
    // 对响应错误做些什么
    console.error('API error:', error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
