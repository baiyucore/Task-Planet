<script setup lang="ts">
import { CirclePlus } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

import { createapi } from '@/pages/Api/CreateIndex';
import { Createinfor } from '@/store/create';
import { onMounted ,ref} from 'vue';
import {  CreateClass,  Createid } from '@/pages/Interface/CreateInterface';
import { toast } from 'vue-sonner';


const router= useRouter();
const createinfor = Createinfor()

const isLoading = ref(false)
const classname = ref<CreateClass[]>([])

const params: Createid= {account_id: createinfor.createid}
onMounted(()=>{
  isLoading.value=true
  

  createapi.viewoverclass(params).then((res)=>{
    isLoading.value=false
    if( res.err_code === 0 ){
      classname.value=res.existed
    }else{
      toast.error(res.err_msg)
    }
  })

})


function CreateAddtask(){
  router.push({ path: '/createaddtask' });
}

function viewtask(classname:string){
  router.push({ path: '/createpublictaskone' ,query:{classname:classname }});
}

</script>
<template>

  <div>
    <div >
      <CirclePlus class="absolute bottom-20 right-5 w-1/6 h-1/6 " @click="CreateAddtask" color="#ff0000"/>
    </div>
    <h1 @click="viewtask(classnameview.classname)" v-for="classnameview in classname" :key="classnameview._id"  class="text-center select-none text-2xl mb-2">
          {{classnameview.classname }}
        </h1>
          
  </div>

</template>
