<template>
  <div class="relative inline-block" @mouseenter="showTooltip" @mouseleave="hideTooltip">
    <slot></slot>
    <transition name="tooltip-fade">
      <div
        v-if="isVisible"
        class="absolute z-50 bg-white/10 text-white text-sm px-3 py-2 rounded-md shadow-lg whitespace-nowrap"
        :class="positionClasses"
      >
        <slot name="content">{{ content }}</slot>
        <div :class="arrowClasses"></div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  content: string
  position: 'top' | 'bottom' | 'left' | 'right'
}>()

const isVisible = ref(false)

function showTooltip() {
  isVisible.value = true
}

function hideTooltip() {
  isVisible.value = false
}

const positionClasses = computed(() => {
  switch (props.position) {
    case 'top':
      return ['bottom-[125%]', 'left-1/2', '-translate-x-1/2']
    case 'bottom':
      return ['top-[125%]', 'left-1/2', '-translate-x-1/2']
    case 'left':
      return ['right-[125%]', 'top-1/2', '-translate-y-1/2']
    case 'right':
      return ['left-[125%]', 'top-1/2', '-translate-y-1/2']
    default:
      return []
  }
})

const arrowClasses = computed(() => {
  const baseClasses = ['absolute', 'border-[5px]', 'border-solid']
  switch (props.position) {
    case 'top':
      return [...baseClasses, 'top-full', 'left-1/2', '-translate-x-1/2', 'border-t-gray-800', 'border-x-transparent', 'border-b-transparent']
    case 'bottom':
      return [...baseClasses, 'bottom-full', 'left-1/2', '-translate-x-1/2', 'border-b-gray-800', 'border-x-transparent', 'border-t-transparent']
    case 'left':
      return [...baseClasses, 'top-1/2', 'left-full', '-translate-y-1/2', 'border-l-gray-800', 'border-y-transparent', 'border-r-transparent']
    case 'right':
      return [...baseClasses, 'top-1/2', 'right-full', '-translate-y-1/2', 'border-r-gray-800', 'border-y-transparent', 'border-l-transparent']
    default:
      return []
  }
})
</script>

<style scoped>
.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity 0.3s ease;
}
.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
}
</style>
