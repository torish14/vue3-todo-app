<template>
  <div class="card">
    <div>
      <span
        class="title"
        @click="clickTitle"
      >{{ todo.title }}</span>
      <!-- 動的にクラスをバインディング -->
      <span
        class="status"
        :class="todo.status"
      >{{ todo.status }}</span>
    </div>
    <div class="body">
      作成日:{{ formatDate }}
    </div>
    <hr>
    <div class="action">
      <button @click="clickDelete">
        削除
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Todo } from '@/store/todo/types'
import { defineComponent, PropType } from 'vue'
import { useFormatDate } from '@/composables/use-format-date'

export default defineComponent({
	// 親コンポーネントから子コンポーネントにデータを渡す
	props: {
		todo: {
			type: Object as PropType<Todo>,
			required: true
		}
	},
	// 親コンポーネントから子コンポーネントにデータを渡す
	emits: ['clickDelete', 'clickTitle'],
	// setup関数の第一引数から props､第二引数の context から emits を受け取る
	setup(props, { emit }) {
		const clickDelete = () => {
			emit('clickDelete', props.todo.id)
		}

		const clickTitle = () => {
			emit('clickTitle', props.todo.id)
		}

		// リアクティブな要素を返す関数を返す
		const formatDate = useFormatDate(props.todo.createdAt)

		return {
			clickDelete,
			clickTitle,
			formatDate
		}
	}
})
</script>

<style scoped>
.card {
	border: 1px solid #ccc;
	box-shadow: 2px 2px 4px gray;
	margin-bottom: 20px;
	width: 250px;
}

.title {
	font-size: 25px;
	font-weight: 400;
	padding: 5px;
}

.status {
	padding: 3px;
}

.waiting {
	background-color: #e53935;
}

.working {
	background-color: #80cbc4;
}

.completed {
	background-color: #42a5f5;
}

.pending {
	background-color: #ffee58;
}

.body {
	margin: 5px;
}

.action {
	margin: 5px;
}
</style>
