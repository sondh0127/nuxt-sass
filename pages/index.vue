<script setup lang="ts">
import { destr } from 'destr'

definePageMeta({
  middleware: 'auth',
})
// const user = useSupabaseUser()
// watchEffect(() => {
//   if (user.value)
//     navigateTo('/dashboard', { replace: true })
//   // else
//   //   navigateTo('/signin', { replace: true })
// })

// const accordionItems = [
//   {
//     value: 'item-1',
//     title: 'Is it accessible?',
//     content: 'Yes. It adheres to the WAI-ARIA design pattern.',
//   },
//   {
//     value: 'item-2',
//     title: 'Is it unstyled?',
//     content: 'Yes. It\'s unstyled by default, giving you freedom over the look and feel.',
//   },
//   {
//     value: 'item-3',
//     title: 'Can it be animated?',
//     content: 'Yes! You can use the transition prop to configure the animation.',
//   },
// ]

const { data } = await useFetch('/api/todo', { key: '/api/todo' })

const text = ref()
const editting = ref<EditSchema>()
const error = ref([])

async function createTodo() {
  try {
    const res = await $fetch('/api/todo', { method: 'POST', body: { text: text.value } })
    refreshNuxtData('/api/todo')
    text.value = undefined
  }
  catch (err) {
    error.value = destr(err.data.message)
  }
}

function editTodo(item: EditSchema) {
  editting.value = klona(item)
}

async function submitEdit() {
  const { text, id } = editting.value
  await $fetch(`/api/todo/${id}`, { method: 'PATCH', body: { text } })
  refreshNuxtData('/api/todo')
  editting.value = undefined
}

async function deleteTodo(id: number) {
  await $fetch(`/api/todo/${id}`, { method: 'DELETE' })
  refreshNuxtData('/api/todo')
}
</script>

<template>
  <NuxtPage name="dashboard">
    <div>
      Index
      <DevOnly>
        <details open>
          <summary>data</summary>
          <pre>{{ JSON.stringify(data, null, 2) }}</pre>
        </details>
      </DevOnly>
      <div>
        <div v-for="item in data" :key="item.id">
          <div v-if="editting?.id === item.id" class="flex">
            <SInput v-model="editting.text" />
            <SButton @click="submitEdit">
              Submit
            </SButton>
          </div>

          <div v-else class="flex">
            <p>
              {{ item.text }}
            </p>
            <SButton @click="editTodo(item)">
              Edit
            </SButton>
            <SButton variant="destructive" @click="deleteTodo(item.id)">
              Delete
            </SButton>
          </div>

          <p>Done: {{ item.done }}</p>
        </div>
      </div>
      <SInput v-model="text" />
      <SButton @click="createTodo">
        Create
      </SButton>
      <DevOnly>
        <details open>
          <VueJsonPretty :data="error" />
        </details>
      </DevOnly>
    </div>
  </NuxtPage>
</template>
