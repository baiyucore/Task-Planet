import { ref } from "vue"
import { defineStore } from "pinia" 
import {
  type DateValue,
  getLocalTimeZone,
  today,
} from '@internationalized/date'

//命名问题 应该以use开头 Store结尾 ，实在不行的话应该以use开头
export const UseCreateStore = defineStore('createstore',()=>{
  const createid = ref("")
  const createname = ref("")
  const noticeopen = ref(true);
  const datevalue = ref<DateValue>() 
  datevalue.value =today(getLocalTimeZone()).add({ days: Number(0) })
  function transmit(create_id : string){
    createid.value =create_id
  };
  function transmitname(create_name : string){
    createname.value = create_name
  };
  function $clear(){
    createid.value = ""
    createname.value = ""
    noticeopen.value =true;
    datevalue.value = today(getLocalTimeZone()).add({ days: Number(0) })
  }
  function changenoticeopen(){
    noticeopen.value=false;
  }
  function changeDateValue(changeVaule: DateValue){
    datevalue.value=changeVaule
  }
  return {datevalue,changeDateValue, noticeopen,changenoticeopen,createid ,$clear, transmit,transmitname,createname}
},  { persist: {
  storage: sessionStorage
}  })


