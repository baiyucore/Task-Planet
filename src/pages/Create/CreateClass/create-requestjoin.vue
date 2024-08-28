<template>
  <div class="static ">
    <ArrowLeft class="absolute top-3 left-0 cursor-pointer" @click="onreturn" />
   
  
      <div class="flex h-12 justify-center border-4 border-transparent border-b-slate-950   ">
     
     <span  class="  text-center text-2xl col-start-2 col-span-4  font-bold">申请列表</span> 
   </div>


   <div class="flex flex-col overflow-auto">
    <Accordion type="single" class="w-11/12 content-center m-auto " collapsible >
      <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
      <span v-else-if="data">

    <AccordionItem v-for="item in data.application" :value="item.userid" :key="item.userid">
      <AccordionTrigger>{{ item.username }} id:{{ item.userid }} 申请加入 {{ item.classname }}</AccordionTrigger>
      <AccordionContent>
        <div class=" flex justify-center gap-4">
          <Button class="bg-sky-400 hover:bg-cyan-600 mr-2" @click="aboutapplication(item.userid,item.userinvitecode,item.classname,item.username,'同意')" >同意</Button>
         <Button class="bg-rose-700 hover:bg-rose-800 mr-2" @click="aboutapplication(item.userid,item.userinvitecode,item.classname,item.username,'拒绝')">拒绝</Button>
             
          
        </div>

           
      </AccordionContent>
    </AccordionItem>

      </span>
    </Accordion>

   </div>

    

  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner';
import { ArrowLeft } from 'lucide-vue-next';
import { Button } from '@/components/ui/button'
import { createapi } from '@/pages/Api/CreateIndex';
import { UseCreateStore } from '@/store/create';
import { applycondition, } from '@/pages/Interface/CreateInterface';
import { useRouter} from 'vue-router';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useQuery,useMutation } from '@tanstack/vue-query'

  const createid = UseCreateStore().createid
  const router = useRouter();
  const { isError, data, error,} =useQuery({
    queryKey: ['craeteviewoneself', createid],
    queryFn : () =>  createapi.application(createid)
  })



const mutation= useMutation({
  mutationFn: async (params: applycondition) => {
    const response = await   createapi.applycondition(params)
    return response
  },
  onSuccess:(res)=>{
    if( res.err_code === 0 ){
      window.location.reload();

    } else{
      toast.error( res.err_msg );
    }
  },  
  onError: (error) => {
    toast.error(error.message)
  },
 

})


async function aboutapplication(userid : string,userinvitecode:string,classname : string,username:string,condition: string){
  mutation.mutate({
    userinvitecode : userinvitecode,
    userid : userid,
    classname : classname,
    condition : condition,
    username: username,
    createid : createid,
    })
}
function onreturn(){
  router.back();
}


</script>

