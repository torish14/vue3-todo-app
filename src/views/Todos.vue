<template>
  <div>
    <h2>Todo 一覧です</h2>
    <Suspense>
      <AsyncTodos />
    </Suspense>
    <router-link to="/new"> 新規作成 </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AsyncTodos from '@/components/AsyncTodos.vue'

export default defineComponent({
  components: {
    AsyncTodos,
  },
})
</script>
