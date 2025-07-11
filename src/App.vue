<template>
  <Notivue v-slot="item">
    <Notification :item="item" :theme="slateTheme" />
  </Notivue>

  <RouterView />
</template>

<script setup lang="ts">
import { Notification, Notivue, slateTheme } from 'notivue'
</script>
