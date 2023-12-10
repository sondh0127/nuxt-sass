<script setup lang="ts">
// import type { SignUpWithPasswordCredentials } from '@supabase/supabase-js'

// const supabase = useSupabaseClient()
// const user = useSupabaseUser()
// watchEffect(() => {
//   if (user.value)
//     navigateTo('/dashboard', { replace: true })
// })
// // const notifyStore = useNotifyStore()

// const confirmPassword = ref('')
// const signUpOk = ref(false)

// const { isLoading, mutateAsync } = useMutation(
//   async (payload: SignUpWithPasswordCredentials) => {
//     const { data, error } = await supabase.auth.signUp({ ...payload, options: { emailRedirectTo: '/dashboard' } })
//     if (error)
//       throw error

//     else
//       signUpOk.value = true

//     return data
//   },
//   {
//     onSuccess: () => {
//     },
//     onError: (error) => {
//       // notifyStore.notify(error, NotificationType.Error)
//     },
//   },
// )

import { h } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

// import { toast } from '@/components/ui/toast'

const formSchema = toTypedSchema(z.object({
  username: z.string().min(2).max(50),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
  // toast({
  //   title: 'You submitted the following values:',
  //   description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  // })
})
resolveComponent('NuxtLink')
</script>

<template>
  <NuxtLayout name="auth">
    <SButton variant="ghost" as="NuxtLink" to="/login" :class="cn('absolute right-4 top-4 md:right-8 md:top-8')">
      Login
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
        <div :class="cn('grid gap-6', $attrs.class ?? '')">
          <form class="w-full space-y-6" @submit="onSubmit">
            <SFormField v-slot="{ componentField }" name="username">
              <SFormItem>
                <SFormLabel>Email</SFormLabel>
                <SFormControl>
                  <SInput
                    v-bind="componentField" placeholder="name@example.com" type="email" auto-capitalize="none"
                    auto-complete="email" auto-correct="off" :disabled="isLoading"
                  />
                </SFormControl>
                <!-- <SFormDescription>
                  Email to login
                </SFormDescription> -->
                <SFormMessage />
              </SFormItem>
            </SFormField>

            <SButton :disabled="isLoading" type="submit">
              <i v-if="isLoading" i-lucide:loader-2 class="mr-2 h-4 w-4 animate-spin" />
              Register with Email
            </SButton>
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
          <SButton variant="outline" type="button" :disabled="isLoading">
            <i v-if="isLoading" i-lucide:loader-2 class="mr-2 h-4 w-4 animate-spin" />
            <i v-else i-ri:github-fill class="mr-2 h-4 w-4" />
            GitHub
          </SButton>
        </div>
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

  <p class="mt-4 text-center text-lg">
    You have successfully signed up. Please check your email for a link to confirm your email address and proceed.
  </p>
</template>
