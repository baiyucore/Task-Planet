<template>
 <div class="static mt-2">
    <ArrowLeft class="absolute top-3 left-0 cursor-pointer" @click=" onreturn" />
  
     
      <div class="flex h-12 justify-center border-4 border-transparent border-b-slate-950   ">
     
     <span  class="  text-center text-2xl col-start-2 col-span-4  font-bold">{{name}}</span> 
  </div>

  <div class="flex flex-col  ">
    <div class="flex justify-center mt-3">
          <div class="mr-3  ">性别</div>
          <div>
            {{sex}}</div>
        </div>
        <div class="flex justify-center mt-3">
          <div class="mr-3 ">个人评语</div>
          <div>{{profile}}</div>
        </div>

  
       
  </div>

      </div>


  
</template>
<script setup lang="ts">
import {  useRoute} from 'vue-router';
import { ArrowLeft } from 'lucide-vue-next';
import { useRouter} from 'vue-router';
let tranport= useRoute()
const name  = tranport.query.name
const sex = tranport.query.sex
const profile = tranport.query.profile
const router = useRouter();
function onreturn(){
  router.back();
}

</script>
<style scoped>
 
  .main-content {
      margin: 0 auto;
      margin-top: 6px;
      border-radius: 10px;
      width: 90%;
      height: calc(90vh - 70px);
      border: 1px solid;
      border-color: transparent;
    }
</style>