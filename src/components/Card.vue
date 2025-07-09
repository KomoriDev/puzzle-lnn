<template>
  <div
    class="animate-fade-up rounded-lg border border-white/20 bg-background-mute text-text shadow-2xl backdrop-blur-xl hover:cursor-pointer"
  >
    <header class="flex flex-col gap-y-1.5 p-6">
      <h3 class="text-2xl font-semibold leading-none tracking-tight">{{ props.title }}</h3>
    </header>
    <div class="p-6 pt-0">{{ props.content }}</div>
    <footer class="flex items-center p-6 pt-0">
      <div class="inline-flex gap-x-1">
        <span v-for="topic in props.topics" class="bg-background-soft px-2.5 py-0.5 rounded-full text-sm mr-2">{{ topic }}</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string
  content: string
  topics?: string[]
}>()
</script>
