<template>
  <h2>Todo を作成する</h2>
  <!-- フォームがサブミットされたときに onSubmit を呼び出す -->
  <form @submit.prevent="onSubmit">
    <div>
      <label for="title">タイトル</label>
      <!-- v-model でバインディング -->
      <input id="title" v-model="data.title" type="text" />
    </div>
    <div>
      <label for="description">説明</label>
      <!-- v-model でバインディング -->
      <textarea id="description" v-model="data.description" />
    </div>
    <div>
      <label for="status">ステータス</label>
      <!-- v-model でバインディング -->
      <select id="status" v-model="data.status">
        <option value="waiting">waiting</option>
        <option value="working">working</option>
        <option value="completed">completed</option>
        <option value="pending">pending</option>
      </select>
    </div>
    <!-- フォームがサブミットされたときに onSubmit を呼び出す -->
    <button @click="onSubmit">作成する</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, inject, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Params } from '@/store/todo/types'
import { todoKey } from '@/store/todo'

export default defineComponent({
  setup() {
    // ストアを inject
    const todoStore = inject(todoKey)
    if (!todoStore) {
      throw new Error('todoStore is not found')
    }

    // router を利用するため､useRouter を呼び出す
    const router = useRouter()

    // データを reactive にする
    const data = reactive<Params>({
      title: '',
      description: '',
      status: 'waiting',
    })

    // フォームがサブミットされたときに onSubmit を呼び出す
    const onSubmit = () => {
      const { title, description, status } = data
      todoStore.addTodo({ title, description, status })
      router.push('/')
    }

    return {
      data,
      onSubmit,
    }
  },
})
</script>
