<script lang="ts" setup>
const { data: rooms, pending, error, refresh } = await useFetch('/api/rooms', {

})
</script>

<template>
  <div>
    <SButton>
      New Chat
      <div i-ri:add-line class="ml-2" />
    </SButton>
    <div>
      Chat List
    </div>
    <div>
      <div v-for="item in rooms" :key="item.id">
        <!--  -->
      </div>
    </div>
  </div>
</template>
