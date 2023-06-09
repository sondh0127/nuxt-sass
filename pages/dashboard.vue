<script lang="ts" setup>
definePageMeta({
  middleware: ['auth'],
})

const supabase = useSupabaseAuthClient()
const user = useSupabaseUser()

async function logout() {
  await supabase.auth.signOut()
  navigateTo('/', { replace: true })
}
</script>

<template>
  Dashboard
  <UIButton @click="logout">
    Logout
  </UIButton>
</template>
