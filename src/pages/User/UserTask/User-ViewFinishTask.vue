<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft } from 'lucide-vue-next';
import {  ref } from 'vue'
import { Button } from '@/components/ui/button'

const router = useRouter();
const isLoading = ref(false);
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

<template>
  <div class="static mt-2">
    
    <ArrowLeft class="float-left ml-2 mt-1" @click="onreturn" />
    <span  class="   text-2xl  font-bold">任务</span> 
      <Input  
        class="mt-5"
        disabled
        type="text"
        :placeholder="taskname"
        :disable="isLoading"
      /> 
      <span class="mt-2 ml-2">完成任务条件</span>
      <Input  
        class="mt-2 h-[100px]  "
        disabled
        type="text"
       :placeholder="taskCompletionConditions"
        :disable="isLoading"
      />
      <br>

      <span class="ml-4">
        开始时间 {{ taskstarttime }}
      </span>
      
      <br>
      <span class="ml-4">
        截止时间 {{ taskovertime }}
      </span>

      <h1 class="text-center">以下选择进行2选1</h1>
      <div class="flex gap-2">
  
        <div class="grow h-1/2 ml-2">
          <div class="bg-[#CBD5E1] text-center" :class="{ selected: selectedOption === 'option1' }" >
            <span :style="{ color: selectedOption === '1' ? '#FF7D05' : ' black' }" >选择1 <br> <br>
          <span >获得{{ successrewardone }}金币 </span>
            </span>
          </div>
        </div>

        <div class="grow h-1/2"> 
        <div class="text-center  bg-[#CBD5E1]" :class="{ selected: selectedOption === 'option2' }" >
          <span :style="{ color: selectedOption === '2' ? '#FF7D05' : 'black' }">选择2 <br> <br>
            <span >获得{{ successrewardtwo_one }}~{{successrewardtwo_two}}金币</span>
          </span>
        </div>
        </div>
      </div> 

      <div class="ml-2">
        <span> 失败</span> 
        <input  
          class="mt-5 ps-8"
          disabled
          type="number"
          :placeholder="failed"
          :disable="isLoading"
        />
      </div>
   
        <h1 class="mt-2 ml-2 text-center">总结</h1>
          <Input  
            class="mt-2 h-[100px] bg-[#CBD5E1] "
            type="text"
            disabled
            :placeholder="summarize"
            :disable="isLoading"
          />
          <Button disabled   class="w-full">
            提交
          </Button>

  </div>
</template>