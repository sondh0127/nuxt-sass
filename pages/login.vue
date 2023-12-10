<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')

async function signInWithOtp() {
  const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo: 'http://localhost:3000/confirm',
    },
  })
  if (error)
    console.log(error)
}
</script>

<template>
  <div>
    <AuthUserForm />
  </div>
</template>
