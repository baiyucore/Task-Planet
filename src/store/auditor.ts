import { ref } from "vue"
import { defineStore } from "pinia" 
import {
  type DateValue,
  getLocalTimeZone,
  today,
} from '@internationalized/date'
export const Auditorinfor = defineStore('auditorid',()=>{
  const auditorid = ref("")
  const denouncedatevalue = ref<DateValue>() 
  denouncedatevalue.value = today(getLocalTimeZone()).add({ days: Number(0) })
  const recordsdatevalue = ref<DateValue>() 
  recordsdatevalue.value = today(getLocalTimeZone()).add({ days: Number(0) })

  const commentdatevalue =ref<DateValue>() 
  commentdatevalue.value = today(getLocalTimeZone()).add({ days: Number(0) })

  function transmit(auditor_id : string){
    auditorid.value =auditor_id
  };
  function changecommentDateValue(changeVaule: DateValue){
    commentdatevalue.value=changeVaule
  }
  function changedenounceDateValue(changeVaule: DateValue){
    denouncedatevalue.value=changeVaule
  }
  function changerecordsDateValue(changeVaule: DateValue){
    recordsdatevalue.value=changeVaule
  }
  return {auditorid , transmit,recordsdatevalue,changerecordsDateValue,denouncedatevalue,changecommentDateValue,changedenounceDateValue,commentdatevalue}
},  {
  //  persist: true   
   persist: {
    storage: sessionStorage
  }
  })