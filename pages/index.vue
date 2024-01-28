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

const isLoading = ref(false)
async function sendContent() {
  isLoading.value = true
  const _content = content.value
  content.value = ''
  if (!_content)
    return
  messages.value.push({
    id: messages.value.length,
    user: 'me',
    content: _content,
  })
  try {
    const res = await $fetch('/api/chat', { method: 'POST', body: { content: _content } })
    messages.value.push({
      id: messages.value.length,
      user: res.message.role,
      content: res.message.content,
    })
  }
  catch (error) {

  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="logout">
      <div>
        {{ user?.username }}
      </div>
      <button>Sign out</button>
    </form>
    <div>
      <SInput v-model="content" @keyup.enter="sendContent" />
      <SButton :loading="isLoading" @click="sendContent">
        <i v-if="isLoading" class="i-lucide:loader-2 mr-2 h-4 w-4 animate-spin" />
        Chat
      </SButton>
    </div>

    <div v-for="item in messages" :key="item.id">
      {{ item.content }}
    </div>
  </div>
</template>
