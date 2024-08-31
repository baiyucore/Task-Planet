<template>
  <div class="static mt-2">
    <ArrowLeft class="absolute top-3 left-0 cursor-pointer" @click="onreturn" />

    <div class="flex h-12 justify-center border-4 border-transparent border-b-slate-950   ">
     
      <span  class="  text-center text-2xl col-start-2 col-span-4  font-bold">{{classname}}</span> 
   </div>
   <div class=" p-4 backdrop-blur ">
      <form @submit="onSearch">        
        <div class="relative  ">
        <Search class="absolute left-2 top-2.5 size-4 text-muted-foreground "/>
        <Input 
          v-model="searchname"
          type="text"
          placeholder="搜索"
          :disabled="isLoading"
          class="pl-8  w-full"
          />  
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
            <CardTitle>{{ data.createname }}</CardTitle>
            <CardDescription>  
              创建者
             </CardDescription>
          </CardHeader>
     
         </Card>
         
        </div> 
        <div class="flex justify-center "  v-for="userview in data.usermember" :key="userview._id">
          <Card class=" mb-3 cursor-pointer w-11/12" @click="oncheckmember_oneself(userview.userid,userview.identity)" >
          <CardHeader>
            <CardTitle>
              {{userview.name}} 
            </CardTitle>
            <CardDescription>  
              成员
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
import {   ref } from 'vue'
import {  useRoute, useRouter} from 'vue-router';
import { Search } from 'lucide-vue-next';
import { userapi } from '@/pages/Api/UserIndex';
import { useQuery,useMutation } from '@tanstack/vue-query'
import { Searchname } from '@/pages/Interface/UserInterface';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'


const router = useRouter();
const isLoading = ref(false);
const searchname= ref("") ;


let tranport= useRoute();
const user = tranport.query.user as string 
const classname = tranport.query.classname as string 

const { isError, data, error,} =useQuery({
    queryKey: ['createcheckclassmember', user],
    queryFn : () =>  userapi.checkclassmember(user)

  
  })

  const mutation= useMutation({
  mutationFn: async (params: Searchname) => {
    const response = await  userapi.searchnametwo(params)
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
      router.push({path:"/usersearchname" , query:{name,sex,profile}})

   
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
    userinvitecode : user,
    searchname : searchname.value
    })
}

function oncheckmember_oneself(searchid : string,identity : string){
  router.push({path:"/usercheckoneself" , query:{searchid,identity}})
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