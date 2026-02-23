<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import Button from "./components/Button.vue";
import Input from "./components/Input.vue";
import TodoItem from "./components/TodoItem.vue";
import { todoService } from "./api/todoService";

interface Todo {
  id: string;
  text: string;
  status: "active" | "completed" | "archived";
  isImportant: boolean;
}

const todos = ref<Todo[]>([]);
const todo = reactive({
  text: "",
});
const isLoading = ref(false);

const loadTodos = async () => {
  isLoading.value = true;
  try {
    const data = await todoService.getAll();
    todos.value = data.reverse();
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
    alert("Не удалось загрузить список задач с сервера");
  } finally {
    isLoading.value = false;
  }
};

const storeTodo = async () => {
  if (!todo.text.trim()) return;

  try {
    const newTodoFromServer = await todoService.create(todo.text);

    todos.value.unshift(newTodoFromServer);

    todo.text = "";
  } catch (error) {
    alert("Не удалось сохранить задачу на сервере");
    console.error(error);
  }
};

const removeTodo = async (id: string) => {
  try {
    await todoService.delete(id);
    todos.value = todos.value.filter((todo) => todo.id !== id);
  } catch (e) {
    console.error("Ошибка удаления:", e);
  }
};

const changeStatus = async (id: string) => {
  const todo = todos.value.find((t) => t.id === id);
  if (!todo) return;

  const newStatus = todo.status === "completed" ? "active" : "completed";

  try {
    await todoService.update(id, { status: newStatus });
    todo.status = newStatus;
  } catch (e) {
    console.error("Ошибка статуса:", e);
  }
};

const changeImportant = async (id: string) => {
  const todo = todos.value.find((t) => t.id === id);
  if (!todo) return;

  const newImportant = !todo.isImportant;

  try {
    await todoService.update(id, { isImportant: newImportant });
    todo.isImportant = newImportant;
  } catch (e) {
    console.error("Ошибка важности:", e);
  }
};

onMounted(loadTodos);
</script>

<template>
  <div class="m-10">
    <form
      class="flex items-center gap-2 w-full max-w-md"
      @submit.prevent="storeTodo"
    >
      <Input v-model="todo.text" />
      <Button> Добавить </Button>
    </form>
  </div>
  <div class="m-10 max-w-md">
    <h1 class="text-2xl font-bold mb-4">Мои задачи</h1>
    <div v-if="isLoading" class="flex justify-center py-10">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"
      ></div>
    </div>
    <div v-else class="space-y-2">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @delete="removeTodo"
        @toggle-status="changeStatus"
        @toggle-important="changeImportant"
      />
      <p v-if="todos.length === 0" class="text-center text-slate-400 py-10">
        Задач пока нет. Добавьте первую!
      </p>
    </div>
  </div>
</template>

<style scoped></style>
