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
    taskovertime:taskovertime
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
    taskovertime:taskovertime
  })
}

</script>

<template>
  <div class="static mt-2">
    <ArrowLeft class="float-left ml-2 mt-1" @click="onreturn" />
    <span  class="  ml-2 text-2xl  font-bold">{{ username }}的总结</span> 
    <div class="main-content">
     <div class="text-xl mb-2">
      总结
     </div>
      <div class="text-xl">
        {{ summarize }}
      </div>
      <div class="grid grid-cols-6 ">
    
          <div  class="grid grid-cols-subgrid  col-span-6">
            <div class="col-start-5" > 
              
          <Dialog>
            <DialogTrigger as-child>
              <Button variant="outline">
              <MessageCircle class="size-6"/> 
              评论
              </Button>
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
         </div>
         <div class="col-start-6"> 
        <Button @click="warnssummarize"> 
          <Info class="size-6"/>  举报
        </Button>  
         </div>
        </div> 
      </div>
    
    
      
    </div>
    <div class="text-xl ml-5"> 评论</div>

    <div class="comment-content">
      <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
      <span v-else-if="data">
      <div v-for="items in data.outercomment" class="mt-5" :key="items._id">
        
          {{ items.name}}的评论： {{ items.comment }}
        <div class="grid grid-cols-6 ">
      <div  class="grid grid-cols-subgrid  col-span-6">
        <div class="text-xs col-span-2 " :hidden="items.commentnumber === 0">
          有{{ items.commentnumber }}评论  
           
           <Dialog>
            <DialogTrigger as-child>
              <Button @click="viewinnerComment(items.commentid,items.comment)" variant="outline" class="outline-transparent">
              点击查看
              </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px] overflow-y-auto h-1/2">
              <DialogHeader>
                <DialogTitle>评论</DialogTitle>
              </DialogHeader>
              <div v-for="items in innercomment" :key="items._id">
                {{ items.other_commentname }} 的评论 {{ items.other_comment }}
              </div>
                
                    <DialogFooter>
                    </DialogFooter>
              
            </DialogContent>
          </Dialog>
        </div>
    
        <div class="col-start-5" > 
          <Dialog>
            <DialogTrigger as-child>
              <Button variant="outline">
              <MessageCircle class="size-6"/> 
              </Button>
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
              </div>
              <div class="col-start-6"> 
                <Button @click="warns(items.commentid,items.comment)">
                  <Info  class="size-6"/> 
                </Button>
           
              </div>
              </div> 
            </div>
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
      height: 30%;
      border: 1px solid;
      border-color: transparent;
    }
    .comment-content {
      margin: 0 auto;
      border-radius: 10px;
      width: 90%;
      height: 30%;
      border: 1px solid;
      border-color: transparent;
    }
</style>