<script setup lang="ts">
defineProps({
  modelValue: { type: Boolean },
  label: { type: String, default: '' },
  errorMessages: { type: Array, default: [] },
  disabled: { type: Boolean, default: false }
})
defineEmits(['update:modelValue'])
//
const colorVariants = {
  default: 'formField w-4 h-4',
  error: 'formField-error'
}
</script>

<template>
  <div>
    <label class="flex items-center">
      <input
        :checked="modelValue"
        :disabled="disabled"
        type="checkbox"
        :class="[colorVariants.default, errorMessages?.length && colorVariants.error]"
        @input="(event) => $emit('update:modelValue', event.target.checked)"
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
