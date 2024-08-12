import { ref } from "vue"
import { defineStore } from "pinia" 


//命名问题 应该以use开头 Store结尾 ，实在不行的话应该以use开头
export const Createinfor = defineStore('createid',()=>{
  const createid = ref("")
  const createname = ref("")
  function transmit(create_id : string){
    createid.value =create_id
  };
  function transmitname(create_name : string){
    createname.value = create_name
  };
  function $clear(){
    createid.value = ""
    createname.value = ""
  }
  return {createid ,$clear, transmit,transmitname,createname}
},  { persist: {
  storage: sessionStorage
}  })


