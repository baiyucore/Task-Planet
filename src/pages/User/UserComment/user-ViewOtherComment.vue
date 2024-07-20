<script setup lang="ts">
import { toast } from 'vue-sonner';
import { useRouter,useRoute } from 'vue-router';
import { ArrowLeft , Info, MessageCircle  } from 'lucide-vue-next';
import {  onMounted, ref } from 'vue'
import { userapi } from '@/pages/Api/UserIndex';
import { UsersubmitInnterComment, UsersumitComment, ViewOutercomment, ViewOuterComment} from '@/pages/Interface/UserInterface';

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Userinfor } from '@/store/user';

const router = useRouter();
const route = useRoute()
const taskid  = route.query.taskid as string
const authorid  = route.query.userid as string
const username = route.query.username as string
const summarize = route.query.summarize
const outercomment  = ref<ViewOutercomment[]>([])

const comment = ref("")
const isLoading = ref(false)
onMounted(()=>{
  const params : ViewOuterComment = {
    taskid:taskid,
    userid: authorid,
  }
  userapi.ViewOuterComment(params).then((res)=>{
    if(res.err_code === 0){
      outercomment.value = res.outercomment
    }else{
      toast.error(res.err_msg)
    }
  })
})


function onreturn(){
  router.back();
}

async function onoutersubmit(event:Event) {
  event.preventDefault();
  isLoading.value =true
  const params : UsersumitComment={
    comment:comment.value,
    commentid:Userinfor().userid,
    name:Userinfor().username,
    taskid:taskid,
    userid : authorid,
  }
  userapi.SubmitComment(params).then((res)=>{
    if(res.err_code === 0){
      toast.success("评论成功")
      window.location.reload()
    }else{
      toast.error(res.err_msg)
    }
  })

}

async function oninntersubmit(name : string,commentid:string,comments:string) {

  isLoading.value =true
  const params : UsersubmitInnterComment={
    taskid : taskid,
    other_comment : comment.value,
    other_commentid:Userinfor().userid,
    other_commentname:Userinfor().username,
    name: name,
    comment:comments,
    commentid:commentid,
  }
  userapi.SubmitInnerComment(params).then((res)=>{
    if(res.err_code === 0){
      toast.success("评论成功")
      setTimeout(() => {
        window.location.reload()
      }, 1000);
  
    }else{
      toast.error(res.err_msg)
    }
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
          <Info class="size-6"/>  举报
         </div>
        </div> 
      </div>
    
    
      
    </div>
    <div class="text-xl ml-5"> 评论</div>

    <div class="comment-content">
      <div v-for="items in outercomment" class="mt-5">
        
          {{ items.name}}的评论： {{ items.comment }}
     
        
        <div v-for="item in items.othercomment" class="mt-2 ml-3">
          <Label  class="text-right">
        {{ item.other_commentname }} 的评论：{{ item.other_comment }}
      </Label>
        </div>
        <div class="grid grid-cols-6 ">
      <div  class="grid grid-cols-subgrid  col-span-6">
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
                <Info class="size-6"/>  举报
              </div>
              </div> 
            </div>
        </div>
    
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