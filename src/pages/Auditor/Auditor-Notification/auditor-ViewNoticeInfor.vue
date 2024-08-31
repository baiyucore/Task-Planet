<template>
  <div class="static mt-2">
    
    <ArrowLeft class="absolute top-3 left-0 cursor-pointer" @click="onreturn" />

    <div class="flex h-12 justify-center border-4 border-transparent border-b-slate-950 ">
      <span  class=" text-center text-2xl col-start-2 col-span-4  font-bold">{{ noticename }}</span> 
    </div>
    
    <h1 class="mt-2 ml-2 text-center">内容</h1>
      <Textarea  class="mt-2 h-[100px]  placeholder:text-red-900"
        disabled
        type="textarea"
        :placeholder="noticecompletion"
      />
      <br>
  </div>
</template>

<script setup lang="ts">

import { useRouter, useRoute } from 'vue-router';
import { ArrowLeft  } from 'lucide-vue-next';
import { Textarea } from '@/components/ui/textarea'

const router = useRouter();
const route = useRoute()
const noticename = route.query.name
const noticecompletion = route.query.completion
function onreturn(){
  router.back();
}

</script>