
<template>
  <div class="static ">
    <ArrowLeft class="absolute top-3 left-0 cursor-pointer" @click="onreturn" />
    <div class="flex h-12 justify-center border-4 border-transparent border-b-slate-950   ">
    <span  class="text-center text-2xl col-start-2 col-span-4  font-bold">{{ taskname }}</span> 
    </div>
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
  router.push({path:'/auditorviewcomment' ,query:{taskid,userid,username,summarize}})
}

</script>

<style scoped>
  .main-content {
      margin: 0 auto;

      border-radius: 10px;
      width: 90%;
      height: calc(90vh - 70px);
      border: 1px solid;
      border-color: transparent;
    }

</style>