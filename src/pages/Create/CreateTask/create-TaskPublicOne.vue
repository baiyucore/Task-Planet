<script setup lang="ts">

import { useRoute, useRouter } from 'vue-router';
import { Button } from '@/components/ui/button'
import { ArrowLeft  } from 'lucide-vue-next';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { createapi } from '@/pages/Api/CreateIndex';
import { Createinfor } from '@/store/create';
import { onMounted ,ref} from 'vue';
import {  CreateViewTask, CreateViewtask, Createremovetask, viewTask } from '@/pages/Interface/CreateInterface';
import { toast } from 'vue-sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

const viewtask =ref<CreateViewTask[]>([])
const router= useRouter();
const createinfor = Createinfor()
const route = useRoute();
const classname = route.query.classname as string;

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





function taskremover(taskid : string){
  isLoading.value =true
  const params: Createremovetask = {
    taskid:taskid,
    createid : createinfor.createid,
    condition : "已发布",
  }
  createapi.removetask(params,classname).then((res)=>{
    if( res.err_code === 0 ){
      toast.success("删除成功")
      
      window.location.reload();
    }else{
      toast.error(res.err_msg)
    }
  })
}
function onreturn(){
  router.back();
}

function taskview(task :viewTask  ){
  const taskname = task.taskname
  const taskCompletionConditions = task.taskCompletionConditions
  const taskstarttimeyear = task.taskstarttime.year
  const taskstarttimemonth = task.taskstarttime.month
  const taskstarttimeday = task.taskstarttime.day

  const taskovertimeyear = task.taskovertime.year
  const taskovertimemonth = task.taskovertime.month
  const taskovertimeday = task.taskovertime.day

  const successrewardone =task.successrewardone
  const successrewardtwo_one = task.successrewardtwo_one
  const successrewardtwo_two = task.successrewardtwo_two
  const failed = task.failed
  router.push({path:'/createunpublicviewtask',query:{ 
    taskname, taskCompletionConditions, taskovertimeyear, taskovertimemonth, taskovertimeday, 
    taskstarttimeyear, taskstarttimemonth, taskstarttimeday, successrewardone,successrewardtwo_one,successrewardtwo_two,failed
  }});
}

</script>
<template>

  <div class="static mt-2">
    <ArrowLeft class="float-left ml-2 mt-1" @click="onreturn" />
    <span  class="   text-2xl  font-bold">{{classname}}</span> 
  
    <Accordion type="single" class="w-full" collapsible >
   

     <AccordionItem v-for="items in viewtask"  :value="items.task.taskid">
        <AccordionTrigger class="text-xl">
        <div @click="taskview(items.task)"> {{ items.task.taskname}}</div>
      </AccordionTrigger>
      <AccordionContent>
       
 
        <AlertDialog>
                <AlertDialogTrigger as-child>
                  <Button variant="outline" class="bg-rose-700 hover:bg-rose-800 text-white" >
                    删除
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>你确定删除?</AlertDialogTitle>
                    <AlertDialogDescription>
                      删除后无法复原
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>取消</AlertDialogCancel>
                    <AlertDialogAction  @click="taskremover(items.task.taskid)">确认</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

      </AccordionContent>
    
     
    </AccordionItem>
   
   </Accordion>
    

   
          
  </div>

</template>
