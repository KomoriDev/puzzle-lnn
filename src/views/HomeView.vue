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

    <section class="flex flex-col gap-y-10 items-center">
      <Card
        v-for="(card, index) in cards"
        :key="card.title"
        class="w-2/3"
        :data-index="index"
        :title="card.title"
        :content="card.content"
        :topics="card.topics"
      />
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from '@/components/Card.vue'

const cards = ref([
  {
    title: '海龟汤',
    content: '这是一个海龟汤这是一个海龟汤这是一个海龟汤这是一个海龟汤这是一个海龟汤这是一个海龟汤这是一个海龟汤这是一个海龟汤这是一个海龟汤这是一个海龟汤这是一个海龟汤',
    topics: ['悬疑', '刺激'],
  },
  {
    title: '神秘事件',
    content: '深夜的老宅里传来奇怪的脚步声，每当月圆之夜就会发生...',
    topics: ['恐怖', '推理'],
  },
  {
    title: '时间旅行者',
    content: '一位自称来自未来的访客留下了神秘的预言，这些预言竟然一一应验...',
    topics: ['科幻', '悬疑'],
  },
])
</script>
