import axios from "axios";


const axiosInstance = axios.create({
  baseURL:'',
  timeout : 10000,
  headers:{
    'Content-Type': 'application/json',
  }
})

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.err_code === 0) {
      return response; // 返回成功的响应数据
    } else {
    // 显示错误信息
       return Promise.reject(new Error(response.data.err_msg)); // 返回拒绝的 Promise 以处理错误
    }
  },
  (error) => {
    // 捕获响应中的错误
    return Promise.reject(error); // 返回拒绝的 Promise 以处理错误
  }

)

export default axiosInstance;