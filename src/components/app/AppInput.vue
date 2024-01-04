<script setup lang="ts">
defineProps({
  modelValue: { type: [String, Number] },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  type: {
    type: String,
    default: 'text',
    validator: (value: string) => ['text', 'number', 'date', 'email', 'password', 'search', 'tel'].includes(value)
  },
  width: { type: String, default: 'auto' },
  appendInnerIcon: { type: String, default: '' }
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <div v-if="label" class="mb-3">{{ label }}</div>
    <input
      :value="modelValue"
      :placeholder="placeholder || label"
      :class="`w-${width} h-14 bg-white text-sm font-light focus-visible:outline-0 border border-secondary hover:border-primary/50 focus:border-primary rounded-lg px-6 py-5`"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
