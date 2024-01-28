<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'
import { useScreenSize } from '@composables/media'
//
const breakpoint = computed(() => useScreenSize())
const LocaleSwitch = defineAsyncComponent(() => import('@components/modules/LocaleSwitch.vue'))
const contentBottomPosition = ref(0)
const observeHeight = () => {
  const resizeObserver = new ResizeObserver(function(resizeObserverEntry) {
    contentBottomPosition.value = resizeObserverEntry[0].target.clientHeight / 2
  })
  const el = document.getElementById('contentForm')
  if (el) resizeObserver.observe(el)
}
onMounted(() => observeHeight())
</script>

<template>
  <div class="w-screen h-screen">
    <div class="size-full md:h-1/2 bg-primary">
      <div class="container h-full mx-auto relative flex justify-center md:justify-start md:items-end p-6 md:p-0">
        <div class="hidden lg:flex justify-between items-center w-full max-w-[485px] xl:max-w-[741px] 2xl:max-w-[998px] lg:pr-12 lg:pb-12">
          <div class="pr-12">
            <RouterLink :to="{ name: 'home' }" class="flex items-center space-x-3">
              <img src="/images/logo.svg" width="36" height="36" class="filter-white" alt="TrailHub Logo" />
              <span class="self-center text-white text-2xl font-medium whitespace-nowrap">TrailHub</span>
            </RouterLink>
            <div class="min-h-[115px] mt-5 text-sm text-white font-light">
              {{ $t('signInDesc') }}
            </div>
          </div>
          <img
            src="/images/rocket-man.png"
            width="385"
            height="385"
            class="sm:hidden xl:block"
            loading="lazy"
            alt="rocket-man"
          />
        </div>
        <div
          id="contentForm"
          class="md:absolute md:right-[calc(50%-270px)] lg:right-0 max-w-[540px] w-full h-fit bg-white shadow-[0_4px_35px_0_rgba(0,0,0,0.08)] rounded-3xl md:rounded-[40px] p-7 md:p-11"
          :style="`bottom: -${contentBottomPosition}px`"
        >
          <div v-if="['xs', 'sm', 'md'].includes(breakpoint)" class="flex items-center justify-between mb-12">
            <RouterLink :to="{ name: 'home' }" class="flex items-center space-x-3">
              <img src="/images/logo.svg" width="24" height="24" alt="TrailHub Logo" />
              <span class="self-center text-2xl md:text-3xl font-medium whitespace-nowrap">TrailHub</span>
            </RouterLink>
            <LocaleSwitch/>
          </div>
          <div class="flex items-center justify-between mb-10">
            <h1 class="text-xl lg:text-3xl leading-normal font-medium break-words">{{ $t($route.meta.title as string) }}</h1>
            <LocaleSwitch v-if="['lg', 'xl', '2xl'].includes(breakpoint)"/>
          </div>

          <RouterView/>
        </div>
      </div>
    </div>
    <div class="hidden md:block w-full h-1/2"></div>
  </div>
</template>
