<script lang="ts" setup>

</script>

<template>
  <main class="grid h-screen">
    <div class="relative hidden h-full flex-col items-center justify-center container md:grid lg:grid-cols-2 lg:max-w-none lg:px-0">
      <div class="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
        <div
          class="absolute inset-0 bg-cover"
          :style="{ backgroundImage: 'url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80)' }"
        />
        <div class="relative z-20 flex items-center text-lg font-medium">
          Nuxt SASS
        </div>
        <div class="relative z-20 mt-auto">
          <blockquote class="space-y-2">
            <p class="text-lg">
              &ldquo;This library has saved me countless hours of work and helped me deliver stunning designs to my clients
              faster than ever before. Highly recommended!&rdquo;
            </p>
            <footer class="text-sm">
              Sofia Davis
            </footer>
          </blockquote>
        </div>
      </div>
      <div class="lg:p-8">
        <slot />
      </div>
    </div>
  </main>
</template>
