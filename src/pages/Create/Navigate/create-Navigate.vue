<template>  
  <span v-if="isError">Error: {{toast.error(error?.message as string) }}</span>
  <span v-else-if="data">
        <Dialog v-model:open="dialogOpen">
            <DialogTrigger as-child>

            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>系统通知</DialogTitle>
              </DialogHeader>

              <div v-for="items in data.notification" :key="items._id" >    
                <div class="flex justify-center text-xl  "  >
                  {{ items.noticename }}
                </div>            
               

                <div class="">
                  {{ items.noticecompletion }}
                </div>
                
              </div>

              <Button @click="changenoticeopen"> 确定</Button>
        
                <DialogFooter>
                    </DialogFooter>
            </DialogContent>
          </Dialog>
  </span>

  <div class="navigate duration-700 " >

 

        <div class=" text-center flex-col ">
          <RouterLink :to="{path:'/createtask' }" active-class="active" >
          <ClipboardList class=" ml-2 size-8 "/>
          <div class=" pl-1 ">任务</div> 
         </RouterLink>

        </div >
        
        <div class=" text-center">
          <RouterLink :to="{path:'/createshopping'}" active-class="active" class="static">
          <ShoppingCart class="ml-2 size-8"/>
          
          <div class=" pl-1 ">商城</div>
        </RouterLink>

        </div>
        <div class="text-center">
          <RouterLink :to="{path:'/createcomment'}" active-class="active" class="static">
          <ClipboardPenLine  class="ml-2 size-8" />
          
          <div class=" pl-1 ">评论</div>
        </RouterLink>
        </div>
    
        <div class=" text-center">
          <RouterLink :to="{path:'/createclass'}" active-class="active" class="static">
          <School class=" ml-2 size-8 "/>
          <div class="pl-1 ">班级</div>
          </RouterLink>
        </div>
        <div class=" text-center flex-col ">
          <RouterLink :to="{path:'/createspace' }" active-class="active" >
          <MessageCircle class=" ml-2 size-8 "/>
          <div class=" pl-1 ">聊天</div> 
          </RouterLink>
        </div >
        <div class="text-center">
          <RouterLink :to="{path:'/createoneself'}" active-class="active">
          <User class=" ml-2 size-8"/>
          <div class="  pl-1 ">我的</div>
          </RouterLink>
        </div>
        
 </div>
  
  <div >
        <RouterView></RouterView>
        
  </div>

</template>
<script setup lang="ts" name="App">
import { RouterLink,RouterView } from 'vue-router';
import { ClipboardList , ShoppingCart , ClipboardPenLine , School , User,MessageCircle,Cloud} from 'lucide-vue-next';
import { ref, watch } from 'vue';
import { notice } from '@/pages/Interface/SystemInterfact';
import { useQuery } from '@tanstack/vue-query'
import { UseCreateStore } from '@/store/create';
import { toast } from 'vue-sonner';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Button from '@/components/ui/button/Button.vue';
import { createapi } from '@/pages/Api/CreateIndex';

const { isError, data, error} =useQuery<notice>({
    queryKey: ['usernotification'],
    queryFn : () =>  createapi.viewnotice(),
    staleTime: 1000 * 60 * 1,
  })


function changenoticeopen(){
  UseCreateStore().changenoticeopen();
}

const dialogOpen = ref(false);

watch(() => UseCreateStore().noticeopen, (newValue) => {
  if (newValue && data.value?.existednumber !== undefined && data.value.existednumber !== 0) {
    dialogOpen.value = true;
  }
});
</script>

<style scoped>

    .navigate {
      display: flex;
      flex-grow: 1;
      justify-content: space-around;
      position: absolute;
      bottom: 0px;
      width: 100%;
    }
    .navigate a {
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

</style>