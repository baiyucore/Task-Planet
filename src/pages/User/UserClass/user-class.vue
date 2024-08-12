<script setup lang="ts">
import { onMounted,ref} from 'vue';
import {  useRouter} from 'vue-router';
import { BadgePlus } from 'lucide-vue-next';
import { Userinfor } from '@/store/user';
import { userapi } from '@/pages/Api/UserIndex';
import { toast } from 'vue-sonner';

const router= useRouter();
const classname = ref("");
const userinvitecode = ref("")
onMounted(()=>{
  const userid = Userinfor().userid
  userapi.viewclass(userid).then((res)=>{
    if(res.err_code === 0){
        classname.value = res.classname 
        userinvitecode.value = res.userinvitecode

        Userinfor().transmitclassname(res.classname )
        Userinfor().transmitclasscreate(res.createid)
    }else {
      toast.error(res.err_msg)
    }
  })
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
        <h1 @click="searchclass(userinvitecode,classname)"   class="text-center select-none text-2xl mb-2">
          {{ classname }}
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