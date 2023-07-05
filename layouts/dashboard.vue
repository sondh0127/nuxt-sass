<script lang="ts" setup>
import type { FormInstance } from 'element-plus'

const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))

const { $client } = useNuxtApp()

// const { data: hello } = await $client.auth.useQuery({ text: 'client' })

const supabase = useSupabaseAuthClient()
const user = useSupabaseUser()
const accountStore = useAccountStore()

async function signout() {
  await supabase.auth.signOut()
  if (accountStore)
    accountStore.signout()
  ElMessage({
    type: 'success',
    message: 'Signout completed',
  })

  navigateTo('/signin', { replace: true })
}

function handleLogout(params: type) {
  ElMessageBox.confirm(
    'Sign out',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    },
  )
    .then(() => {
      signout()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Logout canceled',
      })
    })
}

const joinDialogVisible = ref(false)

function handleJoin() {
  joinDialogVisible.value = true
}

const router = useRouter()
function handleAccount() {
  router.push('/account')
}

// Whether the storage menu exists show tooltip attribute identification
const menuTextRef = ref()
const showTooltip = ref(true)

function hoverMenu() {
  nextTick(() => {
    // Text overflows if the overall width of the text content is greater than its viewable width
    menuTextRef.value?.scrollWidth > menuTextRef.value?.clientWidth
      ? (showTooltip.value = true)
      : (showTooltip.value = false)
  })
}

function handlePoint() {
  router.push('/point')
}

const color = useColorMode()
const isDark = computed(() => color.value === 'dark')
function handleSwitch() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}

// SECTION: Brains
const brainVisible = ref(false)
function handleBrain() {
  brainVisible.value = true
}
const { createBrain, createMutation } = useBrainState()
const ruleFormRef = ref<FormInstance>()
const brainForm = ref({
  brain_name: null,
})

function submitBrain() {
  ruleFormRef.value?.validate(async (valid) => {
    if (valid) {
      await createBrain(brainForm.value.brain_name!)
    }
    else {
      console.log('error submit!')
      return false
    }
  })
}
</script>

<template>
  <el-container class="layout-container-demo h-full w-full">
    <el-aside class="border-r border-$el-border-color" width="256px">
      <el-scrollbar class="[&_.el-scrollbar\_\_view]:h-full">
        <div class="h-full flex flex-col">
          <div class="flex items-center justify-center gap-3">
            <el-icon i-logos:nuxt-icon size="40" />
            <span>
              NUXT SASS
            </span>
          </div>

          <el-menu class="flex-1 !border-r-none" :default-openeds="['1', '3']">
            <el-sub-menu index="1">
              <template #title>
                <el-icon>
                  <Message />
                </el-icon>Navigator One
              </template>

              <el-sub-menu index="1-4">
                <template #title>
                  Option4
                </template>
                <el-menu-item index="1-4-1">
                  Option 4-1
                </el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
          </el-menu>

          <el-menu class="!border-r-none">
            <el-menu-item @click="handleBrain">
              <el-icon class="i-carbon:ibm-cloud-pak-integration" />
              <template #title>
                <span>
                  Brain
                </span>
              </template>
            </el-menu-item>

            <el-menu-item @click="handleSwitch">
              <el-icon class="i-carbon:carbon" />
              <template #title>
                <span>
                  Setting
                </span>
              </template>
            </el-menu-item>
            <el-menu-item @click="handleSwitch">
              <el-icon class="i-carbon:carbon" />
              <template #title>
                <span>
                  Custom API Key
                </span>
              </template>
            </el-menu-item>
            <el-menu-item @click="handleSwitch">
              <el-icon class="i-carbon:carbon" />
              <template #title>
                <span>
                  Robot?
                </span>
              </template>
            </el-menu-item>
            <el-menu-item @click="handleSwitch">
              <el-icon class="i-carbon:carbon" />
              <template #title>
                <span>
                  Download App (PWA, Tauri)
                </span>
              </template>
            </el-menu-item>

            <el-menu-item @click="handleSwitch">
              <el-icon class="i-carbon:carbon" />
              <template #title>
                <span>
                  Model Switch TODO
                </span>
              </template>
            </el-menu-item>

            <el-menu-item @click="handleSwitch">
              <el-icon :class="[isDark ? 'i-carbon:sun' : 'i-carbon:moon']" />
              <template #title>
                <span>
                  Switch mode
                </span>
              </template>
            </el-menu-item>

            <el-menu-item @click="handlePoint">
              <el-icon i-carbon:hourglass />
              <template #title>
                <span>
                  Remaining point
                </span>
                <el-icon i-carbon:add-alt />
              </template>
            </el-menu-item>

            <el-menu-item @click="handleAccount">
              <el-icon i-carbon:user />
              <template #title>
                <el-tooltip :content="user?.email" placement="top" :offset="0" effect="dark" :disabled="!showTooltip">
                  <span ref="menuTextRef" class="max-w-186px truncate" @mouseover="hoverMenu()">
                    {{ user?.email }}
                  </span>
                </el-tooltip>
              </template>
            </el-menu-item>
            <el-menu-item @click="handleJoin">
              <el-icon i-carbon:group />
              <template #title>
                Join the group
              </template>
            </el-menu-item>
            <el-menu-item @click="handleLogout">
              <el-icon i-carbon:logout />
              <template #title>
                Sign out
              </template>
            </el-menu-item>
          </el-menu>
        </div>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header class="flex justify-between border-b border-$el-border-color">
        <div />
        <div class="h-full inline-flex items-center justify-center">
          <el-dropdown>
            <el-icon class="i-carbon:settings" style="margin-right: 8px; margin-top: 1px" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Tom</span>
        </div>
      </el-header>

      <el-main class="!p-0">
        <el-scrollbar>
          <slot />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>

  <!-- SECTION: Tip -->
  <el-dialog v-model="joinDialogVisible" title="Tips" width="30%" align-center>
    <span>This is a message</span>
    <template #footer>
      <span class="">
        <el-button type="primary" @click="joinDialogVisible = false">
          Got it
        </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- SECTION Brain -->

  <el-dialog v-model="brainVisible" title="Brains" width="40%" align-center>
    <el-form ref="ruleFormRef" :model="brainForm" status-icon @submit.prevent>
      <div class="flex items-start justify-between gap-2">
        <el-form-item
          prop="brain_name" class="flex-1" :rules="[{
            required: true,
            message: 'Brain name is required',
            trigger: 'change',
          }]"
        >
          <el-input v-model="brainForm.brain_name" placeholder="Add a new brain" />
        </el-form-item>
        <el-button type="primary" @click="submitBrain">
          <template #icon>
            <el-icon class="i-carbon:add" />
          </template>
        </el-button>
      </div>
    </el-form>
    <div>
      Brain list
    </div>
    <template #footer>
      <span class="">
        <el-button @click="brainVisible = false">
          Close
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
