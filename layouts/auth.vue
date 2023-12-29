<script setup lang="ts">

</script>

<template>
  <div
    class="relative hidden h-full flex flex-col items-center justify-center container md:grid lg:grid-cols-2 lg:max-w-none lg:px-0"
  >
    <div class="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
      <div class="absolute inset-0 from-primary to-primary/90 bg-gradient-to-r" />
      <div class="relative z-20 flex items-center gap-2 text-lg font-medium">
        <div i-ri:book-3-line />
        SavingBook
      </div>
      <div class="relative z-20 mt-auto flex items-center gap-2">
        <DarkToggle />
        <blockquote>
          <p class="text-lg">
            &ldquo;A good book is the best of friends, the same today and forever.&rdquo;
          </p>
        </blockquote>
      </div>
    </div>

    <slot />
  </div>
</template>
