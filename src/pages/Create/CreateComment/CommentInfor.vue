<script setup lang="ts">

import { toast } from 'vue-sonner';
import { useRouter,useRoute } from 'vue-router';
import { ArrowLeft ,Check } from 'lucide-vue-next';
import {  onMounted, ref } from 'vue'
import { ViewCommenttask } from '@/pages/Interface/UserInterface';
import { createapi } from '@/pages/Api/CreateIndex';



const router = useRouter();
const route = useRoute()
const taskid  = route.query.taskid as string
const taskname  = route.query.taskname as string
const commentinfor = ref<ViewCommenttask[]>([])

onMounted(()=>{
  createapi.ViewComment_task(taskid).then((res)=>{
    if(res.err_code === 0 ){
      commentinfor.value = res.commentinfor
    }else{
      toast.error(res.err_msg)
    }
  })
})


function onreturn(){
  router.back();
}

function othercomment(taskid:string,userid:string,username:string,summarize:string){
  router.push({path:'/createviewcomment' ,query:{taskid,userid,username,summarize}})
}

</script>

<template>
  <div class="static mt-2">
    <ArrowLeft class="float-left ml-2 mt-1" @click="onreturn" />

    <span  class="  ml-2 text-2xl  font-bold">{{ taskname }}</span> 
    <div class="main-content">
      <div v-for="item in commentinfor">
        <div @click="othercomment(item.taskid,item.userid,item.username,item.summarize)" >
          {{ item.username}} 的总结
        </div>
         
        </div>

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