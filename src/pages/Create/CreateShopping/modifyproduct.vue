<script setup lang="ts">
import { toast } from 'vue-sonner';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft ,Check } from 'lucide-vue-next';
import {  ref } from 'vue'
import { Button } from '@/components/ui/button'
import { createapi } from '@/pages/Api/CreateIndex';
import { Createmodifyproduct } from '@/pages/Interface/CreateInterface';

const router = useRouter();
const tranport = useRoute();
const isLoading = ref(false);
const productname = ref("");
const productprice = ref(0);
const totalnumber = ref(0);
const product_name = tranport.query.productname as string 


async function onSubmit(event:Event) {
  event.preventDefault();
  isLoading.value= true;
  const params :Createmodifyproduct = {
    product_name : product_name,
    productname : productname.value,
    productprice: productprice.value,
    totalnumber: totalnumber.value,
  }
  createapi.modifyproduct(params).then((res)=>{
    if(res.err_code === 0){
      toast.success("修改成功")
      setTimeout(()=>router.push({path:"/usershopping"}))
    }else {
      toast.error( res.err_msg );
    }
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
      <span  class="  ml-2 text-2xl  font-bold">修改商品</span> 
      <Button variant="outline" :disabled="isLoading"  class="float-right mr-5   border-transparent">
      <Check   /> 
      </Button>
   
      <div class="ml-2">
        <span class="pr-6  "> 商品名称</span>
        <input  
          class="mt-5 "
          v-model="productname"
          type="text"
          placeholder="商品名称"
          :disable="isLoading"
        />
      </div>
      <div class="ml-2">
        <span class="pr-6"> 所需金币</span>
        <input  
          class="mt-5 "
          v-model="productprice"
          type="number"
          placeholder="所需金币"
          :disable="isLoading"
        />
      </div>
      <div class="ml-2">
        <span class="pr-1"> 总兑换次数</span>         
        <input  
          class="mt-5 "
          v-model="totalnumber"
          type="number"
          placeholder=" 总兑换次数"
          :disable="isLoading"
        />
      </div>
    
      
      
     
    </form>

  </div>
</template>