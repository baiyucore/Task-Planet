
<template>
  <div class="static mt-2">
    <ArrowLeft class="absolute top-3 left-0 cursor-pointer" @click="onreturn" />
   
    <div class="flex h-12 justify-center border-4 border-transparent border-b-slate-950   ">
     
     <span  class="  text-center text-2xl col-start-2 col-span-4  font-bold">{{name}}</span> 
   </div>
    

   <div class="flex flex-col  ">

        <div class="flex justify-center mt-3">
          <div class="mr-3  ">性别</div>
          <div>
            {{sex}}</div>
        </div>

        <div class="flex justify-center mt-3">
          <div class="mr-3  ">个人评语</div>
          <div>{{profile}}</div>
        </div>
      </div>
      <div class="flex justify-center mt-3 " v-if="identity !== 'create'">
          <Button  @click="removeuserclass"  type="button" class="rounded-full mt-10 w-5/12 bg-[#374151] hover:bg-[#111827]">
          移除班级
        </Button>
        </div>

  </div>


  
</template>


<script setup lang="ts">
import {  useRoute} from 'vue-router';
import { ArrowLeft } from 'lucide-vue-next';
import { useRouter} from 'vue-router';
import {useMutation } from '@tanstack/vue-query'
import { toast } from 'vue-sonner';
import { Removeclassmember } from '@/pages/Interface/CreateInterface';
import { createapi } from '@/pages/Api/CreateIndex';
import { Button } from '@/components/ui/button'
let tranport= useRoute()
const name  = tranport.query.name
const sex = tranport.query.sex
const profile = tranport.query.profile
const identity = tranport.query.identity as string
const userinvitecode = tranport.query.userinvitecode as string
const classname = tranport.query.classname as string
const userid = tranport.query.userid as string
const router = useRouter();



const mutation= useMutation({
  mutationFn: async ( params :Removeclassmember) => {
    const response = await  createapi.Removeclassmember(params)
    return response
  },
  onSuccess:(res)=>{
    if( res.err_code === 0 ){
      toast.success("删除成功")
    } else{
      toast.error( res.err_msg );
    }
  },  

})

function removeuserclass(){
  mutation.mutate({
    userid:userid,
    userinvitecode : userinvitecode,
    classname :classname
    })
}

function onreturn(){
  router.back();
}

</script>
