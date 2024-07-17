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
import { Createinfor } from '@/store/create';
import { Userinfor } from '@/store/user';


let tranport= useRoute()
const account_id=tranport.query.account_id as string
const isLoading= ref(false)
const account_identites= ref("")
const account_name= ref("")
const account_sex= ref("")
const router=useRouter();
async function onSubmit(event:Event) {
  event.preventDefault();
  isLoading.value = true;
  const params : firstfill={
    account_id:account_id,
    account_identites : account_identites.value,
    account_name: account_name.value,
    account_sex: account_sex.value,
  }
  systemapi.firstfill(params).then((res)=>{
    isLoading.value=false
    console.log(account_identites.value)
    if(res.err_code === 0 ){
        if(account_identites.value === "CREATE"){
          const createinfor = Createinfor()
          createinfor.transmit(account_id)
          router.push({ path:"/createnavigate"  });
        }
        else if(account_identites.value === "USER"){
          const userinfor = Userinfor()
          userinfor.transmit(account_id)
          userinfor.transmitname(account_name.value)
          router.push({ path:"/usernavigate" });
        } 
        else {
          toast.error("身份出现问题");
        }

    }else{
      toast.error(res.data.err_msg);
    }
  })
 
}


</script>


<template>
<div id="outer">
      <div id="inner">
        <form  @submit="onSubmit" >
          <div class="logintext" >个人信息</div>  
          <br> 
         <Input 
          v-model:model-value="account_name"
          type="text"
          placeholder="用户名"
          :disabled="isLoading"
          />  
          <br>
          <Select v-model:model-value="account_sex">
              <SelectTrigger class="w-[180px]">
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
              <SelectTrigger class="w-[180px]">
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
          <Button :disabled="isLoading" class="w-full">
            登入
          </Button>                    
        </form>
      </div>
  </div>
  
</template>

<style>

    #outer{
    margin-top: 300px;
    width: 360px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    position: relative;
    }
    #inner{
    width: 360px;
    height: 308px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 5px solid rgb(125, 131, 138);
    background-color: #ffffff;
    border-radius: 20px;
  }

</style>