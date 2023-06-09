<script lang="ts" setup>
import { ref } from 'vue'

const { modelValue } = defineModels<{
  modelValue: string
}>()

const showPassword = ref(true)

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
}

const attrs = useAttrs()

const isPassword = attrs.type === 'password'
</script>

<template>
  <div class="relative">
    <input
      v-model="modelValue"
      :type="showPassword ? 'text' : 'password'"
      class="h-10 w-full flex border border-input rounded-md bg-transparent px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
    >
    <button
      v-if="isPassword"
      type="button"
      class="absolute inset-y-0 right-0 px-3 py-2 text-sm text-muted-foreground focus:outline-none"
      @click="togglePasswordVisibility"
    >
      <div :class="[showPassword ? 'i-ri:eye-off-line' : 'i-ri:eye-line']" class="mr-2 h-4 w-4 cursor-pointer text-muted-foreground" />
    </button>
  </div>
</template>
