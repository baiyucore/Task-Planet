<template>
  <div class="static mt-2">
    <div class="flex justify-between">
      <span  class="  text-2xl ml-2 mt-1 font-bold">审核记录</span> 
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
    
        <div class=" mt-2 flex-wrap gap-2 flex flex-col content-center">
          <Dialog   v-for="items in viewrecord " :key="items._id" class="   border-slate-950  "> 
            <DialogTrigger as-child>
             
               <div class="w-8/12 text-center truncate cursor-pointer  border-2 border-transparent border-b-black">
                用户{{  items.warnuserid}} 举报结果 {{ items.result }} 
               </div>
               
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>举报信息</DialogTitle>
              </DialogHeader>
               举报内容{{ items.warninfor }}
                <DialogFooter>
                    </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>    
      </div>
  </div>

 
</template>
<script setup lang="ts">
import { onMounted,ref , watch} from 'vue';
import { Select, SelectContent,SelectItem,SelectTrigger,SelectValue,
} from '@/components/ui/select'

import {DateFormatter,type DateValue,getLocalTimeZone, today,} from '@internationalized/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { toast } from 'vue-sonner';
import { auditorapi } from '@/pages/Api/AuditorIndex';
import { viewauditorrecord } from '@/pages/Interface/AuditorInterface';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'


const df = new DateFormatter('zh-CN', {
  dateStyle: 'long',
})
const items = [
  { value: 0, label: '今天1' },
  { value: -1, label: '昨天' },
  { value: -2, label: '前天' },
]
const value = ref<DateValue>()
const viewrecord =ref<viewauditorrecord[]>([])
value.value =today(getLocalTimeZone()).add({ days: Number(0) })

onMounted(()=>{
  auditorapi.ViewAuditRecord(value.value).then((res)=>{
      if(res.err_code === 0){
         // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        viewrecord.value = res.record

      }else{
        toast.error(res.err_msg)
      }
    })
})

watch(value,(newValue,oldValue)=>{
  if(newValue !== oldValue){
    auditorapi.ViewAuditRecord(newValue).then((res)=>{
      if(res.err_code === 0){
         // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        viewrecord.value = res.record
      }else{
        toast.error(res.err_msg)
      }
    })
  }

})


</script>
<style scoped>
  .main-content {
      margin: 0 auto;
      border-radius: 10px;
      width: 100%;
      height: calc(85vh - 70px);
      border: 1px solid;
      border-color: transparent;
      overflow: auto;
    }

</style>