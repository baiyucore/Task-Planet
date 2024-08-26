<template>

  <div>
    <div >
      <Plus class="absolute bottom-24 right-8 w-14 h-14 cursor-pointer" color="#1e1b4b" @click="CreateAddtask" />
    </div>
    <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
    <span v-else-if="data"  class="overflow-auto">

    <Card @click="viewtask(classnameview.classname)" v-for="classnameview in data.existed" :key="classnameview._id" class="mb-3 cursor-pointer">
      <CardHeader>
        <CardTitle>{{classnameview.classname }}</CardTitle>
        <CardDescription> 成员数:{{ classnameview.studentnumber }} </CardDescription>
      </CardHeader>
     
    </Card>


    </span>
    
          
  </div>

</template>
<script setup lang="ts">
import { Plus} from 'lucide-vue-next';
import { useRouter } from 'vue-router';

import { createapi } from '@/pages/Api/CreateIndex';
import { UseCreateStore } from '@/store/create';
import {  Createid } from '@/pages/Interface/CreateInterface';
import { toast } from 'vue-sonner';
import { useQuery } from '@tanstack/vue-query'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
const router= useRouter();
const createinfor = UseCreateStore()

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