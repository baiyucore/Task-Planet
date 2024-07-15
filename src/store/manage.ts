import { ref } from "vue"
import { defineStore } from "pinia" 
export const Manageinfor = defineStore('manageid',()=>{
  const manageid = ref("")
  function transmit(manage_id : string){
    manageid.value =manage_id
  };

  return {manageid , transmit}
},  { persist: true   })