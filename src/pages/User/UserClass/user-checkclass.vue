<template>
  <div class="static  ">
    <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
      <span v-else-if="data">
        <ArrowLeft class="absolute top-2.5 left-2 cursor-pointer" @click="onreturn" />
        <div class="flex h-12 justify-center border-4 border-transparent border-b-slate-950   ">
     
          <span  class=" cursor-default text-center text-2xl col-start-2 col-span-4  font-bold">{{data.classname}}</span> 
        </div>
      
        <div class="flex flex-col  ">
          <div class="grid grid-cols-3 mt-3  mt-2 ">
            <div class="cursor-default flex justify-center">班级简介</div>
            <div>
              {{data.classbrief}}
            </div>
            <div></div>
          </div>

        <div class="grid grid-cols-3 mt-3  mt-2 ">

          <div class="cursor-default flex justify-center">邀请码</div>
          <div>{{data.userinvitecode}}</div>
          <div></div>
        </div>

        <div class="grid grid-cols-3  mt-3 ">

          <div class="cursor-default flex justify-center">资料</div>
          <div></div>
          <div class="flex justify-center">
            <ArrowRight class="cursor-pointer  " @click="profile(data.classname,data.userinvitecode)"/>
          </div>

        </div>

        <div class="grid grid-cols-3  mt-3 ">

          <div class="cursor-default flex justify-center">班级成员</div>
          <div></div>
          <div class="flex justify-center">
            <ArrowRight class="cursor-pointer  " @click="oncheckclassmember(data.userinvitecode,data.classname)"/>
          </div>

        </div>

        </div>
        
     
      </span>
      
      


  </div>
</template>
<script setup lang="ts">
import { toast } from 'vue-sonner';
import { ArrowLeft ,ArrowRight } from 'lucide-vue-next';
import {  useRoute, useRouter} from 'vue-router';
import { createapi } from '@/pages/Api/CreateIndex';
import { CreateClassnameId } from '@/pages/Interface/CreateInterface';
import { useQuery } from '@tanstack/vue-query'

const router = useRouter();
let tranport= useRoute();
const id = tranport.query.user as string;

const params : CreateClassnameId ={
    id :id
} 
const { isError, data, error,} =useQuery({
    queryKey: ['createcheckclass', params],
    queryFn : () => createapi.checkclass(params)

  
  })

function oncheckclassmember( user:string,classname :string){
  router.push({path:'/usercheckclassmember', query:{ user,classname}});
}
function profile(class_name:string,userinvitecode:string){
  router.push({path:'/userprofile',query:{class_name,userinvitecode}});
}

function onreturn(){
  router.back();
}

</script>
