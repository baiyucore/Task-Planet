<template>

    <div class="flex h-12 cursor-default justify-between  bg-gray-600">
        <span  class=" ml-4 text-2xl content-center text-slate-100 font-bold">个人信息</span> 
        <div  class="content-center mr-4 cursor-pointer " @click="revise">
        <Wrench class="size-8"  color="#f1f5f9"/>
      </div>
    </div>

      <div class="main-content">
        <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
        <span v-else-if="data">

          <div class="flex flex-col">
            <div class="text-center text-2xl">{{ data.username}}</div>

            <div class="grid grid-cols-4 gap-2 mt-2">
              <div>性别 </div>
              <div>
                {{data.usersex}}</div>
            </div>
            <div class="grid grid-cols-4 gap-2 mt-2">
              <div>个人评语</div>
              <div>{{data.userprofile}}</div>
            </div> 

            <div class="flex justify-between">
          <div>现有金币: {{data.coin}}</div>
          
        <Dialog >
            <DialogTrigger as-child>
              <Button @click="viewCoinRecord" class="shadow-transparent border-transparent" variant="outline">
                点击查看
              </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>消费记录</DialogTitle>
              </DialogHeader>
            
                <div v-for="items in viewcoinrecord" :key="items._id">
                  {{ items.time }} 花费 {{ items.productprice }} 金币,购买了{{ items.productname }}
                </div>
                
                <DialogFooter>
                    </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

          </div>

        </span>
      
          
      </div>
  


</template>


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
  
      viewcoinrecord.value = res.coinrecord
 
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

<style scoped>
  .main-content {
      margin: 0 auto;
      margin-top: 30px;
      border-radius: 10px;
      width: 90%;
      height: calc(90vh - 70px);
      border: 1px solid;
      border-color: transparent;
    }
</style>