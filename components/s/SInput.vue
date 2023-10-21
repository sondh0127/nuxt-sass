<script setup lang="ts">
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <input v-model="modelValue" type="text" :class="cn('flex h-44px w-full rounded-8px bg-[rgba(0,0,0,0.30)] px-3 py-2 text-cap ring-offset-[rgba(17,17,17,0.30)] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:font-400 placeholder:text-[rgba(255,255,255,0.50)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500/50 focus-visible:ring-offset-1 text-white disabled:cursor-not-allowed disabled:opacity-50 font-400', $attrs.class ?? '')">
</template>