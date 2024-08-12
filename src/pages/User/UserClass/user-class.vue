<script setup lang="ts">
import { onMounted,ref} from 'vue';

import {  useRouter} from 'vue-router';

import { BadgePlus } from 'lucide-vue-next';
import { Userinfor } from '@/store/user';
import { userapi } from '@/pages/Api/UserIndex';
import { toast } from 'vue-sonner';
import { UserClassinfor } from '@/pages/Interface/UserInterface';
import { useQuery } from '@tanstack/vue-query'


const router= useRouter();
const classinfor =ref<UserClassinfor[]>([])

// const userid = Userinfor().userid


// const { isError, data, error,} =useQuery({
//     queryKey: ['userclassmember', userid],
//     queryFn : () =>  userapi.viewclass(userid)

  
//   })

onMounted(()=>{
  const userid = Userinfor().userid
  userapi.viewclass(userid).then((res)=>{
    if(res.err_code === 0){
      classinfor.value = res.classinfor.joinclass

      //需要优化
      const classname =res.classinfor.joinclass[0].classname
      const classcreate = res.classinfor.joinclass[0].createid
       Userinfor().transmitclassname(classname)
      Userinfor().transmitclasscreate(classcreate)
    }else {
      toast.error(res.err_msg)
    }
  })
})

function searchclass(user : string,classname:string){
  router.push({path:'/usercheckclassmember',query :{ user:user,classname} })
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
        <div @click=" $router.push({path:'/useraddclass'})">
      <BadgePlus class="w-[100px]  top-2 right-0 size-8 " />
      <div class=" text-center  select-none "   >加入班级</div>
    </div>
      </div>
    </div>
    
 
    



      <!-- 显示 -->
      <div class="main-content">
        <h1 @click="searchclass(item.userinvitecode,item.classname)" v-for="item in classinfor" :key="item.userinvitecode"  class="text-center select-none text-2xl mb-2">
          {{ item.classname }}
        </h1>
   
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