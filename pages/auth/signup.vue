<script setup lang="ts">
const user = useSupabaseUser()

const supabaseClient = useSupabaseClient()

watchEffect(() => {
  if (user.value)
    navigateTo('/dashboard', { replace: true })
})
</script>

<template>
  <div>
    <NuxtLink
      to="/signin" class="absolute right-4 top-4 md:right-8 md:top-8"
      :class="[]"
    >
      Sign In
    </NuxtLink>

    <div class="mx-auto w-full flex flex-col justify-center sm:w-[350px] space-y-6">
      <div class="flex flex-col text-center space-y-2">
        <h1 class="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p class="text-muted-foreground text-sm">
          Enter your email below to create your account
        </p>
      </div>
      <SignUpForm />
      <p class="text-muted-foreground px-8 text-center text-sm">
        By clicking continue, you agree to our
        <NuxtLink to="/terms" class="hover:text-primary underline underline-offset-4">
          Terms of Service
        </NuxtLink>
        and
        <NuxtLink to="/privacy" class="hover:text-primary underline underline-offset-4">
          Privacy Policy
        </NuxtLink>
        .
      </p>
    </div>
  </div>
</template>
