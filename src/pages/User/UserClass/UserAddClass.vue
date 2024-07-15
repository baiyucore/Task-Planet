<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-vue-next';
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { useRouter} from 'vue-router';
import { Search } from 'lucide-vue-next';
import { userapi } from '@/pages/Api/UserIndex';
import { toast } from 'vue-sonner';


const router = useRouter();
const isLoading = ref(false);

const UserInvitecode= ref("") ;

//搜索
function onSearch(event:Event) {
  event.preventDefault()
  const userinvitecode = UserInvitecode.value as string;
  userapi.searchclass(userinvitecode).then((res)=>{
    if( res.err_code === 0){
      const classname = res.classinfor.classname
      const classbrief = res.classinfor.classbrief
      const createid = res.classinfor.account_id 
      
      setTimeout(()=> router.push({path:"/useraboutclass" , query:{classname,classbrief,createid,userinvitecode}}))
     
    }else {
      toast.error(res.err_msg)
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
    <form @submit="onSearch">
      <div class="flex">
        <Button variant="outline" size="icon" class="absolute right-2 border-transparent ">
          <Search />
        </Button>
        <Input
          v-model:model-value="UserInvitecode"
          type="text"
          placeholder="填写邀请码"
          :disabled="isLoading"
          />    
      </div>    
    </form>
  
    
     
     
    
      
      


  </div>
</template>