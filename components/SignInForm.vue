<script lang="ts" setup>
import type { SignInWithPasswordCredentials } from '@supabase/supabase-js'

const supabase = useSupabaseAuthClient()
const user = useSupabaseUser()
watchEffect(() => {
  if (user.value)
    navigateTo('/dashboard', { replace: true })
})
// const notifyStore = useNotifyStore()

const { isLoading, mutateAsync } = useMutation(
  async (payload: SignInWithPasswordCredentials) => {
    const { data, error } = await supabase.auth.signInWithPassword({ ...payload })
    if (error)
      throw error

    else

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

        <NuxtLink id="forgotPasswordLink" to="/forgotpassword" class="block text-right text-sm text-muted-foreground hover:text-primary">
          Forgot your password?
        </NuxtLink>

        <ABtn type="submit" :loading="isLoading">
          Sign In with Email
        </ABtn>
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
      icon="i-logos:github-icon"
      @click="supabase.auth.signInWithOAuth({ provider: 'github' })"
    >
      <span>Sign in with Github</span>
    </ABtn>

    <ABtn
      variant="fill"
      color="white"
      icon="i-logos:google-icon"
      @click="supabase.auth.signInWithOAuth({ provider: 'google' })"
    >
      <span>Sign in with Google</span>
    </ABtn>
  </div>
</template>
