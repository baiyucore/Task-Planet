<template>
  <div class="static mt-2">
    <ArrowLeft class="absolute top-3 left-0 cursor-pointer" @click="onreturn" />

    <div class="flex h-12 justify-center   ">
    
      <span  class="  text-center text-2xl col-start-2 col-span-4  font-bold">申请加入班级</span> 
    </div>

    <div class="main-content">
      <form @submit="onSearch">
      <div class="relative">
        <Search class="absolute left-2 top-2.5 size-4 text-muted-foreground "/>
        <Input
          v-model="UserInvitecode"
          type="text"
          placeholder="填写邀请码"
          :disabled="isLoading"
           @input="handleInput"
          class="pl-8  w-full"
          />    
      </div>    
    </form>
    </div>
   

  </div>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-vue-next';
import { ref } from 'vue'
import { useRouter} from 'vue-router';
import { Search } from 'lucide-vue-next';
import { userapi } from '@/pages/Api/UserIndex';
import { toast } from 'vue-sonner';
import {useMutation} from '@tanstack/vue-query'
import { classinvitecode } from '@/pages/Interface/UserInterface';

const router = useRouter();
const isLoading = ref(false);

const UserInvitecode= ref("") ;

const mutation= useMutation({
  mutationFn: async (params :classinvitecode) => {
    const response = await   userapi.searchclass(params)
    return response
  },
  onMutate:()=>{
    isLoading.value = true
  },
  onSuccess:(res)=>{
    isLoading.value= true;
  
      const classname = res.classinfor.classname
      const classbrief = res.classinfor.classbrief
      const createid = res.classinfor.account_id 
      const userinvitecode = res.classinfor.userinvitecode
      const createname= res.createname
      const studentnumber =res.classinfor.studentnumber
      router.push({path:"/useraboutclass" , query:{classname,classbrief,createid,userinvitecode,createname,studentnumber}})
     
   
  },  
  onError: (error) => {
    isLoading.value = false
    toast.error(error.message)
  },
  onSettled: () => {
    isLoading.value = false
  },

})

function handleInput(event: Event) {
  const input = event.target as HTMLInputElement;
  UserInvitecode.value = input.value.trimStart();
}


//搜索
function onSearch(event:Event) {
  event.preventDefault()
  const userinvitecode = UserInvitecode.value as string;
  mutation.mutate({
    userinvitecode 
    })
 
}


function onreturn(){
  router.back();
}


</script>
<style scoped>
 
  .main-content {
      margin: 0 auto;
      border-radius: 10px;
      width: 90%;
      height: calc(90vh - 70px);
      border: 1px solid;
      border-color: transparent;

    }
</style>