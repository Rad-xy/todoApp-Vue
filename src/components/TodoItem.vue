<script setup lang="ts">
interface Props {
  todo: {
    id: number;
    text: string;
    status: "active" | "completed" | "archived";
    isImportant: boolean;
  };
}

const props = defineProps<Props>();

const emit = defineEmits(["delete", "toggle-status", "toggle-important"]);
</script>

<template>
  <div
    class="flex items-center gap-4 w-full p-3 bg-white hover:bg-slate-50 rounded-xl transition-all"
  >
    <input
      type="checkbox"
      :checked="todo.status === 'completed'"
      @change="emit('toggle-status', todo.id)"
      class="w-5 h-5 flex-shrink-0 rounded-full border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
    />
    <span
      class="flex-1 text-slate-700 font-medium transition-all break-words"
      :class="{
        'line-through text-slate-400 opacity-50': todo.status === 'completed',
      }"
    >
      {{ todo.text }}
    </span>
    <div class="flex items-center gap-2 flex-shrink-0">
      <button
        @click="emit('toggle-important', todo.id)"
        class="p-1.5 rounded-lg transition-colors hover:bg-amber-100"
        :class="todo.isImportant ? 'text-amber-500' : 'text-slate-300'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
      </button>
      <button
        @click="emit('delete', todo.id)"
        class="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style lang="postcss" scoped></style>
