<script setup lang="ts">
import { ref , watch} from 'vue';
import { Select, SelectContent,SelectItem,SelectTrigger,SelectValue,
} from '@/components/ui/select'
import { useRouter} from 'vue-router';
import {DateFormatter,type DateValue,getLocalTimeZone, today,} from '@internationalized/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { toast } from 'vue-sonner';
import { UserLoadTask, UserViewAllTask, UserViewTask, UserViewUnfinishTask, viewTask, viewUnFinishTask } from '@/pages/Interface/UserInterface';
import { Userinfor } from '@/store/user';
import { userapi } from '@/pages/Api/UserIndex';
import { useQuery, } from '@tanstack/vue-query'
import { format } from 'date-fns';

const router= useRouter();
const df = new DateFormatter('zh-CN', {
  dateStyle: 'long',
})
const items = [
  { value: 0, label: '今天' },
  { value: -1, label: '昨天' },
  { value: -2, label: '前天' },
]
const value = ref<DateValue>()
const viewunfinishtask =ref<UserViewUnfinishTask[]>([])
const viewfinishtask = ref<UserViewTask[]>([])
value.value =today(getLocalTimeZone()).add({ days: Number(0) })

  const parmas : UserViewAllTask= {
    time:value.value,
      userid: Userinfor().userid,
      classname: Userinfor().useraddclass,
    }
    userapi.ViewAllTask(parmas).then((res)=>{
      if(res.err_code === 0){
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        viewunfinishtask.value = res.unfinishtask,
        viewfinishtask.value =res.finishtask
      }else{
        toast.error(res.err_msg)
      }
    })

  const param:UserLoadTask= {
    userid : Userinfor().userid,
    classname : Userinfor().useraddclass,
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isSuccess  } = useQuery({
  queryKey: ['loadTasks'],
  queryFn: () => userapi.LoadTask(param)
 
});



watch(value,(newValue,oldValue)=>{
  if(newValue !== oldValue){
    const parmas : UserViewAllTask= {
      time:newValue,
      userid: Userinfor().userid,
      classname: Userinfor().useraddclass,
    }
    userapi.ViewAllTask(parmas).then((res)=>{
      if(res.err_code === 0){
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        viewunfinishtask.value = res.unfinishtask,
        viewfinishtask.value =res.finishtask
      }else{
        toast.error(res.err_msg)
      }
    })
  }
})

function unfinishtaskview(task :viewUnFinishTask  ){
  const taskid = task.taskid
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

  router.push({path:'/userviewunfinishtask',query:{ 
    taskid,taskname, taskCompletionConditions,taskstarttime,taskovertime, 
    successrewardone,successrewardtwo_one,successrewardtwo_two,failed
  }});
}


function finishtaskview(task :viewTask,summarize: string ,rewardselect:string){
  const taskid = task.taskid
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
  
  router.push({path:'/userviewfinishtask',query:{ 
    taskid,taskname, taskCompletionConditions,taskstarttime,taskovertime, 
    successrewardone,successrewardtwo_one,successrewardtwo_two,failed,summarize,rewardselect,
  }});
}

</script>

<template>
  <div class="static mt-2">
    <span  class=" ml-10  text-2xl  font-bold">任务</span> 
    <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="cn(
          'w-[280px] justify-start text-left font-normal',
          !value && 'text-muted-foreground',
        )"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ value ? df.format(value.toDate(getLocalTimeZone())) : "选择查看时间" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="flex w-auto flex-col gap-y-2 p-2">
      <Select
        @update:model-value="(v) => {
          if (!v) return;
          value = today(getLocalTimeZone()).add({ days: Number(v) });
        }"
      >
        <SelectTrigger>
          <SelectValue placeholder="选择" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="item in items" :key="item.value" :value="item.value.toString()">
            {{ item.label }}
          </SelectItem>
        </SelectContent>
      </Select>
      <Calendar v-model="value" />
    </PopoverContent>
  </Popover>

      <div class="main-content">
        <h1  v-for="items in viewunfinishtask " :key="items._id"  class=" relative" >
          <div v-for="item in items.unfinishtask" :key="item._id" class="left-0 select-none text-2xl  mb-2" >       
            <div  @click="unfinishtaskview(item)">
            {{ item.taskname }} 
            
          </div>
          </div>
        
         <span class="absolute inset-y-0 right-0 text-[#FF0000]">{{ items.taskcondition }}</span>
        </h1>
  

        <h1  v-for="items in viewfinishtask" :key="items._id"  class="relative" >

         
          <div  class=" left-0 select-none text-2xl  mb-2">
            <div @click="finishtaskview(items.taskinfor.task,items.summarize,items.rewardselect)" >
              {{ items.taskinfor.task.taskname }}
            </div>
            
          </div>
          <span class="absolute inset-y-0 right-0 text-[#000000]">{{ items.taskinfor.taskcondition }}</span>
        </h1>

      </div>
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