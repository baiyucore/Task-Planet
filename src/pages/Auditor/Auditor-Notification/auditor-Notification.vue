<script setup lang="ts">
import { onMounted,ref} from 'vue';
import {  useRouter} from 'vue-router';
import { BellPlus } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import { auditorapi } from '@/pages/Api/AuditorIndex';
import { ViewPostNotice } from '@/pages/Interface/AuditorInterface';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/vue-query'
import { format } from 'date-fns';
const router= useRouter();

const noticeinfor = ref<ViewPostNotice[]>([])


const { isError, data, error,} =useQuery({
    queryKey: ['auditornotification'],
    queryFn : () =>  auditorapi.ViewPostNotice()
  })

onMounted(()=>{
  auditorapi.ViewPostNotice().then((res)=>{
    if(res.err_code === 0 ){
      noticeinfor.value=res.postnotice
    }else{
      toast.error(res.err_msg)
    }
  })
})


function viewnoticeinfor(item:ViewPostNotice){
  const name = item.noticename
  const completion = item.noticecompletion

  const startdate = new Date(item.noticetime)
  const taskstarttime = format(startdate, 'yyyy-MM-dd HH:mm:ss');
  router.push({path:'/auditorviewnoticeinfor',query:{name,completion,taskstarttime}})
}
function postnotice(){
  router.push({path:'/auditorpostnotice'})
}

function removenotice(noticeid : string){
  auditorapi.RemoveNotice(noticeid).then((res)=>{
    if(res.err_code === 0 ){
      toast.success("删除成功")
      window.location.reload()
    }else{
      toast.error(res.err_msg)
    }
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
                <div @click="viewnoticeinfor(item)">{{ item.noticename }}</div> 
              </AccordionTrigger>
              <AccordionContent>
                <Button class="bg-rose-700 hover:bg-rose-800" @click="removenotice(item.noticeid)">删除</Button>
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