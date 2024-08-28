<template>
  <div class="flex h-12  justify-between  bg-gray-600" >
    <span  class=" ml-4 text-2xl content-center text-slate-100 font-bold">任务</span> 
    
    <div class=" content-center mr-4   ">
      <Select v-model:model-value="viewtaskvalue"   >
      <SelectTrigger class="w-[150px] bg-slate-100">
        <SelectValue placeholder="任务查看" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
            <SelectItem  value="finish">
              已发布任务
            </SelectItem>
            <SelectItem value="unfinished">
               未发布任务
            </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
  </div>
  
  <div class="main-content">
        <RouterView></RouterView>
        
   </div>


  
</template>
<script setup lang="ts">
import { ref , watch , onBeforeMount} from 'vue';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {  useRouter} from 'vue-router';

const router= useRouter();
const viewtaskvalue= ref('finish');
watch(viewtaskvalue,(newValue)=>{

  switch(newValue){
    case 'finish':
    router.push({ path:"/createtaskfinsh" });
      break;
    case 'unfinished':
    router.push({ path:"/createtaskunfinshed" });
      break;
    default:
      break;
  }
})

onBeforeMount(()=>{
  router.push({ path:"/createtaskfinsh" });
  })
</script>


<style scoped>
 
  .main-content {
      margin: 0 auto;
      margin-top: 30px;
      border-radius: 10px;
      width: 100%;
      height: calc(90vh - 70px);
      border: 1px solid;
      border-color: transparent;
      overflow: auto;
    }
</style>