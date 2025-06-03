<template>
  <div class="chat-root">
    <!-- 顶部栏 -->
    <div class="chat-header">
      <span class="chat-title">聊天对象名</span>
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
import { ref, nextTick } from 'vue'
import { useRoute } from 'vue-router'
const input = ref('')
const messages = ref([
  { id: 1, content: '你好！', isSelf: false },
  { id: 2, content: '你好，有什么可以帮您？', isSelf: true }
])
const messagesRef = ref<HTMLElement | null>(null)
  let tranport= useRoute()
  const chatroomid=tranport.query.chatroomid as string
  const charid=tranport.query.charid as string

function send() {
  if (!input.value.trim()) return
  messages.value.push({
    id: Date.now(),
    content: input.value,
    isSelf: true
  })
  input.value = ''
  nextTick(() => {
    if (messagesRef.value) {
      messagesRef.value.scrollTop = messagesRef.value.scrollHeight
    }
  })
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
