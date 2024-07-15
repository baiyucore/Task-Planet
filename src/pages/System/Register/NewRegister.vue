<script setup lang="ts">
import {toast} from "vue-sonner";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { systemapi } from "@/pages/Api/SystemIndex";
import { accountinfor } from "@/pages/Interface/SystemInterfact";

const router = useRouter();
const isLoading = ref(false);
const account_id = ref("");
const account_password = ref("");
async function onSubmit(event:Event) {
  event.preventDefault();
  isLoading.value = true;
  const params : accountinfor ={
    account_id: account_id.value,
    account_passowrd: account_password.value,
  }
  systemapi.register(params).then((res)=>{
    isLoading.value = false;
    if (res.err_code === 0) {
      toast.success("注册成功，即将跳转");
      setTimeout(()=> router.push({ path:"/firstfill" , query:{account_id:account_id.value } }), 2000);
    } else{
      toast.error(res.err_msg);
    }
  })


}

</script>

<template>
  <div id="outer">
      <div id="inner">
        
        <form @submit="onSubmit">
          <div class="logintext" >注册</div>
          <Input  
          v-model:model-value="account_id"
          type="text"
          placeholder="账号 123456"
          :disable="isLoading"
          />     
          <Input 
          v-model:model-value="account_password"
          class="mt-2"
          id="password"
          type="password"
          placeholder="密码 password"
          :disabled="isLoading"
          />
          <!-- <button class="LoginSubmit" @click="" >登入</button> -->
          <Button :disabled="isLoading" class="w-full mt-3 bg-teal-500">
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
}
#inner{
  width: 360px;
  height: 308px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 5px solid rgb(58, 111, 172);
  background-color: #ffffff;
  border-radius: 20px;
}
.logintext{
  font-size: 20px;
  font-weight: bold;
  width: 200px;
  margin-bottom: 5px;
  text-align: center;
}
.LoginSubmit{
  width: 210px;
  height: 25px;
  margin-bottom: 5px;
  background-color: #08A5C8;
}
.LoginInput{
  border-radius: 8px;
  margin-bottom: 5px;
}

</style>
