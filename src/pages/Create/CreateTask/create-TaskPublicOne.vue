<script setup lang="ts">

import { useRoute, useRouter } from 'vue-router';
import { Button } from '@/components/ui/button'
import { ArrowLeft  } from 'lucide-vue-next';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { createapi } from '@/pages/Api/CreateIndex';
import { UseCreateStore } from '@/store/create';
import {  CreateViewtask, Createremovetask, viewTask } from '@/pages/Interface/CreateInterface';
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
import { format } from 'date-fns';
import {useQuery,useMutation} from '@tanstack/vue-query'

const router= useRouter();
const createinfor = UseCreateStore()
const route = useRoute();
const classname = route.query.classname as string;

const params : CreateViewtask = {
    account_id:createinfor.createid,
    condition : "已发布",
  }
const {  isError, data, error} =useQuery({
    queryKey: ['create-viewpublictask', params],
    queryFn : async () =>  await  createapi.viewtask(params,classname),
   
  })

const mutation= useMutation({
  mutationFn: async (params:  Createremovetask) => {
    const response = await  createapi.removetask(params,classname)
    return response
  },
  onSuccess:(res)=>{
    if( res.err_code === 0 ){
      toast.success("删除成功");
      window.location.reload()
    } else{
      toast.error( res.err_msg );
    }
  },  
  onError: (error) => {
    toast.error(error.message)
  },
})

function taskremover(taskid : string){
  mutation.mutate({
    taskid:taskid,
    createid : createinfor.createid,
    condition : "已发布",
  })
}


function taskview(task :viewTask  ){
  const taskname = task.taskname
  const taskCompletionConditions = task.taskCompletionConditions
  const startdate = new Date(task.taskstarttime);
  const taskstarttime = format(startdate, 'yyyy-MM-dd HH:mm:ss');
  const overdate = new Date(task.taskovertime);
  const taskovertime = format(overdate, 'yyyy-MM-dd HH:mm:ss');

  const successrewardone =task.successrewardone
  const successrewardtwo_one = task.successrewardtwo_one
  const successrewardtwo_two = task.successrewardtwo_two
  const failed = task.failed
  router.push({path:'/createunpublicviewtask',query:{ 
    taskname, taskCompletionConditions, taskovertime,taskstarttime, successrewardone,successrewardtwo_one,successrewardtwo_two,failed
  }});
}
function onreturn(){
  router.back();
}

</script>
<template>

  <div class="static mt-2">
    <ArrowLeft class="float-left ml-2 mt-1" @click="onreturn" />
    <span  class="   text-2xl  font-bold">{{classname}}</span> 
  
    <Accordion type="single" class="w-full" collapsible >
   
      <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
    <span v-else-if="data">
      <AccordionItem v-for="items in data.publictask"  :value="items.task.taskid" :key="items._id">
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
      
    </span>

   
   </Accordion>
    

   
          
  </div>

</template>
