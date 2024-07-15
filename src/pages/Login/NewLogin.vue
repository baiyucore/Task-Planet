<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const account_id = ref("")
const account_password = ref("")
const router= useRouter();
const isLoading = ref(false);
async function onSubmit(event: Event) {
  event.preventDefault();
  isLoading.value= true;

  axios.post("https://nj5om0.laf.run/login",{
    account_id:account_id.value,
    account_password: account_password.value,
  })
  .then((res)=>{
    isLoading.value = false;
    if(res.data.err_code === 0){
      router.push({ path:"/dash " });
    } else {
      toast.error(res.data.err_msg);
    }
  });

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
          <a @click="$router.push({path:'/register'})" 
          class="Loginregister"
          
          >
            注册
          </a>
          <br>
          <Button :disabled="isLoading" class="w-full">
            登入
          </Button>
          <!-- <input class="LoginSubmit" type="submit" value="登入"> -->
         
        
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