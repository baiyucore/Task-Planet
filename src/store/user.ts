import { ref } from "vue"
import { defineStore } from "pinia" 
export const Userinfor = defineStore('userid',()=>{
  const userid = ref("")
  const username = ref("")
  const useraddclass = ref("")
  const coin = ref(0)
  const classcreateid = ref("")

  function clear(){
     // eslint-disable-next-line @typescript-eslint/no-unused-expressions
     coin.value = 0, 
     classcreateid.value="",  
     userid.value="",
     useraddclass.value = "" ,
     username.value = ""
    };
  function transmitid(user_id : string){
    userid.value =user_id
  };
  function transmitname(user_name : string){
    username.value = user_name
  }
  function transmitclassname(user_classname : string){
    useraddclass.value = user_classname
  }
  function coinchange(coinchange: number){
    coin.value = coinchange
  }
  function transmitclasscreateid(class_create: string){
    classcreateid.value = class_create
  }
  return {userid , clear,transmitid, transmitname, username,useraddclass , transmitclassname,coin,coinchange,classcreateid,transmitclasscreateid}
},  { persist: {
  storage: sessionStorage
}  })