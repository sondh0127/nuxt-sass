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

const { data } = await useFetch('/api/todo')

const text = ref()
async function createTodo() {
  await $fetch('/api/todo', { method: 'POST', body: { text: text.value } })
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
    <SInput v-model="text" />
    <SButton @click="createTodo">
      Create
    </SButton>
  </div>
</template>
