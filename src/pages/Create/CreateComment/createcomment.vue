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
import { Createinfor } from '@/store/create';
import { CreateComment, CreateViewComment } from '@/pages/Interface/CreateInterface';
import { useRouter } from 'vue-router';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'


const router = useRouter()
const createinfor  = Createinfor()

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


const isLoading= ref(false);
watch(value,(newValue,oldValue)=>{
  if(newValue !== oldValue){
    isLoading.value=true;
 
   const parmas : CreateComment ={
    time : newValue,
    createid : createinfor.createid,
  }
  createapi.viewcomment(parmas).then((res)=>{
    isLoading.value =false
    if(res.err_code === 0){
      commenallinfor.value = res.taskinfor
    }else {
      toast.error(res.err_msg)
    }
  })
  }

})

function viewtask(classname : string,taskid:string){
  router.push({path:'/commentinfor',query :{classname , taskid}});

}

</script>

<template>
  <div class="static mt-2">
    <span  class=" ml-10  text-2xl  font-bold">评论</span> 
    <div class="float-right mr-7">
      
      <!-- <Popover class="absolute right" >
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          :class="cn(
            'w-[200px] justify-start text-left font-normal',
            !timevalue && 'text-muted-foreground',
          )"
        >
          <CalendarIcon class="mr-2 h-4 w-4" />
          {{ timevalue ? df.format(timevalue.toDate(getLocalTimeZone())) : "选择查看时间" }}
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0">
        <Calendar v-model="timevalue" initial-focus />
      </PopoverContent>
    </Popover> -->

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



    </div>
    


      <div class="main-content">
        <h1 v-for="items in commenallinfor" @click="viewtask(items.classname,items.taskid)" class="text-center select-none text-2xl mb-2">
         {{items.classname}}--{{items.taskname}}
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