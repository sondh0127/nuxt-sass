<script setup lang="ts">
import { storeToRefs } from 'pinia'

// import { ACCOUNT_ACCESS } from '~/prisma/account-access-enum'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth'],
})

const accountStore = useAccountStore()
const { activeMembership, activeAccountMembers } = storeToRefs(accountStore)

const config = useRuntimeConfig()
const newAccountName = ref('')

onMounted(async () => {
  await accountStore.init()
  await accountStore.getActiveAccountMembers()
})

function formatDate(date: Date | undefined) {
  if (!date)
    return ''
  return new Intl.DateTimeFormat('default', { dateStyle: 'long' }).format(date)
}

function joinURL() {
  return `${config.public.siteRootUrl}/join/${activeMembership.value?.account.join_password}`
}
</script>

<template>
  <div class="mx-auto p-6 container">
    <div class="mb-12 text-center">
      <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl sm:text-5xl">
        Account Information
      </h2>
    </div>

    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <span class="w-32 font-bold">Account Name:</span>
        <span>{{ activeMembership?.account.name }}</span>
        <template
          v-if="activeMembership && (activeMembership.access === ACCOUNT_ACCESS.OWNER || activeMembership.access === ACCOUNT_ACCESS.ADMIN)"
        >
          <input
            v-model="newAccountName" type="text" class="w-1/3 border border-gray-400 rounded p-2"
            placeholder="Enter new name"
          >
          <button
            class="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600"
            @click.prevent="accountStore.changeAccountName(newAccountName)"
          >
            Change Name
          </button>
        </template>
      </div>

      <div class="flex items-center gap-4">
        <span class="w-32 font-bold">Current Period Ends:</span>
        <span>{{ formatDate(activeMembership?.account.current_period_ends) }}</span>
      </div>

      <!-- <div class="flex items-center gap-4">
        <span class="w-32 font-bold">Permitted Features:</span>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="feature in activeMembership?.account.features"
            class="rounded-full bg-gray-200 px-2 py-1 font-semibold text-gray-700"
          >{{ feature }}</span>
        </div>
      </div> -->

      <div class="flex items-center gap-4">
        <span class="w-32 font-bold">Maximum Notes:</span>
        <span>{{ activeMembership?.account.max_notes }}</span>
      </div>

      <div class="flex items-center gap-4">
        <span class="w-32 font-bold">Maximum Members:</span>
        <span>{{ activeMembership?.account.max_members }}</span>
      </div>

      <div class="flex items-center gap-4">
        <span class="w-32 font-bold">Access Level:</span>
        <span class="rounded-full bg-green-500 px-2 py-1 font-semibold text-white">{{ activeMembership?.access }}</span>
        <button
          v-if="activeMembership && activeMembership.access === ACCOUNT_ACCESS.ADMIN"
          class="focus:shadow-outline-blue rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-600 focus:outline-none"
          @click.prevent="accountStore.claimOwnershipOfAccount()"
        >
          Claim Ownership
        </button>
      </div>

      <div class="flex items-center gap-4">
        <span class="w-32 font-bold">Plan:</span>
        <span>{{ activeMembership?.account.plan_name }}</span>
      </div>

      <div class="flex items-center gap-4">
        <span class="w-32 font-bold">Join Link:</span>
        <div class="flex items-center gap-2">
          <input disabled type="text" class="w-full border border-gray-400 rounded p-2" :value="joinURL()">
          <button
            v-if="activeMembership && (activeMembership.access === ACCOUNT_ACCESS.OWNER || activeMembership.access === ACCOUNT_ACCESS.ADMIN)"
            class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
            @click.prevent="accountStore.rotateJoinPassword()"
          >
            ReGen
          </button>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <h2 class="text-lg font-bold">
          Members
        </h2>
        <div class="flex flex-col gap-2">
          <div v-for="accountMember in activeAccountMembers" class="flex items-center gap-4">
            <span>{{ accountMember.user.display_name }}</span>
            <span class="rounded-full bg-green-500 px-2 py-1 font-semibold text-white">{{ accountMember.access }}</span>
            <span class="text-gray-500">({{ accountMember.user.email }})</span>
            <button
              v-if="accountMember.pending && activeMembership && (activeMembership.access === ACCOUNT_ACCESS.OWNER || activeMembership.access === ACCOUNT_ACCESS.ADMIN)"
              class="focus:shadow-outline-blue rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600 focus:outline-none"
              @click.prevent="accountStore.acceptPendingMembership(accountMember.id)"
            >
              Accept Pending Membership
            </button>
            <button
              v-if="accountMember.pending && activeMembership && (activeMembership.access === ACCOUNT_ACCESS.OWNER || activeMembership.access === ACCOUNT_ACCESS.ADMIN)"
              class="focus:shadow-outline-blue rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600 focus:outline-none"
              @click.prevent="accountStore.rejectPendingMembership(accountMember.id)"
            >
              Reject Pending Membership
            </button>
            <button
              v-if="activeMembership && (activeMembership.access === ACCOUNT_ACCESS.OWNER || activeMembership.access === ACCOUNT_ACCESS.ADMIN) && accountMember.access === ACCOUNT_ACCESS.READ_ONLY && !accountMember.pending"
              class="focus:shadow-outline-blue rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600 focus:outline-none"
              @click.prevent="accountStore.changeUserAccessWithinAccount(accountMember.user.id, ACCOUNT_ACCESS.READ_WRITE)"
            >
              Promote to Read/Write
            </button>
            <button
              v-if="activeMembership && activeMembership.access === ACCOUNT_ACCESS.OWNER && accountMember.access === ACCOUNT_ACCESS.READ_WRITE && !accountMember.pending"
              class="focus:shadow-outline-blue rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600 focus:outline-none"
              @click.prevent="accountStore.changeUserAccessWithinAccount(accountMember.user.id, ACCOUNT_ACCESS.ADMIN)"
            >
              Promote to Admin
            </button>
            <button
              v-if="activeMembership && activeMembership.access === ACCOUNT_ACCESS.OWNER && accountMember.access !== ACCOUNT_ACCESS.OWNER && !accountMember.pending"
              class="focus:shadow-outline-blue rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600 focus:outline-none"
              @click.prevent="accountStore.deleteMembership(accountMember.id)"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
