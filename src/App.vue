<script setup lang="ts">
import { computed, watch } from 'vue'
import type { Component } from 'vue'
import { useRoute } from 'vue-router'
import AuthLayout from '@layouts/Auth.vue'
import { useI18n } from 'vue-i18n'
// Use methods and configurations
const route = useRoute()
const { t } = useI18n()
//
const layout = computed<Component | boolean>(() => {
  switch (route?.meta.layout) {
    case 'auth': return AuthLayout
    default: return false
  }
})
watch(route, (to) => document.title = to.meta.title ? `${t(to.meta.title)} | Express Application Front` : 'Express Application Front')
</script>

<template>
  <Component v-if="layout" :is="layout"/>
</template>
