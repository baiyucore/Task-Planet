<script setup lang="ts">
import {toast} from "vue-sonner";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { systemapi } from "@/pages/Api/SystemIndex";
import { accountinfor } from "@/pages/Interface/SystemInterfact";
import { cn } from '@/lib/utils'
import { useMutation } from '@tanstack/vue-query'
import { buttonVariants } from '@/components/ui/button'

const router = useRouter();
const isLoading = ref(false);
const account_id = ref("");
const account_password = ref("");

const mutation = useMutation({
  mutationFn: async (params :accountinfor)=>{
    const response = await systemapi.register(params)
    return response
  },
  onMutate: ()=>{
    isLoading.value =true
  },
  onSuccess:()=>{
    isLoading.value = false;
    
      toast.success("注册成功，即将跳转");
      setTimeout(()=> router.push({ path:"/firstfill" , query:{account_id:account_id.value } }), 1000);
 
  },
  onError:(error)=>{
    isLoading.value = false;
    toast.error(error.message)
  },onSettled:()=>{
    isLoading.value = false
  },
})

async function onSubmit(event:Event) {
  event.preventDefault();
  mutation.mutate({
    account_id: account_id.value,
    account_passowrd: account_password.value,
  })
}

</script>

<template>
  <div class="flex relative">
      <div class="justify-center  top-60 w-[400px] absolute duration-700 md:left-1/3 sm:left-1/3 left-14" >
        
        <form @submit="onSubmit" class="flex  flex-col">
          <div class="justify-center m-auto cursor-default font-bold text-xl text-cyan-500" >注册</div>
          <Input  
          v-model="account_id"
          type="text"
          placeholder="账号 123456"
          :disable="isLoading"
          class="mt-5 placeholder:italic placeholder:text-slate-400 block bg-white 
            w-full  border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none
            focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          />     
          <Input 
          v-model="account_password"
          class="mt-5 placeholder:italic placeholder:text-slate-400 block bg-white 
            w-full  border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none
            focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm "
          id="password"
          type="password"
          placeholder="密码 password"
          :disabled="isLoading"
          
          />
          <div class="flex justify-end">
            <a @click="$router.push({ path: '/login' })" 
            :class="
              cn(
                buttonVariants({ variant: 'ghost' }),
                'user-select-none cursor-pointer  text-center  mt-1 mb-1 text-violet-500 hover:text-violet-800 block italic'
              )
            "
          >
            已有账户，返回登入页面
          </a>

          </div>
         
          <Button :disabled="isLoading" type="submit" class=" w-full bg-cyan-500 hover:bg-cyan-600">
            登入
          </Button>
        
        </form>

      </div>

  </div>
  
</template>
