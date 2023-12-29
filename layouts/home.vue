<script lang="ts" setup>
const sb = useSupabaseClient()
function logout() {
  sb.auth.signOut()
}

const user = useSupabaseUser()

watchEffect(() => {
  if (!user.value)
    navigateTo('/login')
})
</script>

<template>
  <SButton @click="logout">
    Logout
  </SButton>
  <slot />
</template>
