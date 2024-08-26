<template>
  <div class="flex h-12 cursor-default justify-between  bg-gray-600">
    <span  class=" ml-4 text-2xl content-center text-slate-100 font-bold">个人信息</span> 
    <div  class="content-center mr-4 cursor-pointer " @click="reivseoneself">
    <Wrench class="size-8"  color="#f1f5f9"/>
  </div>
</div>
      <div class="main-content">
     
      <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
      <span v-else-if="data">
        <div class="flex flex-col">
          <div class="text-center text-2xl">{{data.createname }}</div>

          <div class="grid grid-cols-4 gap-2 mt-2">
            <div>性别 </div>
            <div>
              {{data.createsex}}</div>
          </div>
          <div class="grid grid-cols-4 gap-2 mt-2">
            <div>个人评语</div>
            <div>{{data.createprofile}}</div>
        </div> 
        </div>
          
        
        
      </span>
      </div>
 

</template>

<script setup lang="ts">
import { Wrench } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import { useRouter } from 'vue-router';
import { createapi } from '@/pages/Api/CreateIndex';
import { UseCreateStore } from '@/store/create';
import { Createid } from '@/pages/Interface/CreateInterface';
import { useQuery } from '@tanstack/vue-query'

const createinfor = UseCreateStore()
const router = useRouter()

const params : Createid= {account_id: createinfor.createid}
 const { isError, data, error,} =useQuery({
    queryKey: ['createviewoneself', params],
    queryFn : () =>  createapi.viewoneself(params) 
  })
  function reivseoneself(){
    router.push({ path:'/createrevise'})
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