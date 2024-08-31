<template>
  <div class="static ">
    <ArrowLeft class="absolute top-3 left-0 cursor-pointer" color="#f1f5f9" @click="onreturn" />
    <div class="flex h-12 justify-center bg-gray-600  ">
      <span  class="ml-4 cursor-default text-2xl content-center text-slate-100 font-bold">{{ username }}的总结</span> 
    </div>  
    <div class="border-2 border-transparent border-b-slate-950">
      <Card   class="border-transparent shadow-transparent " >
          <CardHeader>
            <CardTitle class="text-wrap"> {{ summarize }} </CardTitle>  
          </CardHeader> 
          <CardContent >
           
            <div class="flex justify-end gap-4">
  
            
            <AlertDialog >
                <AlertDialogTrigger as-child>
                  <Trash2 class=" cursor-pointer"/>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>你确定删除?</AlertDialogTitle>
                    <AlertDialogDescription>
                      删除后无法复原
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>取消</AlertDialogCancel>
                    <AlertDialogAction   @click="Deletesummarize()">确认</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
      

        </CardContent>    
        </Card>
   
   </div>

    <div class="text-xl ml-5"> 评论</div>
    <div class="comment-content">

<span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
<span v-else-if="data">
  
<div class="flex flex-col items-center">
  <Card v-for="items in data.outercomment" :key="items._id" class="mb-3 w-11/12  cursor-pointer">
    <CardHeader>
      <CardTitle> {{ items.name}}: {{ items.comment }}</CardTitle>
   
    </CardHeader>  
    <CardContent class="flex  justify-between ">
      <div class="flex content-center">
        <span class="mt-1">有{{ items.commentnumber }}评论</span>
               
        <Dialog>
          <DialogTrigger as-child>
            <Button @click="viewinnerComment(items.commentid,items.comment)" variant="outline" class="outline-transparent border-transparent shadow-transparent">
            点击查看
            </Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-[425px] overflow-y-auto h-1/2">
            <DialogHeader>
              <DialogTitle>评论</DialogTitle>
            </DialogHeader>
            <div v-for="items in innercomment" :key="items._id" >
              {{ items.other_commentname }} 的评论 {{ items.other_comment }}
            </div>
              
                  <DialogFooter>
                  </DialogFooter>
            
          </DialogContent>
        </Dialog>

      </div>

      <div class="flex gap-4">

        <AlertDialog >
          <AlertDialogTrigger as-child>
            <Trash2 class=" cursor-pointer"/>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>你确定删除?</AlertDialogTitle>
              <AlertDialogDescription>
                删除后无法复原
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>取消</AlertDialogCancel>
              <AlertDialogAction    @click="deleteothercomment(items.commentid,items.comment)">确认</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

    </div>

    </CardContent>

  </Card>
</div>
 

</span>

</div>
  

  </div>
</template>
<script setup lang="ts">
import { toast } from 'vue-sonner';
import { useRouter,useRoute } from 'vue-router';
import { ArrowLeft ,Trash2  } from 'lucide-vue-next';
import {  ref } from 'vue'
import { userapi } from '@/pages/Api/UserIndex';
import { 
  searchinnerComment, 
  ViewInnerComment, 
  ViewOuterComment
} from '@/pages/Interface/UserInterface';
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'

import { deletecomment, deletesummarize } from '@/pages/Interface/CreateInterface';
import { createapi } from '@/pages/Api/CreateIndex';
import { useMutation,useQuery } from '@tanstack/vue-query'
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


const router = useRouter();
const route = useRoute()
const taskid  = route.query.taskid as string
const authorid  = route.query.userid as string
const username = route.query.username as string
const summarize = route.query.summarize as string
const innercomment = ref<ViewInnerComment[]>([])



const params : ViewOuterComment = {
    taskid:taskid,
    userid: authorid,
  }
const { isError, data, error,} =useQuery({
    queryKey: ['craeteviewcomment', params],
    queryFn : () => createapi.ViewOuterComment(params)
  })

//删除总结
  const deletsummarize = useMutation({
  mutationFn: async (params:  deletesummarize) => {
    const response = await  createapi.DeleteSummarize(params)
    return response
  }, 
  onSuccess:(res)=>{
    if( res.err_code === 0 ){
      onreturn()
      toast.success("删除成功")
    } else{
      toast.error( res.err_msg );
    }
  },  
  onError: (error) => {
    toast.error(error.message)
  },
})
async function Deletesummarize() {
  deletsummarize.mutate({
    taskid:taskid,
    userid: authorid,
    summarize:summarize,
  })
}




//显示你内部评论
const viewinnercommentmutation = useMutation({
  mutationFn: async (params:  searchinnerComment) => {
    const response = await  userapi.ViewInnerCommer(params)
    return response
  }, 
  onSuccess:(res)=>{
    if( res.err_code === 0 ){
      innercomment.value = res.innerComment
    } else{
      toast.error( res.err_msg );
    }
  },  
  onError: (error) => { 
    toast.error(error.message)
  },
})
async function viewinnerComment(commentid:string,comment: string) {
  viewinnercommentmutation.mutate({
    taskid:taskid,
    comment:comment,
    commentid:commentid,
  })
}
//删除内部评论
const deleteothercommentmutation = useMutation({
  mutationFn: async (params: deletecomment) => {
    const response = await   createapi.DeleteComment(params)
    return response
  },
  onSuccess:(res)=>{
    if( res.err_code === 0 ){
      window.location.reload()
      toast.success("删除成功")
    } else{
      toast.error( res.err_msg );
    }
  },  
  onError: (error) => {
    toast.error(error.message)
  },
})

async function deleteothercomment(commentid:string,comment: string) {
  deleteothercommentmutation.mutate({
    taskid:taskid,
      comment:comment,
      commentid:commentid,
  })
}
function onreturn(){
  router.back();
}

</script>


<style scoped>
    .comment-content {
      margin: 0 auto;
      border-radius: 10px;
      width: 100%;
      height: 30%;
      border: 1px solid;
      border-color: transparent;
      overflow: auto;
    }
</style>