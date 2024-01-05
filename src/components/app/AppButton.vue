<script setup lang="ts">
import { computed } from 'vue'
import AppLoader from '@components/app/AppLoader.vue'
// Use methods and configurations
const props = defineProps({
  label: { type: String, default: '' },
  icon: { type: String, default: '' },
  color: {
    type: String,
    default: 'primary',
    validator: (value:string) => ['primary', 'info', 'surface'].includes(value)
  },
  width: { type: String, default: 'auto' },
  height: { type: String, default: '14' },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false }
})
//
const defaultClasses = `min-w-14 w-${props.width} h-14 disabled:opacity-50 flex items-center justify-center p-4 rounded-lg`
const theme = computed<string>(() => {
  switch (props.color) {
    case 'info': return 'bg-info hover:bg-info/75 text-accent'
    case 'surface': return 'bg-surface hover:bg-surface/75'
    default: return 'bg-primary hover:bg-primary/75 text-white shadow-[0_4px_19px_0_rgba(119,147,65,0.30)]'
  }
})
</script>

<template>
  <button
    :disabled="disabled"
    :class="[defaultClasses, theme]"
  >
    <AppLoader v-if="loading" :color="color" />
    <template v-else>
      <img
        v-if="icon"
        :src="`/icons/${icon}.svg`"
        width="26"
        height="26"
        :class="{ 'sm:mr-5': label }"
        :alt="icon"
      />
      <span :class="{ 'hidden sm:inline': icon && label }">
        {{ label }}
      </span>
    </template>
  </button>
</template>
