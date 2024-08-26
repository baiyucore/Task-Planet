<script setup lang="ts">
import {  useRouter} from 'vue-router';
import { toast } from 'vue-sonner';
import { Plus } from 'lucide-vue-next';
import { createapi } from '@/pages/Api/CreateIndex';
import { Createid  } from'@/pages/Interface/CreateInterface';
import { UseCreateStore } from '@/store/create';
import { useQuery } from '@tanstack/vue-query'
import { MessageSquareDot } from 'lucide-vue-next';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const createinfor = UseCreateStore()
const router = useRouter();
const params: Createid= {account_id: createinfor.createid}

const { isError, data, error,} =useQuery({
    queryKey: ['craeteviewoneself', params],
    queryFn : () =>   createapi.viewoverclass(params)
  })


function CheckClass(id : string){
   router.push({ path:'/createcheckclass', query:{id} });
}
function requestjoin(){
  router.push({ path:'/createrequestjoin' })
}
</script>

<template>
  <div class="flex h-12  justify-between  bg-gray-600">
    <span  class="  ml-4 cursor-default text-2xl content-center text-slate-100 font-bold">班级</span> 
    <div class=" content-center mr-4 cursor-pointer " @click="requestjoin">
      <MessageSquareDot  class="size-8"  color="#f1f5f9"/>
    </div>
  </div>

 
  <div class="main-content overflow-auto">
   
    <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
    <span v-else-if="data"  class="overflow-auto">
      <Card @click="CheckClass(classnameview.userinvitecode)" v-for="classnameview in data.existed" :key="classnameview._id" class="mb-3 cursor-pointer">
      <CardHeader>
        <CardTitle>{{classnameview.classname }}</CardTitle>
        <CardDescription> 成员数:{{ classnameview.studentnumber }} </CardDescription>
      </CardHeader>    
    </Card>
    </span>
    
  </div>

  <Plus class="absolute bottom-24 right-8 w-14 h-14 cursor-pointer " @click="$router.push({ path:'/addclass'})" />

  


  
</template>
<style scoped>
  .main-content {
      margin: 0 auto;
      margin-top: 30px;
      border-radius: 10px;
      width: 90%;
      height: calc(90vh - 70px);
      border: 1px solid;
      border-color: transparent;
    }
</style>