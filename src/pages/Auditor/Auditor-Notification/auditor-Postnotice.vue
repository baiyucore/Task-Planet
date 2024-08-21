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

<template>
  <div class="static mt-2">
    
   
    <form @submit="onSubmit">

      <ArrowLeft class="float-left ml-2 mt-1" @click="onreturn" />
    <span  class="   text-2xl  font-bold">发布新通知</span> 
     
      <Input  
        class="mt-5"
        v-model:model-value="noticename"
        type="text"
        placeholder="通知名"
        :disable="isLoading"
      />
      <h1 class="mt-2 ml-2 text-center">内容</h1>
      <Textarea  class="mt-2 h-[100px]  "
        v-model:model-value="noticecompletion"
        type="textarea"
        placeholder="具体内容"
        :disable="isLoading"
      />
      <br>
      <Button :disabled="isLoading" class="w-3/4 mt-10 mx-16 bg-[#083EC8] ">
           添加通知
       </Button>

    </form>

  </div>
</template>