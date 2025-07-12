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

    <Dock class="absolute right-3 top-1/2 -translate-y-1/2 sm:right-10" />
  </main>
</template>

<script setup lang="ts">
import type { Tables } from '@/types/database'
import { onMounted, ref } from 'vue'
import Card from '@/components/Card.vue'
import Dock from '@/components/Dock.vue'
import { supabase } from '@/lib/supabase'

const puzzles = ref<Tables<'puzzles'>[] | null>([])

async function getPuzzles() {
  const { data } = await supabase
    .from('puzzles')
    .select('*')
    .eq('status', 'published')

  data?.forEach((data) => {
    data.created_at = new Date(data.created_at).toLocaleString('zh-CN')
  })
  puzzles.value = data
}

onMounted(getPuzzles)
</script>
