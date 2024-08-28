
<template>
  <div class="flex h-12  justify-between  bg-gray-600">
    <span  class=" ml-4 text-2xl content-center text-slate-100 font-bold">评论</span> 
    <div class="content-center mr-4 ">     
    <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="cn(
          'w-[200px] justify-start text-left font-normal',
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



    </div>
    
  </div>

      <div class="main-content">

      
        <div class="flex flex-col items-center">
        <Card v-for="items in commenallinfor" @click="viewtask(items.taskname,items.taskid)" :key="items._id" class="mb-3 w-11/12  cursor-pointer">
      <CardHeader>
        <CardTitle>{{items.taskname}}</CardTitle>
        <CardDescription> 班级:{{items.classname}} </CardDescription>
      </CardHeader>    
    </Card>
      </div>
    

    
        
      </div>


  


  
</template>

<script setup lang="ts">
import { ref , watch} from 'vue';
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
  today,
} from '@internationalized/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { toast } from 'vue-sonner';
import { createapi } from '@/pages/Api/CreateIndex';
import { UseCreateStore } from '@/store/create';
import { CreateComment, CreateViewComment } from '@/pages/Interface/CreateInterface';
import { useRouter } from 'vue-router';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const router = useRouter()
const createinfor  = UseCreateStore()

const df = new DateFormatter('zh-CN', {
  dateStyle: 'long',
})
const items = [
  { value: 0, label: '今天' },
  { value: -1, label: '昨天' },
  { value: -2, label: '前天' },
 
]

const value = ref<DateValue>()
const commenallinfor = ref<CreateViewComment[]>([])
  value.value =today(getLocalTimeZone()).add({ days: Number(0) })
  const parmas : CreateComment ={
    time:value.value,
    createid : createinfor.createid,
  }
  createapi.viewcomment(parmas).then((res)=>{
  
    if(res.err_code === 0){
      commenallinfor.value = res.taskinfor
    }else {
      toast.error(res.err_msg)
    }
  })



watch(value,(newValue,oldValue)=>{
  if(newValue !== oldValue){

 
   const parmas : CreateComment ={
    time : newValue,
    createid : createinfor.createid,
  }
  createapi.viewcomment(parmas).then((res)=>{
   
    if(res.err_code === 0){
      commenallinfor.value = res.taskinfor
    }else {
      toast.error(res.err_msg)
    }
  })
  }

})

function viewtask(taskname : string,taskid:string){
  router.push({path:'/commentinfor',query :{taskname , taskid}});

}

</script>


<style scoped>
  .main-content {
      margin: 0 auto;
      margin-top: 30px;
      border-radius: 10px;
      width: 100%;
      height: calc(90vh - 70px);
      border: 1px solid;
      border-color: transparent;
      overflow: auto;
    }
</style>