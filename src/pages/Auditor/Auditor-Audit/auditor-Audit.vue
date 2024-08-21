<script setup lang="ts">
import { ref , watch } from 'vue';
import {  useRouter} from 'vue-router';

const router= useRouter();
const viewtaskvalue= ref('finish');
watch(viewtaskvalue,(newValue)=>{

  switch(newValue){
    case 'finish':
    router.push({ path:"/createtaskfinsh" });
      break;
    case 'unfinished':
    router.push({ path:"/createtaskunfinshed" });
      break;
    default:
      break;
  }
})


</script>

<template>
  <div class=" mt-2">
    <span  class=" ml-10  text-2xl  font-bold">审核</span> 
  
      <div class="main-content relative">
        <RouterLink :to="{path:'/auditrecords'}" active-class="active">
          
          <h1 class=" mt-2 text-lg ">审核记录</h1>
        </RouterLink>
        <br>
        <RouterLink :to="{path:'/denounce'}" active-class="active" >
          
          <h1 class="mt-2 text-lg ">举报信息</h1>
        </RouterLink>
        <br>
     
        <div class="absolute right-0  top-0 child-content ">
        <RouterView></RouterView>
        
       </div>
       
      </div>
    
  
  </div>

 
  
</template>
<style scoped>
 
  .main-content {
      margin: 0 auto;
      margin-top: 30px;
      border-radius: 10px;
      width: 90%;
      height: 750px;
      border: 1px solid;
      border-color: transparent;
    }
    .child-content {
  width: 80%;
  height: 100%;
  border: 1px solid;
  border-color: transparent;
  border-radius: 10px;
}
</style>