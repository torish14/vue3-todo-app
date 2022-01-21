<template>
  <div>
    <ul>
      <TodoItem
        v-for="todo in todoStore.state.todos"
        :key="todo.id"
        :todo="todo"
        @click-title="clickTitle"
        @click-delete="clickDelete"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { useRouter } from 'vue-router'
import TodoItem from '@/components/TodoItem.vue'
import { todoKey } from '@/store/todo'

export default defineComponent({
  components: {
    TodoItem,
  },
  async setup() {
    const todoStore = inject(todoKey)
    if (!todoStore) {
      throw new Error('todoStore is not found')
    }

    const router = useRouter()
    const clickDelete = (id: number) => {
      todoStore.deleteTodo(id)
    }
    const clickTitle = (id: number) => {
      router.push(`/edit/${id}`)
    }

    await todoStore.fetchTodos()

    return {
      todoStore,
      clickDelete,
      clickTitle,
    }
  },
})
</script>
