<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import { required, email } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import axios from 'axios'
import AppCheckmark from '@components/app/AppCheckmark.vue'
//
interface PasswordRecoveryForm {
  email: string
}
const body: PasswordRecoveryForm = reactive({
  email: ''
})
// Validation
const rules = computed(() => ({
  email: { required, email }
}))
const v$ = useVuelidate(rules, body)

const isLoading = ref(false)
const isDoneRecovery = ref(false)
const onSubmit = async () => {
  if (v$.value.$invalid) return v$.value.$touch()

  isLoading.value = true
  try {
    await axios.post('v1/auth/password-recovery-requests/', body)
    isDoneRecovery.value = true
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <template v-if="isDoneRecovery">
    <AppCheckmark />
    <div v-html="$t('passwordRecoveryDesc', { email: body.email })" class="mb-11 text-center"/>
    <AppButton :label="$t('backToLogin')" width="full" @click="$router.push({ name: 'login' })"/>
  </template>
  <template v-else>
    <h1 class="text-3xl md:text-4xl leading-normal font-medium mb-11">{{ $t('passwordRecovery') }}</h1>

    <AppInput
      v-model="body.email"
      :label="$t('enterYourEmail')"
      :placeholder="$t('email')"
      :error-messages="v$.email.$errors"
      type="email"
      width="full"
      class="mb-11"
      @blur="v$.email.$touch()"
      @keyup.enter="onSubmit"
    />

    <AppButton :label="$t('sendConfirmationEmail')" :loading="isLoading" width="full" @click="onSubmit"/>
  </template>
</template>
