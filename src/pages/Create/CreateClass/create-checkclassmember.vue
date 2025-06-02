<template>
  <div class="static  mt-2">
    <ArrowLeft class="absolute top-3 left-0 cursor-pointer" @click="onreturn" />

    <div class="flex h-12 justify-center border-4 border-transparent border-b-slate-950   ">
     
      <span  class="  text-center text-2xl col-start-2 col-span-4  font-bold">{{classname}}</span> 
   </div>
   
    <div class=" p-4 backdrop-blur ">
      <form @submit="onSearch">        
        <div class="relative flex justify-around items-center">
          <div class="w-11/12 relative">
            <Search class="absolute left-2 top-2.5 size-4 text-muted-foreground "/>
        <Input 
          v-model:model-value="searchname"
          type="text"
          placeholder="搜索"
          :disabled="isLoading"
          class="pl-8  w-full"
          required
          /> 
          </div>
       
          <Button class="ml-1 bg-transparent border-transparent shadow-transparent text-black hover:bg-slate-200" >搜索</Button>
        </div>        
      </form>
    </div>
      
    
   <div class="main-content ">
    <div class="flex flex-col mt-2 ">
    <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
    <span v-else-if="data">
        <div class="flex justify-center mt-3 ">
          <Card class="mb-3 cursor-pointer w-11/12" @click="oncheckmember_oneself(data.createid,data.createidentity)" >
          <CardHeader>
            <CardTitle>创建者</CardTitle>
            <CardDescription>  
                  {{ data.createname }}
             </CardDescription>
          </CardHeader>
     
         </Card>
         
        </div> 
        <div class="flex justify-center "  v-for="userview in data.usermember" :key="userview._id">
          <Card class=" mb-3 cursor-pointer w-11/12" @click="oncheckmember_oneself(userview.userid,userview.identity,userview.warnnumber)" >
          <CardHeader>
            <CardTitle>成员</CardTitle>
            <CardDescription>  
              {{userview.name}} 
              <template v-if="userview.warnnumber">
              违规次数 {{ userview.warnnumber }}
            </template>
               </CardDescription>
          </CardHeader>
     
         </Card>
        </div>
    </span>
  </div>
   </div>
    
  </div>
</template>


<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { toast } from 'vue-sonner';
import { ArrowLeft } from 'lucide-vue-next';
import {  ref } from 'vue'

import {  useRoute, useRouter} from 'vue-router';
import { Search } from 'lucide-vue-next';
import { createapi } from '@/pages/Api/CreateIndex';
import { checkprerequisite, Searchname } from '@/pages/Interface/CreateInterface';
import { useQuery,useMutation } from '@tanstack/vue-query'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button';

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
    queryFn : () => createapi.checkclassmember(params),
    staleTime: 1000 * 60 * 1,

  
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
   
      const name =res.name
      const sex = res.sex
      const profile =res.profile
      const identity = res.identity
      const userid = res.userid

      router.push({path:"/createsearchname" , query:{name,sex,profile,identity,classname,userinvitecode,userid}})

   
  },  
  onError: (errors) => {
    isLoading.value = false
    toast.error(errors.message)
  },
  onSettled: () => {
    isLoading.value = false
  },

})


 function onSearch(event:Event) {
  event.preventDefault()
 mutation.mutate({
    userinvitecode : userinvitecode,
    searchname : searchname.value
    })

}
//应该传入id，用ID去查
function oncheckmember_oneself(searchid : string,identity : string,warnnumber?:string){
  router.push({path:"/checkoneself" , query:{classname,searchid,identity,userinvitecode,warnnumber}})

}

function onreturn(){
  router.back();
}


</script>
<style scoped>
 
  .main-content {
      margin: 0 auto;
      border-radius: 10px;
      width: 100%;
      height: calc(90vh - 70px);
      border: 1px solid;
      border-color: transparent;
      overflow: auto;
    }
</style>