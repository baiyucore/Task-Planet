<template>
  <div class="flex h-12  justify-center  bg-gray-600">
    <span  class=" text-2xl content-center text-slate-100 font-bold ">商城</span> 
  </div>
  <div class="main-content ">
  

        <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
      <span v-else-if="data">
        <div class="flex flex-wrap gap-2 justify-around">
        
        <Menubar  v-for="item in data.shopping"  :value="item._id" :key="item._id" class=" h-[155px]" >
          <MenubarMenu>
            <MenubarTrigger class="cursor-pointer text-xl">


              <Card class="w-[150px] border-transparent shadow-transparent">
                <CardHeader>
                  <CardTitle>  {{ item.productname }}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div class="flex flex-col">
                  <div>
                    价格:{{ item.productprice }} 
                  </div>
                  <div>
                    兑换数:{{item.totalnumber}} 
                  </div>
                  </div>
                </CardContent>

              </Card>

         
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem  @click="ModifyProduct(item.productname)">
                修改
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem  @click="Remove(item.productname) ">下架</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
      </Menubar>
    


      </div> 
      </span>
  </div>
    <Plus class="absolute bottom-24 right-8 w-14 h-14 cursor-pointer " @click="$router.push({ path:'/addproduct'})" />

</template>

<script setup lang="ts">
import {  useRouter} from 'vue-router';
import { Plus } from 'lucide-vue-next';
import { createapi } from '@/pages/Api/CreateIndex';
import { Createid, CreateRemove } from '@/pages/Interface/CreateInterface';
import { toast } from 'vue-sonner';
import { UseCreateStore } from '@/store/create';
import { useQuery,useMutation } from '@tanstack/vue-query'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,

  MenubarTrigger,
} from '@/components/ui/menubar'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'



const createinfor = UseCreateStore()
const router= useRouter();
  const params : Createid={
    account_id: createinfor.createid
  }
const { isError, data, error,refetch} =useQuery({
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
     refetch()
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