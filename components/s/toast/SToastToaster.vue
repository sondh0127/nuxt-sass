<script setup lang="ts">
import { isVNode } from 'vue'
import { useToast } from './use-toast'

const { toasts } = useToast()
</script>

<template>
  <SToastProvider>
    <SToast v-for="toast in toasts" :key="toast.id" v-bind="toast">
      <div class="grid gap-1">
        <SToastTitle v-if="toast.title">
          {{ toast.title }}
        </SToastTitle>
        <template v-if="toast.description">
          <SToastDescription v-if="isVNode(toast.description)">
            <component :is="toast.description" />
          </SToastDescription>
          <SToastDescription v-else>
            {{ toast.description }}
          </SToastDescription>
        </template>
        <ToastClose />
      </div>
      <component :is="toast.action" />
    </SToast>
    <SToastViewport />
  </SToastProvider>
</template>
