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

<template>
  <div class="static mt-2">
    <ArrowLeft class="float-left ml-2 mt-1" @click="onreturn" />
    <span  class="  text-2xl col-start-2 col-span-4  font-bold">个人信息</span>
 
      <div class="main-content">

      <h1 class="text-center text-2xl">{{name}}</h1>

        <div class="grid grid-cols-4 gap-2 mt-2">
          <div>性别</div>
          <div>
            {{sex}}</div>
        </div>

        <div class="grid grid-cols-4 gap-2 mt-2">
          <div>个人评语</div>
          <div>{{profile}}</div>
        </div>
      </div>
  </div>


  
</template>
<style scoped>
 
  .main-content {
      margin: 0 auto;
      margin-top: 6px;
      border-radius: 10px;
      width: 90%;
      height: 650px;
      border: 1px solid;
      border-color: transparent;
    }
</style>