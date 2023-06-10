<script lang="ts" setup>
import type { SignUpWithPasswordCredentials } from '@supabase/supabase-js'

import { useForm } from '@vorms/core'

const supabase = useSupabaseAuthClient()
const user = useSupabaseUser()
watchEffect(() => {
  if (user.value)
    navigateTo('/dashboard', { replace: true })
})
// const notifyStore = useNotifyStore()

const loading = ref(false)
// TODO: password confirmation
const confirmPassword = ref('')
const signUpOk = ref(false)

const { isLoading, mutateAsync } = useMutation(
  async (payload: SignUpWithPasswordCredentials) => {
    const { data, error } = await supabase.auth.signUp({ ...payload, options: { emailRedirectTo: '/dashboard' } })
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

const { register, errors, handleSubmit } = useForm({
  initialValues: {
    email: 'sondh0127@mailinator.com',
    password: 'Password1@',
  },
  onSubmit: async (values) => {
    await mutateAsync(values)
  },
})

const { value: email, attrs: emailAttrs } = register('email')
const { value: password, attrs: passwordAttrs } = register('password')
</script>

<template>
  <ACard>
    <div class="grid gap-6 a-card-body">
      <form @submit.prevent="handleSubmit">
        <div class="grid gap-3">
          <AInput
            v-bind="emailAttrs"
            id="email" v-model="email" label="Email" placeholder="name@example.com" type="email"
            autocapitalize="none" autocomplete="email" autocorrect="off" :disabled="isLoading"
          />

          <AInput
            v-bind="passwordAttrs"
            id="password" v-model="password" label="Password" placeholder="Enter your password"
            type="password" autocapitalize="none" autocomplete="password" autocorrect="off" :disabled="isLoading"
          />

          <ABtn type="submit" :loading="isLoading">
            Sign up with Email
          </ABtn>
          <p v-if="signUpOk" class="mt-4 text-center text-lg">
            You have successfully signed up. Please check your email for a link to confirm your email address and proceed.
          </p>
        </div>
      </form>
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <span class="w-full border-t" />
        </div>
        <div class="relative flex justify-center text-xs uppercase">
          <span class="bg-a-surface px-2">
            Or continue with
          </span>
        </div>
      </div>
      <ABtn
        variant="fill" color="white"
        :icon="[isLoading ? 'i-ri:loader-2-line animate-spin' : 'i-logos:github-icon']"
      >
        <span>Sign up with Github</span>
      </ABtn>

      <ABtn
        variant="fill" :disabled="isLoading"
        color="white"
        :icon="[isLoading ? 'i-ri:loader-2-line animate-spin' : 'i-logos:google-icon']"
        @click="supabase.auth.signInWithOAuth({ provider: 'google' })"
      >
        <span>Sign up with Google</span>
      </ABtn>
    </div>
  </ACard>
</template>
