<script lang="ts" setup>
import type { SignUpWithPasswordCredentials } from '@supabase/supabase-js'

const supabase = useSupabaseAuthClient()

// const notifyStore = useNotifyStore()

const loading = ref(false)
const email = ref('')
const password = ref('')
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

async function onSubmit() {
  await mutateAsync({ email: email.value, password: password.value })
}
</script>

<template>
  <div class="grid gap-6">
    <form @submit.prevent="onSubmit">
      <div class="grid gap-2">
        <div class="grid gap-1">
          <UILabel class="sr-only" for="email">
            Email
          </UILabel>
          <UIInput
            id="email"
            placeholder="name@example.com"
            type="email"
            autocapitalize="none"
            autocomplete="email"
            autocorrect="off"
            :disabled="isLoading"
          />
        </div>
        <UIButton :disabled="isLoading">
          <template v-if="isLoading">
            <!-- <Icons.spinner class="mr-2 h-4 w-4 animate-spin" /> -->
          </template>
          Sign In with Email
        </UIButton>
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
