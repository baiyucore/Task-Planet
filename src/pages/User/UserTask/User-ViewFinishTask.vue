<template>
  <div class="static mt-2">

    <div class="flex h-12 justify-center border-4 border-transparent border-b-slate-950 ">

      <ArrowLeft class="absolute top-3 left-0 cursor-pointer" @click="onreturn" />
      <span  class=" text-center text-2xl col-start-2 col-span-4  font-bold">{{ taskname }}</span> 
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

      <h1 class="text-center mt-2">以下选择进行2选1</h1>
      <div class="flex  gap-2">
      
      <div class="grow h-1/2 ml-2">
        <div class=" text-center" :class="{ selected: selectedOption === 'option1' }" >
          <span :style="{ color: selectedOption === '1' ? '#FF7D05' : ' black' }" >选择1 <br> <br>
        <span >获得{{ successrewardone }}金币 </span>
          </span>
        </div>
      </div>

      <div class="grow h-1/2"> 
      <div class="text-center  " :class="{ selected: selectedOption === 'option2' }" >
        <span :style="{ color: selectedOption === '2' ? '#FF7D05' : 'black' }">选择2 <br> <br>
          <span >获得{{ successrewardtwo_one }}~{{successrewardtwo_two}}金币</span>
        </span>
      </div>
      </div>
    </div> 

    <span class="flex justify-center m-2 ">
      失败 {{ failed }}
      </span>
      <span class="flex justify-center m-2 text-wrap">
        总结: {{ summarize }}
      </span>         
    </div>
      

  </div>
</template>


<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft } from 'lucide-vue-next';

const router = useRouter();

const route = useRoute();

const taskname = route.query.taskname;
const taskCompletionConditions = route.query.taskCompletionConditions  as string
const taskstarttime = route.query.taskstarttime
const taskovertime = route.query.taskovertime

const successrewardone = typeof route.query.successrewardone === 'string' ? parseInt(route.query.successrewardone) : NaN;
const successrewardtwo_one = typeof route.query.successrewardtwo_one === 'string' ? parseInt(route.query.successrewardtwo_one) : NaN;
const successrewardtwo_two =  typeof route.query.successrewardtwo_two === 'string' ? parseInt(route.query.successrewardtwo_two) : NaN;

const failed = route.query.failed as string
const summarize = route.query.summarize
const rewardselect = route.query.rewardselect

const selectedOption = rewardselect

function onreturn(){
  router.back();
}

</script>
