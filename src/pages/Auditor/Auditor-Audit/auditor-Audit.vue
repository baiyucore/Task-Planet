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
 
    <div class="flex h-12  justify-between  bg-gray-600">
      <span  class=" ml-4 text-2xl content-center text-slate-100 font-bold">审核</span> 
    </div>
 
  
      <div class="main-content  relative ">

        <RouterLink :to="{path:'/auditrecords'}" active-class="active">
          
          <h1 class=" mt-2 text-lg ">审核记录</h1>
        </RouterLink>
      
        <RouterLink :to="{path:'/denounce'}" active-class="active" >
          
          <h1 class=" text-lg ">举报信息</h1>
        </RouterLink>
    
     
        <div class="absolute right-0  top-0 child-content ">
        <RouterView></RouterView>
        
       </div>
       
      </div>
    
  


 
  
</template>
<style scoped>
 
  .main-content {
      margin: 0 auto;
      border-radius: 10px;
      width: 100%;
      height: calc(90vh - 70px);
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

 
   .main-content a {
      display: block;
      text-align: center;
      width: 100px; 
      border-radius: 10px;
      text-decoration: none;
      color: #ACACAC;
      font-size: 18px;
      letter-spacing: 5px;
      position: static;  
    }
    .main-content a.active {
      color: #FF7710;
      font-weight: 900;
      font-family: 微软雅黑;
    }
</style>