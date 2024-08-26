<script setup lang="ts">
import {  useRouter} from 'vue-router';
import { BadgePlus } from 'lucide-vue-next';
import { Userinfor } from '@/store/user';
import { userapi } from '@/pages/Api/UserIndex';
import { toast } from 'vue-sonner';
import { useQuery } from '@tanstack/vue-query'

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

<template>
  <div class="static mt-2">


    <div class="flex gap-10">
      <div class="flex-none w-14 ml-5">
        <span  class="   text-2xl  font-bold">班级</span> 
      </div>
      <div class="flex-inital w-1/2">

      </div>
      <div class="flex-initial w-30 right">
        <div @click=" addclass">
      <BadgePlus class="w-[100px]  top-2 right-0 size-8 " />
      <div class=" text-center  select-none "   >加入班级</div>
    </div>
      </div>
    </div>
    


      <!-- 显示 -->
      <div class="main-content">
        <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
        <span v-else-if="data">
          <span class="hidden">
            {{ Userinfor().transmitclassname(data.classname)}} {{ Userinfor().transmitclasscreateid(data.createid)  }}
          </span>
   
          <h1 @click="searchclass(data.userinvitecode,data.classname)"   class="text-center select-none text-2xl mb-2">
          {{ data.classname }}
        </h1>

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
      height: calc(90vh - 70px);
      border: 1px solid;
      border-color: transparent;
    }
    
</style>