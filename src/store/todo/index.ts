import { InjectionKey, reactive, readonly } from 'vue'
import {
  Todo,
  TodoState,
  TodoStore,
  Params,
} from '@/store/todo/types'

// 永続化していないため､とりあえずモックデータを用意
const mockTodo: Todo[] = [
  {
    id: 1,
    title: 'todo1',
    description: '1つ目の Todo',
    status: 'waiting',
    createdAt: new Date('2022-01-09'),
    updatedAt: new Date('2022-01-09'),
  },
  {
    id: 2,
    title: 'todo2',
    description: '2つ目の Todo',
    status: 'waiting',
    createdAt: new Date('2022-01-10'),
    updatedAt: new Date('2022-01-10'),
  },
  {
    id: 3,
    title: 'todo3',
    description: '3つ目の Todo',
    status: 'working',
    createdAt: new Date('2022-01-11'),
    updatedAt: new Date('2022-01-11'),
  },
  {
    id: 4,
    title: 'todo4',
    description: '4つ目の Todo',
    status: 'waiting',
    createdAt: new Date('2022-01-12'),
    updatedAt: new Date('2022-01-12'),
  },
  {
    id: 5,
    title: 'todo5',
    description: '5つ目の Todo',
    status: 'working',
    createdAt: new Date('2022-01-13'),
    updatedAt: new Date('2022-01-13'),
  },
]

// reactive は､リアクティブデータを宣言する
const state = reactive<TodoState>({
  todos: mockTodo,
})

// 新たに作成された Todo の初期化処理
const initializeTodo = (todo: Params) => {
  const date = new Date()
  return {
    id: date.getTime(),
    title: todo.title,
    description: todo.description,
    status: todo.status,
    createdAt: date,
    updatedAt: date,
  } as Todo
}

// id を指定して Todo を取得する
const getTodo = (id: number) => {
  const todo = state.todos.find((todo) => todo.id === id)
  if (!todo) {
    throw new Error('Todo not found')
  }
  return todo
}

// 新たに Todo を追加する
const addTodo = (todo: Params) => {
  state.todos.push(initializeTodo(todo))
}

// id を指定して Todo を更新する
const updateTodo = (id: number, todo: Todo) => {
  const index = state.todos.findIndex((t) => t.id === id)
  if (index === -1) {
    throw new Error('Todo not found')
  }
  state.todos[index] = todo
}

// id を指定して Todo を削除する
const deleteTodo = (id: number) => {
  state.todos = state.todos.filter((todo) => todo.id !== id)
}

const todoStore: TodoStore = {
  state: readonly(state),
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
}

export default todoStore

// ストアを provide / inject するため､必要なキーを宣言する
export const todoKey: InjectionKey<TodoStore> = Symbol('todo')
