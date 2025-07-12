<template>
  <div class="dock-content space-y-2">
    <div class="dock-content-inner">
      <Tooltip content="主页" position="left">
        <button :class="{ 'is-active': route.name === 'home' }"><i class="fa-solid fa-house text-slate-300"></i></button>
      </Tooltip>

      <Tooltip content="搜索" position="left">
        <button :class="{ 'is-active': route.name === 'search' }"><i class="fa-solid fa-search text-slate-300"></i></button>
      </Tooltip>

      <Tooltip content="历史" position="left">
        <button :class="{ 'is-active': route.name === 'history' }"><i class="fa-regular fa-clock text-slate-300"></i></button>
      </Tooltip>

      <span class="w-5 h-0.5 rounded-full bg-white/10"></span>

      <Tooltip content="我" position="left">
        <button @click="handleLogin"><i class="fa-regular fa-user text-slate-300"></i></button>
      </Tooltip>

      <Tooltip v-if="userData" content="投稿" position="left">
        <button><i class="fa-regular fa-plus text-slate-300"></i></button>
      </Tooltip>

      <Tooltip content="设置" position="left">
        <button><i class="fa-solid fa-gear text-slate-300"></i></button>
      </Tooltip>
    </div>
    <div class="absolute mx-2">
      <button><i class="fa-solid fa-rotate-right text-slate-300"></i></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@supabase/supabase-js'
import { push } from 'notivue'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { supabase } from '@/lib/supabase'
import { useModalStore } from '@/stores/modal'

import Tooltip from './Tooltip.vue'

const route = useRoute()
const modalStore = useModalStore()

const userData = ref<User | null>()

async function getUser() {
  const { data: { user } } = await supabase.auth.getUser()
  userData.value = user
  return user
}

async function handleLogin() {
  const user = await getUser()
  if (user) {
    push.info(`欢迎 ${user.user_metadata.username}`)
  } else {
    modalStore.open('userLogin')
  }
}

onMounted(() => {
  getUser()

  const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED') {
      userData.value = session?.user || null
    }
  })

  onUnmounted(() => {
    authListener?.subscription.unsubscribe()
  })
})
</script>

<style scoped lang="css">
@reference "../style.css";

.dock-content-inner {
  @apply flex flex-col items-center gap-2 px-2 py-2 rounded-full;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

button {
  @apply w-10 h-10 rounded-full text-slate-300 shadow-md drop-shadow-2xl;
  background-color: rgba(255, 255, 255, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out;
  border: 1px solid transparent;
}

button:hover {
  @apply bg-white/30;
  transform: scale(1.1);
  z-index: 1;
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

button.is-active {
  background-color: white;
  color: #2C3754;
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
}

button.is-active i {
  color: #2C3754 !important;
}
</style>
