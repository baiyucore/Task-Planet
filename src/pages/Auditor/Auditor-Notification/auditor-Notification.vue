<script setup lang="ts">
import { onMounted,ref} from 'vue';
import {  useRouter} from 'vue-router';
import { BellPlus } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import { auditorapi } from '@/pages/Api/AuditorIndex';
import { ViewPostNotice } from '@/pages/Interface/AuditorInterface';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'

const router= useRouter();

const noticeinfor = ref<ViewPostNotice[]>([])

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
  const year = item.noticetime.year
  const month = item.noticetime.month
  const day = item.noticetime.day
  router.push({path:'/auditorviewnoticeinfor',query:{name,completion,year,month,day}})
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
      
        <Accordion type="single" class="w-full " collapsible >
          <AccordionItem v-for="item in noticeinfor"  :value="item.noticename">     
            <AccordionTrigger class="text-2xl">    
              <div @click="viewnoticeinfor(item)">{{ item.noticename }}</div> 
            </AccordionTrigger>
            <AccordionContent>
              <Button class="bg-rose-700 hover:bg-rose-800" @click="removenotice(item.noticeid)">删除</Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

   
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