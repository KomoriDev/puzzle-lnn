<template>
  <div
    class="animate-fade-up rounded-lg border border-white/20 bg-background-mute text-text shadow-2xl backdrop-blur-xl hover:cursor-pointer"
  >
    <header class="flex flex-col gap-y-1.5 p-6">
      <h3 class="text-2xl font-semibold leading-none tracking-tight">{{ puzzle.title }}</h3>
    </header>
    <div
      class="relative p-6 pt-0 whitespace-pre-wrap"
      @click="toggleExpand"
    >
      <div
        ref="contentElement"
        class="transition-all duration-300" :class="[
          isExpanded ? 'max-h-none' : 'max-h-[7.5rem] overflow-hidden',
        ]"
      >
        {{ puzzle.content }}
      </div>

      <div
        v-if="!isExpanded && isOverflowing"
        class="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background-mute to-transparent pointer-events-none"
      />
    </div>
    <footer class="flex flex-col items-left gap-2 justify-between p-6 pt-0 sm:flex-row">
      <div class="inline-flex">
        <span v-for="topic in puzzle.categories" class="bg-background-soft px-2.5 py-0.5 rounded-full text-sm mr-2">{{ topic }}</span>
      </div>
      <p class="text-text/70 text-sm">发布于：{{ puzzle.created_at }}</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { Tables } from '@/types/database'
import { onMounted, onUpdated, ref } from 'vue'

defineProps<{ puzzle: Tables<'puzzles'> }>()

const isExpanded = ref<boolean>(false)
const isOverflowing = ref<boolean>(false)
const contentElement = ref<HTMLElement | null>(null)

function checkOverflow() {
  if (contentElement.value) {
    isOverflowing.value = contentElement.value.scrollHeight > contentElement.value.clientHeight
  }
}

function toggleExpand() {
  isExpanded.value = !isExpanded.value
}

onMounted(checkOverflow)
onUpdated(checkOverflow)
</script>

<style scoped>
.max-h-\[7\.5rem\]{
  display: -webkit-box;
  line-clamp: 5;
  -webkit-box-orient: vertical;
  line-height: 1.5rem;
}
</style>
