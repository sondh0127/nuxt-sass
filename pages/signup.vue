<script setup lang="ts">
import type { SignUpWithPasswordCredentials } from '@supabase/supabase-js'
import { buttonVariants } from '~/components/UI/Button/meta'

const user = useSupabaseUser()
definePageMeta({
  layout: 'auth',
})
watchEffect(() => {
  if (user.value)
    navigateTo('/dashboard', { replace: true })
})
</script>

<template>
  <div>
    <NuxtLink
      to="/signin" class="absolute right-4 top-4 md:right-8 md:top-8"
      :class="[buttonVariants({ variant: 'ghost', size: 'sm' })]"
    >
      Login
    </NuxtLink>

    <div class="mx-auto w-full flex flex-col justify-center sm:w-[350px] space-y-6">
      <div class="flex flex-col text-center space-y-2">
        <h1 class="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p class="text-sm text-muted-foreground">
          Enter your email below to create your account
        </p>
      </div>
      <SignUpForm />
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
</template>
