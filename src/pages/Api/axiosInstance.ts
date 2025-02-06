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
      return response; 
    } else {
 
       return Promise.reject(new Error(response.data.err_msg)); 
    }
  },
  (error) => {

    return Promise.reject(error); 
  }

)

export default axiosInstance;