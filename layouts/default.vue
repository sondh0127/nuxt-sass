<script lang="ts" setup>
</script>

<template>
  <header class="h-60px flex items-center justify-end gap-4 px-6">
    <DarkToggle />
  </header>
  <main class="h-[calc(100dvh-60px)]">
    <slot />
  </main>
</template>
