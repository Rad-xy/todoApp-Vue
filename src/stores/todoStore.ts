import { defineStore } from 'pinia'
import { todoService } from '@/api/todoService'
import { computed, ref } from 'vue';

export interface Todo {
  id: string;
  text: string;
  status: "active" | "completed" | "archived";
  isImportant: boolean;
}

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([]);
  const isLoading = ref(false);

  const counts = computed(() => ({
    all: todos.value.length,
    important: todos.value.filter(todo => todo.isImportant).length,
    completed: todos.value.filter(todo => todo.status === 'completed').length
  }));

  const loadTodos = async () => {
    isLoading.value = true;
    try {
      const data = await todoService.getAll();
      todos.value = data.reverse();
    } finally {
      isLoading.value = false;
    }
  };

  const storeTodo = async (text: string) => {
    const newTodo = await todoService.create(text);
    todos.value.unshift(newTodo);
  };

  const removeTodo = async (id: string) => {
    await todoService.delete(id);
    todos.value = todos.value.filter(todo => todo.id !== id);
  };

  const changeStatus = async (id: string) => {
    const todo = todos.value.find(todo => todo.id === id);
    if (!todo) return;
    const newStatus = todo.status === "completed" ? "active" : "completed";
    await todoService.update(id, { status: newStatus });
    todo.status = newStatus;
  };

  const changeImportant = async (id: string) => {
    const todo = todos.value.find(todo => todo.id === id);
    if (!todo) return;
    const newVal = !todo.isImportant;
    await todoService.update(id, { isImportant: newVal });
    todo.isImportant = newVal;
  };

  return { 
    todos, isLoading, counts, 
    loadTodos, storeTodo, removeTodo, changeStatus, changeImportant 
  };
});
