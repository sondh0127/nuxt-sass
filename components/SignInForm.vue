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
  <div class="grid gap-6">
    <form @submit.prevent="handleSubmit">
      <div class="grid gap-3">
        <div class="grid gap-1">
          <UILabel for="email">
            Email
          </UILabel>
          <UIInput
            v-bind="emailAttrs"
            id="email"
            v-model="email"
            placeholder="name@example.com"
            type="email"
            autocapitalize="none"
            autocomplete="email"
            autocorrect="off"
            :disabled="isLoading"
          />
        </div>

        <div class="grid gap-1">
          <UILabel for="password">
            Password
          </UILabel>

          <UIInput
            v-bind="passwordAttrs"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            type="password"
            autocapitalize="none"
            autocomplete="password"
            autocorrect="off"
            :disabled="isLoading"
          />
        </div>
        <NuxtLink id="forgotPasswordLink" to="/forgotpassword" class="block text-right">
          Forgot your password?
        </NuxtLink>

        <UIButton type="submit" :disabled="isLoading">
          <template v-if="isLoading">
            <i class="i-ri:loader-2-line mr-2 h-4 w-4 animate-spin" />
          </template>
          Sign In with Email
        </UIButton>
      </div>
    </form>
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
    </div>
    <UIButton variant="outline" type="button" :disabled="isLoading">
      <i v-if="isLoading" class="i-ri:loader-2-line mr-2 h-5 w-5 animate-spin" />
      <i v-else class="i-logos:github-icon mr-2 h-5 w-5" />
      <span>Sign up with Github</span>
    </UIButton>

    <UIButton
      variant="outline" type="button" :disabled="isLoading"
      @click="supabase.auth.signInWithOAuth({ provider: 'google' })"
    >
      <span class="flex items-center justify-center space-x-2">
        <i v-if="isLoading" class="i-ri:loader-2-line mr-2 h-5 w-5 animate-spin" />
        <i v-else i-logos:google-icon class="h-5 w-5" />
        <span>Sign up with Google</span>
      </span>
    </UIButton>
  </div>
</template>
