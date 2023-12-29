<script setup lang="ts">
import { sleep } from '@antfu/utils'
import type { SignUpWithPasswordCredentials } from '@supabase/supabase-js'

definePageMeta({
  middleware: 'none-auth',
})

const { toast } = useToast()
const supabase = useSupabaseClient()

// const confirmPassword = ref('')

const { mutateAsync, isPending } = useMutation({
  mutationFn: (payload: SignUpWithPasswordCredentials) => supabase.auth.signUp({ ...payload, options: {
  } }),
})

const formSchema = toTypedSchema(z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(1, 'Password is required'),
}))

const { handleSubmit } = useForm({
  initialValues: {
    email: '',
    password: '',
  },
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
  const res = await mutateAsync({ email: values.email, password: values.password })
  toast({
    title: 'You have successfully signed up. Please check your email for a link to confirm your email address and proceed.',
  })
})

// Github
const isLoadingGithub = ref(false)
</script>

<template>
  <NuxtLayout name="auth">
    <SButton variant="ghost" as-child :class="cn('absolute right-4 top-4 md:right-8 md:top-8')">
      <NuxtLink to="/login">
        Login
      </NuxtLink>
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
            <SFormField v-slot="{ componentField }" name="email">
              <SFormItem>
                <SFormLabel>Email</SFormLabel>
                <SFormControl>
                  <SInput
                    v-bind="componentField" placeholder="email@example.com" type="email" auto-capitalize="none"
                    auto-complete="email" auto-correct="off" :disabled="isLoading"
                  />
                </SFormControl>
                <!-- <SFormDescription>
                  Email to login
                </SFormDescription> -->
                <SFormMessage />
              </SFormItem>
            </SFormField>

            <SFormField v-slot="{ componentField }" name="password">
              <SFormItem>
                <SFormLabel>Password</SFormLabel>
                <SFormControl>
                  <SInput
                    v-bind="componentField" placeholder="Enter your password" type="password" auto-complete="password"
                    :disabled="isLoading"
                  />
                </SFormControl>
                <!-- <SFormDescription>
                  Email to login
                </SFormDescription> -->
                <SFormMessage />
              </SFormItem>
            </SFormField>
            <SButton class="w-full" :disabled="isLoading" type="submit">
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
            <i v-if="isLoadingGithub" i-lucide:loader-2 class="mr-2 h-4 w-4 animate-spin" />
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
</template>
