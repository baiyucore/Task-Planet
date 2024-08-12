<script setup lang="ts" name="App">
import { RouterLink,RouterView } from 'vue-router';
import { ClipboardPenLine ,  Glasses ,Megaphone} from 'lucide-vue-next';

</script>

<template>  
<div class=" ">
 <div class="navigate  grid grid-cols-3 gap-x-20">

     
        <div class="ml-2">
          <RouterLink :to="{path:'/auditorcomment'}" active-class="active" class="static">
          <ClipboardPenLine  class=" relative size-8 top-1 left-8 " />
          
          <div class=" pl-1 text-center">评论</div>
        </RouterLink>
        </div>
    
        <div>
          <RouterLink :to="{path:'/audit'}" active-class="active" class="static">
          <Glasses class=" relative size-8 top-1 left-8"/>
          <div class="pl-1 text-center">审核</div>
          </RouterLink>
        </div>
        <div>
          <RouterLink :to="{path:'/auditiornotification'}" active-class="active" class="static">
          <Megaphone class="relative size-8 top-1 left-8"/>
          <div class=" text-center">通知</div>
          </RouterLink>
        </div>
        
 </div>
  
  <div >
        <RouterView></RouterView>
        
  </div>


</div>


</template>

<style scoped>

    .navigate {
      display: flex;
      justify-content: space-around;
    
      position: absolute;
      bottom: 30px;
      width: 100%;
      
    }
    .navigate a {
      display: block;
      text-align: center;
      width: 100px;
      height: 60px;
      line-height: 40px;
      border-radius: 10px;
      text-decoration: none;
      color: #ACACAC;
      font-size: 18px;
      letter-spacing: 5px;
      position: static;  
    }
    .navigate a.active {
      background-color: #64967e00;
      color: #FF7710;
      font-weight: 900;
      font-family: 微软雅黑;
    }
    .main-content {
      margin: 0 auto;
      margin-top: 30px;
      border-radius: 10px;
      width: 90%;
      height: 400px;
      border: 1px solid;
    }
</style>