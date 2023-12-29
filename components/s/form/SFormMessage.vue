<script lang="ts" setup>
import { ErrorMessage } from 'vee-validate'
import { toValue } from 'vue'
import { useFormField } from './useFormField'

const { name, formMessageId } = useFormField()
const submitCount = useSubmitCount()
</script>

<template>
  <ErrorMessage v-if="submitCount" :id="formMessageId" as="p" :name="toValue(name)" class="text-sm text-destructive font-medium" />
</template>
