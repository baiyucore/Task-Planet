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
  onSuccess:(res)=>{
    isLoading.value = false;
    if (res.err_code === 0) {
      toast.success("注册成功，即将跳转");
      setTimeout(()=> router.push({ path:"/firstfill" , query:{account_id:account_id.value } }), 2000);
    } else{
      toast.error(res.err_msg);
    }
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
        
        <form @submit="onSubmit">
          <div class="logintext ml-20  cursor-default font-serif text-teal-600" >注册</div>
          <Input  
          v-model:model-value="account_id"
          type="text"
          placeholder="账号 123456"
          :disable="isLoading"
          />     
          <Input 
          v-model:model-value="account_password"
          class="mt-5 mb-2"
          id="password"
          type="password"
          placeholder="密码 password"
          :disabled="isLoading"
          />
          <a @click="$router.push({ path: '/login' })" 
            :class="
              cn(
                buttonVariants({ variant: 'ghost' }),
                'user-select-none Login text-violet-500 hover:text-violet-800 block italic'
              )
            "
          >
            已有账户，返回登入页面
          </a>

          <Button :disabled="isLoading" type="submit" class="mt-10 w-full bg-cyan-500 hover:bg-cyan-600">
            登入
          </Button>
        
        </form>

      </div>

  </div>
  
</template>

<style scoped>

.logintext{
  font-size: 20px;
  font-weight: bold;
  width: 200px;
  margin-bottom: 5px;
  text-align: center;
}
.Login{
  position: absolute;
  right: 5%;
  font-size: 15px;
  cursor: pointer;
}


</style>
