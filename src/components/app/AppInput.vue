<script setup lang="ts">
// Use methods and configurations
const props = defineProps({
  modelValue: { type: [String, Number] },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  type: {
    type: String,
    default: 'text',
    validator: (value: string) => ['text', 'number', 'date', 'email', 'password', 'search', 'tel'].includes(value)
  },
  width: { type: String, default: 'auto' },
  errorMessages: { type: Array, default: [] },
  disabled: { type: Boolean, default: false }
})
defineEmits(['update:modelValue', 'blur', 'keyup.enter'])
//
const colorVariants = {
  default: `w-${props.width} h-14 bg-white text-sm font-light focus-visible:outline-0 disabled:opacity-50 border border-secondary hover:border-primary/50 focus:border-primary rounded-lg px-6 py-5`,
  error: 'border-error hover:border-error/50 focus:border-error'
}
</script>

<template>
  <div>
    <div v-if="label" class="text-sm md:text-base mb-3">{{ label }}</div>
    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder || label"
      :disabled="disabled"
      :class="[colorVariants.default, errorMessages?.length && colorVariants.error]"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
      @keyup.enter="$emit('keyup.enter')"
    />
    <div
      v-if="errorMessages?.length"
      class="px-6 mt-1 text-error text-xs font-light"
    >
      {{ $t(`notify.validation.${errorMessages[0].$validator}`, { ...errorMessages[0].$params }) }}
    </div>
  </div>
</template>
