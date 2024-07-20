<script setup lang="ts">
import { ref , onMounted} from 'vue';
import { toast } from 'vue-sonner';
import {  useRoute, useRouter} from 'vue-router';
import { ArrowLeft } from 'lucide-vue-next';
import { createapi } from '@/pages/Api/CreateIndex';
import { searchname } from '@/pages/Interface/CreateInterface';

const router= useRouter();
const isLoading = ref(false)
const name = ref("")
const sex = ref("")
const profile = ref("")

let tranport= useRoute()

const userinvitecode=tranport.query.user as string
const search_name=tranport.query.search_name as string



onMounted(()=>{
  isLoading.value= true
  const params : searchname ={
    userinvitecode : userinvitecode,
    searchname: search_name,
  }
  createapi.searchname(params).then((res)=>{
    if( res.err_code === 0 ){
      switch(res.result){
        case 'user':
          name.value = res.searchresult.user_name
          sex.value = res.searchresult.user_sex
          profile.value = res.searchresult.user_profile
          break;
        case 'create':
          name.value = res.searchresult.create_name
           sex.value = res.searchresult.create_sex
          profile.value = res.searchresult.create_profile
          break;
      }
     
    }
    else {
      toast.error( res.err_msg )
    }
  })



})


function onreturn(){
  router.back();
}


</script>

<template>
  <div class="static mt-2">
    <ArrowLeft class="float-left ml-2 mt-1" @click="onreturn" />
    <span  class="  text-2xl col-start-2 col-span-4  font-bold">个人信息</span>
 
      <div class="main-content">
        <h1 class="text-center text-2xl">{{name}}</h1>

        <div class="grid grid-cols-4 gap-2 mt-2">
          <div>性别</div>
          <div>
            {{sex}}</div>
        </div>

        <div class="grid grid-cols-4 gap-2 mt-2">
          <div>个人评语</div>
          <div>{{profile}}</div>
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