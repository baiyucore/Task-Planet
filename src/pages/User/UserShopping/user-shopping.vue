<script setup lang="ts">
import { Gift } from 'lucide-vue-next';
import { Accordion, AccordionItem} from '@/components/ui/accordion'
import { toast } from 'vue-sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { ShoppingBag } from 'lucide-vue-next';
import { DollarSign } from 'lucide-vue-next';
import { userapi } from '@/pages/Api/UserIndex';
import { Userinfor } from '@/store/user';
import { UserBuyShopping, UserCoinChange  } from '@/pages/Interface/UserInterface';
import { useMutation,useQuery } from '@tanstack/vue-query'


const userinfor = Userinfor()
const coin = userinfor.coin
const createid = userinfor.classcreate

const { isError, data, error,} =useQuery({
    queryKey: ['usershopping', createid],
    queryFn : () => userapi.viewshopping(createid)
  })

  //改变数据库中用户的金币
  const usercoinmutation = useMutation({
  mutationFn: async (params:  UserCoinChange) => {
    const response = await userapi.CoinChange(params)
    return response
  },
  onSuccess:(res)=>{
    if( res.err_code !== 0 ){
      toast.error( res.err_msg )
    } 
  },  
  onError: (error) => {
    toast.error(error.message)
  },
})
//改变商品库存
const shoppingstoremutation = useMutation({
  mutationFn: async (params:  UserBuyShopping) => {
    const response = await userapi.BuyShopping(params)
    return response
  },
  onSuccess:(res)=>{
    if( res.err_code === 0 ){
      toast.success("购买成功")
      window.location.reload();
    } else{
        toast.error(res.err_msg)
      }
  },  
  onError: (error) => {
    toast.error(error.message)
  },
})


function BuyShopping(shoppingvalue : number,totalnumber : number){
  if(totalnumber==0 || totalnumber<0){
    toast.error("总兑换次数不足，无法购买。")
    return ;
  }
  if(coin<0){
    toast.error("金币为负数无法购买")
    return ;
  }else if(shoppingvalue>coin){
    toast.error("金币不足无法购买")
    return ;
  }else if(coin>= shoppingvalue){
    usercoinmutation.mutate({
      coin :coin-shoppingvalue,
      userid: userinfor.userid,
    })
    userinfor.coinchange(coin-shoppingvalue)

    shoppingstoremutation.mutate({
      createid : userinfor.classcreate,
      totalnumber : totalnumber-1,
    })

  }
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type, @typescript-eslint/no-explicit-any
function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
  // eslint-disable-next-line no-undef
  let timer: NodeJS.Timeout;
  return function(this: unknown, ...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() =>{
       func.apply(this, args);
      }, delay);
  };
}
const debouncebuyshopping = debounce(BuyShopping,1000);
</script>

<template>
  <div class="static mt-2">
      <div class="flex">
        <div class="flex-none w-14"></div>
        <div class=" text-center  font-bold text-2xl  flex-auto w-64 ">
          商城
        </div>
        <div  class="flex-none w-14 mr-4 text-center content-center ">
          <DollarSign  class=" ml-4"/>{{coin}}
         </div>
      </div>


      <div class="main-content">

        <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
      <span v-else-if="data">

      
        <Accordion type="single" class="w-full " collapsible >
          <AccordionItem v-for="item in data.shopping"  :value="item.productname" :key="item._id">

            <div class="text-xl flex" >
              <div class="flex-none w-14 text-[#FF7710] text-center  ">
                <Gift class="size-14 " color="#FF7710"/>{{ item.productname }} 
              </div>  
              <div class="flex-auto w-64 text-center mt-6">
                价格:{{ item.productprice }} 总兑换次数:{{item.totalnumber}}
              </div>
              <div class="flex-none w-14 text-center " >
             
                <AlertDialog>
                  <AlertDialogTrigger as-child>
                    <Button variant="outline"  >
                      <ShoppingBag  class="size-14 " /> 购买
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>你确定购买?</AlertDialogTitle>
                      <AlertDialogDescription>
                        金币不足时无法购买
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>取消</AlertDialogCancel>
                      <AlertDialogAction @click="debouncebuyshopping(item.productprice,item.totalnumber)">确定</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
              </AlertDialog>
               
              </div>          
            </div>                  
          </AccordionItem>
        </Accordion>
      </span>
        
    </div>



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