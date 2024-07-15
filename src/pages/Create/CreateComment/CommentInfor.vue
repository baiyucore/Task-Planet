<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { Button } from '@/components/ui/button'
import { ArrowLeft ,Check } from 'lucide-vue-next';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { createapi } from '@/pages/Api/CreateIndex';
import { Createinfor } from '@/store/create';
import { onMounted ,ref} from 'vue';
import {  CreateViewTask, CreateViewtask, Createremovetask, viewTask } from '@/pages/Interface/CreateInterface';
import { toast } from 'vue-sonner';

const viewtask =ref<CreateViewTask[]>([])
const router= useRouter()
const createinfor = Createinfor()
const route = useRoute()
const classname = route.query.classname as string
const taskid = route.query.taskid as string

const isLoading = ref(false)
onMounted(()=>{
  isLoading.value =true

  const params : CreateViewtask = {
    account_id:createinfor.createid,
    condition : "已发布",
  }

  createapi.viewtask(params,classname).then((res)=>{
    isLoading.value =false
    if(res.err_code === 0 ){
      viewtask.value =res.publictask
    }else{
      toast.error(res.err_msg)
    }
  })

})

function onreturn(){
  router.back();
}


</script>
<template>

  <div class="static mt-2">
    <ArrowLeft class="float-left ml-2 mt-1" @click="onreturn" />
    <span  class="   text-2xl  font-bold">{{classname}}</span> 
  
   
    

   
          
  </div>

</template>
