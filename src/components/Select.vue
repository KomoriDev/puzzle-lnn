<template>
  <div
    ref="selectRef"
    class="relative"
  >
    <div
      :id="id"
      :name="name"
      class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all cursor-pointer flex justify-between items-center"
      :class="{ 'border-blue-500 bg-white/15': showOptions }"
      @click="toggleOptions"
    >
      <div
        class="truncate overflow-hidden mr-2"
      >
        {{ label || placeholder }}
      </div>

      <div
        class="border-b-2 border-r-2 border-solid p-[3px] inline-block ml-2 transition-all duration-300"
        :class="{
          'border-blue-500 rotate-[225deg] translate-y-1/4': showOptions,
          'border-gray-400 rotate-45 -translate-y-1/4': !showOptions,
        }"
      ></div>
    </div>
    <Transition name="dropdown">
      <div
        v-if="showOptions"
        class="absolute z-10 w-full mt-2 p-2 rounded-lg shadow-lg flex flex-col gap-1"
        :style="{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.1)' }"
      >
        <div
          v-for="option in options"
          :key="option.value"
          class="px-2 py-2 rounded-md w-full transition-all duration-300 cursor-pointer text-white hover:bg-white/20"
          @click="onClickOption(option)"
        >
          <span class="text-white">{{ option.label }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

interface OptionType {
  value: any
  label: string
}

const props = defineProps<{
  options: OptionType[]
  modelValue: any
  placeholder?: string
  id?: string
  name?: string
}>()

const emit = defineEmits(['update:modelValue', 'change'])

const label = ref<string>('')
const showOptions = ref<boolean>(false)
const selectRef = ref<HTMLElement | null>(null)

function updateLabel() {
  const selectedOption = props.options.find((item: OptionType) => item.value === props.modelValue)
  label.value = selectedOption ? selectedOption.label : (props.placeholder || '')
}

onMounted(() => {
  updateLabel()
  document.addEventListener('click', handleClickOutside)
})

watch(() => [props.options, props.modelValue], () => {
  updateLabel()
}, { deep: true })

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

function handleClickOutside(event: MouseEvent) {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    showOptions.value = false
  }
}

function onClickOption(val: OptionType) {
  label.value = val.label
  emit('update:modelValue', val.value)
  emit('change', val.value)
  showOptions.value = false
}

function toggleOptions() {
  showOptions.value = !showOptions.value
}
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
  transform-origin: top center;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scaleY(0.8) translateY(-10px);
}

.overflow-y-overlay::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-overlay::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.overflow-y-overlay::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}

.overflow-y-overlay::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
