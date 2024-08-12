<script setup lang="ts">
import { toast } from 'vue-sonner';
import { useRouter,useRoute } from 'vue-router';
import { ArrowLeft  } from 'lucide-vue-next';
import { createapi } from '@/pages/Api/CreateIndex';
import { useQuery } from '@tanstack/vue-query'

const router = useRouter();
const route = useRoute()
const taskid  = route.query.taskid as string
const taskname  = route.query.taskname as string

const { isError, data, error,} =useQuery({
    queryKey: ['craetecommentinfor', taskid],
    queryFn : () => createapi.ViewComment_task(taskid)
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
      <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
      <span v-else-if="data">

      <div v-for="item in data.commentinfor" :key="item._id">
        <div @click="othercomment(item.taskid,item.userid,item.username,item.summarize)" class="cursor-pointer" >
          {{ item.username}} 的总结
        </div>
         
        </div>
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