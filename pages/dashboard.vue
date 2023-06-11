<script lang="ts" setup>
definePageMeta({
  middleware: ['auth'],
})

const { $client } = useNuxtApp()

const { data: hello } = await $client.hello.hello.useQuery({ text: 'client' })
</script>

<template>
  <div>
    <p>{{ hello?.greeting }}</p>
    <Examples />
  </div>
</template>
