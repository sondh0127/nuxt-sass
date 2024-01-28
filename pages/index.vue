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

const content = ref('')
const messages = ref<{ id: number, user: string, content: string }[]>([])

async function onClick() {
  if (!content.value)
    return
  messages.value.push({
    id: messages.value.length,
    user: 'me',
    content: content.value,
  })
  const res = await $fetch('/api/chat', { method: 'POST', body: { content: content.value } })
  messages.value.push({
    id: messages.value.length,
    user: res.message.role,
    content: res.message.content,
  })

  content.value = ''
}
</script>

<template>
  <div>
    <form @submit.prevent="logout">
      <button>Sign out</button>
    </form>
    <div>
      <SInput v-model="content" />
      <SButton @click="onClick">
        Chat
      </SButton>
    </div>

    <div v-for="item in messages" :key="item">
      {{ item.content }}
    </div>
    <DevOnly>
      <details open>
        <summary>user</summary>
        <pre>{{ JSON.stringify(user, null, 2) }}</pre>
      </details>
    </DevOnly>
  </div>
</template>
