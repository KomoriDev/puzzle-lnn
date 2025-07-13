<template>
  <label class="inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      class="hidden"
      :checked="modelValue"
      @change="handleChange"
    />
    <div
      class="flex items-center px-2 py-1 rounded-lg transition-all focus-within:border-blue-500 focus-within:bg-white/15"
      :class="{
        'bg-blue-400/15 border border-white/20': modelValue,
        'bg-white/10 border border-white/20': !modelValue,
      }"
    >
      <span class="text-white text-xs select-none">
        {{ label }}
      </span>
    </div>
  </label>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  modelValue: boolean
  label: string
}>()

const emit = defineEmits(['update:modelValue'])

function handleChange(event: Event) {
  const checkbox = event.target as HTMLInputElement
  emit('update:modelValue', checkbox.checked)
}
</script>
