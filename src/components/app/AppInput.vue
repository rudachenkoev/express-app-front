<script setup lang="ts">
import { ref, computed } from 'vue'
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
  default: `formField w-${props.width} h-12 md:h-14 flex items-center px-6 py-5`,
  error: 'formField-error'
}

const fieldType = ref(props.type)
const passwordAppendInnerIcon = computed<string>(() => fieldType.value === 'password' ? 'eye' : 'eye-slash')
</script>

<template>
  <div>
    <div v-if="label" class="text-sm md:text-base mb-3">
      {{ label }}
    </div>
    <div :class="[colorVariants.default, errorMessages?.length && colorVariants.error]">
      <input
        :type="fieldType"
        :value="modelValue"
        :placeholder="placeholder || label"
        :disabled="disabled"
        class="w-full focus-visible:outline-0 text-sm font-light"
        @input="event => $emit('update:modelValue', event.target.value)"
        @blur="$emit('blur')"
        @keyup.enter="$emit('keyup.enter')"
      />
      <i
        v-if="type === 'password'"
        :class="`fa-regular fa-${passwordAppendInnerIcon} cursor-pointer opacity-70 hover:opacity-100 transition ease-in-out duration-300`"
        @click="fieldType = fieldType === 'password' ? 'text' : 'password'"
      />
    </div>
    <div
      v-if="errorMessages?.length"
      class="formField-errorMessage"
    >
      {{ $t(`notify.validation.${errorMessages[0].$validator}`, { ...errorMessages[0].$params }) }}
    </div>
  </div>
</template>
