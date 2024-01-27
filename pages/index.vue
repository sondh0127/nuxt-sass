<script lang="ts" setup>
async function logout() {
  await $fetch('/api/logout', {
    method: 'POST',
  })
  navigateTo('/login')
}

const { data } = useFetch('/api/user')
</script>

<template>
  <form @submit.prevent="logout">
    <button>Sign out</button>
  </form>
  <DevOnly>
    <details open>
      <summary>data</summary>
      <pre>{{ JSON.stringify(data, null, 2) }}</pre>
    </details>
  </DevOnly>
</template>
