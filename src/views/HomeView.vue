<template>
  <main class="py-10">
    <div class="fixed inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10" />

    <div class="absolute top-20 left-40 text-blue-500/15 text-6xl">
      <i class="fa-solid fa-mask"></i>
    </div>

    <div class="absolute top-1/2 left-10 text-pink-400/15 text-5xl">
      <i class="fa-solid fa-puzzle-piece"></i>
    </div>

    <div class="absolute top-32 right-20 text-blue-400/10 text-3xl">
      <i class="fa-solid fa-robot"></i>
    </div>
    <div class="absolute bottom-20 left-20 text-purple-300/10 text-4xl">
      <i class="fa-solid fa-star-of-david"></i>
    </div>

    <div class="absolute top-2/3 right-1/3 text-pink-300/10 text-2xl">
      <i class="fa-solid fa-heart"></i>
    </div>

    <section class="flex flex-col gap-y-10 items-center justify-center">
      <div v-if="puzzles" class="w-2/3">
        <Card
          v-for="(puzzle, index) in puzzles"
          :key="puzzle.title"
          :data-index="index"
          :puzzle="puzzle"
        />
      </div>
      <p v-else>Empty</p>
    </section>

    <button
      class="fixed bottom-10 right-10 bg-background-soft w-12 h-12 rounded-full z-100 hover:cursor-pointer flex items-center justify-center text-white shadow-xl"
      @click="handleLogin"
    >
      <i class="fa-solid fa-user"></i>
    </button>

    <LoginModal v-if="showLogin" @close="showLogin = false" />
  </main>
</template>

<script setup lang="ts">
import type { Tables } from '@/types/database'
import { push } from 'notivue'
import { onMounted, ref } from 'vue'
import Card from '@/components/Card.vue'
import LoginModal from '@/components/LoginModal.vue'
import { supabase } from '@/lib/supabase'

const puzzles = ref<Tables<'puzzles'>[] | null>([])

const showLogin = ref(false)

async function getPuzzles() {
  const { data } = await supabase.from('puzzles').select()
  data?.forEach((data) => {
    data.created_at = new Date(data.created_at).toLocaleString('zh-CN')
  })
  puzzles.value = data
}

async function handleLogin() {
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    push.info(`欢迎 ${user.user_metadata.username}`)
  } else {
    showLogin.value = true
  }
}

onMounted(getPuzzles)
</script>
