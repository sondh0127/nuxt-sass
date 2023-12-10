<script setup lang="ts">

</script>

<template>
  <div
    class="relative hidden h-full flex-col items-center justify-center container md:grid lg:grid-cols-2 lg:max-w-none lg:px-0"
  >
    <div class="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
      <div class="absolute inset-0 from-primary to-primary/90 bg-gradient-to-r" />
      <div class="relative z-20 flex items-center text-lg font-medium">
        <svg
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" class="mr-2 h-6 w-6"
        >
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
        Acme Inc
      </div>
      <div class="relative z-20 mt-auto">
        <blockquote class="space-y-2">
          <p class="text-lg">
            &ldquo;This library has saved me countless hours of work and
            helped me deliver stunning designs to my clients faster than
            ever before.&rdquo;
          </p>
          <footer class="text-sm">
            Sofia Davis
          </footer>
        </blockquote>
      </div>
    </div>

    <slot />
  </div>
</template>
