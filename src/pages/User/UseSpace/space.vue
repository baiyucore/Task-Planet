<template>
  <div class="flex h-12  justify-between  bg-gray-600">
    <span  class=" ml-4 text-2xl content-center text-slate-100 font-bold">聊天</span> 

  </div>

      <div class="main-content">
        <div class="flex justify-center mb-2">
          <input
            v-model="search"
            type="text"
            placeholder="搜索聊天对象"
            class="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div class="flex flex-col items-center mt-2">
        <Card v-for="items in commenallinfor" @click="viewtask(items.chatroomid,items.chatedname)" :key="items.chatroomid" class="mb-3 w-11/12  cursor-pointer">
          <CardHeader>
            <CardTitle>与{{items.chatedname}}的聊天</CardTitle>
          </CardHeader>    
        </Card>
      </div>       
      </div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { toast } from 'vue-sonner';
import { createapi } from '@/pages/Api/CreateIndex';

import { chatlist,} from '@/pages/Interface/CreateInterface';
import { useRouter } from 'vue-router';
import {
  Card,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Userinfor } from '@/store/user';
const router = useRouter()

const userinfor = Userinfor()


const commenallinfor = ref([])

// TODO: 搜索功能



  onMounted(async ()=>{
    const parmas : chatlist ={
    chatedid : userinfor.userid,
  }
    const rest = await createapi.chatlist(parmas)
    
    if(rest.err_code === 0){
      for(let i in rest.res){
    
        if(rest.res[i].chatid === userinfor.userid){
   
          commenallinfor.value.push({
            charedid:rest.res[i].chatedid,
            chatroomid:rest.res[i].chatroomid,
            chatid:rest.res[i].chatid,
            chatedname:rest.res[i].chatedname,
            chatname:rest.res[i].chatname,
          })
        }
        else {
        
          commenallinfor.value.push({
              charedid:rest.res[i].chatedid,
              chatroomid:rest.res[i].chatroomid,
              chatid:rest.res[i].chatid,
              chatedname:rest.res[i].chatname,
              chatname:rest.res[i].chatedname,
          })
        }

      }
    }else {
      toast.error(rest.err_msg)
    }
  })



function viewtask(chatroomid : string,chatedname:string){
  router.push({path:'/userchat',query :{chatroomid,chatedname}});

}

</script>


<style scoped>
  .main-content {
      margin: 0 auto;
      margin-top: 24px;
      border-radius: 10px;
      width: 100%;
      height: calc(90vh - 70px);
      border: 1px solid;
      border-color: transparent;
      overflow: auto;
    }
</style>