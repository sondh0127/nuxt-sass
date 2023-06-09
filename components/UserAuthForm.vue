<script lang="ts" setup>
import type { SignUpWithPasswordCredentials } from '@supabase/supabase-js'

import { useForm } from '@vorms/core'

const supabase = useSupabaseAuthClient()

// const notifyStore = useNotifyStore()

const loading = ref(false)
const confirmPassword = ref('')
const signUpOk = ref(false)

const { isLoading, mutateAsync } = useMutation(
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

const { register, errors, handleSubmit } = useForm({
  initialValues: {
    email: '',
    password: '',
  },
  onSubmit: async (values) => {
    console.log('[LOG] ~ file: UserAuthForm.vue:43 ~ values:', values)
    // await mutateAsync(values)
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

        <UIButton type="submit" :disabled="isLoading">
          <template v-if="isLoading">
            <i class="i-ri:loader-2-line mr-2 h-4 w-4 animate-spin" />
          </template>
          Sign In with Email
        </UIButton>
        <p v-if="signUpOk" class="mt-4 text-center text-lg">
          You have successfully signed up. Please check your email for a link to confirm your email address and proceed.
        </p>
      </div>

      <details open>
        <summary>password</summary>
        <pre>{{ JSON.stringify(password, null, 2) }}</pre>
      </details>
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
      <!-- <template v-if="isLoading">
          <Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
        </template>
        <template v-else>
          <Icons.gitHub class="mr-2 h-4 w-4" />
        </template> -->
      Github
    </UIButton>

    <!-- <button
        class="w-full rounded-md bg-red-600 py-2 text-white hover:bg-red-700"
        @click="supabase.auth.signInWithOAuth({ provider: 'google' })"
      >
        <span class="flex items-center justify-center space-x-2">
          <i i-fa-brands:google class="h-5 w-5" />
          <span>Sign up with Google</span>
        </span>
      </button> -->
  </div>
</template>
