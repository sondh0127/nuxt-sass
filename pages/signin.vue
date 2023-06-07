<script setup lang="ts">
import type { SignInWithPasswordCredentials } from '@supabase/supabase-js'

const user = useSupabaseUser()
const supabase = useSupabaseAuthClient()

// const accountStore = useAccountStore()
// const notifyStore = useNotifyStore()

const loading = ref(false)
const email = ref('')
const password = ref('')

const signInMutation = useMutation(
  async (payload: SignInWithPasswordCredentials) => {
    const { error } = await supabase.auth.signInWithPassword(payload)
    if (error)
      throw error
  },
  {
    onSuccess: () => {
    },
    onError: (error) => {
    // notifyStore.notify(error, NotificationType.Error)
    },
  },
)

async function handleStandardSignin() {
  console.log(`handleStandardSignin email.value:${email.value}, password.value:${password.value}`)
  await signInMutation.mutateAsync({ email: email.value, password: password.value })
}

async function handleGoogleSignin() {
  console.log('handleGoogleSignin')
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
    if (error)
      throw error
  }
  catch (error) {
    // notifyStore.notify(error, NotificationType.Error)
  }
  finally {
    loading.value = false
  }
}

watchEffect(async () => {
  if (user.value) {
    // await accountStore.init()
    navigateTo('/dashboard', { replace: true })
  }
})
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <details open>
      <summary>data</summary>
      <pre>{{ JSON.stringify(data, null, 2) }}</pre>
    </details>
    <div class="max-w-md w-full rounded-lg bg-white p-6 shadow-lg space-y-6">
      <h1 class="text-center text-3xl font-bold">
        Sign in
      </h1>
      <form class="space-y-4" @submit.prevent="handleStandardSignin">
        <div>
          <label for="email" class="mb-2 block font-bold">Email</label>
          <input
            id="email" v-model="email" type="email" class="w-full border border-gray-400 rounded-md p-2"
            placeholder="Enter your email" required
          >
        </div>
        <div>
          <label for="password" class="mb-2 block font-bold">Password</label>
          <input
            id="password" v-model="password" type="password" class="w-full border border-gray-400 rounded-md p-2"
            placeholder="Enter your password" required
          >
        </div>
        <NuxtLink id="forgotPasswordLink" to="/forgotpassword" class="block text-right">
          Forgot your password?
        </NuxtLink>
        <button
          :disabled="loading || password === ''" type="submit"
          class="w-full rounded-md bg-indigo-600 py-2 text-white hover:bg-indigo-700"
        >
          Sign in
        </button>
      </form>
      <p class="text-center">
        or
      </p>
      <button
        class="w-full rounded-md bg-red-600 py-2 text-white hover:bg-red-700"
        @click="handleGoogleSignin()"
      >
        <span class="flex items-center justify-center space-x-2">
          <i i-fa-brands:google class="h-5 w-5" />
          <span>Sign in with Google</span>
        </span>
      </button>
    </div>
  </div>
</template>
