<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'
import { useRoute } from 'vue-router'
import AuthLayout from '@layouts/Auth.vue'
// Use methods and configurations
const route = useRoute()
//
const layout = computed<Component | boolean>(() => {
  switch (route?.meta.layout) {
    case 'auth': return AuthLayout
    default: return false
  }
})
</script>

<template lang="pug">
component(v-if="layout" :is="layout")
</template>
