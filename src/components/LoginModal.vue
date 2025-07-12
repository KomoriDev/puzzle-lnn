<template>
  <Modal
    v-if="showLoginModal"
    title="登录"
    header-icon="fa-solid fa-user"
    size="md"
    theme="info"
    @close="$emit('close')"
  >
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-2 text-gray-300">电子邮箱</label>
        <Input v-model="loginForm.email" type="email" autocomplete="email" required @keyup.enter="handleLogin" />
      </div>

      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="block text-sm font-medium text-gray-300">密码</label>
          <a href="#" class="text-sm text-gray-300/80">忘记密码？</a>
        </div>
        <Input v-model="loginForm.password" type="password" autocomplete="password" required @keyup.enter="handleLogin" />
      </div>
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
        :disabled="!loginForm.email.trim() || !loginForm.password.trim() || isLogining" @click="handleLogin"
      >
        <i v-if="isLogining" class="fa-solid fa-spinner animate-spin" />
        <i v-else class="fa-solid fa-arrow-right-to-bracket" />
        {{ isLogining ? '登录中...' : '登录' }}
      </button>
    </div>

    <p class="text-center text-sm text-gray-400">
      还没有账号？
      {{ ' ' }}
      <a href="#" class="font-semibold text-blue-500 hover:text-blue-500/80 transition-colors" @click.prevent="showRegisterModal = true; showLoginModal = false">即刻注册</a>
    </p>
  </Modal>

  <Modal
    v-if="showRegisterModal"
    title="注册"
    header-icon="fa-solid fa-user"
    size="md"
    theme="info"
    @close="$emit('close')"
  >
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-2 text-gray-300">用户名</label>
        <Input v-model="registerForm.username" type="text" required @keyup.enter="handleRegister" />
      </div>

      <div>
        <label class="block text-sm font-medium mb-2 text-gray-300">电子邮箱</label>
        <Input v-model="registerForm.email" type="email" autocomplete="email" required @keyup.enter="handleRegister" />
      </div>

      <div>
        <label class="block text-sm font-medium mb-2 text-gray-300">密码</label>
        <Input v-model="registerForm.password" type="password" autocomplete="password" required @keyup.enter="handleRegister" />
      </div>

      <div>
        <label class="block text-sm font-medium mb-2 text-gray-300">确认密码</label>
        <Input v-model="registerForm.confirmPassword" type="password" autocomplete="password" required @keyup.enter="handleRegister" />
      </div>
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
        :disabled="!registerForm.email.trim() || !registerForm.password.trim() || !registerForm.confirmPassword.trim() || isRegistering" @click="handleRegister"
      >
        <i v-if="isRegistering" class="fa-solid fa-spinner animate-spin" />
        <i v-else class="fa-solid fa-arrow-right-to-bracket" />
        {{ isRegistering ? '注册中...' : '注册' }}
      </button>
    </div>

    <p class="text-center text-sm text-gray-400">
      已经有账号了？
      {{ ' ' }}
      <a href="#" class="font-semibold text-blue-500 hover:text-blue-500/80 transition-colors" @click.prevent="showLoginModal = true; showRegisterModal = false">即刻登录</a>
    </p>
  </Modal>
</template>

<script setup lang="ts">
import { push } from 'notivue'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import Input from './Input.vue'
import Modal from './Modal.vue'

defineEmits<{ close: [] }>()

const showLoginModal = ref(true)
const showRegisterModal = ref(false)

const loginForm = ref({
  email: '',
  password: '',
})

const registerForm = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const isLogining = ref(false)
const isRegistering = ref(false)

async function handleLogin() {
  if (!loginForm.value.email.trim() || !loginForm.value.password.trim() || isLogining.value) {
    return
  }

  try {
    isLogining.value = true

    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginForm.value.email,
      password: loginForm.value.password,
    })

    if (error) {
      push.error({ title: '登录失败', message: String(error) })
    } else {
      showLoginModal.value = false
      push.success({ message: `欢迎回来，${data.user?.user_metadata.username}` })
    }
  } catch (error) {
    push.error({ title: '登录失败', message: String(error) })
  } finally {
    isLogining.value = false
  }
}

async function handleRegister() {
  console.log(registerForm.value)
  if (!registerForm.value.email.trim() || !registerForm.value.password.trim() || !registerForm.value.confirmPassword.trim() || isRegistering.value) {
    return
  }

  try {
    isRegistering.value = true

    if (registerForm.value.password !== registerForm.value.confirmPassword) {
      throw new Error('密码不一致，请重试')
    }

    const { data, error } = await supabase.auth.signUp({
      email: registerForm.value.email,
      password: registerForm.value.password,
      options: {
        data: {
          username: registerForm.value.username,
        },
        emailRedirectTo: window.location.origin,
      },
    })

    if (error) {
      push.error({ title: '注册失败', message: String(error) })
    } else {
      showLoginModal.value = true
      showRegisterModal.value = false
      push.success({ title: '注册成功', message: `欢迎 ${data.user?.user_metadata.username}` })
    }
  } catch (error) {
    push.error({ title: '注册失败', message: String(error) })
  } finally {
    isRegistering.value = false
  }
}
</script>
