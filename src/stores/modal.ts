import type { Component, ComponentPublicInstance } from 'vue'
import { defineStore } from 'pinia'
import { markRaw, ref, watch } from 'vue'

import LoginModal from '@/components/LoginModal.vue'
import UploadModal from '@/components/UploadModal.vue'

type ComponentProps<T> = T extends new (...args: any[]) => ComponentPublicInstance<infer P> ? P : object

const ModalDialog = {
  userLogin: LoginModal,
  userUpload: UploadModal,
} as const satisfies Record<string, Component>

type ModalComponent = keyof typeof ModalDialog

type ModalProps = {
  [K in ModalComponent]: ComponentProps<(typeof ModalDialog)[K]>;
}

interface ModalState {
  component: Component
  props?: object
  isOpen: boolean
  key?: string
  keepAlive: boolean
}

export const useModalStore = defineStore('modal', () => {
  const modalStack = ref<Map<string, ModalState>>(new Map())

  function open<M extends ModalComponent>(
    modal: M,
    props?: ModalProps[M],
    key?: string,
    keepAlive: boolean = false,
  ) {
    const modalKey = key ? `${modal}-${key}` : modal
    const modalState: ModalState = {
      component: markRaw(ModalDialog[modal]),
      props,
      isOpen: true,
      key: modalKey,
      keepAlive,
    }
    modalStack.value.set(modalKey, modalState)
  }
  let debounceTimer: ReturnType<typeof setTimeout> | null = null
  const DEBOUNCE_DELAY = 500

  watch(
    modalStack,
    (newValue) => {
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }
      debounceTimer = setTimeout(() => {
        const hasModalToClean = [...newValue.entries()].some(
          ([_, modal]) => !modal.keepAlive && !modal.isOpen,
        )

        if (hasModalToClean) {
          const newModalStack = new Map(
            [...newValue.entries()].filter(
              ([_, modal]) => modal.keepAlive || modal.isOpen,
            ),
          )
          modalStack.value = newModalStack
        }
        debounceTimer = null
      }, DEBOUNCE_DELAY)
    },
    {
      deep: true,
    },
  )

  return {
    modalStack,
    open,
    close: (modalKey: string) => {
      const modalState = modalStack.value.get(modalKey)
      if (modalState) {
        modalState.isOpen = false
      }
    },
    remove: (modalKey: string) => {
      modalStack.value.delete(modalKey)
    },
  }
})
