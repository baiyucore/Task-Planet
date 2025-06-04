<template>
  <div class="chat-root">
    <!-- 顶部栏 -->     
      <div class="flex border-4 border-transparent border-b-slate-950  justify-between chat-header">

        <ArrowLeft class="mt-2  cursor-pointer" @click="onreturn" />
        <span  class="  cursor-default text-2xl  font-bold chat-title">{{ chatedname }}</span> 
   
        <div></div>

      </div>

    <!-- 消息区 -->
    <div class="chat-messages" ref="messagesRef">
      <div
        v-for="msg in messages"
        :key="msg.id"
        :class="['chat-bubble', msg.isSelf ? 'self' : 'other']"
      >
        <span class="chat-content">{{ msg.content }}</span>
      </div>
    </div>
    <!-- 输入区 -->
    <div class="chat-inputbar">
      <input
        v-model="input"
        class="chat-input"
        type="text"
        placeholder="请输入消息"
        @keyup.enter="send"
      />
      <button class="chat-send" @click="send">发送</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { ref, nextTick, onMounted, watch, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft  } from 'lucide-vue-next';
import { createapi } from '@/pages/Api/CreateIndex';

import { Userinfor } from '@/store/user';

const userinfor = Userinfor()
const input = ref('')
const messages = ref([

])
const messagesRef = ref<HTMLElement | null>(null)
  let tranport= useRoute()
  const chatroomid=tranport.query.chatroomid as string
  const chatedname = tranport.query.chatedname as string


  const getchatcontent = async () => {
    const rest = await createapi.getchatcontent({
      chatroomid: chatroomid,
    })
    if (rest.err_code === 0) {
      messages.value = rest.res.map(msg => ({
        id: msg._id || msg.chatroomid + '_' + msg.content, // 保证唯一
        content: msg.content,
        isSelf: msg.chatid === userinfor.userid
      }))
    }
  }
  
  let timer:unknown;

  onMounted(() => {
    getchatcontent()
    timer = setInterval(() => {
      getchatcontent()
    }, 2000)
  })

  onUnmounted(() => {
    // eslint-disable-next-line no-undef
    if (timer) clearInterval(timer as NodeJS.Timeout)
  })





async function send() {
  if (!input.value.trim()) return
  messages.value.push({
    id: Date.now(),
    content: input.value,
    isSelf: true
  })
  const rest = await createapi.sendchatcontent({
    chatroomid:chatroomid,
    content:input.value,
    chatid:userinfor.userid
  })
  input.value = ''
  nextTick(() => {
    if (messagesRef.value) {
      messagesRef.value.scrollTop = messagesRef.value.scrollHeight
    }
  })
}
function onreturn(){
  router.push({path:'/userspace'})
}
</script>

<style scoped>
.chat-root {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f5f7;
}
.chat-header {
  height: 48px;
  background: #1976d2;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-size: 18px;
  font-weight: bold;
}
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.chat-bubble {
  max-width: 70%;
  padding: 8px 12px;
  border-radius: 16px;
  font-size: 16px;
  word-break: break-all;
  display: inline-block;
}
.chat-bubble.self {
  align-self: flex-end;
  background: #1976d2;
  color: #fff;
  border-bottom-right-radius: 4px;
}
.chat-bubble.other {
  align-self: flex-start;
  background: #fff;
  color: #333;
  border-bottom-left-radius: 4px;
  border: 1px solid #e0e0e0;
}
.chat-inputbar {
  display: flex;
  align-items: center;
  padding: 8px;
  background: #fff;
  border-top: 1px solid #eee;
}
.chat-input {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 8px 14px;
  font-size: 16px;
  outline: none;
}
.chat-send {
  margin-left: 8px;
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 8px 18px;
  font-size: 16px;
  cursor: pointer;
}
</style>
