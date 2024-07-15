<script setup lang="ts">
import { ref , onMounted} from 'vue';
import { Wrench } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import { useRouter} from 'vue-router';

import { createapi } from '@/pages/Api/CreateIndex';

import { Createinfor } from '@/store/create';
import { Createid } from '@/pages/Interface/CreateInterface';
const createinfor = Createinfor()

const router= useRouter();
const isLoading = ref(false)
const create_name = ref("")
const create_sex = ref("")
const create_profile = ref("")





//问题
onMounted(()=>{
  isLoading.value= true
  const params : Createid= {account_id: createinfor.createid}
  createapi.viewoneself(params).then((res)=>{
    isLoading.value=false
    if(res.err_code === 0){
      create_name.value=res.createoneself.create_name;
    create_sex.value= res.createoneself.create_sex;
    create_profile.value=res.createoneself.create_profile;
    }else{
      toast.error(res.err_msg)
    }
    
  })

})



function revise(){
  router.push({ path:'/createrevise'})
}

</script>

<template>
  <div class="static mt-2">
    <span  class=" ml-10  text-2xl  font-bold select-none">个人信息</span> 
  <div @click="revise">
    <Wrench class="w-[100px] absolute top-2 right-0 size-8 " />
    <div class=" text-right mr-9 select-none "   >修改</div>
  </div>
 
      <div class="main-content">
        <h1 class="text-center text-2xl">{{create_name}}</h1>

        <div class="grid grid-cols-4 gap-2 mt-2">
          <div>性别 </div>
          <div>
            {{create_sex}}</div>
        </div>

        <div class="grid grid-cols-4 gap-2 mt-2">
          <div>个人评语</div>
          <div>{{create_profile}}</div>
        </div>

      </div>
  </div>

  


  
</template>
<style scoped>

  .main-content {
      margin: 0 auto;
      margin-top: 6px;
      border-radius: 10px;
      width: 90%;
      height: 650px;
      border: 1px solid;
      border-color: transparent;
    }
</style>