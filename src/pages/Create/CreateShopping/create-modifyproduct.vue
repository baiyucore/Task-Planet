<template>
  <div class=" mt-2">  
    <form @submit="onSubmit">
      <div class="flex border-4 border-transparent border-b-slate-950  justify-between">
        <ArrowLeft class="mt-2 ml-2 cursor-pointer" @click="onreturn" />
        <span  class="  cursor-default text-2xl  font-bold">修改商品</span> 
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
            placeholder="{{ produtname }}"
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
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft ,Check } from 'lucide-vue-next';
import {  ref } from 'vue'
import { Button } from '@/components/ui/button'
import { createapi } from '@/pages/Api/CreateIndex';
import { Createmodifyproduct } from '@/pages/Interface/CreateInterface';
import {useMutation} from '@tanstack/vue-query'
import { Input } from "@/components/ui/input";

const router = useRouter();
const tranport = useRoute();
const isLoading = ref(false);
const productname = ref("");
const productprice = ref(0);
const totalnumber = ref(0);
const product_name = tranport.query.productname as string 
productname.value = product_name

const mutation= useMutation({
  mutationFn: async (params: Createmodifyproduct) => {
    const response = await  createapi.modifyproduct(params)
    return response
  },
  onMutate:()=>{
    isLoading.value = true
  },
  onSuccess:(res)=>{
    isLoading.value= true;
    if( res.err_code === 0 ){
      toast.success("修改成功")
      router.push({path:"/usershopping"})

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
    product_name : product_name,
    productname : productname.value,
    productprice: productprice.value,
    totalnumber: totalnumber.value,
    })
}
function onreturn(){
  router.back();
}


</script>