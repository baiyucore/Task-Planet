<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft } from 'lucide-vue-next';
import {  ref } from 'vue'
import { Button } from '@/components/ui/button'
import { UserCoinChange, UserSumitTask } from '@/pages/Interface/UserInterface';
import { userapi } from '@/pages/Api/UserIndex';
import { toast } from 'vue-sonner';
import { Userinfor } from '@/store/user';
import {useMutation} from '@tanstack/vue-query'

const router = useRouter();
const isLoading = ref(false);
const route = useRoute();

const taskid = route.query.taskid as string;
const taskname = route.query.taskname;
const taskCompletionConditions = route.query.taskCompletionConditions  as string
const taskstarttime = route.query.taskstarttime
const taskovertime = route.query.taskovertime

const successrewardone = typeof route.query.successrewardone === 'string' ? parseInt(route.query.successrewardone) : NaN;
const successrewardtwo_one = typeof route.query.successrewardtwo_one === 'string' ? parseInt(route.query.successrewardtwo_one) : NaN;
const successrewardtwo_two =  typeof route.query.successrewardtwo_two === 'string' ? parseInt(route.query.successrewardtwo_two) : NaN;
const failed = route.query.failed as string
 
const selectedOption = ref("null")
const coin = ref(0)
const summarize = ref("")



function selectreward(option : string){
  if(option === 'option1'){
    selectedOption.value = "1"
    coin.value =successrewardone
  }else if(option === 'option2'){
    selectedOption.value = "2"
   coin.value =rewardrandon()
  }
}

function rewardrandon(){
  const max = Math.max(successrewardtwo_two,successrewardtwo_one)
  const min = Math.min(successrewardtwo_two,successrewardtwo_one)
  return Math.floor(Math.random() * (max - min + 1)) + min
}


// 提交任务的 mutation
const { mutate: submitTask} = useMutation({
  mutationFn: async (params: UserSumitTask) => {
    const coinchange = Userinfor().coin + params.coin;
    Userinfor().coinchange(coinchange);

    const coinChangeParams: UserCoinChange = {
      userid: Userinfor().userid,
      coin: coinchange,
    };

    await userapi.CoinChange(coinChangeParams);

    const response = await userapi.SubmitTask(params);
    return response
  },
  onMutate:()=>{
    isLoading.value = true
  },
  onSuccess:(res)=>{
    if( res.err_code === 0 ){
      toast.success(`提交成功, 获得 ${res.getcoin} 金币`);
     router.push('/usertask')

    } else{
      toast.error( res.err_msg );
    }
  }, 
  onError: (error) => {
    isLoading.value = false
    toast.error(error.message)
  },
  onSettled: () => {
    isLoading.value = false
  },

});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function(this: any, ...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}


// 提交表单
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const debouncedOnSubmit = debounce(function(this: any, event: Event) {
  event.preventDefault();
  
  if (selectedOption.value === "null") {
    toast.error("必须选择奖励才能提交");
    return;
  }

  const params: UserSumitTask = {
    taskid,
    coin: coin.value,
    summarize: summarize.value,
    rewardselect: selectedOption.value,
    userid: Userinfor().userid,
    username: Userinfor().username,
  };

  submitTask(params);
}, 1000); 
function onreturn(){
  router.back();
}

</script>

<template>
  <div class="static mt-2">
 
    <ArrowLeft class="float-left ml-2 mt-1" @click=" onreturn" />
    <span  class="   text-2xl  font-bold">任务</span> 
      <Input  
        class="mt-5"
        disabled
        type="text"
        :placeholder="taskname"
        :disable="isLoading"
      /> 
      <span class="mt-2 ml-2">完成任务条件</span>
      <Input  
        class="mt-2 h-[100px]  "
        disabled
        type="text"
       :placeholder="taskCompletionConditions"
        :disable="isLoading"
      />
      <br>

      <span class="ml-4">
        开始时间 {{taskstarttime}}
      </span>
      
      <br>
      <span class="ml-4">
        截止时间 {{ taskovertime }}
      </span>

      <h1 class="text-center">以下选择进行2选1</h1>
      <div class="flex gap-2">
  
        <div class="grow h-1/2 ml-2">
          <div class="bg-[#CBD5E1] text-center" :class="{ selected: selectedOption === 'option1' }" @click="selectreward('option1')">
            <span :style="{ color: selectedOption === '1' ? '#FF7D05' : ' black' }" >选择1 <br> <br>
          <span >获得{{ successrewardone }}金币 </span>
            </span>
          </div>
        </div>

        <div class="grow h-1/2"> 
        <div class="text-center  bg-[#CBD5E1]" :class="{ selected: selectedOption === 'option2' }" @click="selectreward('option2')">
          <span :style="{ color: selectedOption === '2' ? '#FF7D05' : 'black' }">选择2 <br> <br>
            <span >获得{{ successrewardtwo_one }}~{{successrewardtwo_two}}金币</span>
          </span>
        </div>
        </div>
      </div> 

      <div class="ml-2">
        <span> 失败</span> 
        <input  
          class="mt-5 ps-8"
          disabled
          type="number"
          :placeholder="failed"
          :disable="isLoading"
        />
      </div>
      <form @submit="debouncedOnSubmit">
        <h1 class="mt-2 ml-2 text-center">总结</h1>
          <Input  
            class="mt-2 h-[100px] bg-[#CBD5E1] "
            type="text"
            placeholder="总结"
            :disable="isLoading"
            v-model:model-value="summarize"
          />
          <Button :disabled="!selectedOption" class="w-full">
            提交
          </Button>
      </form>


  </div>
</template>