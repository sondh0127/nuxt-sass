<script lang="ts" setup>
function logout() {
}
</script>

<template>
  <SButton @click="logout">
    Logout
  </SButton>
  <slot />
</template>
