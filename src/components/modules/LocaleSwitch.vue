<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed, ref } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
// Use methods and configurations
const { locale } = useI18n()
//
type LocaleItem = {
  id: string
  name: string
}
const locales: LocaleItem[] = [
  { id: 'de', name: 'Deutsch'  },
  { id: 'en', name: 'English'  },
  // { id: 'es', name: 'Español'  },
  // { id: 'fr', name: 'Français'  },
  // { id: 'it', name: 'Italiano'  }
]
const isExpandedList = ref(false)
const currentLocale = computed(() => locales.find(item => item.id === locale.value))

const changeLocale = (item: LocaleItem) => {
  if (item.id !== currentLocale.value?.id) {
    locale.value = item.id
    localStorage.setItem('LOCALE', item.id)
  }
  isExpandedList.value = false
}
</script>

<template>
  <div v-if="currentLocale" class="relative">
    <div class="border border-white cursor-pointer rounded-full" @click="isExpandedList = !isExpandedList">
      <img
        :src="`/icons/flags/${currentLocale.id}.svg`"
        width="24"
        height="24"
        :alt="`${currentLocale.id}-flag`"
      />
    </div>
    <ul
      v-show="isExpandedList"
      class="w-max absolute top-8 right-0 bg-white rounded shadow"
      v-on-click-outside="() => isExpandedList = false"
    >
      <li
        :key="item.id"
        v-for="item in locales"
        class="px-4 py-2 flex items-center cursor-pointer hover:bg-surface/75 transition-colors ease-in-out duration-300"
        @click="changeLocale(item)"
      >
        <img
          :src="`/icons/flags/${item.id}.svg`"
          class="rounded-full mr-3"
          width="20"
          height="20"
          :alt="`${item.id}-flag`"
        />
        <span class="text-sm">{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>
