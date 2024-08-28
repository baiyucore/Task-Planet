
<template>
  <div class="static mt-2 ">
    <form @submit="onSubmit"  >  
      <div class="flex border-4 border-transparent border-b-slate-950  justify-between">
        <ArrowLeft class="mt-1 ml-2 cursor-pointer" @click="onreturn" />
        <span  class=" cursor-default text-2xl  font-bold">修改个人信息</span> 
        <Button variant="outline" :disabled="isLoading"  class="mr-1  hover:bg-transparent shadow-transparent border-transparent">
      <Check   /> 
      </Button>

      </div>


      <div class="flex flex-col  ">

        <div class="flex justify-center mt-3">
          <div class="mr-3 mt-1.5">用户名称 </div> 
          <Input  
          v-model:model-value="username"
          type="text "
          placeholder="{{username}}"
          :disable="isLoading"
          class="  w-8/12 text-2xl  font-bold placeholder:text-center"
          />

        </div>


      </div>
      <div class="flex mt-3 justify-center">
        <div class="mr-11 mt-1.5">性别 </div> 
        <Select v-model:model-value="usersex">
              <SelectTrigger class="w-8/12">
                <SelectValue placeholder="性别" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="男">
                    男
                  </SelectItem>
                  <SelectItem value="女">
                    女
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
      </div>
      
      <div class="flex justify-center mt-3">
        <div class="mr-3 mt-1.5"> 个人评语</div>
        <Textarea 
          class="w-8/12 "
          v-model="userprofile"
          type="text"
          placeholder="个人评语"
          :disable="isLoading"
        />
      </div>
    
    
    </form>

  </div>

</template>


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
import {
  Select,SelectContent,SelectGroup,SelectItem,SelectTrigger,SelectValue,
} from '@/components/ui/select'

import { Textarea } from '@/components/ui/textarea'

const userinfor = Userinfor()
const router = useRouter();
const username=ref("");
username.value = userinfor.username
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
    userstartname:userinfor.username,
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
