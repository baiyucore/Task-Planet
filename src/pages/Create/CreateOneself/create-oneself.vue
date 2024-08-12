<script setup lang="ts">
import { Wrench } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

import { createapi } from '@/pages/Api/CreateIndex';
import { UseCreateStore } from '@/store/create';
import { Createid } from '@/pages/Interface/CreateInterface';
import { useQuery } from '@tanstack/vue-query'

const createinfor = UseCreateStore()

const params : Createid= {account_id: createinfor.createid}
 const { isError, data, error,} =useQuery({
    queryKey: ['createviewoneself', params],
    queryFn : () =>  createapi.viewoneself(params) 
  })

</script>

<template>
  <div class="static mt-2">
    <span  class=" ml-10  text-2xl  font-bold select-none">个人信息</span> 
  <div @click="$router.push({ path:'/createrevise'})">
    <Wrench class="w-[100px] absolute top-2 right-0 size-8 " />
    <div class=" text-right mr-9 select-none "   >修改</div>
  </div>
 
      <div class="main-content">
     
      <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
      <span v-else-if="data">
          <h1 class="text-center text-2xl">{{data.createname }}</h1>
          <div class="grid grid-cols-4 gap-2 mt-2">
            <div>性别 </div>
            <div>
              {{data.createsex}}</div>
          </div>
          <div class="grid grid-cols-4 gap-2 mt-2">
            <div>个人评语</div>
            <div>{{data.createprofile}}</div>
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