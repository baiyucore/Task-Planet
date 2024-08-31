
<template>
  <div class="static">

    <div @click="postnotice()">
      <BellPlus class=" size-6 absolute top-3 right-3 cursor-pointer" />
      
    </div>
    <div class="flex h-12 justify-center bg-gray-600">   
      
   <span  class=" content-center  text-2xl cursor-default text-slate-100  font-bold">通知</span> 

  
    </div>

    

      <div class="main-content">
      
        <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
        <span v-else-if="data">
            <Accordion type="single" class="w-full " collapsible >
            <AccordionItem v-for="item in data.postnotice"  :value="item.noticename" :key="item._id">     
              <AccordionTrigger class="text-2xl text-center">    
                <div @click="viewnoticeinfor(item)" class="flex items-center">{{ item.noticename }}
                  <div class="text-sm ml-2">
                  {{ item.condition }}
                </div> 
                </div>
              
              </AccordionTrigger>
              <AccordionContent>

                <div class="flex justify-end">
                  <Button v-show="item.condition !=='已发布'" class="bg-teal-500 hover:bg-teal-700 mr-2" @click="PublishNotice(item.noticeid)">发布</Button>
                <AlertDialog>
             <AlertDialogTrigger as-child>
               <Button variant="outline" class="   bg-rose-700 hover:bg-rose-800 text-white" >
                 删除
               </Button>
             </AlertDialogTrigger>
             <AlertDialogContent>
               <AlertDialogHeader>
                 <AlertDialogTitle>你确定删除?</AlertDialogTitle>
                 <AlertDialogDescription>
                   删除后无法复原
                 </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                 <AlertDialogCancel>取消</AlertDialogCancel>
                 <AlertDialogAction @click="removenotice(item.noticeid)">确认</AlertDialogAction>
               </AlertDialogFooter>
             </AlertDialogContent>
           </AlertDialog>

                </div>
                
                
              


              </AccordionContent>
            </AccordionItem>
          </Accordion>


        </span>



   
      </div>
  </div>

  


  
</template>

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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
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