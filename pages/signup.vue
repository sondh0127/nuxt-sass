<script setup lang="ts">
import type { SignUpWithPasswordCredentials } from '@supabase/supabase-js'

const user = useSupabaseUser()
const supabase = useSupabaseAuthClient()

// const notifyStore = useNotifyStore()

const loading = ref(false)
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const signUpOk = ref(false)

const signUpMutation = useMutation(
  async (payload: SignUpWithPasswordCredentials) => {
    const { data, error } = await supabase.auth.signUp(payload)
    if (error)
      throw error

    else
      signUpOk.value = true

    return data
  },
  {
    onSuccess: () => {
    },
    onError: (error) => {
      // notifyStore.notify(error, NotificationType.Error)
    },
  },
)

async function handleStandardSignup() {
  await signUpMutation.mutateAsync({ email: email.value, password: password.value })
}

watchEffect(() => {
  if (user.value)
    navigateTo('/dashboard', { replace: true })
})
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <div class="max-w-md w-full rounded-lg p-6 shadow-lg space-y-6">
      <h1 class="text-center text-3xl font-bold">
        Sign up
      </h1>
      <form class="grid gap-4" @submit.prevent="handleStandardSignup">
        <div class="grid w-full items-center gap-1.5">
          <UILabel for="email">
            Email
          </UILabel>
          <UIInput id="email" v-model="email" type="email" placeholder="Enter your email" required />
        </div>
        <div class="grid w-full items-center gap-1.5">
          <UILabel for="password">
            Password
          </UILabel>
          <UIInput id="password" v-model="password" type="password" placeholder="Enter your password" required />
        </div>

        <div class="grid w-full items-center gap-1.5">
          <UILabel for="confirmPassword">
            Confirm Password
          </UILabel>
          <UIInput id="confirmPassword" v-model="confirmPassword" type="password" placeholder="Confirm your password" required />
        </div>

        <button
          :disabled="loading || password === '' || (confirmPassword !== password)" type="submit"
          class="w-full rounded-md bg-indigo-600 py-2 text-white hover:bg-indigo-700"
        >
          Sign up
        </button>

        <p v-if="signUpOk" class="mt-4 text-center text-lg">
          You have successfully signed up. Please check your email for a link to confirm your email address and proceed.
        </p>
      </form>
      <p class="text-center">
        or
      </p>
      <button
        class="w-full rounded-md bg-red-600 py-2 text-white hover:bg-red-700"
        @click="supabase.auth.signInWithOAuth({ provider: 'google' })"
      >
        <span class="flex items-center justify-center space-x-2">
          <i i-fa-brands:google class="h-5 w-5" />
          <span>Sign up with Google</span>
        </span>
      </button>
      <p class="mt-4 text-center text-xs text-gray-500">
        By proceeding, I agree to the <NuxtLink to="/privacy">
          Privacy Statement
        </NuxtLink> and <NuxtLink to="/terms">
          Terms
          of Service
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
