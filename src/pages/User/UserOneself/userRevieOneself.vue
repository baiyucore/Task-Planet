<script setup lang="ts">
import { ArrowLeft ,Check } from 'lucide-vue-next';
import {ref} from 'vue'
import {  useRouter } from 'vue-router';
import { toast } from 'vue-sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { userapi } from '@/pages/Api/UserIndex';
import { Userinfor} from "@/store/user";
import { UserReviseOneself } from '@/pages/Interface/UserInterface';
import { useMutation} from '@tanstack/vue-query'
const userinfor = Userinfor()
const router = useRouter();
const username=ref("");
const usersex = ref("");
const userprofile = ref("");
const isLoading = ref(false);

const mutation = useMutation({
  mutationFn: async (params:  UserReviseOneself) => {
    const response = await userapi.reviseoneself(params)
    return response
  },
  onMutate: () => {
    isLoading.value = true
  },  
  onSuccess:(res)=>{
    isLoading.value = false;
    if( res.err_code === 0 ){
   
      userinfor.transmitname(username.value)
      toast.success("修改成功");
      setTimeout(()=> router.push({ path:"/useroneself" }));
    } else{
      toast.error( res.err_msg );
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
    userid : userinfor.userid,
    username : username.value,
    usersex:usersex.value,
    userprofile : userprofile.value,
  })
}

function onreturn(){
  router.back();
}

</script>

<template>
  <div class="static mt-2">
    <ArrowLeft class="float-left ml-2 mt-1" @click="onreturn" />
    <form @submit="onSubmit">  
      <Button variant="outline" :disabled="isLoading"  class="float-right mr-5 mb-2  border-transparent">
      <Check   /> 
      </Button>
      <div class="ml-2 ">
        <Input  
          v-model:model-value="username"
          type="text "
          placeholder="更换用户名"
        
          :disable="isLoading"
          class="   text-2xl  font-bold placeholder:text-center"
          />
      </div>
       
      <div class="ml-2">
        <span class="pr-6  "> 性别</span>
        <input  
          class="mt-5 ml-9 "
          v-model="usersex"
          type="text"
          placeholder="性别"
          :disable="isLoading"
        />
      </div>
      <div class="ml-2">
        <span class="pr-6"> 个人评语</span>
        <input  
          class="mt-5 "
          v-model="userprofile"
          type="text"
          placeholder="个人评语"
          :disable="isLoading"
        />
      </div>   
    
    </form>

  </div>

</template>