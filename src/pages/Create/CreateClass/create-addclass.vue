<template>
  <div class=" mt-2">
    <form @submit="onSubmit">
      <div class="flex border-4 border-transparent border-b-slate-950  justify-between">

        <ArrowLeft class="mt-2 ml-2 cursor-pointer" @click="back" />
        <span  class="  cursor-default text-2xl  font-bold">添加新班级</span> 
      <Button variant="outline" type="submit" :disabled="isLoading"  class="mr-1  hover:bg-transparent shadow-transparent border-transparent">
      <Check   /> 
      </Button>

      </div>

      
      <div class="flex flex-col  ">

       
        <div class="flex justify-center mt-3">
          <span class="mr-3 mt-1.5 "> 班级名称</span>
        <Input  
          class="  w-8/12"
          v-model="classname"
          type="text"
          placeholder="班级名称"
          :disable="isLoading"
          required
        />
      </div>

      <div class="flex justify-center mt-3">
        <span class="mr-3 mt-1.5"> 班级简介</span>
        <Input  
          class="w-8/12 "
          v-model="classbrief"
          type="text"
          placeholder="简介"
          :disable="isLoading"
        />
      </div>

      </div>

     
     
    
      
      
     
    </form>

  </div>
</template>
<script setup lang="ts">
import { toast } from 'vue-sonner';
import { ArrowLeft ,Check } from 'lucide-vue-next';
import {  ref } from 'vue'
import { Button } from '@/components/ui/button'
import {  useRouter} from 'vue-router';
import { nanoid } from 'nanoid'
import { createapi } from '@/pages/Api/CreateIndex';
import { createaddclass } from '@/pages/Interface/CreateInterface';
import { UseCreateStore } from '@/store/create';
import {useMutation} from '@tanstack/vue-query'
import { Input } from '@/components/ui/input';

const createinfor = UseCreateStore()
const userinvitecode =nanoid(8)
const router = useRouter();
const isLoading = ref(false);
const classname = ref("");
const classbrief = ref("");


const mutation= useMutation({
  mutationFn: async (params: createaddclass) => {
    const response = await  createapi.addclass(params)
    return response
  },
  onMutate:()=>{
    isLoading.value = true
  },
  onSuccess:(res)=>{
    isLoading.value= true;
    if( res.err_code === 0 ){
      toast.success("添加成功");
    router.push({ path:"/createclass" });

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
    account_id : createinfor.createid,
    classname: classname.value,
    classbrief : classbrief.value,
    userinvitecode : userinvitecode,
    })

}

 function back(){
  router.back()
 }

</script>
