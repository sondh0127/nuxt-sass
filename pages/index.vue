<script setup lang="ts">
import { $$fetch } from '~/lib/services/fetch'

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
const editting = ref()

async function createTodo() {
  await $fetch('/api/todo', { method: 'POST', body: { text: text.value } })
  refreshNuxtData('/api/todo')
  text.value = undefined
}

function editTodo(item: any) {
  editting.value = klona(item)
}

async function submitEdit() {
  const { text, id } = editting.value
  await $fetch(`/api/todo/${id}`, { method: 'PATCH', body: { text } })
  refreshNuxtData('/api/todo')
  editting.value = undefined
}
</script>

<template>
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
        </div>

        <p>Done: {{ item.done }}</p>
      </div>
    </div>
    <SInput v-model="text" />
    <SButton @click="createTodo">
      Create
    </SButton>
  </div>
</template>
