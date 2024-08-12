<script setup lang="ts">
import { toast } from 'vue-sonner';
import { ArrowLeft ,ArrowRight } from 'lucide-vue-next';
import {  useRoute, useRouter} from 'vue-router';
import { createapi } from '@/pages/Api/CreateIndex';
import { CreateClassnameId } from '@/pages/Interface/CreateInterface';
import { useQuery } from '@tanstack/vue-query'

const router = useRouter();
let tranport= useRoute();
const id = tranport.query.id as string;

const params : CreateClassnameId ={
    id :id
} 
const { isError, data, error,} =useQuery({
    queryKey: ['createcheckclass', params],
    queryFn : () => createapi.checkclass(params)

  
  })

function oncheckclassmember( user:string,class_name :string){
  router.push({path:'/createcheckclassmember', query:{ user,class_name}});
}

function onreturn(){
  router.back();
}

</script>



<template>
  <div class="static mt-2 ">
    <ArrowLeft class="float-left ml-2 mt-1" @click="onreturn" />
    <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
      <span v-else-if="data">
      <div class="grid grid-cols-6 gap-4">
        <span  class="  text-center text-2xl col-start-2 col-span-4  font-bold">{{data.classname}}</span> 
      </div>
    
        <div class="grid grid-cols-4 gap-2 mt-2 ml-5">
          <div>班级简介</div>
          <div>
            {{data.classbrief}}</div>
        </div>

        <div class="grid grid-cols-4 gap-2 mt-2 ml-5">
          <div>邀请码</div>
          <div>{{data.userinvitecode}}</div>
        </div>
        <div class="grid grid-cols-4 gap-2 mt-2 ml-5 relative">
          <div>班级成员</div>
          <ArrowRight class="absolute right-8" @click="oncheckclassmember(data.userinvitecode,data.classname)"/>
        </div>
     
      </span>
      
      


  </div>
</template>