<script setup lang="ts">
const online = useOnline()

const user = useSupabaseUser()
</script>

<template>
  <div>
    <Suspense>
      <ClientOnly>
        <PageView v-if="online" />
        <div v-else text-gray:80>
          You're offline
        </div>
      </ClientOnly>
      <template #fallback>
        <div italic op50>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>

    <details open>
      <summary>user</summary>
      <pre>{{ JSON.stringify(user, null, 2) }}</pre>
    </details>
  </div>
</template>
