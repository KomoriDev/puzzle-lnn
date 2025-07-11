/* 修改自 bihua-university/alisten-ui
 * @src https://github.com/bihua-university/alisten-ui/blob/main/src/components/common/Modal.vue
 * @last-updated 2025-07-06
 * @last-updated-by @wdvxdr1123
 */

/* The MIT License (MIT)
 *
 * Copyright (c) 2025
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * @author bihua-university
 * @website https://github.com/bihua-university/alisten-ui
 *
 */

<template>
  <Transition
    name="modal"
    appear
  >
    <div class="fixed inset-0 flex items-center justify-center" :style="{ zIndex }">
      <Transition
        v-if="enableBackdropTransition"
        name="modal-backdrop"
        appear
      >
        <div
          class="absolute inset-0 bg-black/60"
          @click="handleBackdropClick"
        />
      </Transition>

      <Transition
        name="modal-content"
        appear
      >
        <div
          class="relative bg-background-mute border border-white/20 rounded-2xl w-full mx-4 overflow-hidden max-h-[75vh] flex flex-col shadow-2xl backdrop-blur-xl"
          :class="modalSizeClass"
        >
          <div v-if="showHeader" class="flex-shrink-0 p-6 pb-4 border-b border-white/10">
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-semibold flex items-center text-white gap-2">
                <i
                  v-if="headerIcon"
                  class="mr-3 animate-pulse"
                  :class="[
                    headerIcon,
                    headerIconColorClass,
                  ]"
                />
                {{ title }}
              </h2>
              <button
                v-if="allowBackdropClose"
                class="text-gray-400 hover:text-white transition-colors touch-target p-2 -m-2"
                @click="$emit('close')"
              >
                <i class="fa-solid fa-times text-lg" />
              </button>
            </div>

            <div v-if="subtitle" class="mt-4">
              <p class="text-sm text-gray-400 text-center">
                {{ subtitle }}
              </p>
            </div>
          </div>

          <div class="flex-1 overflow-y-auto scrollable-content">
            <div class="p-6 relative">
              <div class="relative z-10">
                <slot />
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title?: string
  subtitle?: string
  headerIcon?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  theme?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  zIndex?: number
  showHeader?: boolean
  allowBackdropClose?: boolean
  decorationVariant?: 'default' | 'create' | 'confirm'
  enableBackdropTransition?: boolean
}

interface Emits {
  close: []
  backdropClick: []
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  theme: 'primary',
  zIndex: 100,
  showHeader: true,
  allowBackdropClose: true,
  decorationVariant: 'default',
  enableBackdropTransition: true,
})

const emit = defineEmits<Emits>()

const modalSizeClass = computed(() => {
  const sizeMap = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  }
  return sizeMap[props.size]
})

const themeConfig = computed(() => {
  const themes = {
    primary: {
      gradient: 'bg-gradient-to-br from-primary/10 via-purple-500/5 to-pink-500/10',
      headerBg: 'bg-gradient-to-br from-primary/30 to-primary/10',
      headerColor: 'text-primary',
      circles: [
        { class: 'w-40 h-40 bg-primary/20', position: { top: '-5rem', left: '-5rem' }, delay: '0s' },
        { class: 'w-64 h-64 bg-purple-500/15', position: { top: '33%', right: '-8rem' }, delay: '1s' },
        { class: 'w-32 h-32 bg-pink-500/20', position: { bottom: '-4rem', left: '25%' }, delay: '2s' },
      ],
      icons: [
        { iconClass: 'fa-solid fa-music', class: 'text-primary/10 text-6xl', position: { top: '5rem', left: '25%' }, delay: '0s' },
        { iconClass: 'fa-solid fa-headphones', class: 'text-purple-400/10 text-4xl', position: { bottom: '8rem', right: '25%' }, delay: '1.5s' },
        { iconClass: 'fa-solid fa-heart', class: 'text-pink-400/10 text-5xl', position: { top: '50%', left: '2.5rem' }, delay: '0.8s' },
      ],
    },
    success: {
      gradient: 'bg-gradient-to-br from-green-500/15 via-blue-500/8 to-purple-500/15',
      headerBg: 'bg-gradient-to-br from-green-500/40 to-green-500/15',
      headerColor: 'text-green-400',
      circles: [
        { class: 'w-32 h-32 bg-green-500/25', position: { top: '-2.5rem', left: '-2.5rem' }, delay: '0s' },
        { class: 'w-48 h-48 bg-blue-500/20', position: { top: '25%', right: '-4rem' }, delay: '1s' },
        { class: 'w-24 h-24 bg-purple-500/25', position: { bottom: '-2rem', left: '33%' }, delay: '2s' },
      ],
      icons: [],
    },
    warning: {
      gradient: 'bg-gradient-to-br from-yellow-500/15 via-orange-500/8 to-red-500/15',
      headerBg: 'bg-gradient-to-br from-yellow-500/40 to-yellow-500/15',
      headerColor: 'text-yellow-400',
      circles: [
        { class: 'w-32 h-32 bg-yellow-500/25', position: { top: '-2.5rem', left: '-2.5rem' }, delay: '0s' },
        { class: 'w-48 h-48 bg-orange-500/20', position: { top: '25%', right: '-4rem' }, delay: '1s' },
        { class: 'w-24 h-24 bg-red-500/25', position: { bottom: '-2rem', left: '33%' }, delay: '2s' },
      ],
      icons: [],
    },
    danger: {
      gradient: 'bg-gradient-to-br from-red-500/15 via-pink-500/8 to-purple-500/15',
      headerBg: 'bg-gradient-to-br from-red-500/40 to-red-500/15',
      headerColor: 'text-red-400',
      circles: [
        { class: 'w-32 h-32 bg-red-500/25', position: { top: '-2.5rem', left: '-2.5rem' }, delay: '0s' },
        { class: 'w-48 h-48 bg-pink-500/20', position: { top: '25%', right: '-4rem' }, delay: '1s' },
        { class: 'w-24 h-24 bg-purple-500/25', position: { bottom: '-2rem', left: '33%' }, delay: '2s' },
      ],
      icons: [],
    },
    info: {
      gradient: 'bg-gradient-to-br from-blue-500/15 via-cyan-500/8 to-teal-500/15',
      headerBg: 'bg-gradient-to-br from-blue-500/40 to-blue-500/15',
      headerColor: 'text-blue-400',
      circles: [
        { class: 'w-32 h-32 bg-blue-500/25', position: { top: '-2.5rem', left: '-2.5rem' }, delay: '0s' },
        { class: 'w-48 h-48 bg-cyan-500/20', position: { top: '25%', right: '-4rem' }, delay: '1s' },
        { class: 'w-24 h-24 bg-teal-500/25', position: { bottom: '-2rem', left: '33%' }, delay: '2s' },
      ],
      icons: [],
    },
  }
  return themes[props.theme]
})

const decorationConfig = computed(() => {
  const configs = {
    default: themeConfig.value,
    create: {
      ...themeConfig.value,
      gradient: 'bg-gradient-to-br from-green-500/15 via-blue-500/8 to-purple-500/15',
    },
    confirm: {
      ...themeConfig.value,
      gradient: 'bg-gradient-to-br from-primary/15 via-purple-500/8 to-pink-500/15',
    },
  }
  return configs[props.decorationVariant]
})

const headerIconColorClass = computed(() => decorationConfig.value.headerColor)

function handleBackdropClick() {
  emit('backdropClick')
  if (props.allowBackdropClose) {
    emit('close')
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
}

.modal-backdrop-enter-active,
.modal-backdrop-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-backdrop-enter-from,
.modal-backdrop-leave-to {
  opacity: 0;
}

.modal-backdrop-enter-to,
.modal-backdrop-leave-from {
  opacity: 1;
}

.modal-content-enter-active,
.modal-content-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-content-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(-20px);
}

.modal-content-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}

.modal-content-enter-to,
.modal-content-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.modal-content-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-content-enter-from {
  transform: scale(0.8) translateY(-30px) rotateX(10deg);
}

@media (max-width: 640px) {
  .modal-content-enter-from {
    transform: scale(0.95) translateY(-10px);
  }

  .modal-content-leave-to {
    transform: scale(0.98) translateY(5px);
  }
}

.scrollable-content {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

.scrollable-content::-webkit-scrollbar {
  width: 6px;
}

.scrollable-content::-webkit-scrollbar-track {
  background: transparent;
}

.scrollable-content::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  transition: background-color 0.2s ease;
}

.scrollable-content::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 640px) {
  .scrollable-content {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .scrollable-content::-webkit-scrollbar {
    display: none;
  }
}
</style>
