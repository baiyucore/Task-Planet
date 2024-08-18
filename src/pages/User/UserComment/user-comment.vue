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
import {  UserLoadTask, UserViewAllTask, UserViewTask, UserViewUnfinishTask,  } from '@/pages/Interface/UserInterface';
import { Userinfor } from '@/store/user';
import { userapi } from '@/pages/Api/UserIndex';
import { useQuery, } from '@tanstack/vue-query'

const router= useRouter();
const df = new DateFormatter('zh-CN', {
  dateStyle: 'long',
})
const items = [
  { value: 0, label: '今天' },
  { value: -1, label: '昨天' },
  { value: -2, label: '前天' },
]
const value = ref<DateValue>(  )

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

function viewcomment(taskid : string,taskname:string,taskstarttime:number,taskovertime:number){
  router.push({path:'/userviewcomment',query:{taskid,taskname,taskstarttime ,taskovertime }});
}


</script>

<template>
  <div class="static mt-2">
    <span  class=" ml-10  text-2xl  font-bold">评论</span> 
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
            <div  @click="viewcomment(item.taskid,item.taskname,item.taskstarttime,item.taskovertime)">
            {{ item.taskname }} 
          </div>
          </div>
        </h1>
        <h1  v-for="items in viewfinishtask" :key="items._id"  class="relative" >
          <div  class=" left-0 select-none text-2xl  mb-2">
            <div @click="viewcomment(items.taskinfor.task.taskid,items.taskinfor.task.taskname,items.taskinfor.task.taskstarttime,items.taskinfor.task.taskovertime)" >
              {{ items.taskinfor.task.taskname }}  
            </div>        
          </div>
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