<template>
  <div class="static mt-2">
    <ArrowLeft class="absolute top-3 left-0 cursor-pointer" @click=" onreturn" />
  
        <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
    <span v-else-if="data">
      <div class="flex h-12 justify-center border-4 border-transparent border-b-slate-950   ">
     
     <span  class="  text-center text-2xl col-start-2 col-span-4  font-bold">班级成员</span> 
  </div>

  <div class="flex flex-col  ">

    <div class="flex justify-center mt-3">
          <div class="mr-3  ">姓名</div>
          <div>
            {{data.name}}</div>
        </div>
    <div class="flex justify-center mt-3">
          <div class="mr-3  ">性别</div>
          <div>
            {{data.sex}}</div>
        </div>
        <div class="flex justify-center mt-3">
          <div class="mr-3 ">个人评语</div>
          <div>{{data.profile}}</div>
        </div>
        <div class="flex justify-center mt-3" v-show="searchid !== userinfor.userid">
          <button
            class="mr-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            @click="goChat(data.name)"
          >
            与{{data.name}}聊天
          </button>
        </div>
  
       
  </div>
    </span>
      </div>

  


  
</template>
<script setup lang="ts">
import { toast } from 'vue-sonner';
import {  useRoute} from 'vue-router';
import { ArrowLeft } from 'lucide-vue-next';
import { createapi } from '@/pages/Api/CreateIndex';
import { searchname } from '@/pages/Interface/CreateInterface';
import { useQuery } from '@tanstack/vue-query'
import { useRouter} from 'vue-router';
import { Userinfor } from '@/store/user';
import { nanoid } from 'nanoid'
let tranport= useRoute()
const searchid=tranport.query.searchid as string
const identity = tranport.query.identity as string
const router = useRouter();
const userinfor = Userinfor()
const params : searchname ={
    searchnameid: searchid,
    identity :identity,
  }
const { isError, data, error,} =useQuery({
    queryKey: ['craeteviewoneself', params],
    queryFn : () =>  createapi.searchname(params),
    staleTime: 1000 * 60 * 1,
  })
  function onreturn(){
  router.back();
}
const chatroomid =nanoid(8)
async function goChat(name:string) {
  // 跳转到聊天页面，带上对方id等参数
  const rest = await createapi.createchatroom({
    chatroomid:chatroomid,
    chatid:userinfor.userid,
    chatedid:searchid,
    chatedname:name,
    chatname:userinfor.username,
  })
  router.push({ path: '/createchat', query: { chatroomid:rest.res.chatroomid } })
}

</script>
