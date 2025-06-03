<template>
  <div class="flex h-12 cursor-default justify-between  bg-gray-600">
    <span  class=" ml-4 text-2xl content-center text-slate-100 font-bold">个人信息</span> 
  </div>
      <div class="main-content">
     
      <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
      <span v-else-if="data">
        <div class="flex flex-col items-center">
          <div class="text-center text-2xl mb-4">{{data.createname }}</div>

          <div class="grid grid-cols-2 gap-2 mt-2">
            <div>性别</div>
            <div>{{ data.createsex }}</div>
          </div>
          <div class="grid grid-cols-2 gap-2 mt-2">
            <div>个人评语</div>
            <div>{{ data.createprofile }}</div>
          </div> 

        <div class="w-full max-w-md mt-8 rounded-lg overflow-hidden shadow border">
          <button
            class="w-full flex items-center px-4 py-3 border-b last:border-b-0 hover:bg-gray-100 transition"
            @click="reivseoneself"
          >
            <Wrench class="mr-2" /> 修改个人信息
          </button>
          <button
            class="w-full flex items-center px-4 py-3 border-b last:border-b-0 hover:bg-gray-100 transition"
            @click="reivseoneself"
          >
            <Wrench class="mr-2" /> 笔记
          </button>         
           <button
            class="w-full flex items-center px-4 py-3 border-b last:border-b-0 hover:bg-gray-100 transition"
            @click="cloud"
          >
            <Wrench class="mr-2" /> 云盘
          </button>

          <AlertDialog>
            <AlertDialogTrigger as-child>
              <button
                class="w-full flex items-center px-4 py-3 hover:bg-red-50 text-red-600 transition"
              >
                退出登录
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>你确定退出登录?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>取消</AlertDialogCancel>
                <AlertDialogAction @click="Logout()">确定</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        </div>
       
        
      </span>
      </div>
 

</template>

<script setup lang="ts">
import { Wrench } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import { useRouter } from 'vue-router';
import { createapi } from '@/pages/Api/CreateIndex';
import { UseCreateStore } from '@/store/create';
import { Createid } from '@/pages/Interface/CreateInterface';
import { useQuery } from '@tanstack/vue-query'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button';
import axios from 'axios';

const createinfor = UseCreateStore()
const router = useRouter()


const  Logout= async()=>{
  createinfor.$clear();

  const res= await axios.post("http://localhost:3000/logout",{},{ withCredentials: true })
  toast.success(res.data.message)
  router.push({ path:'/login'})
}


const params : Createid= {account_id: createinfor.createid}
 const { isError, data, error,} =useQuery({
    queryKey: ['createviewoneself', params],
    queryFn : () =>  createapi.viewoneself(params) ,
    staleTime: 1000 * 60 * 1,
  })
  function reivseoneself(){
    router.push({ path:'/createrevise'})
  }

  function note(){
    router.push({ path:'/createrevise'})
  }
  function cloud(){
    router.push({ path:'/createpan'})
  }
</script>


<style scoped>

  .main-content {
      margin: 0 auto;
      margin-top: 6px;
      border-radius: 10px;
      width: 90%;
      height: calc(90% - 70px);
      border: 1px solid;
      border-color: transparent;
    }
</style>