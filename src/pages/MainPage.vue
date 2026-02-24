<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import TodoItem from "@/components/TodoItem.vue";
import { useTodoStore } from "@/stores/todoStore";

const props = defineProps<{ filter: string }>();

const store = useTodoStore();

const todo = reactive({ text: "" });

const filteredTodos = computed(() => {
  if (props.filter === "important")
    return store.todos.filter((todo) => todo.isImportant);
  if (props.filter === "completed")
    return store.todos.filter((todo) => todo.status === "completed");
  return store.todos;
});

const handleAdd = async () => {
  if (!todo.text.trim()) return;
  await store.storeTodo(todo.text);
  todo.text = "";
};

onMounted(store.loadTodos);
</script>

<template>
  <div v-if="props.filter === 'all'" class="m-10">
    <form
      class="flex items-center gap-2 w-full max-w-md"
      @submit.prevent="handleAdd"
    >
      <Input v-model="todo.text" />
      <Button> Добавить </Button>
    </form>
  </div>
  <div class="m-10 max-w-md">
    <h1 class="text-2xl font-bold mb-4">
      {{
        { all: 'Мои задачи', important: 'Важные', completed: 'Завершенные' }[props.filter]
      }}
    </h1>
    <div v-if="store.isLoading" class="flex justify-center py-10">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"
      ></div>
    </div>
    <div v-else class="space-y-2">
      <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @delete="store.removeTodo"
        @toggle-status="store.changeStatus"
        @toggle-important="store.changeImportant"
      />
      <p
        v-if="filteredTodos.length === 0"
        class="text-center text-slate-400 py-10"
      >
        Здесь пока пусто...
      </p>
    </div>
  </div>
</template>
