<script setup lang="ts">
import { toast } from 'vue-sonner';
import {  useRoute} from 'vue-router';
import { ArrowLeft } from 'lucide-vue-next';
import { createapi } from '@/pages/Api/CreateIndex';
import { searchname } from '@/pages/Interface/CreateInterface';
import { useQuery } from '@tanstack/vue-query'
import { useRouter} from 'vue-router';

let tranport= useRoute()
const searchid=tranport.query.searchid as string
const identity = tranport.query.identity as string
const router = useRouter();
const params : searchname ={
    searchnameid: searchid,
    identity :identity,
  }
const { isError, data, error,} =useQuery({
    queryKey: ['craeteviewoneself', params],
    queryFn : () =>  createapi.searchname(params)
  })
  function onreturn(){
  router.back();
}


</script>

<template>
  <div class="static mt-2">
    <ArrowLeft class="float-left ml-2 mt-1" @click="onreturn" />
    <span  class="  text-2xl col-start-2 col-span-4  font-bold">个人信息</span>
 
      <div class="main-content">


        <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
    <span v-else-if="data">
              <h1 class="text-center text-2xl">{{data.name}}</h1>

        <div class="grid grid-cols-4 gap-2 mt-2">
          <div>性别</div>
          <div>
            {{data.sex}}</div>
        </div>

        <div class="grid grid-cols-4 gap-2 mt-2">
          <div>个人评语</div>
          <div>{{data.profile}}</div>
        </div>


    </span>
      

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