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


<template>
  <div class="static mt-2">
    <ArrowLeft class="float-left ml-2 mt-1" @click="onreturn" />
   
      <h2  class=" text-center  text-2xl  font-bold">申请列表</h2> 
      <Accordion type="single" class="w-full" collapsible >
      <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
      <span v-else-if="data">

    <AccordionItem v-for="item in data.application" :value="item.userid" :key="item.userid">
      <AccordionTrigger>{{ item.username }} id:{{ item.userid }} 申请加入 {{ item.classname }}</AccordionTrigger>
      <AccordionContent>
        <Button class="bg-sky-400 hover:bg-cyan-600 mr-2" @click="aboutapplication(item.userid,item.userinvitecode,item.classname,item.username,'同意')" >同意</Button>
              <Button class="bg-rose-700 hover:bg-rose-800 mr-2" @click="aboutapplication(item.userid,item.userinvitecode,item.classname,item.username,'拒绝')">拒绝</Button>
             
      </AccordionContent>
    </AccordionItem>

      </span>
    </Accordion>

  </div>
</template>