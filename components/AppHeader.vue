<script setup lang="ts">
import { storeToRefs } from 'pinia'

const supabase = useSupabaseAuthClient()
const user = useSupabaseUser()
// const accountStore = useAccountStore()
// const { dbUser, activeAccountId } = storeToRefs(accountStore)
// const notifyStore = useNotifyStore()
// const { notifications } = storeToRefs(notifyStore)

onMounted(async () => {
  // await accountStore.init()
})

async function signout() {
  await supabase.auth.signOut()
  // if (accountStore)
  //   accountStore.signout()

  navigateTo('/', { replace: true })
}
</script>

<template>
  <div>
    <details open>
      <summary>user</summary>
      <pre>{{ JSON.stringify(user, null, 2) }}</pre>
    </details>
  </div>
</template>
