<script setup lang="ts">
import { reactive, ref } from "vue";
import Button from "./components/Button.vue";
import Input from "./components/Input.vue";
import TodoItem from "./components/TodoItem.vue";

interface Todo {
  id: number;
  text: string;
  status: "active" | "completed" | "archived";
  isImportant: boolean;
}

const todos = ref<Todo[]>([]);
const todo = reactive({
  text: "",
});

const storeTodo = () => {
  if (!todo.text.trim()) return;
  todos.value.unshift({
    id: Date.now(),
    text: todo.text,
    status: "active",
    isImportant: false,
  });
  todo.text = "";
};

const removeTodo = (id: number) => {
  todos.value = todos.value.filter((todo) => todo.id !== id);
};

const changeStatus = (id: number) => {
  const todo = todos.value.find((todo) => todo.id === id);
  if (todo) {
    todo.status = todo.status === "completed" ? "active" : "completed";
  }
};

const changeImportant = (id: number) => {
  const todo = todos.value.find((todo) => todo.id === id);
  if (todo) {
    todo.isImportant = todo.isImportant === false ? true : false;
  }
};
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
  <div class="space-y-2 m-10 max-w-md">
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @delete="removeTodo"
      @toggle-status="changeStatus"
      @toggle-important="changeImportant"
    />
  </div>
</template>

<style scoped></style>
