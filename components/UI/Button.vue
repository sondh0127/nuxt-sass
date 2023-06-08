<script lang="ts" setup>
import type { ButtonProps } from './Button/meta'
import { buttonVariants } from './Button/meta'

const props = defineProps<ButtonProps>()
</script>

<template>
  <button :class="[buttonVariants(props)]">
    <slot />
  </button>
</template>
