<script lang="ts" setup>
const sb = useSupabaseClient()
function logout() {
  sb.auth.signOut()
}
</script>

<template>
  <SButton @click="logout">
    Logout
  </SButton>
  <slot />
</template>
