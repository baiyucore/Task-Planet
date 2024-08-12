<script setup lang="ts">
import {  useRouter} from 'vue-router';
import { CirclePlus } from 'lucide-vue-next';
import { Button } from '@/components/ui/button'
import { createapi } from '@/pages/Api/CreateIndex';
import { Gift } from 'lucide-vue-next';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Createid, CreateRemove } from '@/pages/Interface/CreateInterface';
import { toast } from 'vue-sonner';
import { Createinfor } from '@/store/create';
import { useQuery,useMutation } from '@tanstack/vue-query'


const createinfor = Createinfor()
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

<template>
  <div class="static mt-2">
    <h2  class=" text-center  font-bold text-2xl ">商城</h2> 
      <div class="main-content">

        <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
      <span v-else-if="data">
        <Accordion type="single" class="w-full " collapsible >
          <AccordionItem v-for="item in data.shopping"  :value="item._id" :key="item._id">
            
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
      
      </span>

    </div>
    <CirclePlus class="absolute bottom-20 right-5 w-1/6 h-1/6 " @click="$router.push({ path:'/addproduct'})" color="#ff0000"/>

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