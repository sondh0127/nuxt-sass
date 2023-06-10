<script setup lang="ts">
definePageMeta({
  layout: 'auth',
})
const supabase = useSupabaseAuthClient()
const config = useRuntimeConfig()
// const notifyStore = useNotifyStore()

const loading = ref(false)
const email = ref('')

async function sendResetPasswordLink() {
  try {
    loading.value = true
    const { data, error } = await supabase.auth.resetPasswordForEmail(email.value, {
      redirectTo: `${config.public.siteRootUrl}/resetpassword`,
    })
    if (error)
      throw error
    // else notifyStore.notify('Password Reset link sent, check your email.', NotificationType.Success)
  }
  catch (error) {
    // notifyStore.notify(error, NotificationType.Error)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="">
    <div class="max-w-md w-full rounded-lg p-6 shadow-lg space-y-6">
      <h1 class="text-center text-3xl font-bold">
        Forgot Pasword
      </h1>
      <form class="space-y-4" @submit.prevent="sendResetPasswordLink">
        <div>
          <label for="email" class="mb-2 block font-bold">Email</label>
          <input
            id="email" v-model="email" type="email" class="w-full border border-gray-400 rounded-md p-2"
            placeholder="Enter your email" required
          >
        </div>
        <button
          :disabled="loading || email === ''" type="submit"
          class="w-full rounded-md bg-indigo-600 py-2 text-white hover:bg-indigo-700"
        >
          Send Reset Password Link
        </button>
      </form>
    </div>
  </div>
</template>
