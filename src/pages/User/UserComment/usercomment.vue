<script setup lang="ts">
import { ref , watch} from 'vue';
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

import { RouterLink , useRoute, useRouter} from 'vue-router';

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const value = ref<DateValue>()
const router= useRouter();
const viewtaskvalue= ref('');
watch(viewtaskvalue,(newValue)=>{

  switch(newValue){
    case 'finish':
    console.log('完成');
    router.push({ path:"/usertaskfinsh" });
      break;
    case 'unfinished':
    console.log('未完成')
    router.push({ path:"/usertaskunfinshed" });
      break;
    default:
      break;
  }
})

</script>

<template>
  <div class="static mt-2">
    <span  class=" ml-10  text-2xl  font-bold">评论</span> 
    <Popover  >
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
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="value" initial-focus />
    </PopoverContent>
  </Popover>


      <div class="main-content">
        <RouterView></RouterView>
        
      </div>
  </div>

  


  
</template>
<style scoped>
  .title {
    text-align: center;
    word-spacing: 5px;
    margin: 30px 0;
    height: 70px;
    line-height: 70px;
    background-image: linear-gradient(45deg, gray, white);
    border-radius: 10px;
    box-shadow: 0 0 2px;
    font-size: 30px;
  }
  .main-content {
      margin: 0 auto;
      margin-top: 30px;
      border-radius: 10px;
      width: 90%;
      height: 650px;
      border: 1px solid;
    }
</style>