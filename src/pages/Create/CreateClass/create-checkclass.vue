<script setup lang="ts">
import { toast } from 'vue-sonner';
import { ArrowLeft ,ArrowRight } from 'lucide-vue-next';
import {  onMounted, ref } from 'vue'
import {  useRoute, useRouter} from 'vue-router';
import { createapi } from '@/pages/Api/CreateIndex';
import { CreateClassnameId } from '@/pages/Interface/CreateInterface';


const router = useRouter();
const isLoading = ref(false);
const classname = ref("");
const classbrief = ref("");
const userinvitecode = ref("");


let tranport= useRoute();
const id = tranport.query.id as string;

const params : CreateClassnameId ={
    id :id
} 

onMounted(()=>{
  isLoading.value = true
  createapi.checkclass(params).then((res)=>{
    isLoading.value = false
    if(res.err_code === 0 ){
    classname.value = res.createcheck.classname;
    classbrief.value= res.createcheck.classbrief;
    userinvitecode.value = res.createcheck.userinvitecode;
    }else{
      toast.error(res.err_msg)
    }

   
  })

})

function onreturn(){
  router.back();
}
function oncheckclassmember( user:string,class_name :string){
  router.push({path:'/createcheckclassmember', query:{ user,class_name,identites:'CREATE'}});
}


</script>



<template>
  <div class="static mt-2 ">
    <ArrowLeft class="float-left ml-2 mt-1" @click="onreturn" />
   
      <div class="grid grid-cols-6 gap-4">
        <span  class="  text-center text-2xl col-start-2 col-span-4  font-bold">{{classname}}</span> 
      </div>
    
        <div class="grid grid-cols-4 gap-2 mt-2 ml-5">
          <div>班级简介</div>
          <div>
            {{classbrief}}</div>
        </div>

        <div class="grid grid-cols-4 gap-2 mt-2 ml-5">
          <div>邀请码</div>
          <div>{{userinvitecode}}</div>
        </div>
        <div class="grid grid-cols-4 gap-2 mt-2 ml-5 relative">
          <div>班级成员</div>
          <ArrowRight class="absolute right-8" @click="oncheckclassmember(userinvitecode,classname)"/>
        </div>
     
    
      
      


  </div>
</template>