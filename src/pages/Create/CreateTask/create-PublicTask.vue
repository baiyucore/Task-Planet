<script setup lang="ts">
import { toast } from 'vue-sonner';
import { useRouter,useRoute } from 'vue-router';
import { ArrowLeft  } from 'lucide-vue-next';
import {  onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { createapi } from '@/pages/Api/CreateIndex';
import { Createinfor } from '@/store/create';
import { Createid ,CreateClass,Createpublictask} from '@/pages/Interface/CreateInterface';



const createinfor = Createinfor()
const router = useRouter();
const isLoading = ref(false);
const class_name = ref("");
const route = useRoute();
const taskid =route.query.taskid as string

const checkclass = ref([]);

const classname = ref<CreateClass[]>([])



async function onSubmit(event:Event) {
  event.preventDefault();
  isLoading.value= true;
  const params : Createpublictask ={
    creatateid:createinfor.createid,
    taskid: taskid,
    checkclass : checkclass.value,
  }
  console.log(checkclass.value)
  createapi.taskpublictask(params).then((res)=>{
    isLoading.value = false;
    if( res.err_code === 0 ){
      toast.success("发布成功");
      router.back();
    } else{
      toast.error( res.err_msg );
    }
  })


 
  
}

onMounted(()=>{
  isLoading.value=true
  const params: Createid= {account_id: createinfor.createid}

  createapi.viewoverclass(params).then((res)=>{
    isLoading.value=false
    if( res.err_code === 0 ){
      classname.value=res.existed
    }else{
      toast.error(res.err_msg)
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
    <span  class="   text-2xl  font-bold">选择班级</span> 
   
    <form @submit="onSubmit">
      
     <div v-for="(item,index) in classname"  :key="index">
   
      <input  
        class="mt-5"
        v-model="checkclass"
        :value="item.classname"
        type="checkbox"
       
        :disable="isLoading"
      />{{item.classname}}
     </div>
     <Button  :disabled="isLoading"  class="w-full mt-3 bg-teal-500  ">
      确定
     </Button>
     
      
      <br>

   
    
    
      

    
        
    </form>

  </div>
</template>