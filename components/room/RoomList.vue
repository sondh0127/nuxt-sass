<script lang="ts" setup>
const emit = defineEmits<{
  click: [id: string]
}>()

const { invoke, useGet } = useApi()
const { data: rooms, pending, error, refresh } = await useGet('/api/rooms')
async function addRoom() {
  const res = await invoke('/api/rooms', {
    method: 'POST',
    body: {},
  })
}

async function removeRoom(id: string) {
  const res = await invoke('/api/rooms', {
    method: 'DELETE',
    body: { id },
  })
}
</script>

<template>
  <div>
    <SButton @click="addRoom">
      New Chat
      <div i-ri:add-line class="ml-2" />
    </SButton>
    <div>
      Chat List
    </div>
    <div class="divide flex flex-col divide-y divide-gray">
      <div
        v-for="item in rooms" :key="item.id"
        class="flex cursor-pointer justify-between bg-yellow py-3"
        @click="emit('click', item.id)"
      >
        <div>
          {{ item.id }}
        </div>
        <SButton class="flex-shrink-0" size="icon" @click.stop="removeRoom(item.id)">
          <div i-ri:close-line />
        </SButton>
      </div>
    </div>
  </div>
</template>
