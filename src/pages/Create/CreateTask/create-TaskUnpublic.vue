<template>
  <div>
    <div >
      <Plus class="absolute bottom-24 right-8 w-14 h-14 cursor-pointer "  color="#1e1b4b" @click="$router.push({path:'/createaddtask'})"/>
    </div>


    <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
    <span v-else-if="data">
      <Accordion type="single" class="w-full " collapsible >
          <AccordionItem v-for="item in data.unpublictask"  :value="item.taskid" :key="item._id">
            
            <AccordionTrigger class="text-xl">
               <div @click="taskview(item)"> {{ item.taskname }} </div>
              
            </AccordionTrigger>
            <AccordionContent>
           <div class=" flex justify-center gap-4">
            <Button class="bg-indigo-400 hover:bg-indigo-600" @click="taskpublich(item.taskid)" >发布</Button>
              <Button class="bg-neutral-700 hover:bg-neutral-500" @click="taskmodify(item.taskid,item.taskname,item.taskCompletionConditions)">修改</Button>
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
                    <AlertDialogAction  @click="taskremover(item.taskid)">确认</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
           </div>
             

            </AccordionContent>
          </AccordionItem>
        </Accordion>
          
    </span>
  
  </div>

</template>
<script setup lang="ts">
import { Plus } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import { Button } from '@/components/ui/button'
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { createapi } from '@/pages/Api/CreateIndex';
import { UseCreateStore} from '@/store/create';

import { CreateViewtask, Createremovetask, viewTask } from '@/pages/Interface/CreateInterface';
import { toast } from 'vue-sonner';
import {useQuery,useMutation} from '@tanstack/vue-query'
import { format } from 'date-fns';
//不知道还有没有用

const router= useRouter();
const createinfor = UseCreateStore()

const params : CreateViewtask= {
    account_id:createinfor.createid,
    condition: "未发布",
  }
const {  isError, data, error,} =useQuery({
    queryKey: ['create-viewunpublictask', params],
    queryFn : async () =>  await  createapi.viewtask(params),
   
  })


function taskpublich(taskid :string){
  router.push({path:'/createpublictask',query:{ taskid}});
}

function taskmodify(taskid : string,taskname:string,taskcompletion:string){
  router.push({path:'/createmodify',query:{ taskid,taskname,taskcompletion}});
}

//删除
const mutation= useMutation({
  mutationFn: async (params:  Createremovetask) => {
    const response = await  createapi.removetask(params)
    return response
  },
  onSuccess:(res)=>{
    if( res.err_code === 0 ){
      toast.success("删除成功");

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
    condition : "未发布",
  })

}

function taskview(task : viewTask){
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
    taskname, taskCompletionConditions,taskstarttime,taskovertime,
    successrewardone,successrewardtwo_one,successrewardtwo_two,failed
  }});
}

</script>