<template>
  <textarea
    v-model="modelValue"
    class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = computed({
  get() {
    return props.modelValue ?? props.defaultValue ?? ''
  },
  set(newValue: string | number) {
    emits('update:modelValue', newValue)
  },
})
</script>
