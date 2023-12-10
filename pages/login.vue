<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')

async function signInWithOtp() {
  const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo: 'http://localhost:3000/confirm',
    },
  })
  if (error)
    console.log(error)
}

const NuxtLink = resolveComponent('NuxtLink')
</script>

<template>
  <NuxtLayout name="auth">
    <SButton variant="ghost" :as="NuxtLink" to="/register" :class="cn('absolute right-4 top-4 md:right-8 md:top-8')">
      Register
    </SButton>
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
        <AuthUserForm />
        <p class="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our
          <a href="/terms" class="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </a>
          and
          <a href="/privacy" class="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>
