<script setup lang="ts">
import { toast } from 'vue-sonner';
import { useRouter,useRoute } from 'vue-router';
import { ArrowLeft  } from 'lucide-vue-next';
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { createapi } from '@/pages/Api/CreateIndex';
import { Createinfor } from '@/store/create';
import { Createid ,Createpublictask} from '@/pages/Interface/CreateInterface';
import { useMutation } from '@tanstack/vue-query'
import { useQuery } from '@tanstack/vue-query'

const createinfor = Createinfor()
const router = useRouter();
const isLoading = ref(false);

const route = useRoute();
const taskid =route.query.taskid as string

const checkclass = ref([]);

const mutation = useMutation({
  mutationFn: async (params:  Createpublictask) => {
    const response = await   createapi.taskpublictask(params)
    return response
  },
  onMutate: () => {
    isLoading.value = true
  },  
  onSuccess:(res)=>{
    isLoading.value = false;
    if( res.err_code === 0 ){
      toast.success("发布成功");
      router.back();
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

})


async function onSubmit(event:Event) {
  event.preventDefault();
  isLoading.value= true;

  mutation.mutate({
    creatateid:createinfor.createid,
    taskid: taskid,
    checkclass : checkclass.value,
  })
}

const params: Createid= {account_id: createinfor.createid}
const { isError, data, error,} =useQuery({
    queryKey: ['craetepublictask', params],
    queryFn : () =>   createapi.viewoverclass(params)
  })
  function onreturn(){
  router.back();
}

</script>

<template>
  <div class="static mt-2">
    
    <ArrowLeft class="float-left ml-2 mt-1" @click="onreturn" />
    <span  class="   text-2xl  font-bold">选择班级</span> 
   
    <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
        <span v-else-if="data">
    <form @submit="onSubmit">
     <div v-for="item in data.existed"  :key="item._id">
   
      <input  
        class="mt-5"
        v-model="checkclass"
        :value="item.classname"
        type="checkbox"
       
        :disable="isLoading"
      />{{item.classname}}
     </div>
     <Button  :disabled="isLoading"  class="w-full mt-3 bg-teal-500  ">
      确定
     </Button>
     
     
      <br>      
    </form>
  </span>
  </div>
</template>