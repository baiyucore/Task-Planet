import { ref } from "vue"
import { defineStore } from "pinia" 
export const Userinfor = defineStore('userid',()=>{
  const userid = ref("")
  const username = ref("")
  const useraddclass = ref("")
  const coin = ref(-99999999)
  const classcreate = ref("")

  function clear(){
     coin.value = -99999999, 
     classcreate.value="",
     userid.value="",
     useraddclass.value = "" ,
     username.value = ""
    };
  function transmit(user_id : string){
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
  function transmitclasscreate(class_create: string){
    classcreate.value = class_create
  }
  return {userid , clear,transmit, transmitname, username,useraddclass , transmitclassname,coin,coinchange,classcreate,transmitclasscreate}
},  { persist: true   })