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
import { firstfill } from '@/pages/Interface/SystemInterfact';
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
 
const mutation = useMutation({
  mutationFn: async (params:firstfill)=>{
    const response= await systemapi.firstfill(params)
    return response
  },
  onMutate: () => {
    isLoading.value = true
  },
  onSuccess:(res)=>{
    isLoading.value=false
    if(res.err_code === 0 ){
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
    }else{
      toast.error(res.data.err_msg);
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
<div class="flex relative">
      <div class="justify-center  top-60 w-[400px] absolute   duration-700 sm:left-1/3  left-14">
        <form  @submit="onSubmit" >
          <div class="logintext   cursor-default text-xl text-center text-teal-600" >个人信息</div>  
          <br> 
         <Input 
          v-model:model-value="account_name"
          type="text"
          placeholder="用户名"
          :disabled="isLoading"
          />  
          <br>
          <Select v-model:model-value="account_sex">
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
          <Select v-model:model-value="account_identites">
              <SelectTrigger class="w-[400px]">
                <SelectValue placeholder="选择身份" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="CREATE">
                    创建者
                  </SelectItem>
                  <SelectItem value="USER">
                    普通用户
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <br>
          <Button :disabled="isLoading" type="submit" class="w-full">
            登入
          </Button>                    
        </form>
      </div>
  </div>
  
</template>

