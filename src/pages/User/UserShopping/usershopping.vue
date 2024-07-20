<script setup lang="ts">
import {  useRouter} from 'vue-router';
import { createapi } from '@/pages/Api/CreateIndex';
import { Gift } from 'lucide-vue-next';
import { Accordion, AccordionItem} from '@/components/ui/accordion'
import { onMounted ,ref} from 'vue';
import { CreateAddproduct, CreateRemove } from '@/pages/Interface/CreateInterface';
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
import { Createinfor } from '@/store/create';
import { ShoppingBag } from 'lucide-vue-next';
import { DollarSign } from 'lucide-vue-next';
import { userapi } from '@/pages/Api/UserIndex';
import { Userinfor } from '@/store/user';
import { UserBuyShopping, UserCoinChange, Userid } from '@/pages/Interface/UserInterface';

const createinfor = Createinfor()


const router= useRouter();
const isLoading = ref(false)
const shopping  = ref<CreateAddproduct[]>([])
const userinfor = Userinfor()
const coin = userinfor.coin
const createid = userinfor.classcreate
onMounted(()=>{
  isLoading.value = true

 
  userapi.viewshopping(createid).then((res)=>{
    isLoading.value = false
    if( res.err_code === 0 ){
      shopping.value = res.shopping
    }else{
      toast.error(res.err_msg)
    }
  })

 
})

function BuyShopping(shoppingvalue : number,totalnumber : number){
  if(totalnumber==0 || totalnumber<0){
    toast.error("总兑换次数不足，无法购买。")
    return ;
  }
  if(coin<0){
    toast.error("金币为负数无法购买")
  }else if(shoppingvalue>coin){
    toast.error("金币不足无法购买")
  }else if(coin>= shoppingvalue){
    isLoading.value = true
    const params : UserCoinChange={
      coin :coin-shoppingvalue,
      userid: userinfor.userid,
    }
    userapi.CoinChange(params)
    userinfor.coinchange(coin-shoppingvalue)
    const param : UserBuyShopping={
      createid : userinfor.classcreate,
      totalnumber : totalnumber-1,
    }
    userapi.BuyShopping(param).then((res)=>{
      if(res.err_code === 0 ){
        toast.success("购买成功")
        isLoading.value = false
        window.location.reload();
      }else{
        toast.error(res.err_msg)
      }
    })

  }
}

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
        <Accordion type="single" class="w-full " collapsible >
          <AccordionItem v-for="item in shopping"  :value="item.productname">

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
                      <AlertDialogAction @click="BuyShopping(item.productprice,item.totalnumber)">确定</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
              </AlertDialog>
               
              </div>          
            </div>                  
          </AccordionItem>
        </Accordion>

        
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