<script setup lang="ts">
import {  useRouter} from 'vue-router';
import { BellPlus } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import { auditorapi } from '@/pages/Api/AuditorIndex';
import {  deltenotice, publishnotice, ViewPostNotice } from '@/pages/Interface/AuditorInterface';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { useMutation,useQuery } from '@tanstack/vue-query'
import { format } from 'date-fns';

const router= useRouter();
const { isError, data, error,refetch} =useQuery({
    queryKey: ['auditornotification'],
    queryFn : () =>  auditorapi.ViewPostNotice()
  })


function viewnoticeinfor(item:ViewPostNotice){
  const name = item.noticename
  const completion = item.noticecompletion

  router.push({path:'/auditorviewnoticeinfor',query:{name,completion}})
}
function postnotice(){
  router.push({path:'/auditorpostnotice'})
}


const removemutation = useMutation({
  mutationFn: async ( params:deltenotice) => {
    const response = await auditorapi.RemoveNotice(params)
    return response
  },
  onSuccess:(res)=>{
    if(res.err_code === 0 ){
      toast.success("删除成功")
      refetch()
    }else{
      toast.error(res.err_msg)
    }
  },  
  onError: (error) => {
    toast.error(error.message)
  },
})
function removenotice(noticeid : string){
  removemutation.mutate({
    noticeid:noticeid,
  })
}
const publishmutation = useMutation({
  mutationFn: async ( params:publishnotice) => {
    const response = await auditorapi.PublishNotice(params)
    return response
  },
  onSuccess:(res)=>{
    if(res.err_code === 0 ){
      toast.success("发布成功")
      refetch()
    }else{
      toast.error(res.err_msg)
    }
  },  
  onError: (error) => {
    toast.error(error.message)
  },
})
function PublishNotice(noticeid:string){
  const now = new Date();
  const time = format(now,'yyyy-MM-dd HH:mm:ss')
  publishmutation.mutate({
    noticeid:noticeid,
    time:time
  })
}
</script>

<template>
  <div class="static mt-2">


    <div class="flex gap-10">
      <div class="flex-none w-14 ml-5 mt-4">
        <span  class="   text-2xl  font-bold">通知</span> 
      </div>
      <div class="flex-inital w-1/2">

      </div>
      <div class="flex-initial w-30 right">
        <div @click="postnotice()">
      <BellPlus class="w-[100px]  top-2 right-0 size-10 " />
      <div class=" text-center  select-none "   >发布新通知</div>
    </div>
      </div>
    </div>
    

      <div class="main-content">
      
        <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
        <span v-else-if="data">
            <Accordion type="single" class="w-full " collapsible >
            <AccordionItem v-for="item in data.postnotice"  :value="item.noticename" :key="item._id">     
              <AccordionTrigger class="text-2xl">    
                <div @click="viewnoticeinfor(item)">{{ item.noticename }}  {{ item.condition }}</div> 
              </AccordionTrigger>
              <AccordionContent>
                <Button v-show="item.condition !=='已发布'" class="bg-teal-500 hover:bg-teal-700 mr-2" @click="PublishNotice(item.noticeid)">发布</Button>
                <Button class="bg-rose-700 hover:bg-rose-800 mr-2" @click="removenotice(item.noticeid)">删除</Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>


        </span>



   
      </div>
  </div>

  


  
</template>
<style scoped>
  .main-content {
      margin: 0 auto;
      margin-top: 30px;
      border-radius: 10px;
      width: 90%;
      height: 650px;
      border: 1px solid;
      border-color: transparent;
    }
    
</style>