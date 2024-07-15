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

<template>
  <div class="static mt-2">
    <span  class=" ml-10  text-2xl  font-bold">任务</span> 
  
    <Select v-model:model-value="viewtaskvalue"  >
      <SelectTrigger class="w-[180px] absolute top-1 right-1">
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
      <div class="main-content">
        <RouterView></RouterView>
        
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