<script setup lang="ts">
import { useTodoStore } from "@/stores/todoStore";

const store = useTodoStore();
</script>

<template>
  <div
    class="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden"
  >
    <aside
      class="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0"
    >
      <div class="p-6 border-b border-slate-100">
        <h1
          class="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"
        >
          Todo App
        </h1>
      </div>
      <nav class="flex flex-col gap-1 p-4 space-y-1 overflow-y-auto">
        <RouterLink
          :to="{name: 'home'}"
          class="group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 active:scale-[0.98]"
        >
          <span
            class="text-xl group-hover:scale-110 transition-transform duration-200"
            >📂</span
          >
          <span class="font-medium">Все задачи</span>
          <span
            class="ml-auto text-xs font-semibold bg-slate-100 group-hover:bg-indigo-100 px-2 py-0.5 rounded-md transition-colors"
            >{{ store.counts.all }}</span
          >
        </RouterLink>

        <RouterLink
          :to="{name: 'important'}"
          class="group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-slate-600 hover:bg-amber-50 hover:text-amber-600 active:scale-[0.98]"
        >
          <span
            class="text-xl group-hover:rotate-12 transition-transform duration-200"
            >⭐</span
          >
          <span class="font-medium">Важные</span>
          <span
            class="ml-auto text-xs font-semibold bg-slate-100 group-hover:bg-indigo-100 px-2 py-0.5 rounded-md transition-colors"
            >{{ store.counts.important }}</span
          >
        </RouterLink>

        <RouterLink
          :to="{name: 'completed'}"
          class="group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 active:scale-[0.98]"
        >
          <span class="text-xl group-hover:bounce transition-all">✔️</span>
          <span class="font-medium">Завершенные</span>
          <span
            class="ml-auto text-xs font-semibold bg-slate-100 group-hover:bg-indigo-100 px-2 py-0.5 rounded-md transition-colors"
            >{{ store.counts.completed }}</span
          >
        </RouterLink>
      </nav>
    </aside>

    <main class="flex-1 overflow-y-auto">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.router-link-active {
  background-color: #f5f3ff !important;
  color: #4f46e5 !important;
}

.router-link-active[to="/important"] {
  background-color: #fffbeb !important;
  color: #d97706 !important;
  box-shadow: inset 4px 0 0 -1px #d97706;
}
</style>
