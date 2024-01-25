<script setup lang="ts">
import type { PropType } from 'vue'
import { ErrorMessage } from '@/types'
// Use methods and configurations
defineProps({
  modelValue: { type: Boolean },
  label: { type: String, default: '' },
  errorMessages: { type: Array as PropType<ErrorMessage[]>, default: [] },
  disabled: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue'])
//
const colorVariants = {
  default: 'formField w-4 h-4',
  error: 'formField-error'
}

const handleInput = (e: Event) => emit('update:modelValue', (e.target as HTMLInputElement).checked)
</script>

<template>
  <div>
    <label class="flex items-center">
      <input
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        :class="[colorVariants.default, errorMessages?.length && colorVariants.error]"
        @input="handleInput"
      />
      <span v-if="label" class="ml-2 text-sm font-light">{{ label }}</span>
    </label>
    <div
      v-if="errorMessages?.length"
      class="formField-errorMessage"
    >
      {{ $t(`notify.validation.${errorMessages[0].$validator}`, { ...errorMessages[0].$params }) }}
    </div>
  </div>
</template>
