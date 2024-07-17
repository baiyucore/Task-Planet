<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { toast } from 'vue-sonner';
import { useRouter } from 'vue-router';
import { ArrowLeft  } from 'lucide-vue-next';
import {  ref } from 'vue'
import { DateFormatter,type DateValue,getLocalTimeZone, today,
} from '@internationalized/date'
import { Textarea } from '@/components/ui/textarea'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { auditorapi } from '@/pages/Api/AuditorIndex';
import { Postnotice } from '@/pages/Interface/AuditorInterface';
import { nanoid } from 'nanoid'

const router = useRouter();
const isLoading = ref(false);
const noticename = ref("");
const noticecompletion = ref("");
const noticeid = nanoid(9)
const df = new DateFormatter('zh-CN', {
  dateStyle: 'long',
})
const items = [
  { value: 0, label: '今天' },
  { value: -1, label: '昨天' },
  { value: -2, label: '前天' },
 
]
const value = ref<DateValue>()

async function onSubmit(event:Event) {
  event.preventDefault();
  isLoading.value= true;
  const params : Postnotice={
    noticecompletion:noticecompletion.value,
    noticename:noticename.value,
    noticetime:value.value,
    noticeid : noticeid,
  }
  auditorapi.PostNotice(params).then((res)=>{
    if(res.err_code === 0 ){
      toast.success("发布成功")
      setTimeout(() => {
        router.back()
      },2000);
    }else{
      toast.error(res.err_msg)
    }
  })
}


function onreturn(){
  router.back();
}


</script>

<template>
  <div class="static mt-2">
    
   
    <form @submit="onSubmit">

      <ArrowLeft class="float-left ml-2 mt-1" @click="onreturn" />
    <span  class="   text-2xl  font-bold">发布新通知</span> 
     
      <Input  
        class="mt-5"
        v-model:model-value="noticename"
        type="text"
        placeholder="通知名"
        :disable="isLoading"
      />
      <h1 class="mt-2 ml-2 text-center">内容</h1>
      <Textarea  class="mt-2 h-[100px]  "
        v-model:model-value="noticecompletion"
        type="textarea"
        placeholder="具体内容"
        :disable="isLoading"
      />
      <br>

      <span class="ml-4">
        发布时间
      </span>
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
   
      <br>

      <Button :disabled="isLoading" class="w-3/4 mt-10 mx-16 bg-[#083EC8] ">
            发布
       </Button>

    </form>

  </div>
</template>