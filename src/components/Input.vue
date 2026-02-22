<script setup lang="ts">
const model = defineModel();
</script>

<template>
  <div class="relative w-full max-w-lg">
    <input
      type="text"
      class="w-full bg-white/20 backdrop-blur-md border border-black/30 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/40 transition-all placeholder:text-slate-500"
      placeholder="Купить молока..."
      v-model="model"
    />
  </div>
</template>

<style lang="postcss" scoped></style>
