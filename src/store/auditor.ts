import { ref } from "vue"
import { defineStore } from "pinia" 
export const Auditorinfor = defineStore('auditorid',()=>{
  const auditorid = ref("")
  function transmit(auditor_id : string){
    auditorid.value =auditor_id
  };

  return {auditorid , transmit}
},  {
  //  persist: true   
   persist: {
    storage: sessionStorage
  }
  })