<template>
	<div>
		<h2>
			Todo 一覧です
		</h2>
		<ul>
			<TodoItem
				v-for="todo in todoStore.state.todos"
				:key="todo.id"
				:todo="todo"
				@click-title="clickTitle"
				@click-delete="clickDelete"
			>
				{{ todo.title }}
			</TodoItem>
		</ul>
		<router-link to="/new">
			新規作成
		</router-link>
	</div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { useRouter } from 'vue-router'
import TodoItem from '@/components/TodoItem.vue'
import { todoKey } from '../store/todo'

export default defineComponent({
	components: {
		TodoItem
	},
	setup() {
		const todoStore = inject(todoKey)
		if (!todoStore) {
			throw new Error('todoStore is not found')
		}

		const router = useRouter()

		// 引数として受け取った todo の id を元に todoStore の todo を更新する
		const clickDelete = (id: number) => {
			todoStore.deleteTodo(id)
		}

		// 引数として受け取った todo の id を元に編集ページに遷移する
		const clickTitle = (id: number) => {
			router.push(`/edit/${id}`)
		}

		return {
			todoStore,
			clickDelete,
			clickTitle
		}
	}
})

</script>
