<template>

<div class="flex h-12  justify-between  bg-gray-600">
    <span  class="  ml-4 cursor-default text-2xl content-center text-slate-100 font-bold">班级</span> 
    <div class=" content-center mr-4 cursor-pointer " @click="addclass">
      <BadgePlus class="size-8 " color="#f1f5f9"/>
    </div>
  </div>


    


      <!-- 显示 -->
      <div class="main-content">
        <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
        <span v-else-if="data">

          <span class="hidden">
            {{ Userinfor().transmitclassname(data.classname)}} {{ Userinfor().transmitclasscreateid(data.createid)  }}
          </span>
   
          <div class="flex flex-col items-center">
              <Card  @click="searchclass(data.userinvitecode,data.classname)"  class="mb-3 w-11/12  cursor-pointer">
            <CardHeader>
              <CardTitle> {{ data.classname }}</CardTitle>
              <CardDescription>已加入人数：{{ data.studentnumber }} </CardDescription>
            </CardHeader>    
          </Card>
      </div>

      
        </span>


        
   
      </div>


  


  
</template>
<script setup lang="ts">
import {  useRouter} from 'vue-router';
import { BadgePlus } from 'lucide-vue-next';
import { Userinfor } from '@/store/user';
import { userapi } from '@/pages/Api/UserIndex';
import { toast } from 'vue-sonner';
import { useQuery } from '@tanstack/vue-query'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const router= useRouter();


const userid = Userinfor().userid
const { isError, data, error,} =useQuery({
    queryKey: ['userclass', userid],
    queryFn : () => userapi.viewclass(userid)
  })



function searchclass(user : string,classname:string){
  router.push({path:'/usercheckclassmember',query :{ user:user,classname} })
}
const addclass = ()=>{
  router.push({path:'/useraddclass'})
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