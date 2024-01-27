<script setup lang="ts">
definePageMeta({
  middleware: 'none-auth',
})

const NuxtLink = resolveComponent('NuxtLink')

const { mutateAsync, isPending } = useMutation({
  mutationFn: (payload) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(payload)
      }, 1000)
    })
  },
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
const { toast } = useToast()

const onSubmit = handleSubmit(async (values) => {
  const res = await mutateAsync({ email: values.email, password: values.password })
  toast({
    title: 'Welcome !',
  })
})
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
            Login
          </h1>
          <p class="text-sm text-muted-foreground">
            Enter to Saving Book
          </p>
        </div>
        <form class="w-full space-y-6" @submit="onSubmit">
          <SFormField v-slot="{ componentField }" name="email">
            <SFormItem>
              <SFormLabel>Email</SFormLabel>
              <SFormControl>
                <SInput
                  v-bind="componentField" placeholder="email@example.com" type="email" auto-capitalize="none"
                  auto-complete="email" auto-correct="off" :disabled="isPending"
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
                  :disabled="isPending"
                />
              </SFormControl>
              <!-- <SFormDescription>
                  Email to login
                </SFormDescription> -->
              <SFormMessage />
            </SFormItem>
          </SFormField>
          <SButton class="w-full" :disabled="isPending" type="submit">
            <i v-if="isPending" i-lucide:loader-2 class="mr-2 h-4 w-4 animate-spin" />
            Login
          </SButton>
        </form>
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

        <div>
          <a href="/login/github">Sign in with GitHub</a>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
