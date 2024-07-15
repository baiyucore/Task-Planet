<script setup lang="ts" name="News">

import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'

import {
  Button,
} from '@/components/ui/button'

  import {reactive} from 'vue'
import test from 'node:test';
import { NewLineKind } from 'typescript';

  const newsList = reactive([
    {id:'asfdtrfay01',title:'很好的抗癌食物1',content:'西蓝花'},
    {id:'asfdtrfay02',title:'如何一夜暴富2',content:'学IT'},
    {id:'asfdtrfay03',title:'震惊，万万没想到3',content:'明天是周一'},
    {id:'asfdtrfay04',title:'好消息！好消息！4',content:'快过年了'},
    {id:'asfdtrfay05',title:'很好的抗癌食物5',content:'西蓝花'},
    {id:'asfdtrfay06',title:'如何一夜暴富6',content:'学IT'},
    {id:'asfdtrfay07',title:'震惊，万万没想到7',content:'明天是周一'},
    {id:'asfdtrfay08',title:'好消息！好消息8！',content:'快过年了'},
    {id:'asfdtrfay09',title:'很好的抗癌食物9',content:'西蓝花'},
    {id:'asfdtrfay10',title:'如何一夜暴富10',content:'学IT'},
    {id:'asfdtrfay11',title:'震惊，万万没想到11',content:'明天是周一'},
    {id:'asfdtrfay112',title:'好消息！好消息！12',content:'快过年了'},
  ])


</script>





<template>
<div>
  <ul>
    <li v-for="news in newsList" :key="news.id">
   {{ news.title }}

    </li>
  </ul>

  <Pagination :data="newsList" v-slot="{ page }" :total="newsList.length" :sibling-count="1" show-edges :default-page="2" :items-per-page="2"   >
    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
      <PaginationFirst />
      <PaginationPrev />
        
      <template v-for="(item, index) in items">
        
        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
          <Button  class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext />
      <PaginationLast />
    </PaginationList>
  </Pagination>

</div>

  


</template>


<style scoped>
/* 新闻 */
.news {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  height: 100%;
}
.news ul {
  margin-top: 30px;
  list-style: none;
  padding-left: 10px;
}
.news li>a {
  font-size: 18px;
  line-height: 40px;
  text-decoration: none;
  color: #64967E;
  text-shadow: 0 0 1px rgb(0, 84, 0);
}
.news-content {
  width: 70%;
  height: 90%;
  border: 1px solid;
  margin-top: 20px;
  border-radius: 10px;
}
</style>