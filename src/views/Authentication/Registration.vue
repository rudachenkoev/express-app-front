<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import { required, email } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import axios from 'axios'
import AppCheckmark from '@components/app/AppCheckmark.vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@stores/user'
import { VueRecaptcha } from 'vue-recaptcha'
// Use methods and configurations
const userStore = storeToRefs(useUserStore())
const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY
//
type RegistrationForm = {
  email: string,
  recaptcha: string
}
const body: RegistrationForm = reactive({
  email: userStore.email,
  recaptcha: ''
})
// Validation
const rules = computed(() => ({
  email: { required, email },
  recaptcha: { required }
}))
const v$ = useVuelidate(rules, body)

const isLoading = ref(false)
const isDoneRegistration = ref(false)
const onSubmit = async () => {
  if (v$.value.$invalid) return v$.value.$touch()

  isLoading.value = true
  try {
    await axios.post('v1/auth/registration-requests/', body)
    isDoneRegistration.value = true
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <template v-if="isDoneRegistration">
    <AppCheckmark />
    <div v-html="$t('signUpFlowDesc', { email: body.email })" class="mb-11 text-center" />
    <AppButton :label="$t('backToLogin')" class="w-full" @click="$router.push({ name: 'login' })"/>
  </template>
  <template v-else>
    <h1 class="text-3xl md:text-4xl leading-normal font-medium mb-11">{{ $t('signUp') }}</h1>

    <AppInput
      v-model="body.email"
      :label="$t('enterYourEmail')"
      :placeholder="$t('email')"
      :error-messages="v$.email.$errors"
      type="email"
      width="full"
      class="mb-9"
      @blur="v$.email.$touch()"
      @keyup.enter="onSubmit"
    />
    <VueRecaptcha
      :sitekey="recaptchaSiteKey"
      class="mb-11"
      @verify="value => body.recaptcha = value"
      @expired="() => body.recaptcha = ''"
    />

    <AppButton :label="$t('sendConfirmationEmail')" :loading="isLoading" class="w-full" @click="onSubmit"/>

    <div class="text-xs md:text-sm text-secondary text-center mt-8">
      {{ $t('alreadyHaveAccount') }}
      <router-link :to="{ name: 'login' }" class="text-primary">{{ $t('signIn') }}</router-link>
    </div>
  </template>
</template>
