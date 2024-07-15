<script setup lang="ts">
import { Input } from '@/components/ui/input';
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
import { createapi } from '@/pages/Api/CreateIndex';
import { CreateAddTask } from '@/pages/Interface/CreateInterface';

import { Createinfor } from '@/store/create';
import { nanoid } from 'nanoid'

const taskid = nanoid(9)
const createinfor = Createinfor()
const router = useRouter();
const isLoading = ref(false);

const successrewardone = ref(0);
const successrewardtwo_one = ref(0);
const successrewardtwo_two = ref(0);
const failed = ref(0);
const taskname = ref("");
const taskcompletion = ref("");
const startvalue = ref<DateValue>()
const overvalue = ref<DateValue>()


async function onSubmit(event:Event) {
  event.preventDefault();
  isLoading.value= true;
  const params : CreateAddTask ={
    condition: "add",
    taskid : taskid,
    account_id: createinfor.createid,
    taskname : taskname.value,
    taskcompletion : taskcompletion.value,
    //有问题！！这个类型规范有点问题
    taskovertime : overvalue.value,
    taskstarttime: startvalue.value,


    successrewardone : successrewardone.value,
    successrewardtwo_one : successrewardtwo_one.value,
    successrewardtwo_two : successrewardtwo_two.value,
    failed:-failed.value,
  }

  createapi.addtask(params).then((res)=>{
    isLoading.value = false;
    if( res.err_code === 0 ){
      toast.success("添加成功");
      router.back();
    } else{
      toast.error( res.err_msg );
    }
  })


 
  
}

const df = new DateFormatter('zh-CN', {
  dateStyle: 'long',
})



function onreturn(){
  router.back();
}


</script>
<!-- 未完成  3.随机金币逻辑  -->
<template>
  <div class="static mt-2">
    
   
    <form @submit="onSubmit">

      <ArrowLeft class="float-left ml-2 mt-1" @click="onreturn" />
    <span  class="   text-2xl  font-bold">添加任务</span> 
      <Button variant="outline" :disabled="isLoading"  class="float-right mr-5 mb-2  border-transparent">
      <Check   /> 
     </Button>
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
        v-model:model-value="taskcompletion"
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
        <span> 成功奖励1获得固定金币</span>
          
        <input  
          class="mt-5 ps-8"
          v-model="successrewardone"
          type="number"
          placeholder="获得固定金币"
          :disable="isLoading"

        />
      </div>

      <div class="ml-2 flex gap-2">
        <span class="flex-none mt-5"> 成功奖励2获得随机金币</span>
          
        <input  
          class="mt-5 ps-5 flex-none w-16"
          v-model="successrewardtwo_one"
          type="number"
          :disable="isLoading"
        />
        <span class="flex-none mt-5" >~</span>
        <input  
          class="mt-5 ps-5 flex-none w-14 "
          v-model="successrewardtwo_two"
          type="number"
          :disable="isLoading"
  
        />
      </div>

      <div class="ml-2">
        <span> 失败扣除</span>
          
        <input  
          class="mt-5 ps-8"
          v-model="failed"
          type="number"
          placeholder="扣除金币 "
          :disable="isLoading"
          min="0"
        />
        
      </div>
    
      

    
        
    </form>

  </div>
</template>