<template>
  <div>
    <h2>Todo を編集する</h2>
    <!-- ① -->
    <div v-if="error">
      ID: {{ $route.params.id }} の Todo は存在しません
    </div>
    <form v-else @submit.prevent="onSubmit">
      <div>
        <label for="title">タイトル</label>
        <input id="title" v-model="data.title" type="text" />
      </div>
      <div>
        <label for="description">説明</label>
        <textarea id="description" v-model="data.description" />
      </div>
      <div>
        <label for="status">ステータス</label>
        <select id="status" v-model="data.status">
          <option value="waiting">waiting</option>
          <option value="working">working</option>
          <option value="completed">completed</option>
          <option value="pending">pending</option>
        </select>
      </div>
      <button @click="onSubmit">更新する</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Params } from '@/store/todo/types'
import { todoKey } from '@/store/todo'

export default defineComponent({
  setup() {
    const todoStore = inject(todoKey)
    if (!todoStore) {
      throw new Error('todoStore is not provided')
    }

    const router = useRouter()
    // ②
    const route = useRoute()
    // ②
    const id = Number(route.params.id)
    try {
      // ③
      const todo = todoStore.getTodo(id)

      // ④
      const data = reactive<Params>({
        title: todo.title,
        description: todo.description,
        status: todo.status,
      })

      const onSubmit = () => {
        const { title, description, status } = data
        // ⑤
        todoStore.updateTodo(id, {
          ...todo,
          title,
          description,
          status,
        })
        router.push('/')
      }

      return {
        error: false,
        data,
        onSubmit,
      }
    } catch (e) {
      console.error(e)
      return {
        error: true,
      }
    }
  },
})
</script>
