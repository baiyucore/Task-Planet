<script setup lang="ts">
import { ref } from 'vue'
import { useQuery, keepPreviousData } from '@tanstack/vue-query'

import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,

} from '@/components/ui/pagination'

import {
  Button,
} from '@/components/ui/button'
import { testapi } from '../Api/Test'


const Page = ref(1)
const { isPending, isError, data, error, isPlaceholderData } =
  useQuery({
    queryKey: ['projects', Page],
    queryFn: () => testapi.test(Page.value),
    placeholderData: keepPreviousData,
  })
 

function PageChange(item: number){
  data.value=testapi.test(item)

}


</script>

<template>
<div>

  <h1>Posts</h1>
  <p>Current Page: {{ Page}} | Previous data: {{ isPlaceholderData }}</p>
  <div v-if="isPending">Loading...</div>
  <div v-else-if="isError">An error has occurred: {{ error }}</div>
  <div v-else-if="data">

    <ul>
      <li v-for="item in data.list" :key="item._id">
        {{ item.id }}
      </li>
    </ul>
   

  </div>

  <Pagination v-if="data" v-slot="{ page }" :total="data.totalPages" :items-per-page="2" :sibling-count="1" :default-page="1">
    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
      <PaginationFirst @click="PageChange(1)"/>

       
      <template v-for="(item, index) in items">
        
        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
          <Button @click="PageChange(item.value)" class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>
      <PaginationLast @click="PageChange(data.totalPages/2)" />
      
    </PaginationList>
  </Pagination>
</div>





</template>
