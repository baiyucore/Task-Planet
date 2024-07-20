<script setup lang="ts">
import {  useRouter} from 'vue-router';
import { CirclePlus } from 'lucide-vue-next';
import { Button } from '@/components/ui/button'
import { createapi } from '@/pages/Api/CreateIndex';
import { Gift } from 'lucide-vue-next';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { onMounted ,ref} from 'vue';
import { CreateAddproduct, Createid, CreateRemove } from '@/pages/Interface/CreateInterface';
import { toast } from 'vue-sonner';

import { Createinfor } from '@/store/create';


const createinfor = Createinfor()


const router= useRouter();
const isLoading = ref(false)
const shopping  = ref<CreateAddproduct[]>([])
onMounted(()=>{
  isLoading.value = true
  const params : Createid={
    account_id: createinfor.createid
  }
  createapi.viewproduct(params).then((res)=>{
    isLoading.value = false
    if( res.err_code === 0 ){
      shopping.value = res.shopping
    }else{
      toast.error(res.err_msg)
    }
  })
})

function AddProduct(){
  router.push({ path:'/addproduct'});

}
function ModifyProduct(productname: string){
  router.push({ path:'/modifyproduct',query:{productname} });
}

function Remove(productname : string){

  isLoading.value= true
  const params : CreateRemove={
    proddcutname:productname
  }
  
  createapi.removeproduct(params).then((res)=>{
    if( res.err_code === 0 ){
      toast.success("删除成功")
      
      window.location.reload();
    }else{
      toast.error(res.err_msg)
    }
  })
}

</script>

<template>
  <div class="static mt-2">
    <h2  class=" text-center  font-bold text-2xl ">商城</h2> 
      <div class="main-content">
        <Accordion type="single" class="w-full " collapsible >
          <AccordionItem v-for="item in shopping"  :value="item.productname">
            
            <AccordionTrigger class="text-xl">
               <div class="flex-initial text-[#FF7710]"><Gift class="size-14 " color="#FF7710"/>{{ item.productname }} </div>  
               价格:{{ item.productprice }} 总兑换次数:{{item.totalnumber}}
            </AccordionTrigger>
            <AccordionContent>
    
              <Button class="bg-sky-400 hover:bg-cyan-600" @click="ModifyProduct(item.productname)">修改</Button>
              <Button class="bg-rose-700 hover:bg-rose-800" @click="Remove(item.productname) ">下架</Button>
              
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      

    

    </div>
    <CirclePlus class="absolute bottom-20 right-5 w-1/6 h-1/6 " @click="AddProduct" color="#ff0000"/>


  </div>

  


  
</template>
<style scoped>
 
  .main-content {
      margin: 0 auto;
      border-radius: 10px;
      width: 90%;
      height: 650px;
      border: 1px solid;
      border-color: transparent;
    }
</style>