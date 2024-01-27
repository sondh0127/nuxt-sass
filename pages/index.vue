<script lang="ts" setup>
definePageMeta({
  middleware: ['protected'],
})
const user = useAuthenticatedUser()

async function logout() {
  await $fetch('/api/logout', {
    method: 'POST',
  })
  navigateTo('/login')
}
</script>

<template>
  <form @submit.prevent="logout">
    <button>Sign out</button>
  </form>
  <DevOnly>
    <details open>
      <summary>user</summary>
      <pre>{{ JSON.stringify(user, null, 2) }}</pre>
    </details>
  </DevOnly>
</template>
