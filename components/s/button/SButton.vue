<script setup lang="ts">
import { buttonVariants } from '.'

interface Props {
  variant?: NonNullable<Parameters<typeof buttonVariants>[0]>['variant']
  size?: NonNullable<Parameters<typeof buttonVariants>[0]>['size']
  as?: string
}
withDefaults(defineProps<Props>(), {
  as: 'button',
})
</script>

<template>
  <component v-bind="$attrs" :is="as" :class="buttonVariants({ variant, size })">
    <slot />
  </component>
</template>
