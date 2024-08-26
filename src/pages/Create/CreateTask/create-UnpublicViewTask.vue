<template>
  <div class="static mt-2">    
     

     <div class="flex border-2 border-transparent border-b-slate-950   justify-between">
        <ArrowLeft class="mt-2 ml-2 cursor-pointer" @click="onreturn" />
      
      <span  class=" cursor-default text-2xl  font-bold">{{ taskname }}</span> 
        <Button variant="outline" disabled class=" mr-1  hover:bg-transparent shadow-transparent border-transparent">
        <Check   /> 
       </Button>
      </div>  
   
      <div class="flex content-center flex-col mt-4  ">
        <div>
          <span class=" flex justify-center ">
            完成任务条件 {{ taskCompletionConditions }}
          </span> 
        </div>
        <span class=" flex justify-center m-4 ">
        开始时间 {{taskstarttime}}
        </span>
    
      <span class="flex justify-center  ">
        截止时间 {{ taskovertime }}
      </span>

      <div class="flex justify-center m-4 ">
        <span>成功奖励1获得固定金币 {{ successrewardone }}</span>  
      </div>


      <div class="flex justify-center gap-2">
        <span >
           成功奖励2获得随机金币 {{ successrewardtwo_one }}~{{ successrewardtwo_two }}
          </span>
          
       
      </div>

      <div class="flex gap-2 m-4 justify-center">
        <span> 失败扣除 {{ failed }}</span>
                
      </div> 
      </div>  
  </div>
</template>

<script setup lang="ts">
import { useRoute,useRouter} from 'vue-router';
import { ArrowLeft ,Check } from 'lucide-vue-next';
import { Button } from '@/components/ui/button'


const route = useRoute();
const router = useRouter();
const taskname = route.query.taskname;
const taskCompletionConditions = route.query.taskCompletionConditions  as string
  const taskstarttime = route.query.taskstarttime 
  const taskovertime = route.query.taskovertime
  const successrewardone =route.query.successrewardone as string
  const successrewardtwo_one = route.query.successrewardtwo_one as string
  const successrewardtwo_two = route.query.successrewardtwo_two as string
  const failed = route.query.failed as string
  
function onreturn(){
  router.push("/createtaskunfinshed");
}

</script>