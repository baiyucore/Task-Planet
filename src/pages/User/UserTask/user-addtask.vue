<script setup lang="ts">
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { toast } from 'vue-sonner';
import { useRouter } from 'vue-router';
import { ArrowLeft ,Check } from 'lucide-vue-next';
import {  ref } from 'vue'
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from '@internationalized/date'

import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'



const router = useRouter();
const isLoading = ref(false);
const taskstarttime = ref("");
const taskovertime = ref("");
const successrewardone = ref("");
const successrewardtwo = ref("");
const failed = ref("");
const choosecalss = ref("");
const taskname = ref("");
const taskconditions = ref("");

async function onSubmit(event:Event) {
  event.preventDefault();
  isLoading.value= true;
  axios.post("https://nj5om0.laf.run/addtask",{

    taskname : taskname.value,
    taskconditions: taskconditions.value,
    taskovertime: overvalue.value,
    taskstarttime: startvalue.value,
    successrewardone : successrewardone.value,
    successrewardtwo : successrewardtwo.value,
    failed : failed.value,
    choosecalss : choosecalss.value,
  })
  .then((res)=>{
    isLoading.value = false;
    if( res.data.err_code === 0 ){
      toast.success("");
      setTimeout(()=> router.push({ path:"/firstfill" , query:{} }), 2000);
    } else{
      toast.error( res.data.err_msg );
    }

  })
  
}

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const startvalue = ref<DateValue>()
const overvalue = ref<DateValue>()

function onreturn(){
  router.back();
}


</script>
<!-- 未完成 1.班级添加 2.数据库的填写 3.随机金币逻辑 4.点击打勾提交  -->
<template>
  <div class="static mt-2">
    
    <ArrowLeft class="float-left ml-2 mt-1" @click="onreturn" />
    <span  class="   text-2xl  font-bold">添加任务</span> 
    <Check class="float-right mr-5 "/>    
    <form @submit="onSubmit">
          
      <Input  
        class="mt-5"
        v-model:model-value="taskname"
        type="text"
        placeholder="任务名称"
        :disable="isLoading"
      />
      <span class="mt-2 ml-2">完成任务条件</span>
      <Input  
        class="mt-2 h-[100px]  "
        v-model:model-value="taskconditions"
        type="text"
        placeholder="完成任务条件"
        :disable="isLoading"
      />
      <br>

      <span class="ml-4">
        开始时间
      </span>
      <Popover >
          <PopoverTrigger as-child>
            <Button
              variant="outline"
              :class="cn(
                'w-[280px] justify-start text-left font-normal ml-2',
                !startvalue && 'text-muted-foreground',
              )"
            >
              <CalendarIcon class="mr-2 h-4 w-4" />
              {{ startvalue ? df.format(startvalue.toDate(getLocalTimeZone())) : "选择开始时间" }}
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0">
            <Calendar v-model="startvalue" initial-focus />
          </PopoverContent>
      </Popover>
      <br>
      <span class="ml-4">
        截止时间
      </span>
      <Popover >
          <PopoverTrigger as-child>
            <Button
              variant="outline"
              :class="cn(
                'w-[280px] justify-start text-left font-normal ml-2',
                !overvalue && 'text-muted-foreground',
              )"
            >
              <CalendarIcon class="mr-2 h-4 w-4" />
              {{ overvalue ? df.format(overvalue.toDate(getLocalTimeZone())) : "选择开始时间" }}
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0">
            <Calendar v-model="overvalue" initial-focus />
          </PopoverContent>
      </Popover>
      <div class="ml-2">
        <span> 成功奖励1</span>
          
        <input  
          class="mt-5 ps-8"
          v-model="successrewardone"
          type="text"
          placeholder="获得固定金币"
          :disable="isLoading"
        />
      </div>
      <div class="ml-2">
        <span> 成功奖励2</span>
          
        <input  
          class="mt-5 ps-8"
          v-model="successrewardtwo"
          type="text"
          placeholder="获得随机金币范围 例如[-5~5] "
          :disable="isLoading"
        />
      </div>
      <div class="ml-2">
        <span> 失败</span>
          
        <input  
          class="mt-5 ps-8"
          v-model="failed"
          type="text"
          placeholder="扣除金币 "
          :disable="isLoading"
        />
      </div>
    
      

      <Button :disabled="isLoading" class="w-full mt-3 bg-teal-500">
            登入
      </Button>
        
    </form>

  </div>
</template>