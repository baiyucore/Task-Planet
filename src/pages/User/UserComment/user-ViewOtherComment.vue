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
              <Dialog>
              <DialogTrigger as-child>
                <MessageCircle class="size-6 cursor-pointer"/> 
              </DialogTrigger>
              <DialogContent class="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>评论</DialogTitle>
                </DialogHeader>
                <form @submit="onoutersubmit">
                  <div class="grid gap-4 py-4">
                      <div class="grid grid-cols-4 items-center gap-4">
                        <Label  class="text-right">
                          写下你的评论
                        </Label>
                        <Input  v-model:model-value="comment"  type="text"  :disabled="isLoading" class="col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button :disabled="isLoading">
                        发布
                      </Button>
                    </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            
            <AlertDialog >
                <AlertDialogTrigger as-child>
                  <Info class="cursor-pointer"/> 
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>你确定举报该总结?</AlertDialogTitle>
                    <AlertDialogDescription>
                     举报后无法撤回
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>取消</AlertDialogCancel>
                    <AlertDialogAction  @click="warnssummarize">确认</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
          
            </div>
    
        </CardContent>    
        </Card>
    </div>
      
    
 
      
    </div>
    <div class="text-xl ml-5"> 评论</div>

    <div class="comment-content">
      <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
      <span v-else-if="data">
        <div class="flex flex-col items-center">
        <Card v-for="items in data.outercomment" :key="items._id" class="mb-3 w-11/12  ">
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
              <Dialog >
                <DialogTrigger as-child>
                  
                  <MessageCircle class="cursor-pointer"/> 
                
                </DialogTrigger>
                <DialogContent class="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>评论</DialogTitle>
                  </DialogHeader>
                    <form @submit="oninntersubmit(items.name,items.commentid,items.comment)">
                      <div class="grid gap-4 py-4">
                          <div class="grid grid-cols-4 items-center gap-4">
                            <Label  class="text-right">
                              写下你的评论
                            </Label>
                            <Input  v-model:model-value="comment"  type="text"  :disabled="isLoading" class="col-span-3" />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button :disabled="isLoading" class=" border-transparent">
                            发布
                          </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
              </Dialog>

              <AlertDialog >
                <AlertDialogTrigger as-child>
                  <Info  class="cursor-pointer"/> 
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>你确定举报该评论?</AlertDialogTitle>
                    <AlertDialogDescription>
                      举报后无法撤回
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>取消</AlertDialogCancel>
                    <AlertDialogAction    @click="warns(items.commentid,items.comment)">确认</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

          </div>

          </CardContent>

        </Card>
      </div>
        
     
        </span>
  





  </div>
</template>
<script setup lang="ts">
import { toast } from 'vue-sonner';
import { useRouter,useRoute } from 'vue-router';
import { ArrowLeft , Info, MessageCircle  } from 'lucide-vue-next';
import {  ref } from 'vue'
import { userapi } from '@/pages/Api/UserIndex';
import { 
  searchinnerComment, UsersubmitInnterComment,
   UsersumitComment, ViewInnerComment, 
    ViewOuterComment,
    warnsummarize
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Userinfor } from '@/store/user';
import { useMutation,useQuery } from '@tanstack/vue-query'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
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

const taskstarttime = typeof route.query.taskstarttime === 'string' ? parseInt(route.query.taskstarttime) : NaN;
const taskovertime = typeof route.query.taskovertime === 'string' ? parseInt(route.query.taskovertime) : NaN;

const comment = ref("")
const isLoading = ref(false)

const params : ViewOuterComment = {
    taskid:taskid,
    userid: authorid,
  }
const { isError, data, error,} =useQuery({
    queryKey: ['userviewcomment', params],
    queryFn : () => userapi.ViewOuterComment(params)
  })


function onreturn(){
  router.back();
}
//提交外部评论
const outersumitmutation = useMutation({
  mutationFn: async (params:  UsersumitComment) => {
    const response = await userapi.SubmitComment(params)
    return response
  },
  onSuccess:(res)=>{
    if( res.err_code === 0 ){
      toast.success("评论成功")
      window.location.reload()
    } else{
      toast.error( res.err_msg );
    }
  },  
  onError: (error) => {
    toast.error(error.message)
  },
})
async function onoutersubmit(event:Event) {
  event.preventDefault();
  outersumitmutation.mutate({
    comment:comment.value,
    commentid:Userinfor().userid,
    name:Userinfor().username,
    taskid:taskid,
    userid : authorid,
  })
}

//提交内部评论
const inntersubmitmutation = useMutation({
  mutationFn: async (params: UsersubmitInnterComment) => {
    const response = await userapi.SubmitInnerComment(params)
    return response
  },
  onSuccess:(res)=>{
    isLoading.value = false;
    if( res.err_code === 0 ){
      toast.success("评论成功")
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    } else{
      toast.error( res.err_msg );
    }
  },  
  onError: (error) => {
    toast.error(error.message)
  },
})
async function oninntersubmit(name : string,commentid:string,comments:string) {
  isLoading.value =true
  inntersubmitmutation.mutate({
    taskid : taskid,
    other_comment : comment.value,
    other_commentid:Userinfor().userid,
    other_commentname:Userinfor().username,
    name: name,
    comment:comments,
    commentid:commentid,
    authorid :authorid,
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

//举报内部评论
const warnsinnermutation = useMutation({
  mutationFn: async (params: searchinnerComment) => {
    const response = await  userapi.WarnComment(params)
    return response
  },
  onSuccess:(res)=>{
    if(res.err_code === 0){
      toast.success("举报成功")
    }else{
      toast.error(res.err_msg)
    }
  },  
  onError: (error) => {
    toast.error(error.message)
  },
})
async function warns(commentid:string,comment: string) {
  warnsinnermutation.mutate({
    taskid:taskid,
    comment:comment,
    commentid:commentid,
    userid :Userinfor().userid,
    classname : Userinfor().useraddclass,
    taskstarttime:taskstarttime,
    taskovertime:taskovertime,
    location : 'inner',
  })
}

//举报总结
const warnsmutation = useMutation({
  mutationFn: async (params: warnsummarize) => {
    const response = await  userapi.WarnSummarize(params)
    return response
  },
  onSuccess:(res)=>{
    if(res.err_code === 0){
      toast.success("举报成功")
    }else{
      toast.error(res.err_msg)
    }
  },  
  onError: (error) => {
    toast.error(error.message)
  },
})
async function warnssummarize() {
  warnsmutation.mutate({
    taskid:taskid,
    summarize:summarize,
    authorid : authorid,
    userid  : Userinfor().userid,
    classname : Userinfor().useraddclass,
    taskstarttime:taskstarttime,
    taskovertime:taskovertime,
    location:'outer',
  })
}

</script>
<style scoped>

    .comment-content {
      margin: 0 auto;
      border-radius: 10px;
      width: 100%;
      height: calc(90vh - 70px);
      border: 1px solid;
      border-color: transparent;
      overflow: auto;
    }
</style>