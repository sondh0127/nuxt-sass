<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { appName } from '~/constants'

useHead({
  title: appName,
})
</script>

<template>
  <!-- <VitePwaManifest /> -->
  <NuxtLayout>
    <SToastToaster />
    <NuxtPage />
    <VueQueryDevtools />
  </NuxtLayout>
</template>

<style>
html,
body,
#__nuxt {
  @apply h-100dvg m-0 p-0;
}
</style>
