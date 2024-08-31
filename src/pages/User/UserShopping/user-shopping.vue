<template>
  <div class="flex h-12  justify-center relatice bg-gray-600">
    <span  class=" text-2xl content-center text-slate-100 font-bold ">商城</span> 
      <div  class="flex absolute top-3 right-6 items-center ">
        <DollarSign  class=" static"/>
        <div  class="">
          
          {{coin}}
        </div>
       
    </div>
   
  </div>

      <div class="main-content">

        <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
      <span v-else-if="data">

        <div class="flex flex-wrap justify-around">
    <AlertDialog v-for="item in data.shopping"  :value="item._id" :key="item._id">
        <AlertDialogTrigger as-child>
          <Button variant="outline"  >
            <Card   class="relative w-[180px] m-4 ">  
              <CardHeader>
                <CardTitle >
                        <div class="flex justify-center ">
                          <Gift  color="#FF7710"/>
                          <div class="mt-1.5">
                            {{ item.productname }} 
                          </div>
                        </div>
                  </CardTitle>  
              
              </CardHeader> 
              <CardContent >
                  <div class="flex flex-col">
                    <div>
                      价格:{{ item.productprice }} 
                    </div>
                    <div>
                      总兑换数:{{item.totalnumber}} 
                    </div>
                  </div>
              
            </CardContent>    
            </Card>
        
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>你确定购买{{item.productname}}商品?</AlertDialogTitle>
            <AlertDialogDescription>
              金币不足时无法购买
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter >
            <AlertDialogCancel >取消</AlertDialogCancel>
            <AlertDialogAction  :disabled="item.totalnumber === 0" @click="debouncebuyshopping(item.productprice,item.productid,)">确定</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
        </div>
      </span>
        
    </div>





  


  
</template>

<script setup lang="ts">
import { Gift } from 'lucide-vue-next';
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
import { DollarSign } from 'lucide-vue-next';
import { userapi } from '@/pages/Api/UserIndex';
import { Userinfor } from '@/store/user';
import { UserBuyShopping, UserCoinChange  } from '@/pages/Interface/UserInterface';
import { useMutation,useQuery } from '@tanstack/vue-query'
import { format } from 'date-fns';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'

const userinfor = Userinfor()
const coin = userinfor.coin
const createid = userinfor.classcreateid
const now = new Date();

const time = format(now,'yyyy-MM-dd HH:mm:ss')


const { isError, data, error,refetch} =useQuery({
    queryKey: ['usershopping', createid],
    queryFn : () => userapi.viewshopping(createid)
  })

  //改变数据库中用户的金币
  const usercoinmutation = useMutation({
  mutationFn: async (params:  UserCoinChange) => {
    const response = await userapi.CoinChange(params)
    return response
  },
  onSuccess:()=>{
    
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
      refetch()
    } else{
        toast.error(res.err_msg)
      }
  },  
  onError: (error) => {
    toast.error(error.message)
  },
})


function BuyShopping(shoppingvalue : number,productid : string){
 
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
      createid : userinfor.classcreateid,
      userid: userinfor.userid,
      productid:productid,
      time : time,
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
const debouncebuyshopping = debounce(BuyShopping,100);
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