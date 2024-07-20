<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Wrench } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import { useRouter} from 'vue-router';

import { Userinfor } from '@/store/user';
import { Userid } from '@/pages/Interface/UserInterface';
import { userapi } from '@/pages/Api/UserIndex';

const router= useRouter();
const isLoading = ref(false);
const userinfor = Userinfor()
const username=ref("")
const usersex = ref("")
const userprofile=ref("")


onMounted(()=>{
  isLoading.value = true
  const params : Userid={ userid :userinfor.userid }
  userapi.viewoneself(params).then((res)=>{
    isLoading.value = false
    if(res.err_code === 0){
      username.value=res.useroneself.user_name;
      usersex.value= res.useroneself.user_sex;
      userprofile.value=res.useroneself.user_profile;
    
      Userinfor().coinchange(res.useroneself.coin)
    }else{
      toast.error(res.err_msg)
    }
  })
})
const coin = Userinfor().coin


function revise(){
  router.push({ path:'/userrevise'})
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
        <h1 class="text-center text-2xl">{{username}}</h1>

        <div class="grid grid-cols-4 gap-2 mt-2">
          <div>性别 </div>
          <div>
            {{usersex}}</div>
        </div>

        <div class="grid grid-cols-4 gap-2 mt-2">
          <div>个人评语</div>
          <div>{{userprofile}}</div>
        </div>
        <div class="grid grid-cols-4 gap-2 mt-2">
          <div>所获得的金币</div>
          <div>{{coin}}</div>
        </div>
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