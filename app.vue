<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})
</script>

<template>
  <!-- <VitePwaManifest /> -->
  <SToastToaster />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html, body , #__nuxt{
  height: 100dvh;
  margin: 0;
  padding: 0;
}
</style>
