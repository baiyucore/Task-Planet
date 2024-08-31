<template>
  <div class="mt-2">

    <form @submit="onSubmit">
      <div class="flex border-4 border-transparent border-b-slate-950  justify-between">
        <ArrowLeft class="mt-1 ml-2 cursor-pointer" @click="onreturn" />
        <span  class=" cursor-default text-2xl  font-bold">修改个人信息</span> 
        <Button variant="outline" :disabled="isLoading"  class="mr-1  hover:bg-transparent shadow-transparent border-transparent">
      <Check   /> 
      </Button>

      </div>
    

      <div class="flex flex-col  ">
     
        <div class="flex justify-center mt-3">
          <div class="mr-3 mt-1.5">用户名称 </div> 
          
        <Input  
          v-model:model-value="create_name"
          type="text "
          placeholder="{{create_name}}"
          :disable="isLoading"
          class="  w-8/12 text-2xl  font-bold placeholder:text-center"
          />
      </div>


      <div class="flex mt-3 justify-center">
        <div class="mr-11 mt-1.5">性别 </div> 
        <Select v-model:model-value="create_sex">
              <SelectTrigger class="w-8/12">
                <SelectValue placeholder="性别" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="男">
                    男
                  </SelectItem>
                  <SelectItem value="女">
                    女
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
      </div>

      <div class="flex justify-center mt-3">
        <div class="mr-3 mt-1.5"> 个人评语</div>
        <Textarea 
          class="w-8/12 "
          v-model="create_profile"
          type="text"
          placeholder="个人评语"
          :disable="isLoading"
        />
      </div>

      </div>
      
       
    
      
    
      
      
     
    </form>

  </div>

</template>

<script setup lang="ts">
import { ArrowLeft ,Check } from 'lucide-vue-next';
import {ref} from 'vue'
import {  useRouter} from 'vue-router';
import { toast } from 'vue-sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createapi } from '@/pages/Api/CreateIndex';
import { Createreviseoneself } from '@/pages/Interface/CreateInterface';
import { UseCreateStore} from '@/store/create';
import { Userinfor } from '@/store/user';
import {useMutation} from '@tanstack/vue-query'
import {
  Select,SelectContent,SelectGroup,SelectItem,SelectTrigger,SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'


const createinfor = UseCreateStore()
const router = useRouter();
const create_name=ref("");
create_name.value = createinfor.createname
const create_sex = ref("");
const create_profile = ref("");
const isLoading = ref(false);
const mutation= useMutation({
  mutationFn: async (params: Createreviseoneself) => {
    const response = await   createapi.reviseoneself(params)
    return response
  },
  onMutate:()=>{
    isLoading.value = true
  },
  onSuccess:()=>{
    isLoading.value= true;
   
      Userinfor().transmitname(create_name.value)
      toast.success("修改成功");
      router.push({ path:"/createoneself" });

  },  
  onError: (error) => {
    isLoading.value = false
    toast.error(error.message)
  },
  onSettled: () => {
    isLoading.value = false
  },

})

async function onSubmit(event:Event) {
  event.preventDefault();
  isLoading.value = true;
  mutation.mutate({
    account_id: createinfor.createid,
    create_name: create_name.value,
    create_sex: create_sex.value,
    create_profile: create_profile.value,
    createstartname:createinfor.createname,
    })


}
function onreturn(){
  router.back();
}

</script>
