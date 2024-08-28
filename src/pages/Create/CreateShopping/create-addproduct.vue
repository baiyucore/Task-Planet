<template>
  <div class="mt-2">
    <form @submit="onSubmit">
      <div class="flex border-4 border-transparent border-b-slate-950  justify-between">
        <ArrowLeft class="mt-2 ml-2 cursor-pointer" @click="onreturn" />
        <span  class=" cursor-default text-2xl  font-bold">添加商品</span> 
      <Button variant="outline" :disabled="isLoading"  class="mr-1  hover:bg-transparent shadow-transparent border-transparent">
      <Check   /> 
      </Button>
      </div>

      <div class="flex flex-col  ">

        <div class="flex justify-center mt-3">
        <span class="mr-3 mt-1.5 "> 商品名称</span>
        <Input  
          class="w-8/12 "
          v-model="productname"
          type="text"
          placeholder="商品名称"
          :disable="isLoading"
          required
        />
      </div>
      <div class="flex justify-center mt-3">
        <span class="mr-3 mt-1.5"> 所需金币</span>
        <Input  
          class="w-8/12 "
          v-model="productprice"
          type="number"
          placeholder="所需金币"
          :disable="isLoading"
          required
        />
      </div>

      <div class="flex justify-center mt-3">
        <span class="mr-3 mt-1.5"> 总兑换数</span>         
        <Input  
          class="w-8/12 "
          v-model="totalnumber"
          type="number"
          placeholder=" 总兑换次数"
          :disable="isLoading"
          required
        />
      </div>

      </div>

     

   
    </form>

  </div>
</template>
<script setup lang="ts">
import { toast } from 'vue-sonner';
import { useRouter } from 'vue-router';
import { ArrowLeft ,Check } from 'lucide-vue-next';
import {  ref } from 'vue'
import { Button } from '@/components/ui/button'
import { createapi } from '@/pages/Api/CreateIndex';
import { CreateAddproduct } from '@/pages/Interface/CreateInterface';
import { UseCreateStore } from '@/store/create';
import {useMutation} from '@tanstack/vue-query'
import { nanoid } from 'nanoid'
import { Input } from '@/components/ui/input';

const productid =nanoid(8)
const router = useRouter();
const isLoading = ref(false);
const productname = ref("");
const productprice = ref(0);
const totalnumber = ref(0);
const createinfor = UseCreateStore()

const mutation= useMutation({
  mutationFn: async (params:  CreateAddproduct) => {
    const response = await  createapi.addproduct(params)
    return response
  },
  onMutate:()=>{
    isLoading.value = true
  },
  onSuccess:(res)=>{
    isLoading.value= true;
    if( res.err_code === 0 ){
      toast.success("添加成功");
      router.back();

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
  mutation.mutate({
    createid : createinfor.createid,
    productname : productname.value,
    productprice : productprice.value,
    totalnumber : totalnumber.value,
    productid : productid,
    })

  
}
function onreturn(){
  router.back();
}
</script>
