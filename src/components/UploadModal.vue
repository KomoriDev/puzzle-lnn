<template>
  <Modal
    title="投稿"
    header-icon="fa-solid fa-plus"
    size="md"
    theme="info"
    @close="$emit('close')"
  >
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-2 text-gray-300">* 标题</label>
        <Input v-model="puzzleForm.title" type="text" required />
      </div>

      <div>
        <label class="block text-sm font-medium mb-2 text-gray-300">* 汤面</label>
        <Textarea v-model="puzzleForm.content" required />
      </div>

      <div>
        <label class="block text-sm font-medium mb-2 text-gray-300">* 汤底</label>
        <Textarea v-model="puzzleForm.solution" required />
      </div>

      <div>
        <label class="block text-sm font-medium mb-2 text-gray-300">难度</label>
        <Select v-model="puzzleForm.difficulty" :options="difficulty" placeholder="难度" />
      </div>

      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="block text-sm font-medium text-gray-300">提示</label>
          <p class="text-sm text-gray-300/80 cursor-pointer" @click="addHint">添加</p>
        </div>
        <div v-for="(_, index) in puzzleForm.hints" :key="index" class="flex items-center mb-2">
          <Input v-model="puzzleForm.hints![index]" type="text" class="flex-grow" />
          <button
            v-if="puzzleForm.hints!.length > 1"
            class="ml-2 p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 focus:outline-none"
            @click="removeHint(index)"
          >
            <i class="fa-solid fa-minus"></i>
          </button>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium mb-2 text-gray-300">分类</label>
        <Checkbox
          v-for="categorie in categories"
          :key="categorie.id"
          v-model="categorie.selected"
          class="mr-1"
          :label="categorie.name"
        />
      </div>

      <div class="flex space-x-3 my-6">
        <button
          class="flex-1 bg-white/10 hover:bg-white/20 text-white rounded-full py-3 px-4 transition-all backdrop-blur-sm border border-white/10 shadow-lg"
          @click="$emit('close')"
        >
          取消
        </button>
        <button
          class="flex-1 bg-gradient-to-r from-blue-500 to-blue-500/80 hover:from-blue-500/90 hover:to-blue-500/70 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-full py-3 px-4 transition-all shadow-lg backdrop-blur-sm flex items-center justify-center gap-2"
          :disabled="!puzzleForm.title.trim() || !puzzleForm.content.trim() || !puzzleForm.solution.trim() || isUploading" @click="handleUpload"
        >
          <i v-if="isUploading" class="fa-solid fa-spinner animate-spin" />
          <i v-else class="fa-solid fa-plus" />
          {{ isUploading ? '上传中...' : '上传' }}
        </button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import type { Tables } from '@/types/database'
import { push } from 'notivue'

import { onMounted, ref } from 'vue'
import { supabase } from '@/lib/supabase'
import { useModalStore } from '@/stores/modal'
import Checkbox from './Checkbox.vue'
import Input from './Input.vue'
import Modal from './Modal.vue'
import Select from './Select.vue'
import Textarea from './Textarea.vue'

type PuzzleFormType = Omit<Tables<'puzzles'>, 'created_at' | 'updated_at'>

defineEmits<{ close: [] }>()

const modalStore = useModalStore()

const isUploading = ref(false)

const difficulty = ref([
  { label: '简单', value: 'easy' },
  { label: '一般', value: 'normal' },
  { label: '困难', value: 'hard' },
])

const categories = ref([
  { id: '本格', name: '本格', selected: false },
  { id: '变格', name: '变格', selected: false },
  { id: '清汤', name: '清汤', selected: false },
  { id: '红汤', name: '红汤', selected: false },
  { id: '黑汤', name: '黑汤', selected: false },
])

const puzzleForm = ref<PuzzleFormType>({
  id: 0,
  title: '',
  content: '',
  solution: '',
  hints: [],
  categories: [],
  difficulty: 'normal',
  status: 'pending',
  created_by: '',
})

onMounted(async () => {
  if (puzzleForm.value.hints?.length === 0) {
    puzzleForm.value.hints.push('')
  }

  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    puzzleForm.value.created_by = user.id
  }
})

function addHint() {
  puzzleForm.value.hints?.push('')
}

function removeHint(index: number) {
  puzzleForm.value.hints?.splice(index, 1)
}

async function handleUpload() {
  if (!puzzleForm.value.title.trim() || !puzzleForm.value.content.trim() || !puzzleForm.value.solution.trim() || isUploading.value) {
    return
  }

  categories.value.filter(categorie => categorie.selected).forEach((categorie) => {
    puzzleForm.value.categories?.push(categorie.name)
  })

  try {
    isUploading.value = true

    const { error } = await supabase
      .from('puzzles')
      .insert([puzzleForm.value])
      .select()

    if (error) {
      push.error({ title: '上传失败', message: error.message })
    } else {
      push.success({ title: '上传成功' })
      modalStore.close('userUpload')
    }
  } catch (error) {
    push.error({ title: '上传失败', message: String(error) })
  } finally {
    isUploading.value = false
  }
}
</script>
