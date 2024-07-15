<script setup lang="ts">

import { ArrowLeft } from 'lucide-vue-next';
import {  ref } from 'vue'
import { Button } from '@/components/ui/button'
import { useRoute, useRouter} from 'vue-router';
import { userapi } from '@/pages/Api/UserIndex';

import { UserApplyformember } from '@/pages/Interface/UserInterface';
import { Userinfor } from '@/store/user';
import { toast } from 'vue-sonner';




const router = useRouter();
const route = useRoute();

const classbrief = route.query.classbrief
const classname = route.query.classname as string
const createid = route.query.createid as string
const userinvitecode = route.query.userinvitecode as string




function onreturn(){
  router.back();
}

function applyformember(){
  const params : UserApplyformember ={
    userid : Userinfor().userid,
    createid : createid,
    userinvitecode : userinvitecode,
    classname : classname,
    username :  Userinfor().username,
  }
  userapi.applyformember(params).then((res)=>{
    if( res.err_code === 0 ){
      toast.success("申请成功")
    }else{
      toast.error(res.err_msg)
    }
  })
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
      <Button @click="applyformember()" class="w-full bg-[#083EC8] mt-64" >
            申请加入
      </Button>   
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