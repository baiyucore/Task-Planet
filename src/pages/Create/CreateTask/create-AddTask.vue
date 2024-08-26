<template>
  <div class=" mt-2">
    <form @submit="onSubmit">
      <div class="flex   justify-between">
        <ArrowLeft class="mt-2 ml-2 cursor-pointer" @click="onreturn" />
      
      <span  class=" cursor-default text-2xl  font-bold">添加任务</span> 
        <Button variant="outline" :disabled="isLoading"  class=" mr-1  hover:bg-transparent shadow-transparent border-transparent">
        <Check   /> 
       </Button>
      </div>
     
      <div class="flex flex-col  ">
    
          <div class="ml-4 mt-2 mb-2"> 任务名称</div>       
        <div class="flex justify-center">
          <Input  
          class="w-11/12  "
          v-model:model-value="taskname"
          type="text"
          placeholder="输入任务名称"
          :disable="isLoading"
          required
        />
       
        </div>
        <span class="m-4">完成任务条件</span>
        <div class="flex justify-center">
        <Textarea 
        class="w-11/12  "
        v-model:model-value="taskcompletion"
        type="text"
        placeholder="完成任务条件"
        :disable="isLoading"
        />
       
        </div>
      </div>

     <div class="flex content-center flex-col mt-4">
      <div class="flex content-center">
        <span class="ml-4 mt-1"> 开始时间 </span>
          <Popover>
            <PopoverTrigger as-child>
              <Button
                variant="outline"
                :class="cn(
                  'w-[280px] justify-start text-left font-normal ml-2',
                  !startvalue  && 'text-muted-foreground',
                )"
              >
                <CalendarIcon class="mr-2 h-4 w-4" />
                {{ startvalue ? df.format(startvalue.toDate(getLocalTimeZone())) : "选择查看时间" }}
              </Button>
            </PopoverTrigger>
            <PopoverContent class="flex w-auto flex-col gap-y-2 p-2">
              <Select
                @update:model-value="(v) => {
                  if (!v) return;
                  startvalue  = today(getLocalTimeZone()).add({ days: Number(v) });
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
              <Calendar v-model="startvalue" />
            </PopoverContent>
          </Popover>


      </div>
     
     <div class="flex content-center mt-4">

      <span class="ml-4 mt-1 ">
        截止时间
      </span>
      <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="cn(
          'w-[280px] justify-start text-left font-normal ml-2',
          !overvalue  && 'text-muted-foreground',
        )"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ overvalue ? df.format(overvalue.toDate(getLocalTimeZone())) : "选择查看时间" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="flex w-auto flex-col gap-y-2 p-2">
      <Select
        @update:model-value="(v) => {
          if (!v) return;
          overvalue = today(getLocalTimeZone()).add({ days: Number(v) });
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
      <Calendar v-model="overvalue" />
    </PopoverContent>
      </Popover>
     </div>      
     <div class=" flex ml-4 mt-4">
        <span class="mt-1"> 成功奖励1获得固定金币</span>
          
        <Input  
          class=" ml-2 w-5/12 "
          v-model="successrewardone"
          type="number"
          placeholder="获得固定金币"
          :disable="isLoading"
          required
        />
      </div>

      <div class="ml-4 mt-4 flex ">
        <div class="mt-1"> 成功奖励2获得随机金币</div>
          
        <Input  
          class=" ml-1  w-3/12"
          v-model="successrewardtwo_one"
          type="number"
          :disable="isLoading"
          required
        />
        <span class="text-2xl " >~</span>
        <Input  
          class=" w-3/12 "
          v-model="successrewardtwo_two"
          type="number"
          :disable="isLoading"
          required
        />
      </div>

      <div class="ml-4 mt-4 flex ">
        <span class="mt-1"> 失败扣除</span>
          
        <Input  
          class="ml-2 w-5/12 "
          v-model="failed"
          type="number"
          placeholder="扣除金币 "
          :disable="isLoading"
          min="0"
          required
        />
        
      </div>

     </div>
            
    </form>

  </div>
</template>


<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { toast } from 'vue-sonner';
import { useRouter } from 'vue-router';
import { ArrowLeft ,Check } from 'lucide-vue-next';
import {  ref } from 'vue'
import {DateFormatter,type DateValue,getLocalTimeZone, today,} from '@internationalized/date'
import { Select, SelectContent,SelectItem,SelectTrigger,SelectValue,
} from '@/components/ui/select'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { createapi } from '@/pages/Api/CreateIndex';
import { CreateAddTask } from '@/pages/Interface/CreateInterface';
import { useMutation } from '@tanstack/vue-query'
import { UseCreateStore } from '@/store/create';
import { nanoid } from 'nanoid'
import { Textarea } from '@/components/ui/textarea'

const taskid = nanoid(9)
const createinfor = UseCreateStore()
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
startvalue.value = today(getLocalTimeZone()).add({ days: Number(0) })
overvalue.value = today(getLocalTimeZone()).add({ days: Number(1) })
const items = [
  { value: 0, label: '今天' },
  { value: -1, label: '昨天' },
  { value: -2, label: '前天' },
]

const mutation = useMutation({
  mutationFn: async (params:  CreateAddTask) => {
    const response = await createapi.addormodifytask(params)
    return response
  },
  onMutate: () => {
    isLoading.value = true
  },
  onSuccess:(res)=>{
    isLoading.value= true;
    if( res.err_code === 0 ){
      toast.success("添加成功");
      router.back();
    } else{
      toast.error( res.err_msg );
    }
  },  
  onError: (error) => {
    isLoading.value = false
    toast.error(error.message)
  },
  onSettled: () => {
    isLoading.value = false
  },

})

async function onSubmit(event:Event) {
  event.preventDefault();

  
  mutation.mutate({
    condition: "add",
    taskid : taskid,
    account_id: createinfor.createid,
    taskname : taskname.value,
    taskcompletion : taskcompletion.value,
    taskovertime : overvalue.value,
    taskstarttime: startvalue.value,
    successrewardone : successrewardone.value,
    successrewardtwo_one : successrewardtwo_one.value,
    successrewardtwo_two : successrewardtwo_two.value,
    failed:-failed.value,
  })

}

const df = new DateFormatter('zh-CN', {
  dateStyle: 'long',
})



function onreturn(){
  router.back();
}


</script>
