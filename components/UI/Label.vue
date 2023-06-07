<script lang="ts" setup>
import type { LabelRef } from '@oku-ui/label'
import { OkuLabel } from '@oku-ui/label'

const labelRef = ref<LabelRef>()

defineExpose({
  labelRef,
})
</script>

<template>
  <OkuLabel ref="labelRef" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
    <slot />
  </OkuLabel>
</template>
