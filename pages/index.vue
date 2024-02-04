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

function sendVector() {
  $fetch('/api/vector', {
    method: 'POST',
  })
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

const selectedRoom = ref()
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
      <RoomList class="w-256px bg-green/20" @click="(room) => selectedRoom = room" />
      <div>
        selectedRoom: {{ selectedRoom }}
        <div>
          <SButton :loading="isLoading" @click="sendVector">
            🤖
          </SButton>
        </div>

        <div>
          <SButton @click="sendEmbeding">
            Send embeddings
          </SButton>

          <SInput v-model="similar" placeholder="Similar search..." />
          <SButton @click="handleEmbedding">
            Find similar
          </SButton>
        </div>

        <MessageList />
      </div>
    </main>
  </div>
</template>
