<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
//
const PublicNavbar = defineAsyncComponent(() => import('@components/PublicNavbar.vue'))
</script>

<template>
  <div class="h-screen flex flex-col">
    <PublicNavbar/>
    <div class="flex-1 overflow-auto">
      <RouterView/>
    </div>
  </div>
</template>
