<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
//
const PublicNavbar = defineAsyncComponent(() => import('@components/PublicNavbar.vue'))
</script>

<template>
  <div class="h-screen flex flex-col">
    <PublicNavbar/>
    <main class="flex-1 overflow-auto">
      <div class="container mx-auto px-6 py-4">
        <RouterView/>
      </div>
    </main>
  </div>
</template>
