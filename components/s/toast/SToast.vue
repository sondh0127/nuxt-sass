<script setup lang="ts">
import { ToastRoot, useEmitAsProps } from 'radix-vue'
import type { ToastRootEmits, ToastRootProps } from 'radix-vue'
import type { VariantProps } from 'class-variance-authority'

const props = defineProps<ToastProps>()
const emits = defineEmits<ToastRootEmits>()
</script>

<script lang="ts">
const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        destructive:
          'destructive group border-destructive bg-destructive text-destructive-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

interface ToastVariantProps extends VariantProps<typeof toastVariants> { }

export interface ToastProps extends ToastRootProps {
  class?: string
  variant?: ToastVariantProps['variant']
  'onOpenChange'?: ((value: boolean) => void) | undefined
};
</script>

<template>
  <ToastRoot
    v-bind="{ ...props, ...useEmitAsProps(emits) }"
    :class="cn(toastVariants({ variant: props.variant }), props.class)" @update:open="onOpenChange"
  >
    <slot />
  </ToastRoot>
</template>
