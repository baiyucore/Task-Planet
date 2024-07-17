<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { useRouter, useRoute } from 'vue-router';
import { ArrowLeft  } from 'lucide-vue-next';

import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const router = useRouter();
const route = useRoute()
const noticename = route.query.name
const noticecompletion = route.query.completion
const year = route.query.year
const month = route.query.month
const day = route.query.day

function onreturn(){
  router.back();
}

</script>

<template>
  <div class="static mt-2">
      <ArrowLeft class="float-left ml-2 mt-1" @click="onreturn" />
    <span  class="   text-2xl  font-bold">发布新通知</span> 
     
      <Input  
        class="mt-5 placeholder:text-red-900"
        disabled
        type="text"
        :placeholder="noticename"
        
      />
      <h1 class="mt-2 ml-2 text-center">内容</h1>
      <Textarea  class="mt-2 h-[100px]  placeholder:text-red-900"
        disabled
        type="textarea"
        :placeholder="noticecompletion"
      />
      <br>

      <span class="ml-4">
        发布时间 
      </span>
      {{ year }}-{{ month }} -{{ day}}
      <br>

      <Button   disabled class="w-3/4 mt-10 mx-16 bg-[#083EC8] ">
            发布
       </Button>


  </div>
</template>