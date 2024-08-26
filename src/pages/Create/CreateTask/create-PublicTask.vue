<template>
  <div class=" h-lvh ">

 
    <div class="flex h-12 justify-center  bg-teal-500  text-white static">
     
        <ArrowLeft class="absolute top-3 left-0 cursor-pointer" @click="onreturn" />
     
      
      <span  class=" content-center  text-2xl cursor-default  font-bold">选择班级</span> 
    </div>
 
  
    <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
        <span v-else-if="data">
    <form @submit="onSubmit" >
     
     <div v-for="item in data.existed"  :key="item._id" >
   
      <div class="flex mt-2 text-xl  ml-2 ">
      
      <Checkbox
            :checked="checkclass.includes(item.classname)"
            :disabled="isLoading"
            @update:checked="(isChecked) => toggleCheck(item.classname, isChecked)"
          />
          <span class="ml-2  ">{{ item.classname }}</span>

    </div>
     
     </div>
  
      <div class="flex justify-center">
        <Button  :disabled="isLoading"  class="w-5/12 mt-6 bg-teal-500  ">
            确定
          </Button>
      </div>
     
     
     
      <br>      
    </form>
  </span>


  







  </div>
</template>
<script setup lang="ts">
import { toast } from 'vue-sonner';
import { useRouter,useRoute } from 'vue-router';
import { ArrowLeft  } from 'lucide-vue-next';
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { createapi } from '@/pages/Api/CreateIndex';
import { UseCreateStore } from '@/store/create';
import { Createid ,Createpublictask} from '@/pages/Interface/CreateInterface';
import { useMutation,useQuery } from '@tanstack/vue-query'
import { Checkbox } from '@/components/ui/checkbox'
const createinfor = UseCreateStore()
const router = useRouter();
const isLoading = ref(false);

const route = useRoute();
const taskid =route.query.taskid as string

// const checkclass = ref([]);
const checkclass = ref<string[]>([]);
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
    router.push("/createtaskunfinshed");
}

function toggleCheck(classname: string, isChecked: boolean) {
  if (isChecked) {
    checkclass.value.push(classname);
  } else {
    checkclass.value = checkclass.value.filter(cls => cls !== classname);
  }
}
</script>
