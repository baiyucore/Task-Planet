<template>
  <div class="flex h-12  justify-between  bg-gray-600">
    <span  class=" ml-4 text-2xl content-center text-slate-100 font-bold">聊天</span> 

  </div>

      <div class="main-content">


        <div class="flex flex-col items-center">
        <Card v-for="items in commenallinfor" @click="viewtask(items.charid,items.charedid)" :key="items._id" class="mb-3 w-11/12  cursor-pointer">
          <CardHeader>
            <CardTitle>{{items.charname}}</CardTitle>
          </CardHeader>    
        </Card>
      </div>       
      </div>

</template>

<script setup lang="ts">
import { ref , watch} from 'vue';
import {
  DateFormatter,
  type DateValue,
} from '@internationalized/date'

import { toast } from 'vue-sonner';
import { createapi } from '@/pages/Api/CreateIndex';
import { UseCreateStore } from '@/store/create';
import { chatlist, CreateComment, CreateViewComment } from '@/pages/Interface/CreateInterface';
import { useRouter } from 'vue-router';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const router = useRouter()
const createinfor  = UseCreateStore()


const value = ref<DateValue>()
const commenallinfor = ref<chatlist[]>([])


  value.value =createinfor.commentdatevalue as DateValue

  const parmas : chatlist ={
    createid : createinfor.createid,
  }
  createapi.chatlist(parmas).then((res)=>{
  
    if(res.err_code === 0){
      commenallinfor.value = res.chatlist
    }else {
      toast.error(res.err_msg)
    }
  })



function viewtask(charid : string,charedid:string){
  router.push({path:'/createchat',query :{charid , charedid}});

}

</script>


<style scoped>
  .main-content {
      margin: 0 auto;
      margin-top: 30px;
      border-radius: 10px;
      width: 100%;
      height: calc(90vh - 70px);
      border: 1px solid;
      border-color: transparent;
      overflow: auto;
    }
</style>