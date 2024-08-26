<template>
  <div class="flex h-12  justify-center  bg-[#0369a1]">
    <span  class=" text-2xl content-center text-slate-100 font-bold ">商城</span> 
  </div>
  <div class="main-content ">
        <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
      <span v-else-if="data">
        <Accordion type="single" class="w-full  " collapsible  orientation="horizontal">
          
          <AccordionItem v-for="item in data.shopping"  :value="item._id" :key="item._id">
           
            <AccordionTrigger class="text-xl ml-2">
               <div class="flex-initial text-[#0ea5e9]"><Gift class="size-10 " color="#0ea5e9"/>{{ item.productname }} </div>  
               价格:{{ item.productprice }} 总兑换次数:{{item.totalnumber}}
            </AccordionTrigger>
            
              <AccordionContent>
                <div class=" flex justify-center gap-4">
              <Button class="bg-sky-400 hover:bg-cyan-600" @click="ModifyProduct(item.productname)">修改</Button>
              <Button class="bg-rose-700 hover:bg-rose-800" @click="Remove(item.productname) ">下架</Button>
            </div>
            </AccordionContent>
           
           
          </AccordionItem>
  
        </Accordion>
      
      </span>
  </div>

    <Plus class="absolute bottom-24 right-8 w-14 h-14 cursor-pointer " @click="$router.push({ path:'/addproduct'})" color="#0ea5e9"/>

 
  
</template>

<script setup lang="ts">
import {  useRouter} from 'vue-router';
import { Plus } from 'lucide-vue-next';
import { Button } from '@/components/ui/button'
import { createapi } from '@/pages/Api/CreateIndex';
import { Gift } from 'lucide-vue-next';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Createid, CreateRemove } from '@/pages/Interface/CreateInterface';
import { toast } from 'vue-sonner';
import { UseCreateStore } from '@/store/create';
import { useQuery,useMutation } from '@tanstack/vue-query'


const createinfor = UseCreateStore()
const router= useRouter();
  const params : Createid={
    account_id: createinfor.createid
  }
const { isError, data, error,} =useQuery({
    queryKey: ['createcheckclass', params],
    queryFn : () =>  createapi.viewproduct(params)
  })

const mutation= useMutation({
  mutationFn: async (params: CreateRemove) => {
    const response = await createapi.removeproduct(params)
    return response
  },
  onSuccess:(res)=>{
    if( res.err_code === 0 ){
      toast.success("删除成功")
      window.location.reload();
    } else{
      toast.error( res.err_msg );
    }
  },  
  onError: (error) => {
    toast.error(error.message)
  },
})


async function Remove(productname : string){
  mutation.mutate({
    proddcutname:productname
    })
}

function ModifyProduct(productname: string){
  router.push({ path:'/modifyproduct',query:{productname} });
}
</script>

<style scoped>
 
  .main-content {
      margin: 0 auto;
      border-radius: 10px;
      width: 100%;
      height: calc(90vh - 70px);
      border: 1px solid;
      border-color: transparent;
      overflow: auto;
    }
</style>