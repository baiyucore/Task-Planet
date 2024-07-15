<script setup lang="ts">
import { toast } from 'vue-sonner';
import { useRouter } from 'vue-router';
import { ArrowLeft } from 'lucide-vue-next';
import {  onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { createapi } from '@/pages/Api/CreateIndex';
import { Createinfor } from '@/store/create';
import { applycondition, CreateApplyinfor } from '@/pages/Interface/CreateInterface';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Userinfor } from '@/store/user';

const router = useRouter();
const applyinfor = ref<CreateApplyinfor[]>([])
  const createid = Createinfor().createid
onMounted(()=>{


  createapi.application(createid).then((res)=>{
    if(res.err_code === 0 ){
       
      applyinfor.value = res.application.application
    }else{
      toast.error(res.err_msg)
    }
  })
  
})




function onreturn(){
  router.back();
}

function aboutapplication(userid : string,userinvitecode:string,classname : string,condition: string){
  const username = Userinfor().username
  const params : applycondition= {
    userinvitecode : userinvitecode,
    userid : userid,
    classname : classname,
    condition : condition,
    username : username,
    createid : createid,
  }
  createapi.applycondition(params).then((res)=>{
    if(res.err_code=== 0 ){
     
        window.location.reload();
    
     
    }else {
      toast.error(res.err_msg)
    }
  })
}

</script>


<template>
  <div class="static mt-2">
    <ArrowLeft class="float-left ml-2 mt-1" @click="onreturn" />
   
   

      <h2  class=" text-center  text-2xl  font-bold">申请列表</h2> 
      
      <!-- 需要完成 1 同意或者拒绝按钮的设置  2 按下按钮之后就无法在对此进行操作 3 对数据库的操作-->
    
    
    <Accordion type="single" class="w-full" collapsible >
    <AccordionItem v-for="item in applyinfor" :value="item.userid">
      <AccordionTrigger>{{ item.username }} id:{{ item.userid }} 申请加入 {{ item.classname }}</AccordionTrigger>
      <AccordionContent>
        <Button class="bg-sky-400 hover:bg-cyan-600 mr-2" @click="aboutapplication(item.userid,item.userinvitecode,item.classname,'同意')" >同意</Button>
              <Button class="bg-rose-700 hover:bg-rose-800 mr-2" @click="aboutapplication(item.userid,item.userinvitecode,item.classname,'拒绝')">拒绝</Button>
             
      </AccordionContent>
    </AccordionItem>
  </Accordion>
    


  </div>
</template>