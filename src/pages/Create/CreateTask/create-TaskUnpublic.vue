<script setup lang="ts">
import { CirclePlus } from 'lucide-vue-next';
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
import { Createinfor } from '@/store/create';
import { onMounted ,ref} from 'vue';
import { CreateViewtask, Createremovetask, viewTask } from '@/pages/Interface/CreateInterface';
import { toast } from 'vue-sonner';

const unfinitask =ref<viewTask[]>([])
const router= useRouter();
const createinfor = Createinfor()

const isLoading = ref(false)
onMounted(()=>{
  isLoading.value =true

  const params : CreateViewtask= {
    account_id:createinfor.createid,
    condition: "未发布",
  }

  createapi.viewtask(params).then((res)=>{
    isLoading.value =false
    if(res.err_code === 0 ){
      unfinitask.value =res.unpublictask
    }else{
      toast.error(res.err_msg)
    }
  })

})


function CreateAddtask(){
  router.push({ path: '/createaddtask' });
}

function taskpublich(taskid :string){
  router.push({path:'/createpublictask',query:{ taskid}});
}

function taskmodify(taskid : string){
  router.push({path:'/createmodify',query:{ taskid}});
}


function taskremover(taskid : string){
  isLoading.value =true
  const params: Createremovetask = {
    taskid:taskid,
    createid : createinfor.createid,
    condition : "未发布",
  }
  createapi.removetask(params).then((res)=>{
    if( res.err_code === 0 ){
      toast.success("删除成功")
      
      window.location.reload();
    }else{
      toast.error(res.err_msg)
    }
  })
}

function taskview(task : viewTask){
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

  <div>
    <div >
      <CirclePlus class="absolute bottom-20 right-5 w-1/6 h-1/6 " @click="CreateAddtask" color="#ff0000"/>
    </div>
        <Accordion type="single" class="w-full " collapsible >
          <AccordionItem v-for="item in unfinitask"  :value="item.taskid">
            
            <AccordionTrigger class="text-xl">
               <div @click="taskview(item)"> {{ item.taskname }} </div>
              
            </AccordionTrigger>
            <AccordionContent>
           
              <Button class="bg-sky-400 hover:bg-cyan-600" @click="taskpublich(item.taskid)" >发布</Button>
              <Button class="bg-amber-700 hover:bg-amber-800" @click="taskmodify(item.taskid)">修改</Button>
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

            </AccordionContent>
          </AccordionItem>
        </Accordion>
          
  </div>

</template>
