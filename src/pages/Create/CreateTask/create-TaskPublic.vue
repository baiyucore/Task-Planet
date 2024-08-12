<script setup lang="ts">
import { Plus} from 'lucide-vue-next';
import { useRouter } from 'vue-router';

import { createapi } from '@/pages/Api/CreateIndex';
import { Createinfor } from '@/store/create';
import {  Createid } from '@/pages/Interface/CreateInterface';
import { toast } from 'vue-sonner';
import { useQuery } from '@tanstack/vue-query'

const router= useRouter();
const createinfor = Createinfor()



const params: Createid= {account_id: createinfor.createid}
const {  isError, data, error,} =useQuery({
    queryKey: ['create-viewcreateclass', params],
    queryFn : () =>  createapi.viewoverclass(params)

  
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
      <Plus class="absolute bottom-20 right-5 w-16 h-16 " color="#451a03" @click="CreateAddtask" />
    </div>
    <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
    <span v-else-if="data">
      <h1 @click="viewtask(classnameview.classname)" v-for="classnameview in data.existed" :key="classnameview._id"  class="text-center select-none text-2xl mb-2">
          {{classnameview.classname }}
        </h1>
    </span>
    
          
  </div>

</template>
