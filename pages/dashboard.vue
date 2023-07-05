<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth'],
})
const { $client } = useNuxtApp()
const { data } = $client.auth.getAllUser.useQuery()
</script>

<template>
  <div>
    dashboard
    <details open>
      <summary>data</summary>
      <pre>{{ JSON.stringify(data, null, 2) }}</pre>
    </details>
  </div>
</template>
