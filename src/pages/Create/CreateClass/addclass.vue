<script setup lang="ts">
import { toast } from 'vue-sonner';
import { ArrowLeft ,Check } from 'lucide-vue-next';
import {  reactive, ref } from 'vue'
import { Button } from '@/components/ui/button'
import {  useRouter} from 'vue-router';
import { nanoid } from 'nanoid'
import { createapi } from '@/pages/Api/CreateIndex';
import { createaddclass } from '@/pages/Interface/CreateInterface';
import { Createinfor } from '@/store/create';

const createinfor = Createinfor()
const userinvitecode =nanoid(8)
const router = useRouter();
const isLoading = ref(false);
const classname = ref("");
const classbrief = ref("");

async function onSubmit(event:Event) {
  event.preventDefault();
  isLoading.value= true;
  const params : createaddclass =reactive({ 
    account_id : createinfor.createid,
    classname: classname.value,
    classbrief : classbrief.value,
    userinvitecode : userinvitecode,
    })

  createapi.addclass(params).then((res)=>{
    isLoading.value = false;
    if( res.err_code === 0 ){
      toast.success("添加成功");
      setTimeout(()=> router.push({ path:"/createclass" }));
    } else{
      toast.error( res.err_msg );
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
   
   
    <form @submit="onSubmit">
      <span  class="   text-2xl  font-bold">添加新班级</span> 
      <Button variant="outline" :disabled="isLoading"  class="float-right mr-5   border-transparent">
      <Check   /> 
      </Button>
   
      <div class="ml-2">
        <span class="pr-6  "> 班级名称</span>
        <input  
          class="mt-5 "
          v-model="classname"
          type="text"
          placeholder="班级名称"
          :disable="isLoading"
        />
      </div>
      <div class="ml-2">
        <span class="pr-6"> 班级简介</span>
        <input  
          class="mt-5 "
          v-model="classbrief"
          type="text"
          placeholder="简介"
          :disable="isLoading"
        />
      </div>
     
    
      
      
     
    </form>

  </div>
</template>