<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const LocaleSwitch = defineAsyncComponent(() => import('@components/modules/LocaleSwitch.vue'))
import { vOnClickOutside } from '@vueuse/components'
// Use methods and configurations
const { t } = useI18n()
//
type MenuItem = {
  routeName: string
  name: string
}
const menuItems = computed<MenuItem[]>(() => [
  { routeName: 'home', name: t('home') },
  { routeName: '', name: t('library') },
  { routeName: '', name: t('feedback') }
])
const isExpandedList = ref(false)
</script>

<template>
  <nav class="sticky top-0 bg-primary" v-on-click-outside="() => isExpandedList = false">
    <div class="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto px-6 py-4">
      <router-link :to="{ name: 'home' }" class="flex items-center space-x-3">
        <img src="/images/logo.svg" width="36" height="36" class="filter-white" alt="TrailHub Logo" />
        <span class="self-center text-white text-2xl font-medium whitespace-nowrap">TrailHub</span>
      </router-link>

      <i class="fa-solid fa-bars md:hidden text-white text-2xl" @click="isExpandedList = !isExpandedList" />
      <div class="hidden md:flex items-center space-x-8 md:space-x-12">
        <ul class="flex items-center space-x-8">
          <li :key="item.routeName" v-for="item in menuItems">
            <router-link
              :to="{ name: item.routeName }"
              class="text-white hover:text-white/75 transition-colors ease-in-out duration-300"
            >
              {{ item.name }}
            </router-link>
          </li>
        </ul>
        <LocaleSwitch/>
        <AppButton :label="$t('signIn')" color="white" class="min-w-36" @click="$router.push({ name: 'login' })" />
      </div>
    </div>

    <transition name="slide-x">
      <div v-if="isExpandedList" class="max-w-screen-2xl mx-auto px-6 py-4 space-y-8">
        <ul class="space-y-8 text-center">
          <li :key="item.routeName" v-for="item in menuItems">
            <router-link :to="{ name: item.routeName }" class="text-white">
              {{ item.name }}
            </router-link>
          </li>
        </ul>
        <AppButton :label="$t('signIn')" color="white" class="w-full " @click="$router.push({ name: 'login' })" />
      </div>
    </transition>
  </nav>
</template>
