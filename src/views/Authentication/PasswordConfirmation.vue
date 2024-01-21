<script setup lang="ts">
import { reactive, computed, ref, onBeforeMount, watch } from 'vue'
import { required, minLength, maxLength, sameAs } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { generatePassword, setAuthToken } from '@helpers/auth'
// Use methods and configurations
const route = useRoute()
const router = useRouter()
//
interface PasswordConfirmationForm {
  password: string,
  passwordConfirmation: string
}
const body: PasswordConfirmationForm = reactive({
  password: '',
  passwordConfirmation: ''
})
// Validation
const rules = computed(() => ({
  password: {
    required,
    minLength: minLength(8),
    maxLength: maxLength(254),
    containsUppercase: (value: string) => /[A-Z]/.test(value),
    containsLowercase: (value: string) => /[a-z]/.test(value),
    containsNumber: (value: string) => /[0-9]/.test(value)
  },
  passwordConfirmation: {
    required,
    sameAsPassword: sameAs(body.password)
  }
}))
const v$ = useVuelidate(rules, body)

onBeforeMount(() => {
  if (!route.query.requestId) router.push({ name: 'login' })
})

const isLoading = ref(false)
const onSubmit = async () => {
  if (v$.value.$invalid) return v$.value.$touch()

  const url = `v1/auth/${ route.name === 'registration-confirmation' ? 'registration' : 'password-recovery'}-requests/confirmation/`
  isLoading.value = true
  try {
    const response = await axios.post(url, { requestId: route.query.requestId, ...body })
    setAuthToken({ jwt: response.data.bearer })
    location.href = '/'
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

const isAutoPasswordGeneration = ref(false)
watch(isAutoPasswordGeneration, value => {
  if (value) generateUserPassword()
})
const generateUserPassword = () => {
  const password: string = generatePassword({ length: 12 })
  body.password = password
  body.passwordConfirmation = password
}

</script>

<template>
  <h1 class="text-3xl md:text-4xl leading-normal font-medium mb-11">{{ $t($route.meta.title) }}</h1>

  <AppInput
    v-model="body.password"
    :label="$t('enterYourPassword')"
    :placeholder="$t('password')"
    :error-messages="v$.password.$errors"
    type="password"
    width="full"
    class="mb-3"
    @blur="v$.password.$touch()"
    @keyup.enter="onSubmit"
  />
  <AppInput
    v-model="body.passwordConfirmation"
    :label="$t('passwordConfirmation')"
    :error-messages="v$.passwordConfirmation.$errors"
    type="password"
    width="full"
    class="mb-5"
    @blur="v$.passwordConfirmation.$touch()"
    @keyup.enter="onSubmit"
  />
  <AppCheckbox
    v-model="isAutoPasswordGeneration"
    :label="$t('generatePasswordAutomatically')"
    class="mb-11"
  />

  <AppButton :label="$t('btn.continue')" :loading="isLoading" class="w-full" @click="onSubmit"/>
</template>
