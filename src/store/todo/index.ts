import { InjectionKey, reactive, readonly } from 'vue'
import {
  Todo,
  TodoState,
  TodoStore,
  Params,
} from '@/store/todo/types'
import Repository, { TODOS } from '@/clients/RepositoryFactory'
const TodoRepository = Repository[TODOS]

// reactive は､リアクティブデータを宣言する
const state = reactive<TodoState>({
  todos: [],
})

const fetchTodos = async (): Promise<void> => {
  state.todos = await TodoRepository.getAll()
}

const fetchTodo = async (id: number): Promise<void> => {
  const todo = await TodoRepository.get(id)
  state.todos.push(todo)
}

// id を指定して Todo を取得する
const getTodo = (id: number): Todo => {
  const todo = state.todos.find((todo) => todo.id === id)
  if (!todo) {
    throw new Error(`cannot find todo by id:${id}`)
  }
  return todo
}

// 新たに Todo を追加する
const addTodo = async (todo: Params): Promise<void> => {
  const result = await TodoRepository.create(todo)
  state.todos.push(result)
}

// id を指定して Todo を更新する
const updateTodo = async (id: number, todo: Todo): Promise<void> => {
  const result = await TodoRepository.update(id, todo)
  const index = state.todos.findIndex((todo) => todo.id === id)
  if (index === -1) {
    throw new Error(`cannot find todo by id:${id}`)
  }
  state.todos[index] = result
}

// id を指定して Todo を削除する
const deleteTodo = (id: number): void => {
  TodoRepository.delete(id)
  state.todos = state.todos.filter((todo) => todo.id !== id)
}

const todoStore: TodoStore = {
  state: readonly(state),
  fetchTodos,
  fetchTodo,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
}

export default todoStore

// ストアを provide / inject するため､必要なキーを宣言する
export const todoKey: InjectionKey<TodoStore> = Symbol('todoKey')
