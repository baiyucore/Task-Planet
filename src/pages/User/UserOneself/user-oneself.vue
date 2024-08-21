<script setup lang="ts">
import { Wrench } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import { useRouter} from 'vue-router';
import { Userinfor } from '@/store/user';
import { coinrecord, Userid } from '@/pages/Interface/UserInterface';
import { userapi } from '@/pages/Api/UserIndex';
import { useMutation,useQuery } from '@tanstack/vue-query'
import {
  Dialog,
  DialogContent,

  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ref } from 'vue';
const router= useRouter();
const userinfor = Userinfor()
const viewcoinrecord = ref<coinrecord[]>([])
const params : Userid={ userid :userinfor.userid }
const { isError, data, error,} =useQuery({
    queryKey: ['craetepublictask', params],
    queryFn : () => userapi.viewoneself(params)
  })

function revise(){
  router.push({ path:'/userrevise'})
}

const mutation = useMutation({
  mutationFn: async ( params:{userid:string}) => {
    const response = await userapi.viewCoinRecord(params)
    return response
  },
  onSuccess:(res)=>{
    if( res.err_code === 0 ){
      viewcoinrecord.value = res.coinrecord
    } 
  },  
  onError: (error) => {
    toast.error(error.message)
  },
})
function viewCoinRecord(){
  mutation.mutate({
    userid:Userinfor().userid
  })
}


</script>

<template>
  <div class="static mt-2">
    <span  class=" ml-10  text-2xl  font-bold select-none">个人信息</span> 
  <div @click="revise">
    <Wrench class="w-[100px] absolute top-2 right-0 size-8 " />
    <div class=" text-right mr-9 select-none "   >修改</div>
  </div>
 
      <div class="main-content">
        
        <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
        <span v-else-if="data">
        <h1 class="text-center text-2xl">{{ data.username}}</h1>

        <div class="grid grid-cols-4 gap-2 mt-2">
          <div>性别 </div>
          <div>
            {{data.usersex}}</div>
        </div>

        <div class="grid grid-cols-4 gap-2 mt-2">
          <div>个人评语</div>
          <div>{{data.userprofile}}</div>
        </div>
        <div class="grid grid-cols-4 gap-2 mt-2">
          <div>所获得的金币</div>
          <div>{{data.coin}}</div>
        <Dialog >
            <DialogTrigger as-child>
              <Button @click="viewCoinRecord" variant="outline">
              
                点击查看
              </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>记录</DialogTitle>
              </DialogHeader>
            
                <div v-for="items in viewcoinrecord" :key="items._id">
                  {{ items.time }} 花费 {{ items.productprice }} 金币,购买了{{ items.productname }}
                </div>
                
                <DialogFooter>
                    </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        </span>
      
          
      </div>
  
  </div>

</template>
<style scoped>
  .main-content {
      margin: 0 auto;
      margin-top: 30px;
      border-radius: 10px;
      width: 90%;
      height: 650px;
      border: 1px solid;
      border-color: transparent;
    }
</style>