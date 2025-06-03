<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { toast } from 'vue-sonner';
import {
  Select,SelectContent,SelectGroup,SelectItem,SelectTrigger,SelectValue,
} from '@/components/ui/select'

import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { systemapi } from '@/pages/Api/SystemIndex';
import { firstfill, gettoken } from '@/pages/Interface/SystemInterfact';
import { UseCreateStore } from '@/store/create';
import { Userinfor } from '@/store/user';
import { useMutation } from '@tanstack/vue-query'


let tranport= useRoute()
const account_id=tranport.query.account_id as string
const isLoading= ref(false)
const account_identites= ref("")
const account_name= ref("")
const account_sex= ref("")
const router=useRouter();


const getToken  = useMutation({
  mutationFn:async (params:gettoken)=>{
     const response = await systemapi.getToken(params);
     return response;
  },
  onSuccess:(res)=>{
    console.log("成功")
    console.log(res)
  }

})
const mutation = useMutation({
  mutationFn: async (params:firstfill)=>{
    const response= await systemapi.firstfill(params)
    return response
  },
  onMutate: () => {
    isLoading.value = true
  },
  onSuccess:()=>{
    isLoading.value=false
    getToken.mutate({account_id:account_id , role: account_identites.value})

        if(account_identites.value === "CREATE"){
          const createinfor = UseCreateStore()
          createinfor.$clear()
          createinfor.transmit(account_id)
          router.push({ path:"/createtaskfinsh" });
        }
        else if(account_identites.value === "USER"){
          const userinfor = Userinfor()
          userinfor.clear()
          userinfor.transmitid(account_id)
          userinfor.transmitname(account_name.value)
          router.push({ path:'/usertask' });
        } 
        else {
          toast.error("身份出现问题");
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
    account_id:account_id,
    account_identites : account_identites.value,
    account_name: account_name.value,
    account_sex: account_sex.value,
  })
}


</script>


<template>
  <div class="h-dvh">
    <div class="flex relative h-dvh">
      <div class="mx-auto flex-col space-y-6 w-[400px] content-center ">
        <form  @submit="onSubmit" class="flex  flex-col">
          <div class="justify-center m-auto cursor-default font-bold text-xl text-cyan-500" >个人信息</div>  
          <br> 
         <Input 
          v-model="account_name"
          type="text"
          placeholder="用户名"
          :disabled="isLoading"
          required
          />  
          <br>
          <Select v-model="account_sex" required>
              <SelectTrigger class="w-[400px]">
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
            <br>
          <Select v-model="account_identites" required>
              <SelectTrigger class="w-[400px]">
                <SelectValue placeholder="选择身份" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="CREATE">
                    教师
                  </SelectItem>
                  <SelectItem value="USER">
                    学生
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <br>
          <Button :disabled="isLoading" type="submit" class="w-full bg-cyan-500 hover:bg-cyan-600 ">
            登录
          </Button>                    
        </form>
      </div>
  </div>
  

  </div>

</template>

<style scoped>
.h-dvh {
  height: 100dvh;
  background-image: url('@/assets/system.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.flex.relative.h-dvh {
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
}
</style>

