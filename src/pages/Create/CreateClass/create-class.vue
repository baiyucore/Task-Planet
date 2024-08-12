<script setup lang="ts">
import {  useRouter} from 'vue-router';
import { toast } from 'vue-sonner';
import { CirclePlus } from 'lucide-vue-next';
import { createapi } from '@/pages/Api/CreateIndex';
import { Createid  } from'@/pages/Interface/CreateInterface';
import { UseCreateStore } from '@/store/create';
import { useQuery } from '@tanstack/vue-query'

const createinfor = UseCreateStore()
const router = useRouter();
const params: Createid= {account_id: createinfor.createid}

const { isError, data, error,} =useQuery({
    queryKey: ['craeteviewoneself', params],
    queryFn : () =>   createapi.viewoverclass(params)
  })


function CheckClass(id : string){
   router.push({ path:'/createcheckclass', query:{id} });
}

</script>

<template>
  <div class="static mt-2">
    <span  class="  ml-10  text-2xl select-none font-bold">班级</span> 
    <div class="w-[65px] absolute top-3 right-0">
      <svg
      @click="$router.push({ path:'/createrequestjoin' })"
      xmlns="http://www.w3.org/2000/svg"
      width="28" 
      height="28" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round" 
      class=" lucide lucide-message-square-dot ">
      <path d="M11.7 3H5a2 2 0 0 0-2 2v16l4-4h12a2 2 0 0 0 2-2v-2.7"/>
      <circle stroke="red" cx="18" cy="6" r="3"/>
    </svg>
    </div>


 
      <div class="main-content">
        <CirclePlus class="absolute bottom-20 right-5 w-1/6 h-1/6 " @click="$router.push({ path:'/addclass'})" />


        <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
        <span v-else-if="data">
        <h1 @click="CheckClass(classnameview.userinvitecode)" v-for="classnameview in data.existed" :key="classnameview._id"  class="text-center select-none text-2xl mb-2">
          {{classnameview.classname }}
        </h1>
       
        </span>
        
      </div>
  </div>

  


  
</template>
<style scoped>
  .main-content {
      margin: 0 auto;
      margin-top: 30px;
      border-radius: 10px;
      width: 90%;
      height: 650px;
      border: 1px solid;
      border-color: transparent;
    }
</style>