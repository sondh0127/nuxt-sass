<script lang="ts" setup>
import { useChat } from 'ai/vue'

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

const { messages, input, handleSubmit, isLoading } = useChat()
</script>

<template>
  <div class="h-full">
    <form @submit.prevent="logout">
      <div>
        {{ user?.username }}
      </div>
      <button>Sign out</button>
    </form>
    <!-- <div>
      <SInput v-model="content" @keyup.enter="sendContent" />
      <SButton :loading="isLoading" @click="sendContent">
        <i v-if="isLoading" class="i-lucide:loader-2 mr-2 h-4 w-4 animate-spin" />
        Chat
      </SButton>
    </div> -->
    <div class="mx-auto max-w-md w-full flex flex-col py-24">
      <div v-for="m in messages" :key="m.id" class="whitespace-pre-wrap">
        {{ m.role === 'user' ? 'User: ' : 'AI: ' }}
        {{ m.content }}
      </div>

      <form @submit="handleSubmit">
        <SInput
          v-model="input"
          class="fixed bottom-0 mb-12 max-w-md w-full border border-gray-300 rounded p-2 shadow-xl"
          placeholder="Say something..."
        />
      </form>
    </div>
  </div>
</template>
