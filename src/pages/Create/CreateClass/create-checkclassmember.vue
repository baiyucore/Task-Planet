<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { toast } from 'vue-sonner';
import { ArrowLeft } from 'lucide-vue-next';
import {  ref } from 'vue'
import { Button } from '@/components/ui/button'
import {  useRoute, useRouter} from 'vue-router';
import { Search } from 'lucide-vue-next';
import { createapi } from '@/pages/Api/CreateIndex';
import { checkprerequisite, Searchname } from '@/pages/Interface/CreateInterface';
import { useQuery,useMutation } from '@tanstack/vue-query'



const router = useRouter();
const isLoading = ref(false);

const searchname= ref("") ;


let tranport= useRoute();
const userinvitecode = tranport.query.userinvitecode as string 
const classname = tranport.query.class_name
const params : checkprerequisite = {
          user : userinvitecode,
        }

     
const { isError, data, error,} =useQuery({
    queryKey: ['createcheckclassmember', params],
    queryFn : () => createapi.checkclassmember(params)

  
  })


  const mutation= useMutation({
  mutationFn: async (params: Searchname) => {
    const response = await  createapi.searchnametwo(params)
    return response
  },
  onMutate:()=>{
    isLoading.value = true
  },
  onSuccess:(res)=>{
    isLoading.value= true;
    if( res.err_code === 0 ){
      const name =res.name
      const sex = res.sex
      const profile =res.profile
      router.push({path:"/createsearchname" , query:{name,sex,profile}})

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


async function onSearch(event:Event) {
  event.preventDefault()
 mutation.mutate({
    userinvitecode : userinvitecode,
    searchname : searchname.value
    })

}
//应该传入id，用ID去查
function oncheckmember_oneself(searchid : string,identity : string){
  router.push({path:"/checkoneself" , query:{classname,searchid,identity,userinvitecode}})
}

function onreturn(){
  router.back();
}


</script>


<template>
  <div class="static mt-2">
    <ArrowLeft class="float-left ml-2 mt-1" @click="onreturn" />

    <div class="grid grid-cols-6 gap-4">
        <span  class="  text-center text-2xl col-start-2 col-span-4  font-bold">{{classname}}</span> 
      </div>

    <form @submit="onSearch">
      <div class="static">
        <Button variant="outline" size="icon" class="absolute right-2 border-transparent ">
          <Search />
        </Button>
        <Input 
          v-model:model-value="searchname"
          type="text"
          placeholder="搜索"
          :disabled="isLoading"
          />    
      </div>    
    </form>

    <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
    <span v-else-if="data">

      <h3 class="ml-2 mt-1 mb-1">创建者</h3>
      <div class="grid grid-cols-4 gap-2 mt-2 ml-5">
     
          <div @click="oncheckmember_oneself(data.createid,data.createidentity)"  class="cursor-pointer" >
              {{ data.createname }}
          </div>
        
      </div>

    <h3 class="ml-2 mb-1 mt-1">成员</h3>
      <div class=" mt-2 ml-5">

    
        <div v-for="userview in data.usermember" :key="userview._id"  class="cursor-pointer mb-2"  >
       
          <div   @click="oncheckmember_oneself(userview.userid,userview.identity)" >
            {{userview.name}} 
            <template v-if="userview.warnnumber">
              违规次数 {{ userview.warnnumber }}
            </template>
         
          </div>
         
        </div>
       
      </div>

    </span>


    
     
     
    
      
      


  </div>
</template>