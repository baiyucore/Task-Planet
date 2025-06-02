<template>
    <div class="static  mt-2">
    <ArrowLeft class="absolute top-3 left-0 cursor-pointer" @click="onreturn" />

    <div class="flex h-12 justify-center border-4 border-transparent border-b-slate-950   ">
     
      <span  class="  text-center text-2xl col-start-2 col-span-4  font-bold">{{classname}}</span> 
   </div>
   
   
  
      
    
   <div class="main-content ">
    <div class="flex flex-col  mt-2">
      <div class="flex justify-around">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <Dialog>
          <DialogTrigger as-child>
            <Button variant="outline">
              上传文件
            </Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>上传文件</DialogTitle>
            
            </DialogHeader>
            <Input type="file" @change="onFileChange" class="w-full"/>

            <DialogFooter>
              <Button @click="uploadFile">
                确定上传
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
          

      </div>
      

      <div class="flex flex-row mt-2 ml-2 frame">
        <div class="basis-1/2">
          文件名
        </div>
        <div class="basis-1/4">
          大小
        </div>
        <div class="basis-1/4">
          创建日期
        </div>
      </div>

      <span v-if="data">

        <div class="flex flex-row mt-2 ml-2 frame" v-for="word in data.viewword" :key="word.Owner.ID">
        <div class="basis-1/2 flex justify-between  justify-items-center items-center" >
          <div>
            {{ getFileName(word.Key) }}
          
          </div>
          <div class="flex justify-items-center items-center">   
            <div @click="Download(word.Key)" class="w-[50px] cursor-pointer text-blue-500 hover:text-blue-700 ">
                下载
            </div>
            <div @click="Delectload(word.Key)" class="w-[50px] cursor-pointer text-blue-500 hover:text-blue-700 ">
                删除
            </div>
          </div>
         
        </div>
        <div class="basis-1/4 ml-2 flex justify-items-center items-center">
          {{ formatSize(word.Size) }} 
        </div>
        <div class="basis-1/4 flex justify-items-center items-center">
          {{formatDate(word.LastModified) }}
        </div>
      </div>
      </span>

      
      

   </div>
   </div>
    
  </div>

  <div>

   
    
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next';
import { ref } from 'vue';
import axios from 'axios';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import {  useRoute, useRouter} from 'vue-router';
import {  useQuery,useMutation } from '@tanstack/vue-query'
import {
  Dialog,
  DialogContent,

  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { download, viewWord } from '@/pages/Interface/CreateInterface';
import { toast } from 'vue-sonner';
import { createapi } from '@/pages/Api/CreateIndex';
const fileToUpload = ref(null);

let tranport = useRoute();
const classname = tranport.query.class_name
const userinvitecode = tranport.query.userinvitecode as string

const router = useRouter();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onFileChange = (event: { target: { files: any; }; }) => {
  const files = event.target.files;
  
  if (files.length > 0) {
    fileToUpload.value = files[0]; // 获取选中的文件
  }
};

const uploadFile = async () => {
  if (!fileToUpload.value) {
    // 处理未选择文件的情况
    toast('请先选择一个文件进行上传');
    return;
  }
  const formData = new FormData();
  formData.append('file', fileToUpload.value);
  formData.append('name',userinvitecode);
 
  try {
    // 调用云函数，上传文件内容
    await axios.post('https://falpwq5knm.bja.sealos.run/Create-profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    toast.success('上传成功');
    // 上传成功后刷新页面
    window.location.reload();
  } catch {
    toast.error('上传失败');
  }
};
function onreturn(){
  router.back();
}

const params : viewWord ={
    userinvitecode:userinvitecode
}

const {  data} =useQuery({
    queryKey: ['createviewWord', params],
    // eslint-disable-next-line no-undef
    queryFn : () =>  createapi.viewWord(params),
    staleTime: 1000 * 60 * 1,
  })

  function formatDate(dateString:string) {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`; // 格式化后的日期字符串
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`; // 小于 1KB
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`; // 小于 1MB
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`; // 大于等于 1MB
}
function getFileName(filePath: string) {
  return filePath.split('/').pop(); // 以 '/' 分割并返回最后一个元素
}

const Downmutation= useMutation({
  mutationFn: async (params: download) => {
    const response = await  createapi.download(params)
    return response
  },
  onMutate:()=>{

  },
  onSuccess:(res)=>{

      const path =res.path
      const link = document.createElement('a');
      link.href = path;
      document.body.appendChild(link); // 将链接添加到 DOM
      link.click(); // 模拟点击下载
      document.body.removeChild(link);
      
  },  
  onError: (errors) => {

    toast.error(errors.message)
  },

})

function Download(path:string){
  Downmutation.mutate({
    path:path,
    })

}

function Delectload(path:string){
  Delectmutation.mutate({
    path:path,
    })
}
const Delectmutation= useMutation({
  mutationFn: async (params: download) => {
    const response = await  createapi.delectword(params)
    return response
  },
  onMutate:()=>{

  },
  onSuccess:(res)=>{
    if(res.err_code === 0){
      toast.success("删除成功")
    }else{
      toast.error( res.err_msg );
    }
  
      
  },  
  onError: (errors) => {

    toast.error(errors.message)
  },

})

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
  .frame{
    width:98%;
    border-color: transparent;
 
  }
</style>