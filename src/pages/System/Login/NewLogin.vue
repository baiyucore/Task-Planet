<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Createinfor } from '@/store/create';
import { Userinfor } from '@/store/user';
import { systemapi } from '@/pages/Api/SystemIndex';
import { accountinfor } from '@/pages/Interface/SystemInterfact';
import { Auditorinfor } from '@/store/auditor';

const account_id = ref("")
const account_password = ref("")
const router= useRouter();
const isLoading = ref(false);
async function onSubmit(event: Event) {
  event.preventDefault();
  isLoading.value= true;
  const params : accountinfor ={
    account_id:account_id.value,
    account_passowrd : account_password.value,
  }
  systemapi.login(params).then((res)=>{
    isLoading.value = false;
    if(res.err_code === 0){
      switch (res.account_identites) {
        case "CREATE":
          const createinfor = Createinfor()
          createinfor.transmit(account_id.value);
          router.push({ path:"/createtaskfinsh"  });
          break;
        case "Auditor":
          const auditorinfor = Auditorinfor()
          auditorinfor.transmit(account_id.value)
          router.push({ path:"/auditornavigate" });
          break;
        case "USER":
          const userinfor = Userinfor()
          userinfor.transmit(account_id.value)
          userinfor.transmitname(res.name)
          router.push({ path:"/usertask" });
          break;
        default:
          break;
      }
     
    } else {
      toast.error(res.err_msg);
    }
  })

}
</script>

<template>
  <div id="outer">
      <div id="inner">
        
        <form  @submit="onSubmit" >
          <div class="logintext" >Academic Time</div>
         <Input 
          v-model:model-value="account_id"
          type="text"
          placeholder="账号 123456"
          :disabled="isLoading"
          />   
          <Input 
          v-model:model-value="account_password"
          class="mt-2"
          id="password"
          type="password"
          placeholder="密码 password"
          :disabled="isLoading"
          />
          <br>
          <a @click="$router.push({path:'/register'} )" 
          class="Loginregister"    
          >
            注册
          </a>
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
.Loginregister{
 position: absolute;
  right: 20%;
  font-size: 12px;
  cursor: pointer;
}
</style>