
<template>
  <div class="static ">
    <ArrowLeft class="absolute top-3 left-0 cursor-pointer" @click="onreturn" />

<div class="flex h-12 justify-center border-4 border-transparent border-b-slate-950   ">
 
  <span  class="  text-center text-2xl col-start-2 col-span-4  font-bold">{{classname}}</span> 
</div>
  </div>

    <div class="flex flex-col">
      <div class="flex justify-center my-2">
        <span > 创建者 {{createname}}</span>
      </div>
      <div class="flex justify-center">
        <span > 已加入人数 {{studentnumber}}</span>
      </div>
      <div class="flex justify-center my-2">
        <span > 班级简介: {{classbrief}}</span>
      </div>


  
        <form @click="applyformember" class="flex  justify-center">
        <Button  type="submit" class="w-11/12 bg-[#374151] " >
            申请加入
      </Button> 
      </form>
      </div>
      
        


  
     
    
     


</template>
<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next';
import { Button } from '@/components/ui/button'
import { useRoute, useRouter} from 'vue-router';
import { userapi } from '@/pages/Api/UserIndex';
import { UserApplyformember } from '@/pages/Interface/UserInterface';
import { Userinfor } from '@/store/user';
import { toast } from 'vue-sonner';
import {useMutation} from '@tanstack/vue-query'

const router = useRouter();
const route = useRoute();

const classbrief = route.query.classbrief
const classname = route.query.classname as string
const createid = route.query.createid as string
const userinvitecode = route.query.userinvitecode as string
const createname = route.query.createname 
const studentnumber = route.query.studentnumber


const mutation= useMutation({
  mutationFn: async (params: UserApplyformember) => {
    const response = await   userapi.applyformember(params)
    return response
  },

  onSuccess:()=>{
      toast.success("申请成功");
      router.push({ path:"/userclass" }); 
  },  
  onError: (error) => {
     toast.error(error.message)
  },


})



async function applyformember(event:Event){
  event.preventDefault();
  if(Userinfor().useraddclass === ""){
    mutation.mutate({
    userid : Userinfor().userid,
    createid : createid,
    userinvitecode : userinvitecode,
    classname : classname,
    username :  Userinfor().username,
    })
  }else{
    toast.error("您已经加入一个班级，等待完成该班级的课程时长之后再申请加入别的班级")
  }
  
}
function onreturn(){
  router.back();
}


</script>


