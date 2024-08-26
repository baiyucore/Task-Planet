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

const mutation= useMutation({
  mutationFn: async (params: UserApplyformember) => {
    const response = await   userapi.applyformember(params)
    return response
  },

  onSuccess:(res)=>{
    if( res.err_code === 0 ){
      toast.success("申请成功");
      router.push({ path:"/userclass" });

    } else{
      toast.error( res.err_msg );
    }
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


<template>
  <div class="static mt-2 flex">
    <ArrowLeft class="float-left ml-2 mt-1" @click="onreturn" />
    
  </div>

  <div class="main-content">
 
      <div class="ml-2">
        <span class="pr-6  "> 班级名称</span>{{classname}}
    
      </div>
      <div class="ml-2 mt-4">
        <span class="pr-6"> 班级简介</span>{{classbrief}}
     
      </div>
      <form @click="applyformember">
        <Button  type="submit" class="w-full bg-[#083EC8] mt-64" >
            申请加入
      </Button> 
      </form>
        
      </div>


</template>

<style scoped>
  .main-content {
      margin: 0 auto;
      margin-top: 30px;
      border-radius: 10px;
      width: 90%;
      height: calc(90vh - 70px);
      border: 1px solid;
      border-color: transparent;
    }
</style>