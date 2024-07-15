<script setup lang="ts">
import axios from 'axios';
import { ArrowLeft ,Check } from 'lucide-vue-next';
import {ref} from 'vue'
import {  useRouter,useRoute } from 'vue-router';
import { toast } from 'vue-sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createapi } from '@/pages/Api/CreateIndex';
import { Createreviseoneself } from '@/pages/Interface/CreateInterface';
import { Createinfor } from '@/store/create';

const createinfor = Createinfor()


const router = useRouter();

const create_name=ref("");
const create_sex = ref("");
const create_profile = ref("");
const isLoading = ref(false);




async function onSubmit(event:Event) {
  event.preventDefault();
  isLoading.value = true;
  const params : Createreviseoneself = {
    account_id: createinfor.createid,
    create_name: create_name.value,
    create_sex: create_sex.value,
    create_profile: create_profile.value,
  }

  createapi.reviseoneself(params).then((res)=>{
    isLoading.value = false;
    if( res.err_code === 0 ){
      toast.success("修改成功");
      setTimeout(()=> router.push({ path:"/createoneself" }));
    } else{
      toast.error(res.err_msg);
    }
  })
  


}

function onreturn(){
  router.back();
}

</script>

<template>
  <div class="static mt-2">
    <ArrowLeft class="float-left ml-2 mt-1" @click="onreturn" />
   
   <!-- 等待优化 -->
    <form @submit="onSubmit">
      
      <Button variant="outline" :disabled="isLoading"  class="float-right mr-5 mb-2  border-transparent">
      <Check   /> 
      </Button>


      <div class="ml-2 ">
        <Input  
          v-model:model-value="create_name"
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
          v-model="create_sex"
          type="text"
          placeholder="性别"
          :disable="isLoading"
        />
      </div>
      <div class="ml-2">
        <span class="pr-6"> 个人评语</span>
        <input  
          class="mt-5 "
          v-model="create_profile"
          type="text"
          placeholder="个人评语"
          :disable="isLoading"
        />
      </div>
    
      
      
     
    </form>

  </div>

</template>