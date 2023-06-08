<script setup lang="ts">
import type { SignUpWithPasswordCredentials } from '@supabase/supabase-js'
import { buttonVariants } from '~/components/UI/Button/meta'

const user = useSupabaseUser()

watchEffect(() => {
  if (user.value)
    navigateTo('/dashboard', { replace: true })
})
</script>

<template>
  <div class="relative hidden h-[800px] flex-col items-center justify-center container md:grid lg:grid-cols-2 lg:max-w-none lg:px-0">
    <NuxtLink
      to="/signin" class="absolute right-4 top-4 md:right-8 md:top-8"
      :class="[buttonVariants({ variant: 'ghost', size: 'sm' })]"
    >
      Login
    </NuxtLink>
    <div class="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
      <div
        class="absolute inset-0 bg-cover"
        :style="{ backgroundImage: 'url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80)' }"
      />
      <div class="relative z-20 flex items-center text-lg font-medium">
        <Command class="mr-2 h-6 w-6" /> Acme Inc
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
      <div class="mx-auto w-full flex flex-col justify-center sm:w-[350px] space-y-6">
        <div class="flex flex-col text-center space-y-2">
          <h1 class="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p class="text-sm text-muted-foreground">
            Enter your email below to create your account
          </p>
        </div>
        <UserAuthForm />
        <p class="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our
          <NuxtLink to="/terms" class="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </NuxtLink>
          and
          <NuxtLink to="/privacy" class="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </NuxtLink>
          .
        </p>
      </div>
    </div>
  </div>
</template>
