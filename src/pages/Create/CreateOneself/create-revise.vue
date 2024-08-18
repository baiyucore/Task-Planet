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
  onSuccess:(res)=>{
    isLoading.value= true;
    if( res.err_code === 0 ){
      Userinfor().transmitname(create_name.value)
      toast.success("修改成功");
      router.push({ path:"/createoneself" });

    } else{
      toast.error( res.err_msg );
    }
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

<template>
  <div class="static mt-2">
    <ArrowLeft class="float-left ml-2 mt-1" @click="onreturn" />
    <form @submit="onSubmit">
      <Button variant="outline" :disabled="isLoading"  class="float-right mr-5 mb-2  border-transparent">
      <Check   /> 
      </Button>
      <div class="ml-2 ">
        <Input  
          v-model:model-value="create_name"
          type="text "
          placeholder="{{create_name}}"
        
          :disable="isLoading"
          class="   text-2xl  font-bold placeholder:text-center"
          />
      </div>
       
      <div class="ml-2">
        <Select v-model:model-value="create_sex">
              <SelectTrigger class="w-[400px]">
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
      <div class="ml-2">
        <span class="pr-6"> 个人评语</span>
        <input  
          class="mt-5 "
          v-model="create_profile"
          type="text"
          placeholder="个人评语"
          :disable="isLoading"
        />
      </div>
    
      
      
     
    </form>

  </div>

</template>