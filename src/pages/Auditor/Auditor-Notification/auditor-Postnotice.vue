<template>
  <div class="static ">
    <ArrowLeft class="absolute top-3 left-0 cursor-pointer" @click="onreturn" />

    <div class="flex h-12 justify-center border-4 border-transparent border-b-slate-950 ">


      <span  class=" text-center text-2xl col-start-2 col-span-4  font-bold">发布新通知</span> 
    </div>
   
    
    <form @submit="onSubmit" class="flex flex-col">
      
      <div class="flex justify-center mt-3 ">
        <span class="mr-3 mt-1.5 "> 通知名称</span>
        <Input  
        class="w-8/12"
        v-model:model-value="noticename"
        type="text"
        placeholder="通知名"
        :disable="isLoading"
      />

      </div>
      <h1 class="m-3 text-center">总结</h1>
     <div class="flex justify-center ">
      
      <Textarea  class=" w-11/12 text-wrap "
        v-model:model-value="noticecompletion"
        type="textarea"
        placeholder="具体内容"
        :disable="isLoading"

      />
      
     </div>
     <div class="flex justify-center ">
      <Button :disabled="isLoading" class="w-11/12  mt-2 ">
           添加通知
       </Button>
     </div>
     

    </form>

  </div>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { toast } from 'vue-sonner';
import { useRouter } from 'vue-router';
import { ArrowLeft  } from 'lucide-vue-next';
import {  ref } from 'vue'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

import { auditorapi } from '@/pages/Api/AuditorIndex';
import { Postnotice } from '@/pages/Interface/AuditorInterface';
import { nanoid } from 'nanoid'
import {useMutation} from '@tanstack/vue-query'

const router = useRouter();
const isLoading = ref(false);
const noticename = ref("");
const noticecompletion = ref("");
const noticeid = nanoid(9)

const mutation = useMutation({
  mutationFn: async (params: Postnotice) => {
    const response = await auditorapi.PostNotice(params)
    return response
  },
  onMutate: () => {
    isLoading.value = true
  },
  onSuccess: (res) => {
    isLoading.value = false
    if(res.err_code === 0 ){
      toast.success("添加成功")
      router.back()
    }else{
      toast.error(res.err_msg)
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
    noticecompletion:noticecompletion.value,
    noticename:noticename.value,
    noticeid : noticeid,
  })
}

function onreturn(){
  router.back();
}


</script>
