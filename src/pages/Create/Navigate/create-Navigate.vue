<script setup lang="ts" name="App">
import { RouterLink,RouterView , useRoute} from 'vue-router';
import { ClipboardList , ShoppingCart , ClipboardPenLine , School , User} from 'lucide-vue-next';

import { Createinfor } from '@/store/create';

const createinfor= Createinfor()




</script>

<template>  
<div class=" ">
 <div class="navigate grid grid-cols-5 gap-x-0">

        <div>
          <RouterLink :to="{path:'/createtaskfinsh' }" active-class="active" class="static">
          <ClipboardList class="  relative size-8 top-1 left-8 "/>
          <div class="  text-center">任务  </div>
         </RouterLink>

        </div >
        
        <div>
          <RouterLink :to="{path:'/createshopping'}" active-class="active" class="static">
          <ShoppingCart class="relative size-8 top-1 left-8"/>
          
          <div class=" pl-1 text-center">商城</div>
        </RouterLink>

        </div>
        <div>
          <RouterLink :to="{path:'/createcomment'}" active-class="active" class="static">
          <ClipboardPenLine  class=" relative size-8 top-1 left-8 " />
          
          <div class=" pl-1 text-center">评论</div>
        </RouterLink>
        </div>
    
        <div>
          <RouterLink :to="{path:'/createclass'}" active-class="active" class="static">
          <School class=" relative size-8 top-1 left-8"/>
          <div class="pl-1 text-center">班级</div>
          </RouterLink>
        </div>
        <div>
          <RouterLink :to="{path:'/createoneself'}" active-class="active">
          <User class="relative size-8 top-1 left-8"/>
          <div class=" text-center">我的</div>
          </RouterLink>
        </div>
        
 </div>
  
  <div >
        <RouterView></RouterView>
        
  </div>


</div>


</template>

<style>

    .navigate {
      display: flex;
      justify-content: space-around;
    
      position: absolute;
      bottom: 30px;
      width: 70%;
      
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