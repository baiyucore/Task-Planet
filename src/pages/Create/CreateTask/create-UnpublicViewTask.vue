<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft ,Check } from 'lucide-vue-next';
import {  ref } from 'vue'
import { Button } from '@/components/ui/button'

const router = useRouter();
const isLoading = ref(false);
const route = useRoute();

const taskname = route.query.taskname;
const taskCompletionConditions = route.query.taskCompletionConditions  as string
  const taskstarttimeyear = route.query.taskstarttimeyear as string
  const taskstarttimemonth = route.query.taskstarttimemonth as string
  const taskstarttimeday = route.query.taskstarttimeday as string
  const taskovertimeyear = route.query.taskovertimeyear as string
  const taskovertimemonth = route.query.taskovertimemonth as string
  const taskovertimeday = route.query.taskovertimeday as string
  const successrewardone =route.query.successrewardone as string
  const successrewardtwo_one = route.query.successrewardtwo_one as string
  const successrewardtwo_two = route.query.successrewardtwo_two as string
  const failed = route.query.failed as string
 

function onreturn(){
  router.back();
}


</script>

<template>
  <div class="static mt-2">
    
    
   
      
      <form >
       <ArrowLeft class="float-left ml-2 mt-1" @click="onreturn" />
    <span  class="   text-2xl  font-bold">任务</span> 
      <Button variant="outline" disabled  class="float-right mr-5 mb-2   border-transparent">
      <Check   /> 
     </Button>
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
        开始时间 {{taskstarttimeyear}} - {{taskstarttimemonth}}-{{taskstarttimeday}}
      </span>
      
      <br>
      <span class="ml-4">
        截止时间 {{taskovertimeyear}} - {{taskovertimemonth}}-{{taskovertimeday}}
      </span>
  
      <div class="ml-2">
        <span> 成功奖励1获得固定金币</span>
          
        <input  
          class="mt-5 ps-8"
          v-model="successrewardone"
          type="number"
          placeholder="获得固定金币"
          :disable="isLoading"
          disabled
        />
      </div>
      
      <div class="ml-2 flex gap-2">
        <span class="flex-none mt-5"> 成功奖励2获得随机金币</span>
          
        <input  
          class="mt-5 ps-5 flex-none w-16"
          v-model="successrewardtwo_one"
          type="number"
          :disable="isLoading"
          disabled
        />
        <span class="flex-none mt-5" >~</span>
        <input  
          class="mt-5 ps-5 flex-none w-14 "
          v-model="successrewardtwo_two"
          type="number"
          :disable="isLoading"
          disabled
        />
      </div>


      <div class="ml-2">
        <span> 失败</span>
          
        <input  
          class="mt-5 ps-8"
          disabled
          type="number"
          :disable="isLoading"
          v-model="failed"
        />
      </div>
    
      

    
            
    </form>


  </div>
</template>