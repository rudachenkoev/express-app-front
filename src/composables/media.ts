import { ref, watchEffect } from 'vue'

export const useMedia = (query: string) => {
  const matches = ref(true)

  watchEffect(onInvalidate => {
    const media = window.matchMedia(query)

    if (media.matches !== matches.value) matches.value = media.matches

    const onChange = () => matches.value = media.matches

    media.addEventListener('change', onChange)

    onInvalidate(() => media.removeEventListener('change', onChange))
  })

  return matches
}

export function useScreenSize () {
  // Breakpoints are sync with Tailwind (https://tailwindcss.com/docs/responsive-design)
  const xs = useMedia('(max-width: 639px)')
  const sm = useMedia('(min-width: 640px)') && useMedia('(max-width: 767px)')
  const md = useMedia('(min-width: 768px)') && useMedia('(max-width: 1023px)')
  const lg = useMedia('(min-width: 1024px)') && useMedia('(max-width: 1279px)')
  const xl = useMedia('(min-width: 1280px)') && useMedia('(max-width: 1535px)')
  const extraXl = useMedia('(min-width: 1536px)')

  switch (true) {
    case xs.value: return 'xs'
    case sm.value: return 'sm'
    case md.value: return 'md'
    case lg.value: return 'lg'
    case xl.value: return 'xl'
    case extraXl.value: return '2xl'
    default: return 'unknown'
  }
}
