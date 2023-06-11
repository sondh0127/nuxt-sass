<script lang="ts" setup>
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'

const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))

definePageMeta({
  layout: 'empty',
  middleware: ['auth'],
})

const { $client } = useNuxtApp()

// const { data: hello } = await $client.auth.useQuery({ text: 'client' })
</script>

<template>
  <el-container class="layout-container-demo h-full w-full">
    <el-aside class="border-r border-$el-border-color" width="256px">
      <el-scrollbar>
        <div class="flex items-center justify-center gap-3">
          <el-icon i-logos:nuxt-icon size="40" />
          <span>
            NUXT SASS
          </span>
        </div>
        <el-menu class="!border-r-none" :default-openeds="['1', '3']">
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <Message />
              </el-icon>Navigator One
            </template>
            <el-menu-item-group>
              <template #title>
                Group 1
              </template>
              <el-menu-item index="1-1">
                Option 1
              </el-menu-item>
              <el-menu-item index="1-2">
                Option 2
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="1-3">
                Option 3
              </el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>
                Option4
              </template>
              <el-menu-item index="1-4-1">
                Option 4-1
              </el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <IconMenu />
              </el-icon>Navigator Two
            </template>
            <el-menu-item-group>
              <template #title>
                Group 1
              </template>
              <el-menu-item index="2-1">
                Option 1
              </el-menu-item>
              <el-menu-item index="2-2">
                Option 2
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="2-3">
                Option 3
              </el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="2-4">
              <template #title>
                Option 4
              </template>
              <el-menu-item index="2-4-1">
                Option 4-1
              </el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <Setting />
              </el-icon>Navigator Three
            </template>
            <el-menu-item-group>
              <template #title>
                Group 1
              </template>
              <el-menu-item index="3-1">
                Option 1
              </el-menu-item>
              <el-menu-item index="3-2">
                Option 2
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="3-3">
                Option 3
              </el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="3-4">
              <template #title>
                Option 4
              </template>
              <el-menu-item index="3-4-1">
                Option 4-1
              </el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>
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
          <Examples />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>
