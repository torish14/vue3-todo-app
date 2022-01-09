<template>
	<div>
		<h2>
			Todo 一覧です
		</h2>
		<ul>
			<li v-for="todo in todoStore.state.todos" :key="todo.id">
				{{ todo.title }}
			</li>
		</ul>
		<router-link to="/new">
			新規作成
		</router-link>
	</div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { todoKey } from '../store/todo'

export default defineComponent({
	setup() {
		const todoStore = inject(todoKey)
		if (!todoStore) {
			throw new Error('todoStore is not found')
		}

		return {
			todoStore
		}
	}
})

</script>
