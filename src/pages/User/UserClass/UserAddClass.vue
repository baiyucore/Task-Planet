<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-vue-next';
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
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
    if( res.err_code === 0 ){
      const classname = res.classinfor.classname
      const classbrief = res.classinfor.classbrief
      const createid = res.classinfor.account_id 
      const userinvitecode = res.classinfor.userinvitecode
      setTimeout(()=> router.push({path:"/useraboutclass" , query:{classname,classbrief,createid,userinvitecode}}))
     
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


<template>
  <div class="static mt-2">
    <ArrowLeft class="float-left ml-2 mt-1" @click="onreturn" />
    <form @submit="onSearch">
      <div class="flex">
        <Button type="submit" variant="outline" size="icon" class="absolute right-2 border-transparent ">
          <Search />
        </Button>
        <Input
          v-model="UserInvitecode"
          type="text"
          placeholder="填写邀请码"
          :disabled="isLoading"
           @input="handleInput"
          />    
      </div>    
    </form>
  
    
     
     
    
      
      


  </div>
</template>