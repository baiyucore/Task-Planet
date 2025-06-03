import axios from "axios";

 import { toast } from "vue-sonner";

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
      return response; 
    } else {
 
       return Promise.reject(new Error(response.data.err_msg)); 
    }
  },
  (error) => {

    return Promise.reject(error); 
  }

)

axiosInstance.interceptors.request.use(
  // async (config) => {
  //   try {
  //     // 先请求 `/auth/validate` 检查 Token
  //     await axios.get("http://localhost:3000/auth/validate", { withCredentials: true });

  //     return config; // Token 有效，继续请求
  //   } catch (error) {
  //     toast.error("请重新登入")
  //     window.location.href = "/login"; // ✅ 强制跳转，页面会刷新
  //     return Promise.reject(error); // 拦截请求
  //   }
  // },
  // (error) => {
  //   return Promise.reject(error);
  // }
);


export default axiosInstance;