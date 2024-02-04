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

function sendEmbeding() {
  $fetch('/api/embeddings', {
    method: 'POST',
    body: {
      prompt: '',
    },
  })
}

const similar = ref('')

async function handleEmbedding() {
  $fetch('/api/documents/match', {
    method: 'POST',
    body: {
      prompt: similar.value,
    },
  })
}

const roomId = ref()
</script>

<template>
  <div class="grid grid-rows-[auto_1fr] size-full">
    <nav class="flex bg-blue">
      <form @submit.prevent="logout">
        <div>
          {{ user?.username }}
        </div>
        <button>Sign out</button>
      </form>
    </nav>
    <main class="h-full flex">
      <RoomList class="w-256px bg-green/20" @click="(id) => roomId = id" />
      <div>
        roomId: {{ roomId }}

        <div>
          <SButton @click="sendEmbeding">
            Send embeddings
          </SButton>

          <SInput v-model="similar" placeholder="Similar search..." />
          <SButton @click="handleEmbedding">
            Find similar
          </SButton>
        </div>

        <MessageList v-if="roomId" :room-id="roomId" />
      </div>
    </main>
  </div>
</template>
