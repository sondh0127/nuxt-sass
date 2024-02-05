<script lang="ts" setup>
import { useChat } from 'ai/vue'

const { roomId } = definePropsRefs<{
  roomId: string
}>()
const { isLoading } = useQuery({
  queryKey: ['/api/messages', roomId],
  queryFn: () => $fetch('/api/messages', { query: { roomId: roomId.value } }),
  enabled: () => !!roomId.value,
})

const { messages, input, handleSubmit, isLoading: isLoadingChat } = useChat({
  body: {
    roomId: roomId.value,
  },
})
</script>

<template>
  <div class="mx-auto max-w-md w-full flex flex-col py-24">
    <div v-for="m in messages" :key="m.id" class="whitespace-pre-wrap">
      {{ m.role === 'user' ? 'User: ' : 'AI: ' }}
      {{ m.content }}
    </div>

    <form @submit="handleSubmit">
      <SInput
        v-model="input" class="fixed bottom-0 mb-12 max-w-md w-full border border-gray-300 rounded p-2 shadow-xl"
        placeholder="Say something..."
      />
    </form>
  </div>
</template>
