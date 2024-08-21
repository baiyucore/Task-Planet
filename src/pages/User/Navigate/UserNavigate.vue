<script setup lang="ts" name="App">
import { RouterLink,RouterView } from 'vue-router';
import { ClipboardList , ShoppingCart , ClipboardPenLine , School , User} from 'lucide-vue-next';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Button from '@/components/ui/button/Button.vue';
import { Userinfor } from '@/store/user';
import { useQuery } from '@tanstack/vue-query'
import { toast } from 'vue-sonner';
import { userapi } from '@/pages/Api/UserIndex';
import { computed } from 'vue';
import { notice } from '@/pages/Interface/SystemInterfact';


const { isError, data, error} =useQuery<notice>({
    queryKey: ['usernotification'],
    queryFn : () =>  userapi.viewnotice()
  })


function changenoticeopen(){
  Userinfor().changenoticeopen();
}
const isDialogOpen = computed(() => {
  const userData = data.value;  
  return Userinfor().noticeopen && userData?.existednumber !== undefined && userData.existednumber !== 0;
});
</script>
<template>  
<div class=" ">
 <div class="navigate grid grid-cols-5 gap-x-0">
  <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
  <span v-else-if="data">
        <Dialog v-model:open="isDialogOpen">
            <DialogTrigger as-child>

            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>系统通知</DialogTitle>
              </DialogHeader>
              <div v-for="items in data.notification" :key="items._id">                
                {{ items.noticename }} 内容 {{ items.noticecompletion }}
              </div>

              <Button @click="changenoticeopen"> 确定</Button>
        
                <DialogFooter>
                    </DialogFooter>
            </DialogContent>
          </Dialog>
  </span>
        <div>
          <RouterLink :to="{path:'/usertask'}" active-class="active" class="static">
          <ClipboardList class="  relative size-8 top-1 left-8 "/>
          <div class="  text-center">任务</div>
         </RouterLink>

        </div >
        
        <div>
          <RouterLink :to="{path:'/usershopping'}" active-class="active" class="static">
          <ShoppingCart class="relative size-8 top-1 left-8"/>
          
          <div class=" pl-1 text-center">商城</div>
        </RouterLink>

        </div>
        <div>
          <RouterLink :to="{path:'/usercomment'}" active-class="active" class="static">
          <ClipboardPenLine  class=" relative size-8 top-1 left-8 " />
          
          <div class=" pl-1 text-center">评论</div>
        </RouterLink>
        </div>
    
        <div>
          <RouterLink :to="{path:'/userclass'}" active-class="active" class="static">
          <School class=" relative size-8 top-1 left-8"/>
          <div class="pl-1 text-center">班级</div>
          </RouterLink>
        </div>
        <div>
          <RouterLink :to="{path:'/useroneself'}" active-class="active">
          <User class="relative size-8 top-1 left-8"/>
          <div class=" text-center">我的</div>
          </RouterLink>
        </div>
        
 </div>
  <div >
        <RouterView></RouterView>    
  </div>


</div>


</template>

<style scoped>
    .navigate {
      display: flex;
      justify-content: space-around; 
      position: absolute;
      bottom: 30px;
      width: 100%;
      
    }
    .navigate a {
      display: block;
      text-align: center;
      width: 100px;
      height: 60px;
      line-height: 40px;
      border-radius: 10px;
      text-decoration: none;
      color: #ACACAC;
      font-size: 18px;
      letter-spacing: 5px;
      position: static;  
    }
    .navigate a.active {
      background-color: #64967e00;
      color: #FF7710;
      font-weight: 900;
      font-family: 微软雅黑;
    }
    .main-content {
      margin: 0 auto;
      margin-top: 30px;
      border-radius: 10px;
      width: 90%;
      height: 400px;
      border: 1px solid;
    }
</style>