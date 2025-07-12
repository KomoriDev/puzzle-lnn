<template>
  <Notivue v-slot="item">
    <Notification :item="item" :theme="slateTheme" />
  </Notivue>

  <RouterView />

  <template v-for="[key, modalState] in modalStore.modalStack" :key="key">
    <component
      :is="modalState.component"
      v-if="modalState.isOpen"
      v-bind="modalState.props"
      :key="key"
      @close="modalStore.close(key)"
      @update:model-value="handleModelUpdate(key, $event)"
    />
  </template>
</template>

<script setup lang="ts">
import { Notification, Notivue, slateTheme } from 'notivue'
import { useModalStore } from '@/stores/modal'

const modalStore = useModalStore()

function handleModelUpdate(key: string, value: boolean) {
  if (!value) {
    modalStore.close(key)
  }
}
</script>
