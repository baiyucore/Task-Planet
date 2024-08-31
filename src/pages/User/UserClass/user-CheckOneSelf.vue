<template>
  <div class="static mt-2">
    <ArrowLeft class="absolute top-3 left-0 cursor-pointer" @click=" onreturn" />
  
        <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
    <span v-else-if="data">
      <div class="flex h-12 justify-center border-4 border-transparent border-b-slate-950   ">
     
     <span  class="  text-center text-2xl col-start-2 col-span-4  font-bold">{{data.name}}</span> 
  </div>

  <div class="flex flex-col  ">
    <div class="flex justify-center mt-3">
          <div class="mr-3  ">性别</div>
          <div>
            {{data.sex}}</div>
        </div>
        <div class="flex justify-center mt-3">
          <div class="mr-3 ">个人评语</div>
          <div>{{data.profile}}</div>
        </div>

  
       
  </div>
    </span>
      </div>

  


  
</template>
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
