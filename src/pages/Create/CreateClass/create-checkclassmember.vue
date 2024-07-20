<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { toast } from 'vue-sonner';
import { ArrowLeft } from 'lucide-vue-next';
import {  onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'
import {  useRoute, useRouter} from 'vue-router';
import { Search } from 'lucide-vue-next';
import { createapi } from '@/pages/Api/CreateIndex';
import { checkprerequisite,CheckClassCreateMember, CheckClassUserMember } from '@/pages/Interface/CreateInterface';
import { userapi } from '@/pages/Api/UserIndex';



const router = useRouter();
const isLoading = ref(false);

const searchname= ref("") ;

const classcreatemember = ref<CheckClassCreateMember[]>([])
const classusermember = ref<CheckClassUserMember[]>([])

let tranport= useRoute();
const user = tranport.query.user as string 
const classname = tranport.query.class_name
const identites = tranport.query.identites

onMounted(()=>{
  isLoading.value= true;

  switch(identites){
        case 'USER':
        userapi.checkclassmember(user).then((res)=>{
          isLoading.value = false;
          if( res.err_code === 0 ){
            classusermember.value = res.classmember
            classcreatemember .value = res.classmember
          } else{
            toast.error( res.err_msg );
          }
        })
          break;
        case 'CREATE':
        const params : checkprerequisite = {
          user : user,
        }
        createapi.checkclassmember(params).then((res)=>{
          isLoading.value = false;
          if( res.err_code === 0 ){
            classcreatemember .value = res.classmember
            classusermember.value = res.classmember
          } else{
            toast.error( res.err_msg );
          }
        })
          break;
      }

 


  
})

async function onSearch(event:Event) {
  event.preventDefault()
  const search_name = searchname.value as string;
 router.push({path:"/checkoneself" , query:{user,search_name}})

  

}

function oncheckmember_oneself(search_name : string){
  router.push({path:"/checkoneself" , query:{user,search_name}})
}

function onreturn(){
  router.back();
}


</script>


<template>
  <div class="static mt-2">
    <ArrowLeft class="float-left ml-2 mt-1" @click="onreturn" />

    <div class="grid grid-cols-6 gap-4">
        <span  class="  text-center text-2xl col-start-2 col-span-4  font-bold">{{classname}}</span> 
      </div>

    <form @submit="onSearch">
      <div class="static">
        <Button variant="outline" size="icon" class="absolute right-2 border-transparent ">
          <Search />
        </Button>
        <Input 
          v-model:model-value="searchname"
          type="text"
          placeholder="搜索"
          :disabled="isLoading"
          />    
      </div>    
    </form>
    <h3 class="ml-2 mt-1 mb-1">创建者</h3>
      <div class="grid grid-cols-4 gap-2 mt-2 ml-5">
      
          <div v-for="createview in classcreatemember" @click="oncheckmember_oneself(createview.create.create_name)">
              {{createview.create.create_name}}
          </div>
        
      </div>

    <h3 class="ml-2 mb-1 mt-1">成员</h3>
      <div class="grid grid-cols-4 gap-2 mt-2 ml-5">
        <div v-for="userview in classusermember">
          <div v-for="user_view in userview.user" @click="oncheckmember_oneself(user_view.user_name)">
            {{user_view.user_name}}
          </div>
        </div>
      </div>
    
     
     
    
      
      


  </div>
</template>